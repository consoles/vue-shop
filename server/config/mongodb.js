/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')

const config = require('./config')

module.exports = function(){
  let db = mongoose.connect(config.mongodb)
  // load db models
  require('../app/models/user')
  require('../app/models/product')
  require('../app/models/article')
  return db
}
