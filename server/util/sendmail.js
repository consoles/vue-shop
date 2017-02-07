/**
 * Created by consoles on 16-5-11.
 */
'use strict'

const nodemailer = require("nodemailer")

let smtpTransport = nodemailer.createTransport("SMTP",{
  host: "smtp.qq.com",
  secureConnection: true, // use SSL
  port: 465, // SMTP 端口
  auth: {
    user: "1362955042@qq.com",
    pass: "yourpassword"
  }
})

let mailOptions = {
  from: "consoles <1362955042@qq.com>",
  to: "1362955042@qq.com, gaopengfei0719@foxmail.com,249763824@qq.com", // can be split with comma
  subject: "这是测试邮件的标题", // the title of the mail
  html: "<b>thanks a for visiting!</b> <a href='https://github.com/consoles'>我的github</a>" // html 内容
}

smtpTransport.sendMail(mailOptions, function(err, response){
  if (err) throw Error(err)

  console.log("Message sent: " + response.message)
  smtpTransport.close()
})
