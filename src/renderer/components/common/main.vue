<template>
  <div class="mainPage">
    <div class="mainTop drag">
      <div class="mainHeader">
        <img
          src="@/assets/images/logo-s.png"
          class="fl"
        >
        <div class="winOperateBtn">
          <span class="feedbackBtn">反馈</span>
          <Titlebtn type="min" />
          <Titlebtn type="close" />
        </div>
      </div>
      <img @click='opentransfer'
        :src="user.userInfo.loginImg || require('@/assets/images/photo.png')"
        class="headPortrait no-drag"
      />
      <div class="usernameBox">
        <span class="username">{{userInfo.user.userName}}</span>
        <img
          src="@/assets/images/vip.png"
          class="vipIcon"
        >
      </div>
      <p class="colorfffopacity50 f-s-12 t-a-c text-dot">
        <span>{{(userType=='user')?'个人':'企业'}}版</span>
        <span class="elem01"></span>
        <span>{{userInfo.user.companyName}}</span>
      </p>
      <ul class="shortcut clearfix no-drag no-underline">
        <li>
          <i class="iconfont icon-pc-icon-21"></i>
        </li>
        <li @click="callMeeting()">
          <i class="iconfont icon-pc-icon-20"></i>
        </li>
        <li>
          <i class="iconfont icon-pc-icon-18" @click='openAppoint'></i>
        </li>
        <li @click="toMyMeeting()">
          <i class="iconfont icon-pc-icon-25"></i>
        </li>
      </ul>
      <div class="p-0-20">
        <el-input
          placeholder="搜索"
          v-model="searchInp"
          class="searchInp no-drag"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
          ></i>
        </el-input>
      </div>
    </div>
    <div class="mainCon no-drag">
      <ul class="tabNav">
        <li :class='{active:conference==currentView}' @click="toggleTabs(conference)">会议室</li>
        <li :class='{active:message==currentView}' @click="toggleTabs(message)">消息</li>
        <li :class='{active:contacts==currentView}' @click="toggleTabs(contacts)">联系人</li>
        <!-- <li :class='{active:yunfile==currentView}' @click="toggleTabs(yunfile)">云盘</li> -->
      </ul>
      <div :is="currentView" keep-alive></div>
    </div>
    <div class="mainBottom clearfix">
      <i class="iconfont icon-pc-icon-16 fl mainBottomOpr ml-12" @click="mainBottomOprDownFn()"></i>
      <i class="iconfont icon-pc-icon-40 mainBottomOpr mainBottomOprAdd" @click="AddGroupFn()"></i>
      <i class="iconfont icon-pc-icon-17 fr mainBottomOpr mr-12"></i>
      <div v-if="AddGroup">
        <dl class="operationsBox">
          <dd @click="toAddAontact()"><i class="iconfont icon-pc-icon-39"></i><span>添加联系人</span></dd>
          <dd><i class="iconfont"></i><span>创建群组</span></dd>
        </dl>
      </div>
    </div>
    <div class="mainBottomOprDown" v-show="mainBottomOprDownFlag">
      <div class="mainBottomOprDownshadow" @click="closeMainBottomOprDown()"></div>
      <ul>
        <li><i class="iconfont icon-pc-icon-15"></i><span>会员中心</span></li>
        <li><i class="iconfont icon-pc-icon-14"></i><span>购买并发</span></li>
        <li><i class="iconfont icon-pc-icon-12"></i><span>购买云盘空间</span></li>
        <li class="elem03"></li>
        <li><i class="iconfont icon-pc-icon-13"></i><span>订单中心</span></li>
        <li><i class="iconfont icon-pc-icon-10"></i><span>我的企业</span></li>
        <li><i class="iconfont icon-pc-icon-11"></i><span>关于我们</span></li>
        <li class="elem02"></li>
        <li @click.stop="logOut()"><i class="iconfont icon-pc-icon-9"></i><span>退出登录</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import Titlebtn from '@/components/common/Titlebtn.vue'
import conference from '@/components/common/conference'
import message from '@/components/common/message'
import contacts from '@/components/common/contacts'
import yunfile from '@/components/common/yunfile'
import {openNewWindow} from '@/utils/function'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      conference: 'conference',
      message: 'message',
      contacts: 'contacts',
      yunfile: 'yunfile',
      currentView: 'contacts',
      mainBottomOprDownFlag: false,
      searchInp: '',
      AddGroup: false
    }
  },
  components: {
    Titlebtn, conference, message, contacts, yunfile
  },
  computed: {
    ...mapState({
      userId: state => state.user.userInfo.user.userID,
      user: state => state.user,
      userType: state => state.user.userType,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    toggleTabs (tabText) {
      this.currentView = tabText
    },
    openAppoint () {
      var windowConfig = {
        width: 560,
        height: 560,
        frame: false,
        params: 'appoint',
        useContentSize: true,
        resizable: false,
        webSecurity: false
      }
      openNewWindow(windowConfig)
        .then((win) => {
          win.on('close', function () {
            console.info('窗口关闭')
            win = null
          })
        })
    },
    callMeeting () {
      const windowConfig = {
        params: 'callMeeting',
        width: 699,
        height: 525,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false
        // resizable: false
      }
      openNewWindow(windowConfig)
    },
    mainBottomOprDownFn () {
      this.mainBottomOprDownFlag = !this.mainBottomOprDownFlag
    },
    closeMainBottomOprDown () {
      this.mainBottomOprDownFlag = false
    },
    logOut () {
      alert('退出登录')
      this.closeMainBottomOprDown()
    },
    toYunFile () {
      const windowConfig = {
        params: 'saveToYunFile',
        width: 620,
        height: 515,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
        // resizable: true
      }
      // browserWindow 成功回调、事件处理（详看api）
      openNewWindow(windowConfig)
        .then((win) => {
          win.on('close', () => win.close())
        })
    },
    toSystem () {
      const windowConfig = {
        params: 'system',
        width: 540,
        height: 420,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false, // 无边框窗口
        resizable: false
      }
      // browserWindow 成功回调、事件处理（详看api）
      openNewWindow(windowConfig)
    },
    opentransfer () {
      openNewWindow({
        params: 'test1',
        width: 620,
        height: 515,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: true // 无边框窗口
      })
    },
    toMyMeeting () {
      const windowConfig = {
        params: 'myMeeting',
        width: 640,
        height: 525,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false // 无边框窗口
        // resizable: true
      }
      // browserWindow 成功回调、事件处理（详看api）
      openNewWindow(windowConfig)
        .then((win) => {
          win.on('close', () => win.close())
        })
    },
    toAddAontact () {
      const windowConfig = {
        params: 'addAontact',
        width: 400,
        height: 274,
        useContentSize: true,
        webSecurity: false,
        transparent: true,
        frame: false,
        resizable: false
      }
      openNewWindow(windowConfig)
    },
    AddGroupFn () {
      this.AddGroup = !this.AddGroup
    }
  },
  mounted () {
    // console.log(this.userInfo)
    console.log(this.user)
    // console.log(this.$store.state.user.userType)
  }
}
</script>
<style scoped>
@import "~/src/renderer/assets/css/main.css";
.operationsBox{
  position: fixed;
  right: 1px;
  bottom: 1px;
}
</style>

