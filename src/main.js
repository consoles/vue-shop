import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/Home'

import User from './components/user/User'
import Login from './components/user/Login'
import Reg from './components/user/Reg'
import Logout from './components/user/Logout'
import UserCenter from './components/user/UserCenter'

import Address from './components/common/Address'

import Detail from './components/common/Detail'

import Mall from './components/mall/Mall'

import Cart from './components/cart/Cart'

import Order from './components/order/Order'

import Search from './components/common/Search'

import Help from './components/common/Help'

import NotFound from './components/common/NotFound'
import Error from './components/common/Error'

Vue.use(VueResource)
Vue.config.devtools = true
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/search': {
    component: Search
  },
  '/user': {
    component: User,
    subRoutes: {
      '/my': {
        component: UserCenter,
        subRoutes: {
          '/address': {
            component: Address
          }
        }
      },
      '/login': {
        component: Login
      },
      '/reg': {
        component: Reg
      },
      '/logout': {
        component: Logout
      }
    }
  },
  '/cart': {
    component: Cart
  },
  '/products/:pid': {
    component: Detail
  },
  '/order': {
    component: Order
  },
  '/mall': {
    component: Mall
  },
  'help': {
    component: Help
  },
  '/404': {
    component: NotFound
  },
  '/error': {
    component: Error
  }
})

// Any invalid route will redirect to 404
router.redirect({
  '*': '/404'
})

// 沙龙密码958518

router.start(App, '#app')
