<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>个人设置</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <div class="pageBody ov-hi w-400">
        <div class="t-a-c headImg"><img src="@/assets/images/icon-headImg.png" alt=""></div>
        <div class="f-s-14 settingList">
          <span class="color999">用户姓名</span>
          <span class="ml-20">李博楠</span>
          <el-button type="text" class="f-s-14">修改</el-button>
        </div>
        <div class="f-s-14 settingList">
          <span class="color999">登录密码</span>
          <span class="ml-20">******</span>
          <el-button type="text" @click="$router.back(-1)" class="f-s-14">修改</el-button>
        </div>
        <div class="f-s-14 settingList">
          <span class="color999">手机号码</span>
          <span class="ml-20">13752694000</span>
          <el-button type="text" @click="$router.back(-1)" class="f-s-14">修改</el-button>
        </div>
        <div class="f-s-14 settingList">
          <span class="color999">绑定微信</span>
          <span class="ml-20">未绑定</span>
          <el-button type="text" @click="$router.back(-1)" class="f-s-14">绑定</el-button>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
  import Titlebtn from '@/components/common/Titlebtn.vue'
  // import { formatFileSize } from '@/utils/validate'
  const {
    BrowserWindow
  } = require('electron').remote
  export default {
    data () {
      return {
        showListFlag: true,
        textarea3: ''

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
  .popPage .pageBody {
    /* width: 85%; */
    margin: 20px auto;
    /* border: 1px solid rebeccapurple; */
  }
 .popPage .pageBody .headImg{
   width: 90px;
   height: 90px;
   /* border: 1px solid red;*/
   border-radius: 50%;
   box-shadow:0px 10px 10px 0px rgba(0, 0, 0, 0.06);
   overflow: hidden;
   margin: 0 auto 20px;
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
  .settingList{
    position: relative;
    padding: 10px 20px;
    margin-top: 5px;
    border-bottom: 1px solid #E5E5E5;
  }
  .settingList .el-button--text{
    position: absolute;
    right: 20px;
    top: 2px;
  }
</style>