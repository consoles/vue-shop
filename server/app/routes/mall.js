/**
 * Created by consoles on 16-5-16.
 */

'use strict'

const MallController = require('../controllers/mall')

module.exports = app => {
  app.route('/api/mall')
    .get(MallController.listProducts)
}
