/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/shop'
const collectionName = 'products'

exports.insertProducts = function(products,callback){
  MongoClient.connect(url,function(err,db){
    if(err) throw Error(err)
    let collection = db.collection(collectionName)
    collection.insertMany(products,function(err,result){
      if(err) throw Error(err)
      callback && callback(null,result)
      db.close()
    })
  })
}
