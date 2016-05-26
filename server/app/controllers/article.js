/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const mongoose = require('mongoose')
const request = require('request')
const redisClient = require('../../config/redis')
const _ = require('lodash')

const REDIS_ARTICLE_PREFIX = 'article_'

const Article = mongoose.model('Article')

let getArticleFromMongo = (id,callback) => {
  console.log('#getArticleFromMongo')
  Article.findOne({_id:id})
    .exec((err,doc) => {
    if(doc){
      redisClient.set(`${REDIS_ARTICLE_PREFIX + id}`,JSON.stringify(doc))
      console.log('[save mongo data to redis]')
    }
    return callback && callback(err,doc)
  })
}

let updateArticleInRedis = (article,callback) => {
  console.log('#updateArticleInRedis')
  if(article){
    redisClient.set(`${REDIS_ARTICLE_PREFIX + id}`,JSON.stringify(article))
  }
  return callback && callback(article)
}

let invalidArticleInRedis = (id,callback) => {
  console.log('#invalidArticleInRedis')
  if(id){
    redisClient.set(`${REDIS_ARTICLE_PREFIX + id}`,'')
  }
}

let getArticleFromRedis = (id,callback) => {
  console.log('#getArticleFromRedis')
  redisClient.get(`${REDIS_ARTICLE_PREFIX + id}`, (err, value) => {
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
    let article = new Article(req.body)
    article.save(err => {
      if (err) return next(err)
      return res.json(article)
    })
  },
  list: function(req, res, next) {
    let pagesize = parseInt(req.query.pagesize, 10) || 10
    let pagestart = parseInt(req.query.pagestart, 10) || 1
    let api = `http://app.xiaotaojiang.com/api-v2/articles?start=${pagestart}&limit=${pagesize}`
    request.get(api,{json:true},function(err,obj,response){
      let articles = []
      _.each(response,function(data){
        let article = {}
        article.title = data.title
        article.image = data.avatar
        article.time = data.createdAt
        article.content = data.content
        articles.push(article)
      })
      res.json(articles)
    })
  },
  getById: function(req, res, next, id) {
    if (!id) return next(new Error('Article not found'))
    getArticleFromRedis(id, (err, doc) => {
      if (err) return next(err)
      if (!doc) {
      getArticleFromMongo(id, (err, doc) => {
        if (err) return next(err)
        if (!doc) return next(new Error('Article not Found'))
      req.article = doc
      return next()
    })
    } else {
      req.article = doc
      return next()
    }
  })
  },
  get: function(req, res, next) {
    return res.json(req.article)
  },
  update:function(req,res,next){
    // update db then update redis
    let newArticle = req.article
    let uid = newArticle._id
    Article.findById(uid,function(err,article){
      if(err) throw Error(err)
      let _Article = _.extend(article,newArticle)
      _Article.save(function(err,article){
        console.log('#updateArticleInMongo')
        if(err) throw Error(err)
        updateArticleInRedis(article,function(article){
          return res.json(article)
        })
      });
    })
  },
  delete:function(req,res,next){
    let article = req.article
    let aid = article._id
    Article.remove({_id:aid},function(err,article){
      console.log('#deleteArticleInMongo')
      if(err) throw Error(err)
      invalidArticleInRedis(uid,function(id){
        res.json({success:true,msg:`delete article ${id} success`})
      })
    })
  }
}
