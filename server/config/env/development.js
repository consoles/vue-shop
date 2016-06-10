/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const fs = require('fs')
const path = require('path')

const privateKey = fs.readFileSync(path.join(__dirname, '../ssl/server.key'), 'utf-8')
const certificate = fs.readFileSync(path.join(__dirname, '../ssl/server.crt'), 'utf-8')

module.exports = {
  port: 3000,
  sslPort: 3443,
  certificate: {
    key: privateKey,
    cert: certificate
  },
  mongodb: 'mongodb://localhost/shop',
  redis: 'redis://localhost:6379',
  mail: {
    host: "smtp.qq.com",
    secureConnection: true, // use SSL
    port: 465, // SMTP 端口
    auth: {
      user: "1362955042@qq.com",
      pass: "yourpassword"
    }
  }
}
