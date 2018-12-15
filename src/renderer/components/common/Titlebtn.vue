<template>
  <i v-bind:class="OperateBtnClassName" @click="click"></i>
</template>

<script>
// const { ipcRenderer } = require('electron')
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
  name: 'Titlebtn',
  props: ['type', 'windowType'],
  computed: {
    OperateBtnClassName: function () {
      return OperateBtnClassName[this.type]
    }
  },
  methods: {
    click () {
      if (this.type === 'min') {
        BrowserWindow.getFocusedWindow().minimize()
      } else {
        BrowserWindow.getFocusedWindow().close()
      }
      // ipcRenderer.send('windowType', this.type)
    }
  },
  mounted () {
  }
}
</script>
    
<style scoped>
.iconfont {
  width: 20px;
  height: 20px;
  -webkit-app-region: no-drag;
}
</style>