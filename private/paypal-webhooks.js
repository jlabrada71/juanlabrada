const axios = require('axios')
const qs = require('qs')

const data = {
  grant_type: 'client_credentials'
}

const getAccessToken = async () => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Credentials': true
    },
    data: qs.stringify(data),
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET_KEY
    },
    url: 'https://api.sandbox.paypal.com/v1/oauth2/token'
  }

  const response = await axios(options)
  console.log('******************')
  console.log('get accessToken')
  console.log(response)
  return response.data.access_token
}

async function registerWebhook () {
  const accessToken = await getAccessToken()
  const registerData = {
    url: 'https://juanlabrada.herokuapp.com/api/v1/paypalipn',
    event_types: [
    //  { name: 'PAYMENT.AUTHORIZATION.CREATED' },
    //  { name: 'PAYMENT.AUTHORIZATION.VOIDED' },
    //  { name: 'PAYMENT.ORDER.CANCELLED' },
      { name: 'PAYMENT.ORDER.CREATED' }
      //  { name: 'PAYMENT.CAPTURE.COMPLETED' },
      //  { name: 'PAYMENT.CAPTURE.DENIED' },
      //  { name: 'PAYMENT.CAPTURE.REFUNDED' },
      //  { name: 'PAYMENT.CAPTURE.PENDING' },
      //  { name: 'PAYMENT.CAPTURE.REVERSED' },

      //  { name: 'CUSTOMER.DISPUTE.CREATED' },
      //  { name: 'CUSTOMER.DISPUTE.RESOLVED' },
      //  { name: 'CUSTOMER.DISPUTE.UPDATED' },

      //  { name: 'INVOICING.INVOICE.CREATED' },
      //  { name: 'INVOICING.INVOICE.CANCELLED' },
      //  { name: 'INVOICING.INVOICE.PAID' },
      //  { name: 'INVOICING.INVOICE.REFUNDED' },
      //  { name: 'INVOICING.INVOICE.SCHEDULED' },
      //  { name: 'INVOICING.INVOICE.UPDATED' },

      //  { name: 'CHECKOUT.ORDER.COMPLETED' },
      //  { name: 'CHECKOUT.ORDER.APPROVED' },

      //  { name: 'PAYMENT.SALE.COMPLETED' },
      //  { name: 'PAYMENT.SALE.DENIED' },
      //  { name: 'PAYMENT.SALE.PENDING' },
      //  { name: 'PAYMENT.SALE.REFUNDED' },
      //  { name: 'PAYMENT.SALE.REVERSED' },

    //  { name: 'VAULT.CREDIT-CARD.CREATED' },
    //  { name: 'VAULT.CREDIT-CARD.DELETED' },
    //  { name: 'VAULT.CREDIT-CARD.UPDATED' },
    ]
  }

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      //  'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${accessToken}`
    },
    data: JSON.stringify(registerData),

    url: 'https://api.sandbox.paypal.com/v1/notifications/webhooks'
  }

  const response = await axios(options)
  console.log('******************')
  console.log('create webhooks')
  console.log(JSON.stringify(response))
}

async function listWebhooks () {
  const accessToken = await getAccessToken()

  const options = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      //  'Access-Control-Allow-Credentials': true,
      Authorization: `Bearer ${accessToken}`
    },

    url: 'https://api.sandbox.paypal.com/v1/notifications/webhooks'
  }

  const response = await axios(options)
  console.log('******************')
  console.log('list webhooks')
  console.log(JSON.stringify(response.data, null, 2))
}

try {
  // if the url is used by an existing event the service will return error 404
  // if using that url is mandatory existing event should be deleted first.
  // registerWebhook().then(() => {
  // console.log('done');
  // });
  listWebhooks().then(() => {
    console.log('done')
  })
} catch (e) {
  console.log(e)
}
