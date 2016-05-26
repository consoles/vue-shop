<template>
    <div style="margin-top: 60px;">
      <h3 class="prompt-text">登出成功,页面将在<countdown slot="value" :time="5" @on-finish="finish" v-show="show" class="countdown"></countdown>后跳转</h3>
    </div>
</template>
<style scoped>
  .prompt-text {
    text-align: center;
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    margin-top: 2rem;
    color: #3a33d1;
  }
  .countdown {
    color: #f5871f;
  }
</style>
<script>
  import Countdown from 'vux/components/countdown'

  export default {
    data () {
      return {
        show: true,
        time: 5,
        value: '',
        start: false
      }
    },
    components: {
      Countdown
    },
    ready: function () {
      // invalid the user login state
      window.sessionStorage.removeItem('logined')
    },
    methods: {
      finish: function (index) {
        this.show = false
        this.value = 'completed'
        // when the counting down finish jump to the index
        this.$route.router.go('/')
      }
    }
  }
</script>
