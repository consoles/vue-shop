/**
 * Created by consoles on 16-5-20.
 */

'use strict'

const QRCodeController = require('../controllers/qrcode')

module.exports = app => {
  app.route('/api/qrcode')
    .get(QRCodeController.qrcode)
}
