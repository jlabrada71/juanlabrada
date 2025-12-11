const Mailer = require('./mailer');

(async function test () {
  const message = {
    from: 'agile@juanlabrada.com',
    to: 'jlabrada@yahoo.com',
    subject: 'test email',
    //  replyTo: nodeMailerUser,
    //  html: applicationSubmit({name: name, brand: brand, accountId: accountId, paymentEmail: paymentEmail, date: date, currency: currency, type: typeOfAccount})
    text: 'This is a test'
  }

  const account = {
    user: 'agile@juanlabrada.com',
    pass: '8jpMV8QHUZuh'
  }

  const config = {
    host: 'smtp.zoho.com',
    port: 465,
    secure: true
  }

  const mailer = new Mailer(config, account)
  const result = await mailer.send(message)
  console.log(result)
})()
