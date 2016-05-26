/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const logger = require('morgan')

module.exports = function(){
  console.info('init express ...')
  let app = express()

  app.use(bodyParser.json())
  app.use(express.static('./public'))

  var env = process.env.NODE_ENV || 'development'
  if ('development' === env) {
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
  }

  app.use((req,res,next) => {
    req.models = app.get('models')
    next()
  })

  // coross domain middleware

  //app.use((req,res,next) => {
  //  res.header('Access-Control-Allow-Origin','*')
  //  res.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS')
  //  res.header('Access-Control-Max-Age',172800)
  //  next()
  //})

  // cors prefilight check
  // Chrome 在发送复杂请求的时候会首先发送一个OPTIONS请求,只有成功响应该请求,才会进行下一步的请求
  // ref: https://segmentfault.com/q/1010000005095024
  // ref: https://segmentfault.com/a/1190000000709909

  //app.use((req,res,next) => {
  //
  //  if(req.method === 'OPTIONS'){
  //    res.header('Access-Control-Allow-Origin','*')
  //    res.header('Access-Control-Allow-Methods','POST,GET,PUT,DELETE,OPTIONS')
  //    res.header('Access-Control-Request-Method','*')
  //    res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width, Content-Type, Accept, Authorization')
  //    res.header('Access-Control-Max-Age',172800)
  //    res.send(200)
  //  }
  //})

  // the code above does not work,the chrome will never send next really request,
  // the chrome throw a error 'provision header shown'
  // ref: https://cnodejs.org/topic/51dccb43d44cbfa3042752c8
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    if(req.method === "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else next()
  })

  // load route
  require('../app/routes/user')(app)
  require('../app/routes/product')(app)
  require('../app/routes/article')(app)
  require('../app/routes/mall')(app)
  require('../app/routes/qrcode')(app)

  app.use((req,res,next) => {
    res.status(404)
    return res.json('404 Not Found')
  })

  app.use((err,req,res,next) => {
    if(!err) return next()
    res.status(500)
    return res.json(err.message || 'Inner Server Error')
  })

  return app
}
