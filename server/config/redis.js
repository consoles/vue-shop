/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const redis = require('redis')

const config = require('./config')

module.exports = redis.createClient(config.redis)
