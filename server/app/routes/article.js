/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const ArticleController = require('../controllers/article')

module.exports = app => {
  app.route('/api/articles')
    .get(ArticleController.list)
    .post(ArticleController.create)

  app.route('/api/articles/:aid')
    .get(ArticleController.get)
    .put(ArticleController.update)
    .delete(ArticleController.delete)

  app.param('aid',ArticleController.getById)
}
