<template>
  <div>
    <group>
      <cell title="评分">
        <rater :value.sync="data" slot="value" star="☻" active-color="#FF9900" :margin="4"></rater>
      </cell>
    </group>
  </div>
</template>

<script>
  import Rater from 'vux/src/components/rater'
  import Group from 'vux/src/components/group'
  import Cell from 'vux/src/components/cell'

  export default {
    components: {
      Rater,
      Group,
      Cell
    },
    data () {
      return {
        data: 4.5
      }
    }
  }
</script>

<style>

</style>
