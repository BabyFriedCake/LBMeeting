<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>系统设置</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="ml-20">
        <el-breadcrumb-item :to="{ path: '/saveToYunFile' }">通用设置</el-breadcrumb-item>
      </el-breadcrumb>
    <div class="pageBody">
      <p class="mt-20 mb-20 f-s-13 f-w-b">会议设置</p>
      <el-row class="mt-5">
        <el-checkbox label="关闭窗口时，在任务栏显示" class="fl"  style="-webkit-app-region: no-drag"></el-checkbox>
      </el-row>
      <el-row class="mt-10">
        <el-checkbox label="总是显示在桌面顶部" class="fl"  style="-webkit-app-region: no-drag"></el-checkbox>
      </el-row>
    </div>
    </div>
    <!-- <div class="pageBtns">
      <el-button @click="closeWin()">取消</el-button>
      <el-button type='primary' @click="save()">保存</el-button>
    </div> -->
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
// import { formatFileSize } from '@/utils/validate'
const { BrowserWindow } = require('electron').remote
export default {
  data () {
    return {
      showListFlag: true

    }
  },
  components: {
    Titlebtn
  },
  methods: {
    // 关闭弹窗
    closeWin () {
      BrowserWindow.getFocusedWindow().close()
    },
    // 打开文件夹
    openFolder (folderName) {
      console.log(folderName)
      this.showListFlag = false
    },
    goback () {
      this.showListFlag = true
    },
    save () {

    }
  }
}
</script>
<style scoped>
.popPage .pageBody{
  width: 85%;
  margin: 0 auto;
  /* border: 1px solid rebeccapurple; */
}

</style>

