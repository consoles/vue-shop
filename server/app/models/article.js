/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')

let ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: Date,
    default: Date.now()
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

ArticleSchema.statics = {
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

let Article = mongoose.model('Article', ArticleSchema)
