<template>
  <div>
    <swiper :list="list" auto style="width:100%;margin-top:50px;" height="180px"></swiper>
  </div>
</template>

<script>
  import Swiper from 'vux/components/swiper'
  import SwiperItem from 'vux/components/swiper-item'

  const demoList =
    [{
      url: 'http://app.xiaotaojiang.com/ui/articles/9aLawL',
      img: 'static/images/carousel1.jpg',
      title: '如何手制一份秋意的茶？'
    }, {
      url: 'http://app.xiaotaojiang.com/ui/articles/jvmy8e',
      img: 'static/images/carousel2.jpg',
      title: '茶包VS原叶茶'
    }, {
      url: 'http://mp.weixin.qq.com',
      img: 'static/images/carousel3.jpg',
      title: '播下茶籽，明春可发芽？'
    }]

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    ready () {
      setTimeout(() => {
        this.imgList = [
          'static/images/default.jpg',
          'static/images/default.jpg',
          'static/images/default.jpg'
        ]
      }, 5000)
    },
    methods: {
      setData: function () {
        this.list1 = demoList
        this.disableLoadData = true
      }
    },
    data: function () {
      return {
        list: demoList,
        list1: [],
        disableLoadData: false,
        imgList: []
      }
    }
  }
</script>

<style scoped>
  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
  .black {
    background-color: #000;
  }
  .title{
    line-height: 100px;
    text-align: center;
    color: #fff;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }

  .swiper-img img {
    width: 100%;
    display: block;
  }
</style>
