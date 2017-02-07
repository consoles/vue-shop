'use strict'

const fs = require('fs')
const path = require('path')

const request = require('request')
const _ = require('lodash')
const Random = require('mockjs').Random
const uuid = require('node-uuid')

const PROJECT_PATH = path.join(__dirname, '../../')

var insertProducts = require('./db').insertProducts

const LIMIT = 100
const START = 0

// crawl products from xiaotaojiang

const DOMAIN = 'http://app.xiaotaojiang.com'

let url = `${DOMAIN}/api-v2/categories/110005/products?sort=hot&limit=${LIMIT}&start=${START}&sortKey=hot`

var options = {
  url: url,
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
  }
}

let genUUIDFilename = () => uuid.v4().replace(/-/g, '') + '.jpg'

function requestCallback(error, response, body) {
  if (!error && (response.statusCode == 200 || response.statusCode == 304)) {
    let data = JSON.parse(body).data;
    let items = []
    // get original data,it cached in array items
    _.each(data,function (item) {
      let d = {}
      d.title = item.name
      d.image = DOMAIN + item.coverImage
      d.desc = item.originalName
      d.price = item.price
      d.zone = Random.city()
      d.soldOut = Random.natural(25,2568)
      d.meta = {}
      d.meta.createAt = Random.date()
      d.meta.updateAt = Random.date()
      items.push(d)
    })
    // change products image,request the image url then pipe it to local
    // in this step we can store it to mongodb
    console.time('download resource')
    let item = items[0]
    _.each(items,function(item){
      let filename = genUUIDFilename()
      let imageUrl = item.image
      console.log('开始下载图片:' + imageUrl)
      request(item.image).pipe(fs.createWriteStream(path.join(PROJECT_PATH ,`dist/upload/${filename}`)))
      item.image = '/upload/' + filename
    })
    console.log(`一共抓取${data.length}个数据`)
    console.log('存入mongo')
    insertProducts(items,function(err,result){
      if(err) throw Error(err)
      console.log('成功插入' + result.result.n + '条记录')
      console.timeEnd('download resource')
    })
  } else {
    throw Error('please check your network and firewall')
  }
}

request(options, requestCallback);
