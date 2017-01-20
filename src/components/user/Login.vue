<template>
  <div style="margin-top: 50px;">
    <blur :blur-amount=2 :url="url">
    </blur>
    <div class="text">
      <h3 class="title">
        登陆之后开启新世界
      </h3>
      <div class="introduce">野马也,尘埃也,生物之以息相吹也</div>
    </div>
    <form>
      <group title="邮箱">
        <x-input title="邮箱" :value.sync="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
      </group>
      <group title="密码">
        <x-input title="密码" type="password" placeholder="" :value.sync="password" :min="6" :max="16"
                 @on-change="change"></x-input>
      </group>
      <group title="验证码" class="weui_cells_form">
        <x-input title="验证码" class="weui_vcode">
        </x-input>
        <img slot="right" :src="vcodesrc" @click="changePic">
      </group>
      <group>
        <x-button type="primary" class="login-btn" @click="login">登陆</x-button>
        <x-button type="primary" class="reg-btn" v-link="'/user/reg'">注册</x-button>
      </group>
    </form>
  </div>
</template>
<script>
  import Blur from 'vux/src/components/blur'
  import XInput from 'vux/src/components/x-input'
  import Group from 'vux/src/components/group'
  import XButton from 'vux/src/components/x-button'

  export default {
    components: {
      Blur,
      XInput,
      Group,
      XButton
    },
    data () {
      return {
        url: '/static/images/avatar-big.jpg',
      //  email: '1362955042@qq.com',
        password: '123456',
        vcodesrc: 'http://www.hubwiz.com/captcha/login'
      }
    },
    methods: {
      change: function (val) {
        console.log(val)
      },
      login: function () {
        let _this = this
        let data = _this.$data
        this.$http.post('/api/user/login', { username: data.email, password: data.password })
          .then(function (response) {
            if (response.ok && response.data.logined) {
              window.sessionStorage.setItem('logined', 'true')
              _this.$route.router.go('/user/my')
            } else {
              // set errors in form
            }
          }, function (err) {
            console.warn(err)
            _this.$route.router.go('/error')
          })
      },
      changePic: function () {
        this.$set('vcodesrc', 'http://www.hubwiz.com/captcha/login?_=' + Date.now())
      }
    }
  }
</script>
<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }

  img{
    width: 50%;
  }
  .text {
    width: 100%;
    top: 120px;
    position: absolute;
    color: #b0d0ef;
    text-align: center;
  }

  .introduce {
    margin-top: 10px;
    font-size: 16px;
    color: #c4f5f5;
    text-align: center;
  }

  .weui_cell_ft .weui_btn {
    margin-left: 5px;
    vertical-align: middle;
    display: inline-block;
  }

  .login-btn {
    background: #0b97c4;
    color: #fff;
  }
</style>
