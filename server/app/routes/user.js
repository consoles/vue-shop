/**
 * Created by consoles on 16-5-9.
 */

'use strict'

const UserController = require('../controllers/user')

module.exports = app => {
  app.route('/api/users')
    .get(UserController.list)
    .post(UserController.create)

  app.route('/api/users/:uid')
    .get(UserController.get)
    .put(UserController.update)
    .delete(UserController.delete)

  app.route('/api/user/login')
    .post(UserController.login)

  app.route('/api/user/active')
    .get(UserController.active)

  app.param('uid',UserController.getById)
}
