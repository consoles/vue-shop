/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  image: {
    type: String,
    trim:true,
    required: true
  },
  desc:String,
  price:{
    type:Number,
    required:true
  },
  zone:String,
  soldOut:Number,
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

ProductSchema.statics = {
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

let Product = mongoose.model('Product', ProductSchema)
