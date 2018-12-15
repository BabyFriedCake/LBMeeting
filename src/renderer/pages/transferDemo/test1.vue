<template>
  <div>第一个页面
    <el-button @click='openwindow'>打开页面</el-button>
    <el-button @click='transfer'>传值</el-button>
  </div>
  
</template>

<script>
import {transferTo, openNewWindow} from '@/utils/function'
export default {
  methods: {
    openwindow () {
      openNewWindow({
        params: 'test2',
        frame: true
      })
    },
    transfer () {
      transferTo('/test2', 'param', {a: '1', b: '2'})
    }
  },
  mounted () {

  }
}
</script>


