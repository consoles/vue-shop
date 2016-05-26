<template>
  <div class="weui_panel weui_panel_access">
    <div class="weui_panel_hd" v-if="header" @click="onClickHeader">{{{header}}}</div>
    <div class="weui_panel_bd">
      <a href="javascript:;" v-for="item in list" @click="onItemClick(item)" class="weui_media_box weui_media_appmsg" v-if="type === '1'" v-link="'products/' + item._id">
        <div class="weui_media_hd" v-if="item.src">
          <img class="weui_media_appmsg_thumb" :src="item.image" alt="">
        </div>
        <div class="weui_media_bd">
          <h4 class="weui_media_title">{{item.title}}</h4>
          <div class="weui_media_desc">
            <p class="product-item-zone">产地: {{item.zone}}</p>
            <p class="product-item-foot">
              <span class="rmb">￥</span><strong class="price">{{item.price}}</strong>
              <span class="sold-out-text">销量</span><span class="product-item-sold-out">{{item.soldOut}}</span>
              <span class="star">收藏 <i class="fa fa-star" aria-hidden="true"></i></span>
            </p>
          </div>
        </div>
      </a>
    </div>
    <a class="weui_panel_ft" href="javascript:void(0);" v-if="footer" @click="onClickFooter">{{{footer}}}</a>
  </div>
</template>

<style scoped>
  .product-item-foot{
    margin-top: 5px;
  }
  .product-item-foot .star{
    float: right;
    margin-top: 3px;
  }
 .rmb{
   color: #f60;
   font-size: 10px;
 }
  .price{
    font-size: 16px;
    color: #d30;
    margin-right: 10px;
  }
  .sold-out-text{
    margin-right: 5px;
  }
</style>
<script>
  export default {
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
      onItemClick (item) {
        this.$dispatch('on-click-item', item)
      }
    }
  }
</script>
