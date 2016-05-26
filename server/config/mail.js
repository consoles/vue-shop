/**
 * Created by consoles on 16-5-11.
 */

const nodemailer = require("nodemailer")

const config = require('./config')

module.exports = nodemailer.createTransport('SMTP', config.mail)
