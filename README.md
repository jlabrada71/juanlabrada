### Run production code locally 
- npm run build
- cd dist
- python3 -m http.server

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### SSL/TCL certificates
There is a certificate generated for *.juanlabrada.com for cloudflare.com
but is not in use since heroku requires to have a hobbits or professional account in order to allow for certificates.
Certificate files:
```
juanlabrada.com.pem
juanlabrada.com.key
```

### Add support for Storybook
npx -p @storybook/cli sb init

### Add support for vuetify-storybook
vue add vuetify-storybook

### MongoDB URL 
mongodb://<user>:<password>@<server>:<port>/<authenticationdatabase>

if no authentication database is provided then default admin is used.

example:
mongodb://juanlabrada:Cobian98@localhost:27017/

## when there is an authentication error with mongodb:
 - check the user and password 
 - check the user role and database 
 - check the authentication database 


### user registration, authentication, autorization and apikeys
## Setup
The server-setup.js creates the initial conditions for all the services to work.
- it creates the main api-key
- it creates the admin user
It's important to get the output since it is the api key that needs to be use for the admin services.


## Architecture
HOME: implements both UI and API, private implements only admin services (this runs locally)
UI -------- API ------- MongoDB server 
            Implements
            Business Services
The user logs using the Authentication API which returns back an access token
The access token should be provided afterward when calling different services.
The services requiring authorization validate the access token using the authorizer service.
The connection between UI and API is TLS 1.3  
The UI has to parts Client-Server
The connection between Server and API requires an API Key
The user authentication service doesn't requires API key
The services require access token. The api key is required for accessing 3rd party services.
The access point for access token is different than the access point for api key.
An access key grants access to a single service with the granted resource permissions.
An access Token grants access to various services with granted resource permissions for each service.

## Authorization setup
On the UI indicate that a route requires authorization by adding to the route:
  meta: {
+        requiresAuth: true,
+      },
On the API indicate that a route requires authorization by adding the 'authorizer' middleware to the route.

TODO: implement role base authorization
TODO: implement token expire time
TODO: implement refreshToken
# Resource Permissions
- read
- write
- delete


 ## api key


 # the user model
 The user data is used for authentication and authorization
 The user has:
 - userId
 - username
 - email

# customer model 
The customer data is used for business model

# createAccessToken for user
- creates a random signing key
- creates a refreshId using the userId and the signing key
- sets the user's refreshKey as a random salt
- creates a jwt token from the user, the signing key and an expiration date
- creates a refreshToken
- stores everything in the database
- returns the userId, accessToken and refreshToken object

TODO - script for creating accessToken
TODO - improve security by sending the password hashed instead of plain text. Sending a salt to have the password hashed in the client before sending to the server.

# validateAccessToken
- searches the repository for the access token
- verifys the accessToken using the signingKey
- returns the verified access token
TODO - implement verification error 
TODO - implement verification script
TODO - unify terms token and accessToken

# createApiKey
- creates a random signing key
- creates a refreshId using the apiId and the signing key
- sets the api's refreshKey as a random salt
- creates a jwt token (new apiKey) from the api object, the signing key and an expiration date
- creates a refreshToken
- stores everything in the database
- returns the apiKey, refreshApiKey object

TODO - script for creating apiKey 

# validateApiKey
- searches the repository for the apiKey
- verifies the apiKey using the signingKey
- returns the verified apiKey
TODO - implement verification error 
TODO - implement verification script


# register user

- hashes the password
- stores the username, and hashed password
help script/post-user.sh
# update password
- hashes the new password
- updates the user password

# isPasswordAndUserMatch
- searches the user in the repository 
- gets the password salt
- hashes the password sent with the salt
- if they match the user data is returned (without password)

## How to secure an endpoint
Import the authorizer.
Add the authorizer middleware to the route.

```
const authorizer = require('../auth/authorizer')
router.get('/token-validation', authorizer, async (req, res, next) => {

  res.status(201).send('token ok')

});
```

# Test api-key validation
curl  -H "Authorization: ApiKey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNvbS1qdWFubGFicmFkYS1hdXRoZW50aWNhdGlvbi1zZXJ2aWNlIiwiY3JlYXRpb25EYXRlIjoxNjM2ODE3MDg1MTM5LCJyZWZyZXNoS2V5IjoicGpYQ3l5UktiYlFHd0Zmc2FXVXVSUT09IiwianRpIjoiNjRlZTNlODMtNjg3ZS00MTI0LWE5ZmItZDA0ZTg0ZmM4OTIyIiwiaWF0IjoxNjM2ODE3MDg1fQ.jltt3SO2sErna6Xpu-mxBmGHesRr0ZjJSttaGYqr3bU" http://localhost:3000/api/v1/test/api-validation

# Test access token validation
Get an access token from authentication
curl -H "Content-Type: application/json" -d '{"user":{"username":"jlabrada@yahoo.com", "password": "Cobian98"}}' 'http://localhost:3000/api/v1/authentication'

use the access token to access the resources
curl -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlcnJvciI6MCwidXNlcklkIjoiNjE4ZmM0Yzk4OTU0NTBmMWI1YTgyNWI5IiwicHJvdmlkZXIiOiJ1c2VybmFtZSIsIm5hbWUiOiJ1bmRlZmluZWQgdW5kZWZpbmVkIiwicmVmcmVzaEtleSI6Imx6aTRrMzJOaHAvQzJ5YUlZUFdCQ2c9PSIsImp0aSI6IjY1YTMxMzhlLTA4NTQtNGNlNi1iYjAwLWQ0MjFhZGFmZGQ4MSIsImlhdCI6MTYzNjkwMjI2NX0.Dpd_GjvTuFV8DKWMfACSGH23D9MLguD4ZV6lb75q2p8" http://localhost:3000/api/v1/test/token-validation

# How to upload an image
  - put the image in static-files-github folder
  - commit the changes
  - access the images on https://jlabrada71.github.io/<image route>
  - this solution is not intuitive but ensures image persistence

# How Image downloading works
- there is a module 'zip-images' that is run once a day that zips the images folder
- There is an endpoint for retrieving today's zipped folder.

# Firebase hosting
https://juanlabrada.web.app/
experiments/firebase/hosting

# Firebase webstorage
This is to store uploaded files permanently
experiments/firebase/web-storage


