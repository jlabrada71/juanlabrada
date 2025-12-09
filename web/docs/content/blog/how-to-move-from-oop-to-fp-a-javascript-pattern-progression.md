---
title: How to move from OOP to FP - A JavaScript Pattern Progression
description: undefined
slug: how-to-move-from-oop-to-fp--a-javascript-pattern-progression
tags: ['refactoring','design patterns']
---
# How to move from OOP to FP:  A JavaScript Pattern Progression

Original source:
https://realworldjs.medium.com/a-javascript-pattern-progression-from-oop-to-functional-style-fp-79b5717e9345

Circle Object
-------------------------
Let’s imagine that we want to handle round 2D objects that we call Circles. Let’s define a couple of properties and operations that fit the concept of such objects:
r: Radius of the circle. This can never be changed (because then it is not the same circle anymore!).
pos: Position in a 2D world — an array with 2 elements/coordinates. Freely changeable.
hits: How many times this circle has been calculated to intersect another circle. This is internal state, not freely changeable.
area(): Get the area of a circle.
intersect(): Calculate if a circle intersects another, and update both hits if they do.

We start in OOP land by implementing this circle concept as a class:

```
class Circle {
  constructor(pos = [0, 0], r = 0) {
    this.pos = pos;
    this.radius = r;
    this.hitCount = 0;
  }

  get r() {
    return this.radius;
  }
  set r(_) {
    throw Error('Setting r is forbidden');
  }

  get hits() {
    return this.hitCount;
  }
  set hits(_) {
    throw Error('Can only increase hits, not set it');
  }

  incHits() {
    this.hitCount += 1;
  }

  area() {
    return this.r ** 2 * Math.PI;
  }

  intersect(circle) {
    const h = Math.sqrt(
      (this.pos[0] - circle.pos[0]) ** 2 + (this.pos[1] - circle.pos[1]) ** 2,
    );
    const hit = h - this.r - circle.r < 0;
    if (hit) {
      this.incHits();
      circle.incHits();
    }
    return hit;
  }
}
```
How to use it 

```
const c1 = new Circle([2.5, 0], 1.5);
const c2 = new Circle([-2, 0], 2);

c1.area(); // -> 7.0685834705770345
c2.area(); // -> 12.566370614359172

c1.intersect(c2); // -> false
c1.hits; // -> 0

c1.pos[0] = 1;
c1.intersect(c2); // -> true
c1.hits; // -> 1
c2.hits; // -> 1

c1.hits = 4; // -> Throwing an error!
```
Using contructor pattern
--------------------------------
```
function Circle(pos = [0, 0], r = 0) {
  this.pos = pos;
  let hits = 0;

  this.getR = () => r;
  this.getHits = () => hits;
  this.incHits = () => (hits += 1);
  this.area = () => r ** 2 * Math.PI;

  this.intersect = circle => {
    const h = Math.sqrt(
      (this.pos[0] - circle.pos[0]) ** 2 + (this.pos[1] - circle.pos[1]) ** 2,
    );
    const hit = h - r - circle.getR() < 0;
    if (hit) {
      this.incHits();
      circle.incHits();
    }
    return hit;
  };
}
```
But now you say:
That is not correspondent to the class example! We need to use the prototype, and we could still use getters and setters!
Yes, but this guide is about patterns and a direction, and each version will not always equal the other. The main reason to even include the constructor pattern is that it is an interesting bridge to the factory.
The constructor is just a function — where inside, you could attach values and methods to this. this is the function object that gets instantiated when you call it with the new keyword. By simply keeping private variables (let or const) in the function scope, we easily create and handle private unexposed constants and states, and we can do so because of JavaScript’s closure (not in the scope of this article). By creating our own getters and setters as methods, we expose an API that will define what’s private, read-only, writable etc.
The small difference in the usage of objects created with this constructor, compared to the class, is that we will have to call our API functions instead of directly accessing and setting properties:
```
const c1 = new Circle([2.5, 0], 1.5);
const c2 = new Circle([-2, 0], 2);

c1.area(); // -> 7.0685834705770345
c2.area(); // -> 12.566370614359172

c1.intersect(c2); // -> false
c1.getHits(); // -> 0

c1.pos[0] = 1;
c1.intersect(c2); // -> true
c1.getHits(); // -> 1
c2.getHits(); // -> 1

c1.hits = 4; // OK, but this just creates a "dead" variable on the object, not used internally
c1.getHits(); // -> 1
```
So, looking at the fact that what the constructor is doing is just tie functions and values to its own properties, through this — what if we replace this with just another object?
Using factory function
-------------------------------
```
function makeCircle(pos = [0, 0], r = 0) {
  let hits = 0;

  const obj = {
    pos,
    getR: () => r,
    getHits: () => hits,
    incHits: () => (hits += 1),
    area: () => r ** 2 * Math.PI,
    intersect: (circle) => {
      const h = Math.sqrt(
        (obj.pos[0] - circle.pos[0]) ** 2 + (obj.pos[1] - circle.pos[1]) ** 2,
      );
      const hit = h - r - circle.getR() < 0;
      if (hit) {
        obj.incHits();
        circle.incHits();
      }
      return hit;
    },
  };
  return obj;
}
```
The first thing to notice here is that this is just a function, not any class, constructor, interface or other “object-descriptive” abstract construct (indicated by the lowercase first letter of makeCirle). The function, when called, will simply create a regular object with a set of properties (const obj = {...}) and return it. We are still using closure to keep hits & r private. To clarify: new could not and should not be used when using a factory.

