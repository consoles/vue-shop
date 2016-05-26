<template>
  <div style="margin-top: 50px;">
    <tab :line-width=2 active-color='#fc378c'>
      <tab-item :selected="active === item" v-for="item in items" @click="switchTab(index)">{{item}}</tab-item>
    </tab>
    <div class="tab-content">
      <panel :type="'1'" :list="list"></panel>
    </div>
  </div>
</template>

<script>
  import Tab from 'vux/components/tab'
  import TabItem from 'vux/components/tab-item'
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
//        this.list = this.items[index]
      }
    },
    components: {
      Tab,
      TabItem,
      Panel
    },
    data () {
      return {
        item: '全部',
        items: ['全部', '已完成', '待付款', '待评价'],
        list: []
      }
    },
    ready: function () {
      let isLogin = window.sessionStorage.getItem('logined')
      if (!isLogin) {
        this.$route.router.go('/user/login')
      }
      let list = [{
        image: 'http://cdn.xiaotaojiang.com/uploads/b6/0bb0e0f51d9069281dc29cb701029b/_.jpg',
        title: 'ROHTO乐敦 Melano CC 药用黑斑集中保养精华 20ml',
        price: 25.2,
        soldOut: 2258,
        count: 2
      }, {
        image: 'http://cdn.xiaotaojiang.com/uploads/2f/13efa5259567a2084ea8dc006868f3/_.jpg',
        title: '太阳社 玻尿酸/透明质酸原液',
        price: 15.3,
        soldOut: 3389,
        count: 3
      }]
      this.$set('list', list)
    }
  }
</script>
