/**
 * Created by consoles on 16-5-9.
 */

'use strict'

let config = require('./env/development')

if(process.env.NODE_ENV)
  config = require(`./env/${process.env.NODE_ENV}`)

module.exports = config
