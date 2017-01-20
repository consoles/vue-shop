<template>
  <div>
    <div style="margin: 10px;overflow: hidden;" v-for="item in list">
      <masker class="mask">
        <div class="m-img" :style="{backgroundImage: 'url(' + item.image + ')'}" v-link="item.link"></div>
        <div slot="content" class="m-title">
          {{item.title}}
          <br/>
          <span class="m-time">{{item.time}}</span>
        </div>
      </masker>
    </div>
  </div>
</template>

<script>
  import Masker from 'vux/src/components/masker'

  export default {
    components: {
      Masker
    },
    data () {
      return {
        list: []
      }
    },
    ready: function () {
      this.$http.get('/api/products').then(response => {
        if (response.ok && response.status === 200 || response.status === 304) {
          let data = response.data
          this.$data.list = data
        }
      })
    }
  }
</script>

<style>
  .mask{
    border-radius: 2px;
    transition: all .3s;
  }
  .mask:hover{
    opacity:.8;
    transform: scale(1.2);
  }
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0,0,0,.5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
