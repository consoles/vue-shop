/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTORY = 5

const USER_ROLE = {
  NORMAL: 0,
  VERIFIED: 1,
  PROFESSION: 2,
  ADMIN: 10,
  SUPRE_ADMIN: 50
}

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  vcode:String,
  active:{
    type:Boolean,
    default:false
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: USER_ROLE.NORMAL
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

/**
 * save hook
 */
UserSchema.pre('save', function (next) {
  let user = this

  this.meta.updateAt = Date.now()
  if (this.isNew)
    this.createAt = this.meta.updateAt

  bcrypt.genSalt(SALT_WORK_FACTORY, function(err, salt){
    if(err) return next(err)
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatched) {
      if(err) return cb(err)
      cb(null, isMatched)
    })
  }
}

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this.findOne({_id: id}).exec(cb)
  }
}

let User = mongoose.model('User', UserSchema)
