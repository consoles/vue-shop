<template>
  <div style="margin-top: 50px;">
    <div><img :src="image" alt="" style="max-width: 100%"></div>
    <p>哈哈,你要找的也页面不见啦,3s后将回到首页</p>
    <countdown :time="3" @on-finish="finish" v-show="false"></countdown>
  </div>
</template>
<style scoped>
  div {
    color: red;
  }
</style>
<script>
  import Countdown from 'vux/src/components/countdown'

  export default {
    data () {
      return {
        image: 'static/images/404.png'
      }
    },
    components: {
      Countdown
    },
    methods: {
      finish: function (index) {
        this.$route.router.go('/')
      }
    }
  }
</script>
