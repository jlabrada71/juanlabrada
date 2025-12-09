const nJwt = require('njwt')
const secureRandom = require('secure-random')

describe('Create Jwt', () => {
  // Documentation https://github.com/jwtk/njwt
  it(' creates, compacts, encode, decode, verifys', () => {
    const signingKey = secureRandom(256, { type: 'Buffer' }) // Create a highly random byte array of 256 bytes

    const claims = {
      iss: 'http://myapp.com/', // The URL of your service
      sub: 'users/user1234', // The UID of the user in your system
      scope: 'self, admins'
    }

    const jwt = nJwt.create(claims, signingKey)
    expect(jwt.body.iss).toBe('http://myapp.com/')
    expect(jwt.body.scope).toBe('self, admins')
    expect(jwt.body.sub).toBe('users/user1234')
    expect(jwt.header.alg).toBe('HS256')
    expect(jwt.header.typ).toBe('JWT')

    // create the token to be sent to the user
    const token = jwt.compact()
    // expect(token).toBe('JWT');

    // convert the signing key into a string for the database.
    const base64SigningKey = signingKey.toString('base64')

    // convert back to buffer when retrived from database.
    const newSigningKey = Buffer.from(base64SigningKey, 'base64')

    try {
      const verifiedJwt = nJwt.verify(token, newSigningKey)
      expect(verifiedJwt.body.iss).toBe(jwt.body.iss)
    } catch (e) {
      console.log(e)
    }
  })
})
