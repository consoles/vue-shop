<template>
  <div style="margin-top: 50px;">
    <blur :blur-amount=2 :url="url">
    </blur>
    <div class="text">
      <h3 class="title">
        加入我们
      </h3>
      <div class="introduce">野马也,尘埃也,生物之以息相吹也</div>
    </div>
    <div class="promte-text">
      <p>使用邮箱注册,小桃将向您的邮箱发送激活链接,进入到邮箱激活即可完成账号注册</p>
    </div>
    <form>
      <group title="邮箱">
        <x-input title="邮箱" placeholder="请输入邮箱地址" is-type="email" :value.sync="email"></x-input>
      </group>
      <group title="密码">
        <x-input title="密码" type="password" placeholder="" :value.sync="password" :min="6" :max="16"
                 @on-change="change"></x-input>
        <x-input title="确认密码" type="password" placeholder="" :equal-with="password"></x-input>
      </group>
      <group title="验证码" class="weui_cells_form">
        <x-input title="验证码" class="weui_vcode">
          <img slot="right" src="/static/images/vcode.jpg">
        </x-input>
        <x-input title="发送验证码" class="weui_vcode">
          <x-button slot="right" type="primary">发送验证码</x-button>
        </x-input>
      </group>
      <group>
        <x-button type="primary" class="login-btn" @click="reg">注册</x-button>
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
        password: '123456',
        email: ''
      }
    },
    methods: {
      change: function (val) {
        console.log(val)
      },
      reg: function () {
        let _this = this
        let data = _this.$data
        this.$http.post('/api/users', { username: data.email, password: data.password })
          .then(function (data) {
            if (data.ok) {
              _this.$route.router.go('/user/login')
            }
          }, function (err) {
            console.warn(err)
            _this.$route.router.go('/error')
          })
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

  .promte-text {
    padding: 10px;
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
