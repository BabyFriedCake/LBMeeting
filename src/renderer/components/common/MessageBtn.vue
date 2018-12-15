<template>
  <i class="hover-class" v-bind:class="OperateBtnClassName" @click="click"></i>
</template>
<script>
const { BrowserWindow } = require('electron').remote
const OperateBtnClassName = {
  min: {
    'iconfont': true,
    'icon-pc-icon-5': true
  },
  close: {
    'iconfont': true,
    'ml-6': true,
    'icon-pc-icon-7': true
  }
}
export default {
  props: ['type'],
  computed: {
    OperateBtnClassName: function () {
      return OperateBtnClassName[this.type]
    }
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    click () {
      if (this.type === 'min') {
        BrowserWindow.getFocusedWindow().minimize()
      } else {
        BrowserWindow.getFocusedWindow().close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hover-class{
  cursor: pointer;
  &:hover{
    color: #F3732D;
  }
}
</style>


