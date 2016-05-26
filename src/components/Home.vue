<template>
  <div>
    <!--轮播-->
    <carousel></carousel>
    <!--主体导航-->
    <mainnav></mainnav>
    <!--文章-->
    <articles></articles>
    <!--商品list view-->
    <products></products>
  </div>
</template>
<script>
  import Mainnav from './Mainnav'
  import Carousel from './common/Carousel'
  import Products from './common/Products'
  import Articles from './common/Articles'

  export default {
    components: {
      Mainnav,
      Carousel,
      Articles,
      Products
    }
  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
    background-color: #fbf9fe;
    padding-bottom:50px;
  }
</style>
