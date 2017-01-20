<template>
  <div>
    <!-- pre loading -->
    <!--<panel header="小桃热门" :type="'1'" :list="list"></panel>-->
    <!-- scroll to referensh -->
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig" height="200px" @pullup:loading="load">
      <div class="weui_panel weui_panel_access">
        <div class="weui_panel_hd" v-if="header" @click="onClickHeader">{{{header}}}</div>
        <div class="weui_panel_bd">
          <a href="javascript:;" v-for="item in list" v-link="'products/' + item._id" class="weui_media_box weui_media_appmsg">
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
    </scroller>
    <loading :show="loading" :text="loadingtext"></loading>
  </div>
</template>

<script>
  import Panel from './../patch/Panel'
  import Loading from 'vux/src/components/loading'
  import Scroller from 'vux/src/components/scroller'

  export default {
    components: {
      Panel,
      Loading,
      Scroller
    },
    data () {
      return {
        list: [],
        pagestart: 0,
        loading: false,
        count: 10,
        loadingtext: '玩命加载中...',
        pullupConfig: {
          content: '下拉刷新',
          downContent: '下拉刷新',
          upContent: '释放刷新',
          loadingContent: '加载中'
        }
      }
    },
    ready: function () {
      this.$http.get('/api/products').then(response => {
        if (response.ok && response.status === 200 || response.status === 304) {
          let data = response.data
          this.$set('list', data)
        }
      })
    },
    methods: {
      changeShowState: function (val) {
        const _this = this
        if (val) {
          tick(0, function (percent) {
            if (percent === 100) {
              _this.loading = false
              _this.loadingtext = '开始加载...'
            } else {
              // _this.loadingtext = `已完成${percent}%`
            }
          })
        }
      },
      load: function (uuid) {
        const _this = this
        setTimeout(function () {
          if (_this.count === 500) {
            // load complete
            _this.$broadcast('pullup:done', uuid)
          } else {
            _this.loading = true
            _this.count += 5

            let pagesize = parseInt(Math.random() * 5 + 2)

            _this.$http.get(`http://127.0.0.1:3000/api/products?pagesize=${pagesize}&pagestart=${_this.pagestart}`).then(response => {
              if (response.ok && response.status === 200 || response.status === 304) {
                let data = response.data
                _this.list = _this.list.concat(data)
                _this.pagestart++
              }
            })

            setTimeout(function () {
              _this.$broadcast('pullup:reset', uuid)
              // show loading mask and setTimeout to remove
              tick(0, function (percent) {
                if (percent === 100) {
                  _this.loading = false
                  _this.loadingtext = '开始加载...'
                } else {
                  // _this.loadingtext = `已完成${percent}%`
                }
              })
              console.log('animation ....')
            }, 10)
          }
        }, 2000)
      }
    }
  }

  function tick (i, cb) {
    setTimeout(function () {
      i += 2
      cb(i)
      if (i < 100) {
        tick(i, cb)
      }
    }, 50)
  }
</script>
<style scoped>
  .rotate {
    display: inline-block;
    transform: rotate(-180deg);
  }
  .pullup-arrow {
    transition: all linear 0.2s;
    color: #666;
    font-size: 25px;
  }
</style>
