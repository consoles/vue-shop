<template>
  <div style="margin-top: 50px;">
    <blur :blur-amount=40 :url="url">
      <p class="center">
        <img :src="url">
      </p>
      <h3 class="username">大梦初晓</h3>
    </blur>
    <div class="user-menu clearfix">
      <router-view></router-view>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-connectdevelop" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">订单</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-commenting-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">消息通知</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-envelope-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">小桃卷</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">收藏夹</div>
        </div>
      </a>
      <a v-link="'/user/my/address'" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-map-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">地址管理</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">个人信息</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">桃花源</div>
        </div>
      </a>
      <a href="" class="user-menu-item">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-television" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">用户支持</div>
        </div>
      </a>
      <a href="" class="user-menu-item" v-link="'/help'">
        <div class="user-menu-item-content">
          <div class="user-menu-item-icon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></div>
          <div class="user-menu-item-text">使用帮助</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  import Blur from 'vux/components/blur'

  export default {
    components: {
      Blur
    },
    data () {
      return {
        url: '/static/images/avatar-big.jpg'
      }
    },
    ready: function () {
      let isLogin = window.sessionStorage.getItem('logined')
      if (!isLogin) {
        this.$route.router.go('/user/login')
      }
    }
  }
</script>

<style scoped>
  .username{
    text-align: center;
    margin: 10px auto;
    color: rgba(12,233,234,.8);
  }
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  .user-menu-item{
    color: #333;
    display: block;
    float: left;
    text-align: center;
    overflow: hidden;
    width: 33.3%;
    height: 60px;
    padding-top: 30px;
  }
  .user-menu-item .user-menu-item-icon i{
    font-size: 32px;
    color: #2C2C2C;
  }
  .user-menu-item-text{
    padding-top: 5px;
    font-size: small;
  }
</style>
