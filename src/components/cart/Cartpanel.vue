<template>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_bd">
      <a href="javascript:;" v-for="(index,item) in list" @click="onItemClick(index,item)" class="weui_media_box weui_media_appmsg">
        <div class="weui_media_hd" v-if="item.count > 0 && item.src">
          <img class="weui_media_appmsg_thumb" :src="item.src" alt="">
        </div>
        <div class="weui_media_bd" v-if="item.count > 0">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <div class="weui_media_desc">
            <p class="product-item-foot">
              <span class="rmb">￥</span><strong class="price">{{item.price}}</strong>
              <span class="sold-out-text">销量</span><span class="product-item-sold-out">{{item.soldOut}}</span>
              <number title="清空" :min=0 :max=8 :value="item.count" @on-change="change"></number>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<!-- 清空购物车还是存在bug -->
<style scoped>
  .product-item-foot {
    margin-top: 5px;
  }

  .product-item-foot .star {
    float: right;
    margin-top: 3px;
  }

  .rmb {
    color: #f60;
    font-size: 10px;
  }

  .price {
    font-size: 16px;
    color: #d30;
    margin-right: 10px;
  }

  .sold-out-text {
    margin-right: 5px;
  }
</style>
<script>
  import Number from '../patch/Number'

  export default {
    components: {
      Number
    },
    props: {
      header: String,
      footer: String,
      list: Array,
      type: {
        type: String,
        default: '1'
      }
    },
    methods: {
      onClickFooter () {
        this.$dispatch('on-click-footer')
      },
      onClickHeader () {
        this.$dispatch('on-click-header')
      },
      onItemClick (index, item) {
        item.count = parseInt(this.$get('count'))
        this.$set(index, index)
        this.$dispatch('on-click-item', item)
      },
      change: function (val) {
        this.$set('count', val)
      }
    },
    data () {
      return {
        count: 0
      }
    }
  }
</script>
