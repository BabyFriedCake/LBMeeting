<template>
  <div>第二个页面</div>
</template>

<script>
import {acceptData} from '@/utils/function'
export default {
  mounted () {
    acceptData('param', function (args) {
      console.log(args)
    })
  }
}
</script>

<style>

</style>