How to use it:
```
const c1 = makeCircle([2.5, 0], 1.5);
const c2 = makeCircle([-2, 0], 2);

c1.area(); // -> 7.0685834705770345
c2.area(); // -> 12.566370614359172

c1.intersect(c2); // -> false
c1.getHits(); // -> 0

c1.pos[0] = 1;
c1.intersect(c2); // -> true
c1.getHits(); // -> 1
c2.getHits(); // -> 1

c1.hits = 4; // OK, but this just creates a "dead" variable on the object, not used internally
c1.getHits(); // -> 1
```
Factories in JavaScript can sometimes take another object to be set as the new object’s prototype (using Object.create), called prototypal inheritance. But regarding trying to use the prototype as much as possible, like that or using classes, the factual penalty of creating new objects with own properties is getting smaller and smaller with increased device performance and more optimized JS engines. It is indeed nice that it is nowadays recommended to simply create a basic object every time we need one, and optimize later should you actually find your object creation being a bottle-neck. This way we can actually skip using prototypal inheritance, or any prototype juggling for that matter. It is good to know about it, to read and work on others code, but we can build great JavaScript software without ever having to take any prototype into account explicitly.
A thing worth expressing explicitly is that we no longer need the keyword this in the factory pattern. The workings of that keyword can be rather confusing in JavaScript at times and therefore a source of bugs. It is actually a good rule to never use this, it will help in moving over to the functional paradigm. Removing this will namely also remove classes, constructors, binding, and juggling around different this in some that or self as seen here and there.

Functional Style
------------------------

