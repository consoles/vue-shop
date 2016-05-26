/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const express = require('./config/express')
const mongodb = require('./config/mongodb')

let db = mongodb()
let app = express()

module.exports = app
