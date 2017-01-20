<template>
  <!-- TODO:地址管理还是存在bug -->
  <div>
    <group>
      <address :title="title" :value.sync="value" :list="addressData"></address>
      <!-- vue过滤属性 filter -->
      <!--<cell title="上面value值" :value="value | json"></cell>-->
    </group>
    <br/>
    <x-button type="primary" @click="saveAddress">保存收货地址</x-button>
  </div>
</template>

<script>
  import Group from 'vux/src/components/group'
  import Address from 'vux/src/components/address'
  import AddressChinaData from './city.json'
  import XButton from 'vux/src/components/x-button'

  export default {
    components: {
      Group,
      Address,
      XButton
    },
    data () {
      return {
        title: '收货地址',
        value: ['湖北省', '襄阳市', '南漳县'],
        addressData: AddressChinaData
      }
    },
    methods: {
      saveAddress: function () {
        console.log(this.$data.value)
        window.localStorage.setItem('address', this.$data.value)
      }
    }
  }
</script>
