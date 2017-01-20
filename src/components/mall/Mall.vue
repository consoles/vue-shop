<!-- 淘宝切换组件还不会用,以后会修改的 -->

<!--<template>-->
<!--<div>-->
<!--<div class="menu ui-border-r" style="margin-top: 50px;">-->
<!--<scroller lock-x>-->
<!--<div class="box1">-->
<!--<ul>-->
<!--<li class="ui-border-b"><span>手机数码</span></li>-->
<!--<li class="ui-border-b"><span>家用电器</span></li>-->
<!--<li class="ui-border-b"><span>女装内衣</span></li>-->
<!--<li class="ui-border-b"><span>鞋靴箱包</span></li>-->
<!--<li class="ui-border-b"><span>电脑办公</span></li>-->
<!--<li class="ui-border-b"><span>运动户外</span></li>-->
<!--<li class="ui-border-b"><span>个护化妆</span></li>-->
<!--<li class="ui-border-b"><span>家居家纺</span></li>-->
<!--<li class="ui-border-b"><span>母婴玩具</span></li>-->
<!--<li class="ui-border-b"><span>酒水饮料</span></li>-->
<!--<li class="ui-border-b"><span>图书音像</span></li>-->
<!--</ul>-->
<!--</div>-->
<!--</scroller>-->
<!--</div>-->
<!--<div class="content">-->
<!--<scroller lock-x scrollbar-y>-->
<!--<div style="margin-top: 50px;">-->
<!--<div style="margin: 10px;overflow: hidden;" v-for="item in list">-->
<!--<masker style="border-radius: 2px;">-->
<!--<div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>-->
<!--<div slot="content" class="m-title">-->
<!--{{item.title}}-->
<!--<br/>-->
<!--<span class="m-time">2016-03-18</span>-->
<!--</div>-->
<!--</masker>-->
<!--</div>-->
<!--</div>-->
<!--</scroller>-->
<!--</div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import Scroller from 'vux/components/scroller'-->
<!--import Masker from 'vux/components/masker'-->

<!--export default {-->
<!--components: {-->
<!--Scroller,-->
<!--Masker-->
<!--},-->
<!--data () {-->
<!--return {-->
<!--list: [{-->
<!--title: '洗颜新潮流！人气洁面皂排行榜',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'-->
<!--}, {-->
<!--title: '美容用品 & 日用品（上）',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'-->
<!--}, {-->
<!--title: '日本车载空气净化器精选',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'-->
<!--}, {-->
<!--title: '洗颜新潮流！人气洁面皂排行榜',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'-->
<!--}, {-->
<!--title: '美容用品 & 日用品（上）',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'-->
<!--}, {-->
<!--title: '日本车载空气净化器精选',-->
<!--img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'-->
<!--}]-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.menu {-->
<!--width: 75px;-->
<!--float: left;-->
<!--background-color: #fff;-->
<!--}-->
<!--.box1 {-->
<!--}-->
<!--.box1 ul {-->
<!--width: 74px;-->
<!--}-->
<!--.box1 li{-->
<!--text-align: center;-->
<!--padding: 0 5px;-->
<!--font-size: 14px;-->
<!--line-height: 40px;-->
<!--}-->
<!--.content {-->
<!--padding-left: 20px;-->
<!--}-->
<!--.box1-item {-->
<!--width: 200px;-->
<!--height: 100px;-->
<!--background-color: #ccc;-->
<!--text-align: center;-->
<!--line-height: 100px;-->
<!--}-->
<!--.box1-item:first-child {-->
<!--margin-left: 0;-->
<!--}-->
<!--.shop-item {-->
<!--padding: 5px;-->
<!--}-->
<!--</style>-->

<template>
  <div style="margin-top: 50px;">
    <tab :line-width=2 active-color='#fc378c'>
      <tab-item :selected="active === item" v-for="(index,item) in items" @click="switchTab(index)">{{item}}</tab-item>
    </tab>
    <div class="tab-content">
      <panel :type="'1'" :list="list"></panel>
    </div>
  </div>
</template>

<script>
  import { Tab, TabItem } from 'vux/src/components/tab'
  import Panel from './../patch/Panel'

  export default {
    props: {
      index: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchTab: function (index) {
        this.list = this.products[index]
      }
    },
    components: {
      Tab,
      TabItem,
      Panel
    },
    data () {
      return {
        items: ['精选', '最新', '最热', '推荐', '其他'],
        active: '精选',
        products: {},
        list: []
      }
    },
    ready: function () {
      let url = '/api/mall'
      let _this = this
      this.$http.get(url).then(response => {
        if (response.ok && response.status === 200 || response.status === 304) {
          _this.$set('products', response.data)
        }
      })
    }
  }
</script>

<style>
  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }

  .active-6-2 {
    color: #04be02 !important;
    border-color: #04be02 !important;
  }

  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
</style>
