'use strict'
import nodemailer from 'nodemailer'

export default class Mailer {
  constructor (config, account) {
    this.config = config
    this.account = account
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    })
  }

  async send (message) {
    const info = await this.transporter.sendMail(message)
    return { info, previewUrl: nodemailer.getTestMessageUrl(info) }
  }
}
