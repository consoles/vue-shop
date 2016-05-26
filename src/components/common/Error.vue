<template>
    <div style="margin-top: 50px;">
      <h1>服务器开了点小差,点击<a v-link='"/"'>此处</a>返回</h1>
    </div>
</template>
<countdown :time="3" @on-finish="finish" v-show="false"></countdown>
<style scoped>
    h1{
        color:#ff0000;
        font-size:18px;
    }
</style>
<script>
  import Countdown from 'vux/components/countdown'

  export default {
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
