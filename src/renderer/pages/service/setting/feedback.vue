<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>意见反馈</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <div class="pageBody ov-hi wp-90">
        <div class="f-s-13 fl">意见反馈</div>
        <div class="f-s-12 fl ml-10">
          <el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" placeholder="您对我们的意见或者建议非常重要，感谢您让我们的产品变得更好" v-model="textarea" class="textarea">
          </el-input>
        </div>
      </div>
      <div class="pageBody ov-hi wp-90" style="height:34px;line-height:34px">
        <div class="f-s-13 fl">联系方式</div>
        <div class="f-s-12 fl ml-10">
          <el-input placeholder="输入您的手机号方便与您联系（选填）" class="mb-20 textarea" v-model="phoneNum"></el-input>
        </div>
      </div>
    </div>
    <div class="pageBtns">
      <el-button @click="closeWin()">取消</el-button>
      <el-button type='primary' @click="feedback()">提交</el-button>
    </div>
  </div>
</template>
<script>
 import {
   feedbackInfo
 } from '@/api/setting'
 import Titlebtn from '@/components/common/Titlebtn.vue'
 // import { formatFileSize } from '@/utils/validate'
 import { success } from '@/utils/function.js'
 const {
   BrowserWindow
 } = require('electron').remote
 export default {
   data () {
     return {
       showListFlag: true,
       textarea: '',
       phoneNum: ''
     }
   },
   components: {
     Titlebtn
   },
   methods: {
     // 提交反馈接口
     feedback () {
       const params = {
         feedbackContent: this.textarea,
         phoneNum: this.phoneNum
       }
       feedbackInfo(Object.assign({}, params)).then(res => {
         if (res.state === 200) {
           success('反馈成功，感谢您的支持')
         }
       })
     },
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
  .popPage .pageBody {
    /* width: 85%; */
    margin: 40px auto 20px;
    /* border: 1px solid rebeccapurple; */
  }
  .textarea{
    width: 420px;
    font-size: 12px !important;
  }
  .pageBtns{
    border-top: none;
  }
  .el-button{
    line-height: 33px;
  }
</style>