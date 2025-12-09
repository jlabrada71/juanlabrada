
function mergeBindings (bindings1, bindings2) {
  if (!bindings1 || !bindings2) {
    return null
  }
  let conflict = false
  const bindings = new Map()
  bindings1.forEach((value, variable) => {
    bindings.set(variable, value)
  })
  bindings2.forEach((value, variable) => {
    const other = bindings.get(variable)
    if (other) {
      const sub = other.match(value)
      if (!sub) {
        conflict = true
      } else {
        sub.forEach((value, variable) => {
          bindings.set(variable, value)
        })
      }
    } else {
      bindings.set(variable, value)
    }
  })
  if (conflict) {
    return null
  }
  return bindings
}

function Variable (name) {
  this.name = name
}

Variable.prototype.match = function (other) {
  const bindings = new Map()
  if (this !== other) {
    bindings.set(this, other)
  }
  return bindings
}

Variable.prototype.substitute = function (bindings) {
  const value = bindings.get(this)
  if (value) {
    // if value is a compound term then substitute
    // variables inside it too
    return value.substitute(bindings)
  }
  return this
}

function Term (functor, args) {
  this.functor = functor
  this.args = args || []
}

function zip (arrays) {
  return arrays[0].map((element, index) => arrays.map((array) => array[index]))
}

Term.prototype.match = function (other) {
  if (other instanceof Term) {
    if (this.functor !== other.functor) {
      return null
    }
    if (this.args.length !== other.args.length) {
      return null
    }
    return zip([this.args, other.args]).map((args) => args[0].match(args[1])).reduce(mergeBindings, new Map())
  }
  return other.match(this)
}

Term.prototype.substitute = function (bindings) {
  return new Term(this.functor, this.args.map((arg) => arg.substitute(bindings)))
}

Term.prototype.query = function * (database) {
  yield * database.query(this)
}

Term.TRUE = new Term('true')

Term.TRUE.substitute = function () {
  return this
}

Term.TRUE.query = function * () {
  yield this
}

function Rule (head, body) {
  this.head = head
  this.body = body
}

function Conjunction (args) {
  this.args = args
}

Conjunction.prototype = Object.create(Term.prototype)

Conjunction.prototype.query = function * (database) {
  const self = this
  function * solutions (index, bindings) {
    const arg = self.args[index]
    if (!arg) {
      yield self.substitute(bindings)
    } else {
      for (const item of database.query(arg.substitute(bindings))) {
        const unified = mergeBindings(arg.match(item), bindings)
        if (unified) {
          yield * solutions(index + 1, unified)
        }
      }
    }
  }
  yield * solutions(0, new Map())
}

Conjunction.prototype.substitute = function (bindings) {
  return new Conjunction(this.args.map((arg) => arg.substitute(bindings)))
}

function Database (rules) {
  this.rules = rules
}

Database.prototype.query = function * (goal) {
  for (let i = 0, rule; rule = this.rules[i]; i++) {
    const match = rule.head.match(goal)
    if (match) {
      const head = rule.head.substitute(match)
      const body = rule.body.substitute(match)
      for (const item of body.query(this)) {
        yield head.substitute(body.match(item))
      }
    }
  }
}

/* **********************************
lexer
*********************************** */
function * lexer (text) {
  const tokenRegexp = /[A-Za-z_]+|:\-|[()\.,]/g
  let match
  while ((match = tokenRegexp.exec(text)) !== null) {
    yield match[0]
  }
}

function parser (tokens) {
  let current
  let done
  let scope
  function next () {
    const nextToken = tokens.next()
    current = nextToken.value
    done = nextToken.done
  }
  function parseAtom () {
    const name = current
    if (!/^[A-Za-z_]+$/.test(name)) {
      throw new SyntaxError(`Bad atom name: ${name}`)
    }
    next()
    return name
  }
  function parseTerm () {
    if (current === '(') {
      next() // eat (
      const args = []
      while (current !== ')') {
        args.push(parseTerm())
        if (current !== ',' && current !== ')') {
          throw new SyntaxError(`Expected , or ) in term but got ${current}`)
        }
        if (current === ',') {
          next() // eat ,
        }
      }
      next() // eat )
      return new Conjunction(args)
    }
    const functor = parseAtom()
    if (/^[A-Z_][A-Za-z_]*$/.test(functor)) {
      if (functor === '_') {
        return new Variable('_')
      }
      // variable X in the same scope should point to the same object
      let variable = scope[functor]
      if (!variable) {
        variable = scope[functor] = new Variable(functor)
      }
      return variable
    }
    if (current !== '(') {
      return new Term(functor)
    }
    next() // eat (
    const args = []
    while (current !== ')') {
      args.push(parseTerm())
      if (current !== ',' && current !== ')') {
        throw new SyntaxError(`Expected , or ) in term but got ${current}`)
      }
      if (current === ',') {
        next() // eat ,
      }
    }
    next() // eat )
    return new Term(functor, args)
  }
  function parseRule () {
    const head = parseTerm()
    if (current === '.') {
      next() // eat .
      return new Rule(head, Term.TRUE)
    }
    if (current !== ':-') {
      throw new SyntaxError(`Expected :- in rule but got ${current}`)
    }
    next() // eat :-
    const args = []
    while (current !== '.') {
      args.push(parseTerm())
      if (current !== ',' && current !== '.') {
        throw new SyntaxError(`Expected , or ) in term but got ${current}`)
      }
      if (current === ',') {
        next() // eat ,
      }
    }
    next() // eat .
    let body
    if (args.length === 1) {
      // body is a regular Term
      body = args[0]
    } else {
      // body is a conjunction of all terms
      body = new Conjunction(args)
    }
    return new Rule(head, body)
  }
  next() // start the tokens iterator
  return {
    parseRules () {
      const rules = []
      while (!done) {
        // each rule gets its own scope for variables
        scope = { }
        rules.push(parseRule())
      }
      return rules
    },
    parseTerm () {
      scope = { }
      return parseTerm()
    }
  }
}

function print (txt) {
  console.log(txt)
}

const rulesText1 = 'man(juan).' +
        'old(juan).' +
        'woman(miriela).' +
        'mortal(X) :- man(X).' +
        'mortal(X) :- woman(X).' +
        'driver(X) :- mortal(X), old(X).'

const rules = parser(lexer(rulesText1)).parseRules()
const db = new Database(rules)
const goalText = 'driver(X)'
const goal = parser(lexer(goalText)).parseTerm()

const x = goal.args[0] // variable X

for (const item of db.query(goal)) {
  const valueOfX = goal.match(item).get(x)
  print(`${item.functor} = ${JSON.stringify(valueOfX.functor)}`)
}
