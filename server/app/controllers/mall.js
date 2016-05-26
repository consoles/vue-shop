/**
 * Created by consoles on 16-5-16.
 */

'use strict'

const request = require('request')
const _ = require('lodash')

module.exports = {
  listProducts: function (req, res, next) {
    let data = []
    for(let i = 0;i < 5;i++){
      data[i] = []
    }
    // 反向代理
    request('http://127.0.0.1/api/products?pagesize=80',function(err,response,body){
      if (!err && (response.statusCode == 200 || response.statusCode == 304)) {
        let data = JSON.parse(body)
        let arr = _.chunk(data,16) // 将一个数组分成多个数组,每个子数组有16个元素
        res.json(arr)
      } else {
        res.json({success:false,msg:'API请求错误!'})
      }
    })
  }
}
