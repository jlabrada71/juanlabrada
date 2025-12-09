// server.js
const logger = require('morgan');
const AuthorizationService = require('./lib/auth/authorization-service');
const UserService = require('./lib/auth/user-service');
require('dotenv').config({ path: `${__dirname}/.env` });


async function createAuthenticationServiceApiKey() {
  const apiKeyData = {
    id: 'com-juanlabrada-test-authentication-service',
    creationDate: Date.now(),
  };

  const apiKey = await AuthorizationService.createApiKey(apiKeyData);
  console.log(apiKey);
}

async function createAdminUser() {
  const apiKeyData = {
    id: 'com-juanlabrada-test-authentication-service',
    creationDate: Date.now(),
  };

  const apiKey = await AuthorizationService.createApiKey(apiKeyData);
  console.log(apiKey);
}

async function createAdminUser() {
  const user = {
    username: 'jlabrada@yahoo.com',
    password: 'Cobian98',
  }
  const result = await UserService.register(user);
}

function setup() {
  createAuthenticationServiceApiKey()
    .then(() => createAdminUser().then(()=>console.log('done'))
    .catch((error) => console.log(error)));
}

setup();
