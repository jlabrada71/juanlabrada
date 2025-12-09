
const nodemailer = require('nodemailer')
const Mailer = require('./lib/mails/mailer')

// async..await is not allowed in global scope, must use a wrapper
async function main () {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount()
  const mailer = new Mailer({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false // true for 465, false for other ports
  }, testAccount)

  // send mail with defined transport object
  const result = await mailer.send({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  })

  console.log('Message sent: %s', result.info.messageId)

  console.log('Preview URL: %s', result.previewUrl)
}

main().then(() => {
  console.log('successfully sent')
}).catch(console.error)
