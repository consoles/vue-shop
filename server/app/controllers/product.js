/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')
const redisClient = require('../../config/redis')
const _ = require('lodash')

const REDIS_PRODUCT_PREFIX = 'product_'

const Product = mongoose.model('Product')

let getProductFromMongo = (id,callback) => {
  console.log('#getProductFromMongo')
  Product.findOne({_id:id})
    .exec((err,doc) => {
    if(doc){
      redisClient.set(`${REDIS_PRODUCT_PREFIX + id}`,JSON.stringify(doc))
      console.log('[save mongo data to redis]')
    }
    return callback && callback(err,doc)
  })
}

let updateProductInRedis = (product,callback) => {
  console.log('#updateProductInRedis')
  if(product){
    redisClient.set(`${REDIS_PRODUCT_PREFIX + id}`,JSON.stringify(product))
  }
  return callback && callback(product)
}

let invalidProductInRedis = (id,callback) => {
  console.log('#invalidProductInRedis')
  if(id){
    redisClient.set(`${REDIS_PRODUCT_PREFIX + id}`,'')
  }
}

let getProductFromRedis = (id,callback) => {
  console.log('#getProductFromRedis')
  redisClient.get(`${REDIS_PRODUCT_PREFIX + id}`, (err, value) => {
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
    let product = new Product(req.body)
    product.save(err => {
      if (err) return next(err)
      return res.json(product)
    })
  },
  list: function(req, res, next) {
    let pagesize = parseInt(req.query.pagesize, 10) || 10
    let pagestart = parseInt(req.query.pagestart, 10) || 1
    Product
      .find()
      .skip((pagestart - 1) * pagesize)
      .limit(pagesize)
      .exec((err, docs) => {
      if (err) return next(err)
      return res.json(docs)
    })
  },
  getById: function(req, res, next, id) {
    console.log(id)
    if (!id) return next(new Error('Product not found'))
    getProductFromRedis(id, (err, doc) => {
      if (err) return next(err)
      if (!doc) {
      getProductFromMongo(id, (err, doc) => {
        if (err) return next(err)
        if (!doc) return next(new Error('Product not Found'))
      req.product = doc
      return next()
    })
    } else {
      req.product = doc
      return next()
    }
  })
  },
  get: function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin','*')
    return res.json(req.product)
  },
  update:function(req,res,next){
    // update db then update redis
    let newProduct = req.product
    let uid = newProduct._id
    Product.findById(uid,function(err,product){
      if(err) throw Error(err)
      let _Product = _.extend(product,newProduct)
      _Product.save(function(err,product){
        console.log('#updateProductInMongo')
        if(err) throw Error(err)
        updateProductInRedis(product,function(product){
          return res.json(product)
        })
      });
    })
  },
  delete:function(req,res,next){
    let product = req.product
    let pid = product._id
    Product.remove({_id:pid},function(err,product){
      console.log('#deleteProductInMongo')
      if(err) throw Error(err)
      invalidProductInRedis(pid,function(id){
        res.json({success:true,msg:`delete product ${id} success`})
      })
    })
  },
  search: function (req,res,next) {
    let q = req.query.q
    let pagesize = parseInt(req.query.pagesize, 10) || 5
    let pagestart = parseInt(req.query.pagestart, 10) || 0
    let index = pagestart * pagesize
    // 模糊查询
    Product.find({title:new RegExp(q + '.*', 'i')})
      .exec(function (err,products) {
        if (err) throw Error(err)
        let results = products.slice(index,index + pagesize)
        console.log('模糊查询商品:' + products)
        res.json(results)
      })
  }
}
