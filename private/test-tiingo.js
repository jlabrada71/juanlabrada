const request = require('request')

const requestOptions = {
  url: 'https://api.tiingo.com/tiingo/daily/aapl/prices?startDate=2019-01-02&token=a689597767d34463f85ae9eb96a5f1ba6fc70ec5',
  headers: {
    'Content-Type': 'application/json'
  }
}

console.log('calling request')
request(requestOptions,
  (error, response, body) => {
    console.log('error:')
    console.log(error)
    console.log('response')
    console.log(JSON.stringify(body, null, 2))
  })
