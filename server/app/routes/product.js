/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const ProductController = require('../controllers/product')

module.exports = app => {
  app.route('/api/products')
    .get(ProductController.list)
    .post(ProductController.create)

  app.route('/api/products/:pid')
    .get(ProductController.get)
    .put(ProductController.update)
    .delete(ProductController.delete)

  app.route('/api/product/search')
    .get(ProductController.search)

  app.param('pid',ProductController.getById)
}
