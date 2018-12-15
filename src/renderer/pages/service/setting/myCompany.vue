<template>
  <div class="popPage">
    <div class="pageTit drag">
      <div class="left-drag"></div>
      <div class="right-drag"></div>
      <span>我的企业</span>
      <div class="winOperateBtn">
        <Titlebtn type="min" />
        <Titlebtn type="close" />
      </div>
    </div>
    <div class="pageCon">
      <div class="pageBody ov-hi w-520">
        <div class="t-a-r"><el-button class="w-65" style="height:22px;line-height:20px" type='primary' @click="save()">加入</el-button></div>
          <ul class="listNav">
            <li class="fl wp-65"><span class="pl-35">企业名称</span></li>
             <li class="fl wp-15"><span class="pl-10">状态</span></li>
              <li class="fl wp-20">操作</li>
          </ul>
        <el-scrollbar class="yunFileScroll">
         <div class="f-s-14 settingList">
          <div class="fl wp-65">
            <div class="color999 fl"><img src="@/assets/images/icon-company.png" alt=""></div>
            <div class="fl">天津卓朗科技发展有限公司</div>
          </div>
          <div class="fl wp-15 f-s-13 color999">【申请中】</div>
          <div class="fl wp-20">
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">查看</el-button>
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">设为常用</el-button>
          </div>
        </div>
         <div class="f-s-14 settingList">
          <div class="fl wp-65">
            <div class="color999 fl"><img src="@/assets/images/icon-company.png" alt=""></div>
            <div class="fl">天津卓朗科技发展有限公司</div>
          </div>
          <div class="fl wp-15 f-s-13 color999">【申请中】</div>
          <div class="fl wp-20">
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">查看</el-button>
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">设为常用</el-button>
          </div>
        </div>
        <div class="f-s-14 settingList">
          <div class="fl wp-65">
            <div class="color999 fl"><img src="@/assets/images/icon-company.png" alt=""></div>
            <div class="fl">天津卓朗科技发展有限公司</div>
          </div>
          <div class="fl wp-15 f-s-13 color999">【申请中】</div>
          <div class="fl wp-20">
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">查看</el-button>
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">设为常用</el-button>
          </div>
        </div>
         <div class="f-s-14 settingList">
          <div class="fl wp-65">
            <div class="color999 fl"><img src="@/assets/images/icon-company.png" alt=""></div>
            <div class="fl">天津卓朗科技发展有限公司</div>
          </div>
          <div class="fl wp-15 f-s-13 color999">【申请中】</div>
          <div class="fl wp-20">
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">查看</el-button>
            <el-button type="text" @click="$router.back(-1)" class="f-s-14 fr">设为常用</el-button>
          </div>
        </div>
      </el-scrollbar>
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
    margin: 10px auto;
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
    /* display: flex; */
    position: relative;
    /* padding: 10px; */
    margin: 8px 0;
    border-bottom: 1px solid #E5E5E5;
    height: 50px;
    line-height: 45px;
    overflow: hidden;
  }
  .settingList:last-child{
    border: none;
  }
  .settingList img{
    position: relative;
    top: 3px;
    margin: 0 10px;
  }
  .settingList .el-button{
    margin: 6px 10px 0 0;

  }

.listNav{
  margin-top: 10px;
  border-radius: 2px;
  background-color: #FEF3EC;
  width: 100%;
  overflow: hidden;
  padding: 5px 0;
}
.listNav li{
  font-size: 13px;
  color: #999999;
  /* border:1px solid rebeccapurple; */
}
.oftenUse{
  /* width: 48px; */
  /* height: 17px; */
  font-size: 12px;
  background-color: #F3732D;
  border-radius: 3px;
  color: #FFF;
  padding: 1px 10px;
  margin-left: 10px;
}
</style>