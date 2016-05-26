/**
 * Created by consoles on 16-5-20.
 */
'use strict'

const QRCode = require('qrcode')

module.exports = {
  qrcode: function(req,res,next){
    let url = req.query.url
    QRCode.toDataURL(url,function(err,data){
      if(err) throw Error(err)
      res.end(data)
    })
  }
}
