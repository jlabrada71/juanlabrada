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
