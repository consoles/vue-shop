<template>
  <div style="margin-top: 50px;">
    <h1 class="title">{{item.title}}</h1>
    <img :src="item.image" alt="">
    <group>
      <cell title="价格">
         <div slot="value">
           <span class="rmb">￥</span><strong class="price">{{item.price}}</strong>
         </div>
      </cell>
    </group>
    <rate></rate>
    <group>
      <cell title="数量" value="12"></cell>
      <cell title="品牌" value="资生堂"></cell>
    </group>
    <div class="desc">{{item.desc}}</div>
    <comment></comment>
  </div>
</template>
<style scoped>
  .title{
    font-size: 18px;
    text-align: center;
  }
  img{
    height: 125px;
    margin-left: 93px;
  }
  .rmb {
    margin-left: 50px;
    color: #f60;
    font-size: 10px;
  }
  .desc{
    margin: 5px;
    padding: 5px;
    text-indent: 2em;
  }
  .price {
    font-size: 16px;
    color: #d30;
    margin-right: 10px;
  }
</style>
<script>
  import Comment from './Comment'
  import Rate from './Rate'
  import Group from 'vux/components/group'
  import Cell from 'vux/components/cell'

  export default{
    data () {
      return {
        item: {
          image: '/static/images/product.jpg',
          title: 'FWB妆前隔离乳霜',
          price: 256,
          count: 23,
          brand: 'SHISEIDO资生堂',
          desc: '即使脸部皮肤凹凸不平，也能完美修整的隔离乳霜！温和无添加，不使用香料，通过过敏测试哦，甚至可以用于嘴唇！卸妆的时候不用担心它会不好卸除，只用热水就能轻松去除的隔离乳霜！含有玻尿酸的超高保湿成分，质地很轻！'
        }
      }
    },
    components: {
      Comment,
      Rate,
      Group,
      Cell
    },
    ready: function () {
      let hash = window.location.hash
      let start = hash.lastIndexOf('/') + 1
      let id = hash.slice(start)
      console.log(id)
      this.$http.get(`/api/products/${id}`).then(response => {
        if (response.ok && response.status === 200 || response.status === 304) {
          let data = response.data
          this.$set('item', data)
        }
      })
    }
  }
</script>