It is a really good general idea in programming to always start with the simplest implementation first and move to more complex patterns only as needed. This means pure functions as the first approach, and a class would actually be the last resort (if you really ever need one).
If you’re new to the concept of pure functions, they are basically defined by (1) having no side effects and (2) their return value only depends on the given input arguments.
Using mainly pure functions leads to the separation of operations and data — the perhaps most apparent structural aspect of Functional Programming that differs heavily from Object Oriented Programming where those 2 are tightly coupled.
Another consequence of pure functions is that we will not be mutating any data — everything in FP land is going to be immutable (at least treated as). (There are exceptions, but being firm with this rule in the beginning is going to help in shifting our way of thinking into functional style, and reap the benefits).
Armed with the concept and understanding of pure functions, let’s start over and try to code our Circle objects again from scratch. We first write a pair of helpers for doing immutable updates followed by our circle computations — all pure:
```
// Circle data object creator
const circle = (pos = [0, 0], r = 0) => ({ pos, r, hits: 0 });

// Immutable-updates helpers
const incHits = obj => ({ ...obj, hits: (obj.hits || 0) + 1 });
const setPos = (obj, pos = [0, 0]) => ({ ...obj, pos });

// Circle computations
const area = r => r ** 2 * Math.PI;

const circlesIntersect = ({ r: r1, pos: [x1, y1] }, { r: r2, pos: [x2, y2] }) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) - r1 - r2 < 0;

const intersect = (c1, c2) => {
  const hit = circlesIntersect(c1, c2);
  return hit ? [hit, incHits(c1), incHits(c2)] : [hit, c1, c2];
};
```
Since this looks so different from the previous patterns — some general comments about functional style:
As a general rule, we separate computations from data.
Instead of functions most often being bound inside objects, we make sets of self standing functions that can operate on different objects or data.
The functions do not mutate any data or have any other side effects (1st rule of pure functions).
The functions don’t have any outside scope or context, but instead operate only on the incoming arguments (2nd rule of pure functions).
Since we want our data to get updated in certain ways, though being treated as immutable, we include in our set of pure functions a couple of helpers for making those updates, using ES6 spread operator (incHits & setPos above).
Always using arrow functions can be a good habit since all simple functions then become more declarative (no imperative body) and it also makes it easier to refactor a function to point-free style (e.g. made through composition).
ES6 destructuring provides a way to make a form of pattern matching on the incoming argument(s), unpacking only exactly what we need.
Notice how our intersect function now returns new updated copies of the incoming objects.
Using the above code directly in practice means holding and managing the data, since that is now outside of the above functionality. And so far we don’t have any way of enforcing immutability, so mutating our circles is unfortunately possible (c1.hits = 4; below). But if we by convention (or by some immutability enforcement, discussed later) never mutate our state/circles then shared state will not mutate(!), demonstrated by the c2ref below.

How to use it
```
let c1 = circle([2.5, 0], 1.5);
let c2 = circle([-2, 0], 2);
const c2ref = c2; // Use a reference to c2 at this point in time

area(c1.r); // -> 7.0685834705770345
area(c2.r); // -> 12.566370614359172

let hit;
[hit, c1, c2] = intersect(c1, c2);
hit; // -> false
c1.hits; // -> 0

c1 = setPos(c1, [1, 0]);
[hit, c1, c2] = intersect(c1, c2);
hit; // -> true
c1.hits; // -> 1
c2.hits; // -> 1

c2ref.hits; // -> 0. The ref is pointing to the initial c2

c1.hits = 4;
c1.hits; // -> 4. This is not great. Mutation is possible.
```
The state, our circles, are just serializable objects — nothing fancy, just pure data. And they need to be replaced by new updated clones at every step that should alter any state. If we store and use a reference to a state, it will be the state at the point in time when it was taken as a reference, that object will never change. This means that we have eliminated shared state mutation, which is a good thing.
But what the heck is this kind of syntax: [hit, c1, c2] = intersect(c1, c2);? — It is just destructuring again but for an array and into existing variables created with let. We are just matching the output of intersect and directly using it in assignments.

Functional Style Factory
-----------------------------------
I have been repeating in the previous patterns that functions and calculation should be extracted out into generic utilities, striving to make our code in general more reusable, DRY and testable. Well, now we come from the complete opposite direction and could instead easily wrap the keeping of a state together with the use of our pure functions from above, into a factory:
```
const makeCircle = (pos = [0, 0], r = 0) => {
  let state = circle(pos, r);
  return {
    getState: () => state,
    incHits: () => (state = incHits(state)),
    setPos: pos => (state = setPos(state, pos)),
    area: () => area(r),
    intersect: c2 => {
      let hit;
      [hit, state] = intersect(state, c2.getState());
      if (hit) c2.incHits();
      return hit;
    },
  };
};
```
We have kind of gone full circle now, haven’t we? We have a factory which only job is to be stateful (keep a state over time), and otherwise “tunnel” calls to external utilities. Using this factory is almost exactly the same as with the previous factory pattern above, so I won’t repeat that code (the only difference is c1.getState().hits instead of c1.getHits() although we could of course make a getHits function in this factory as well).
Regarding reuseability, extendability and testability — this factory has all the benefits of the previous factory example together with some of the benefits of the above functional style pattern.
What can be noticed however is that we introduce some lines of logic due to the nature of intersect, namely that such operation might not be at the right level here — it needs to affect multiple circles. Could we find a more powerful way to handle state, as a collection?
It’s common in JavaScript that mutations are avoided by convention, using certain patterns (like ES6 spread), or some of the very many libraries, where some interesting examples are:
Redux
XState
Ramda
Lodash/fp
immutability-helper
timm
There are however ways to block mutation of state, where perhaps most notably Immer is a good example. A much simpler one is Icepick. It is still more common for immutability to be maintained by convention with structural patterns and with the help of linting (static code analysis).
Since I don’t want to mix in and favor any library in this guide , I would instead like to show you that we can stay in native JavaScript and pretty easily build a tiny bit of code to get a Redux-like immutable state handler. This below state manager is however not a suggested piece of code to use in a project. You should evaluate some of the libraries above or any other state management package with an immutable style and use that. (My personal favourite is Ramda, in combination with Redux or XState for bigger applications.)
With that said — let’s see how a small piece of native JavaScript can combine enforced immutability and a tiny Redux-like state handler. This will give us a store that updates by dispatching actions through a reducer.

