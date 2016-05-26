<template>
  <div style="margin-top: 50px;position: relative">
    <search @result-click="resultClick" @on-change="getResult" :results="results" :value.sync="value" placeholder="输入商品名或者品牌名" cancel-text="取消" style="z-index: 100;"></search>
    <section class="quick-search" @click="quickSearch">
      <section class="hot-search">
        <divider>热门搜索</divider>
        <div class="hot-list">
          <flexbox class="row">
            <flexbox-item><div class="hot-item">防晒</div></flexbox-item>
            <flexbox-item><div class="hot-item">免邮</div></flexbox-item>
            <flexbox-item><div class="hot-item">美白</div></flexbox-item>
          </flexbox>
          <flexbox class="row">
            <flexbox-item><div class="hot-item">减肥</div></flexbox-item>
            <flexbox-item><div class="hot-item">咖啡</div></flexbox-item>
            <flexbox-item><div class="hot-item">有机</div></flexbox-item>
          </flexbox>
          <flexbox class="row">
            <flexbox-item><div class="hot-item">夏普</div></flexbox-item>
            <flexbox-item><div class="hot-item">日历</div></flexbox-item>
            <flexbox-item><div class="hot-item">白色恋人</div></flexbox-item>
          </flexbox>
        </div>
      </section>
      <section class="history-search">
        <divider>历史搜索</divider>
        <div class="history-list">
          <flexbox class="row">
            <flexbox-item><div class="history-item">三星</div></flexbox-item>
            <flexbox-item><div class="history-item">华为</div></flexbox-item>
            <flexbox-item><div class="history-item">淘宝</div></flexbox-item>
          </flexbox>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
  import Search from 'vux/components/search'
  import Flexbox from 'vux/components/flexbox'
  import FlexboxItem from 'vux/components/flexbox-item'
  import Divider from 'vux/components/divider'

  export default {
    components: {
      Search,
      Flexbox,
      FlexboxItem,
      Divider
    },
    methods: {
      resultClick: function (item) {
        this.$route.router.go(`/products/${item._id}`)
      },
      getResult: function (val) {
        this.$http.get('/api/product/search?q=' + val).then(function (response) {
          if (response.ok && response.status === 200 || response.status === 304) {
            this.$set('results', response.data)
          }
        })
      },
      quickSearch: function (ev) {
        let target = ev.target
        if (target && target.className.endsWith('-item')) {
          let text = target.innerText
          this.$set('value', text)
        }
      }
    },
    data () {
      return {
        results: [],
        value: ''
      }
    }
  }
</script>
<style>
  .row{
    margin: 10px 0;
  }
  .hot-list,.history-list{
    margin: 10px auto;
    width: 88%;
  }
  .hot-item ,.history-item{
    text-align: center;
    border-radius: 4px;
    -webkit-background-clip: padding-box;
  }
  .hot-item{
    color: #23d;
    border: 1px solid #0bb20c;
    background-color: rgba(221,220,220,.7);
  }
  .history-item{
    color: #ff6600;
    border: 1px solid #234578;
    background-color: rgba(225,214,125,.8);
  }
  .vux-search-fixed {
    top: 50px;
  }
</style>
