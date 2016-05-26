<template>
    <div style="margin-top:50px;text-align: center;">
      <img :src="qrcode" alt="二维码">
      <p>扫描上方的二维码,在手机中打开</p>
    </div>
</template>
<style scoped>

</style>
<script>
  export default{
    data () {
      return {
        qrcode: ''
      }
    },
    ready: function () {
      let url = window.location.href
      this.$http.get('/api/qrcode?url=' + url).then(response => {
        if (response.ok && response.status === 200 || response.status === 304) {
          let data = response.data
          this.$set('qrcode', data)
        }
      })
    }
  }
</script>