Functional Style with Immutable Store
----------------------------------------------------
First we make use of the Object.freeze method and write a helper for freezing (making immutable) complex data structures, deepFreeze. Then we also define a super-simple Redux-like store creator, createStore:
```
const deepFreeze = item => {
  const complex = Object(item) === item;
  if (Object.isFrozen(item) || !complex) return item;
  Object.values(item).forEach(deepFreeze);
  return Object.freeze(item);
};

const createStore = (initState = {}, reducer) => {
  let state = deepFreeze(initState);
  return {
    getState: key => (key ? state[key] : state),
    dispatch: action => (state = deepFreeze(reducer(state, action))),
  };
};
```
deepFreeze is a recursive function where if the incoming data is a non-primitive that is not already frozen, we deepFreeze it. Our createStore function takes an initialState and a so called reducer that can, given a state, return a new altered state according to “actions”. createStore then returns a way to dispatch actions (send action objects to our reducer) and a getState to, at any point in time, get hold of our current state (which can not be mutated due to it being frozen).
An interesting reflection on createStore is that it is actually very similar to our “Functional Style Factory” wrapper function above, but you could call this one a generalized factory wrapper. They both keep a state locally and privately, and they both return an object with methods both for retrieving state and for making state updates. Even without deepFreeze — using only dispatch to alter state ensures immutability.
The reducer we need for our circles is something like this (using again our previous update helpers setPos and incHits):

```
const reducer = (state, action) => {
  const actions = {
    move: ({ id, payload }) => ({ ...state, [id]: setPos(state[id], payload) }),
    hit: ({ id1, id2 }) => ({
      ...state,
      [id1]: incHits(state[id1]),
      [id2]: incHits(state[id2]),
    }),
  };
  return actions[action.type](action);
};
```
An action is an object with a type that matches a defined one, and arguments in some way that fits each action (a common convention is to always use payload, but I’m free-styling a bit above). Yes, I know, usually switch statements are used in reducers, but I have a stupid personal dislike to them and often prefer alternative patterns, for example the strategy pattern.
Now we can use the above 3 new functions in combination, in order to get our immutable circles example:
```
const initialState = {
  1: circle([2.5, 0], 1.5),
  2: circle([-2, 0], 2),
};
const { getState, dispatch } = createStore(initialState, reducer);

area(getState(1).r); // -> 7.0685834705770345;
area(getState(2).r); // -> 12.566370614359172;
const [hit] = intersect(getState(1), getState(2));
hit; // -> false
if (hit) dispatch({ type: 'hit', id1: 1, id2: 2 });
getState(1).hits; // -> 0

dispatch({ type: 'move', payload: [1, 0], id: 1 });
const [hit2] = intersect(getState(1), getState(2));
hit2; // -> true
if (hit2) dispatch({ type: 'hit', id1: 1, id2: 2 });
getState(1).hits; // -> 1
getState(2).hits; // -> 1

initialState[1].hits = 4; // -> THROWS!
getState(1).hits = 4; // -> THROWS!
getState(1).hits; // -> 1
```
With our reducer and an initialState, createStore gives us getState that we call whenever we want to use parts of our state, and dispatch that we call whenever we want to change our state. With our built in deepFreeze we block any direct attempt to mutate our state.
On the usage side of a pattern like this we haven’t reduced the lines of code, rather the opposite. But this kind of pattern is meant instead to keep things streamlined and less error prone as projects grow.






  