/**
 * Created by consoles on 16-5-9.
 */

'use strict'

module.exports = {
  port:3000,
  mongodb:'mongodb://localhost/shop',
  redis:'redis://localhost:6379',
  mail:{
    host: "smtp.qq.com",
    secureConnection: true, // use SSL
    port: 465, // SMTP 端口
    auth: {
      user: "1362955042@qq.com",
      pass: "yourpassword"
    }
  }
}
