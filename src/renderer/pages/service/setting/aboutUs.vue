<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>关于我们</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <div class="pageBody ov-hi w-450">
        <div class="t-a-c"><img src="@/assets/images/aboutUsLogo.png" alt=""></div>
        <div class="f-s-13 settingList color999 ti-30" style="line-height:22px;">
            一款功能强大的云会议平台。提供移动、PC、专业会议室终端一致体验，助您完成跨平台、跨网络、跨终端的沟通与协作，打破企业壁垒，实现与商业伙伴、客户的全面联接。
        </div>
        <div class="f-s-14 settingList">
          <span class="color999">用户协议</span>
          <!-- <span class="ml-20">******</span> -->
          <el-button type="text" @click="$router.back(-1)" class="f-s-14 aboutInfo" style="top:2px">查看</el-button>
        </div>
        <div class="f-s-14 settingList">
          <span class="color999">客服邮箱</span>
          <span class="aboutInfo">liuxu@troila.com</span>
        </div>
         <div class="f-s-14 settingList">
          <span class="color999">客服QQ</span>
          <span class="aboutInfo">3398591559</span>
        </div>
         <div class="f-s-14 settingList b-b-n">
          <span class="color999">客服热线</span>
          <span class="aboutInfo">400-005-2220</span>
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
    padding: 10px;
    margin-top: 5px;
    border-bottom: 1px solid #E5E5E5;
  }
  .settingList .aboutInfo{
    position: absolute;
    right: 20px;
  }

</style>