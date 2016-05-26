<template>
  <div>
    <!--顶部导航-->
    <navbar></navbar>
    <router-view transition transition-mode="out-in"></router-view>
  </div>
</template>
<script>
  import Navbar from './components/common/Navbar'

  export default {
    components: {
      Navbar
    }
  }
</script>
<style>
  @import '~vux/vux.css';
</style>
