/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')
const uuid = require('node-uuid')
const _ = require('lodash')

const redisClient = require('../../config/redis')
const smtpTransport = require('../../config/mail')

const REDIS_USER_PREFIX = 'user_'

const User = mongoose.model('User')

let getUserFromMongo = (id,callback) => {
  console.log('#getUserFromMongo')
  User.findOne({_id:id})
    .exec((err,doc) => {
    if(doc){
      redisClient.set(`${REDIS_USER_PREFIX + id}`,JSON.stringify(doc))
      console.log('[save mongo data to redis]')
    }
    return callback && callback(err,doc)
  })
}

let updateUserInRedis = (user,callback) => {
  console.log('#updateUserInRedis')
  if(user){
    redisClient.set(`${REDIS_USER_PREFIX + id}`,JSON.stringify(user))
  }
  return callback && callback(user)
}

let invalidUserInRedis = (id,callback) => {
  console.log('#invalidUserInRedis')
  if(id){
    redisClient.set(`${REDIS_USER_PREFIX + id}`,'')
    callback && callback(id)
  }
}

let getUserFromRedis = (id,callback) => {
  console.log('#getUserFromRedis')
  redisClient.get(`${REDIS_USER_PREFIX + id}`, (err, value) => {
    if (err) return callback(err, null)
    if (!value) {
      console.error('[doc not in redis]')
      return callback(null, null)
    }
    try {
      value = JSON.parse(value)
    } catch (e) {
      return callback(err, null)
    }
    console.info('[find doc in redis] => ', value)
    return callback(null, value)
  })
}

module.exports = {
  create: function(req, res, next) {
    let user = new User(req.body)
    let email = user.username
    let vcode = uuid.v4()
    user.vcode = vcode
    console.log(user)
    user.save(err => {
      if (err) return next(err)

      let mailOptions = {
        from: 'consoles <1362955042@qq.com>',
        to: `${email}`,
        subject: '账号激活邮件',
        html: `点击<a href="http://127.0.0.1/api/user/active?vcode=${vcode}">此处</a>激活您的账号`
      }

      smtpTransport.sendMail(mailOptions, function(err, response){
        if (err) return console.error(err)
        console.log("Message sent: " + response.message)
        smtpTransport.close()
      })
      return res.json(user)
    })
  },
  active: function (req,res,next) {
    // 账号的激活可考虑将未激活的用户放入redis,设置过期时间
    let vcode = req.query.vcode
    console.log('激活码:' + vcode)
    User.update({vcode:vcode},{$set:{vcode:'',active:true}},function (err,user) {
      if(err) throw Error(err)
      // 回调函数中的是更新的条数
      if (!user) return res.json({success:false,msg:'该用户未注册!'})
      return res.json(user)
    })
  },
  list: function(req, res, next) {
    let pagesize = parseInt(req.query.pagesize, 10) || 10
    let pagestart = parseInt(req.query.pagestart, 10) || 1
    User
      .find()
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec((err, docs) => {
        if (err) return next(err)
        return res.json(docs)
      })
  },
  getById: function(req, res, next, id) {
    if (!id) return next(new Error('User not found'))
    getUserFromRedis(id, (err, doc) => {
      if (err) return next(err)
      if (!doc) {
        getUserFromMongo(id, (err, doc) => {
          if (err) return next(err)
          if (!doc) return next(new Error('User not Found'))
          req.user = doc
          return next()
        })
      } else {
        req.user = doc
        return next()
      }
    })
  },
  get: function(req, res, next) {
    return res.json(req.user)
  },
  update:function(req,res,next){
    // update db then update redis
    let newUser = req.user
    let uid = newUser._id
    User.findById(uid,function(err,user){
      if(err) throw Error(err)
      let _user = _.extend(user,newUser)
      _user.save(function(err,user){
        console.log('#updateUserInMongo')
        if(err) throw Error(err)
        updateUserInRedis(user,function(user){
          return res.json(user)
        })
      });
    })
  },
  delete:function(req,res,next){
    let user = req.user
    let uid = user._id
    User.remove({_id:uid},function(err,user){
      console.log('#deleteUserInMongo')
      if(err) throw Error(err)
      invalidUserInRedis(uid,function(id){
        res.json({success:true,msg:`delete user ${id} success`})
      })
    })
  },
  login: function(req,res,next) {
    let _user = new User(req.body)
    let username = _user.username
    let password = _user.password
    User.findOne({username:username},function (err,user) {
      if(err) throw Error(err)
      if(!user) return res.json({success:false,msg:'用户名不存在或者被冻结'})
      user.comparePassword(password,function(err,isMatched){
        console.log(isMatched)
        if(err) res.json(err)
        if(isMatched){
          res.json({success:true,msg:'登陆成功!',logined:true})
        } else {
          res.json({success:false,msg:'登陆失败!错误的用户名或者密码!',logined:false})
        }
      })
    })
  }
}
