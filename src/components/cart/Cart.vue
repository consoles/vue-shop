<template>
  <div style="margin-top: 50px;">
    <cartpanel :type="'1'" :list="list"></cartpanel>
    <div class="total">
      <span class="total-text">总计:</span>
      <span class="rmb">￥</span>
      <span class="total-money">{{total}}</span>
    </div>
    <group style="padding:0 10px;">
      <x-button type="primary" class="buy-btn" v-link="'/order'">去结算</x-button>
    </group>
  </div>
</template>

<script>
  import Cartpanel from './Cartpanel'
  import Group from 'vux/components/group'
  import XButton from 'vux/components/x-button'

  export default {
    components: {
      Cartpanel,
      Group,
      XButton
    },
    data () {
      return {
        list: [{
          src: 'http://cdn.xiaotaojiang.com/uploads/b6/0bb0e0f51d9069281dc29cb701029b/_.jpg',
          title: 'ROHTO乐敦 Melano CC 药用黑斑集中保养精华 20ml',
          price: 25.2,
          soldOut: 2258,
          count: 2
        }, {
          src: 'http://cdn.xiaotaojiang.com/uploads/2f/13efa5259567a2084ea8dc006868f3/_.jpg',
          title: '太阳社 玻尿酸/透明质酸原液',
          price: 15.3,
          soldOut: 3389,
          count: 3
        }]
      }
    },
    ready: function () {
      let isLogin = window.sessionStorage.getItem('logined')
      if (!isLogin) {
        this.$route.router.go('/user/login')
      }
    },
    computed: {
      total: function () {
        let sum = 0
        this.$get('list').forEach(function (item) {
          sum += parseFloat(item.price * item.count)
        })
        return sum.toFixed(2)
      }
    }
  }
</script>
<style scoped>
  .total{
    padding-left: 50px;
  }
  .total-text{
    color: red;
    font-size: 18px;
  }
  .total-money{
    color: purple;
    font-size: 20px;
  }
  .rmb{
    color: #6D4100;
  }
  .buy-btn{
    background-color: #2FCA60;
    color: #3a33d1;
  }
</style>
