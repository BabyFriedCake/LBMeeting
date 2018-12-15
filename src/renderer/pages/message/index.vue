<template>
  <div id="message" class="message">
    <!-- 头部信息 -->
    <head class="message-head">
      <span class="message-name">Hello</span>
      <div class="head-operate">
        <MessageBtn type="min"></MessageBtn>
        <MessageBtn type="close"></MessageBtn>
      </div>
    </head>
    <!-- 聊天框 -->
    <div class="message-chat">
      <div class="chat-left">
        <el-scrollbar ref="elscrollbar" class="page-component__scroll">
          <div class="chat-top" style="height:100%">
            <div class="chat-loading" v-if="loading"  @click="checkMoreRecord">查看更多消息</div>
            <div class="chat-list" v-for="(item, index) in totalRecord" :key="index">
              <p class="chat-time">{{ transferDate(parseInt(item.time)) }}</p>
              <div class="list-left" v-if="item.from !== userId">
                <img :src="defaultImg" alt="" class="chat-headimg">
                <div class="chat-bubble chat-bubble-left">
                  <p class="chat-info">{{item.content}}</p>
                </div>
              </div>
              <div class="list-right" v-else>
                <div class="chat-bubble chat-bubble-right">
                  <p class="chat-info">{{item.content}}</p>
                </div>
                <img :src="defaultImg" alt="" class="chat-headimg">
              </div>
            </div>
          </div>
          </el-scrollbar>
        <div class="chat-bottom">
          <div class="chat-type">
            <div class="type-left">
              <span class="iconfont icon-pc-icon-11"></span>
              <i class="iconfont icon-pc-icon-11"></i>
              <i class="iconfont icon-pc-icon-11"></i>
              <i class="iconfont icon-pc-icon-11"></i>
              <i class="iconfont icon-pc-icon-19"></i>
            </div>
            <i class="type-right iconfont icon-pc-icon-18"></i>
          </div>
          <div class="chat-send">
            <textarea v-model="content" class="chat-content" cols="30" rows="10" @keyup.enter="sendMsg" @keyup.ctrl.enter="setNewLine"></textarea>
            <span class="chat-sendbtn" @click="sendMsg">发送</span>
          </div>
        </div>
      </div>
      <div class="chat-right">
        <ul class="chat-history">
          <li class="history-list" v-for="(item, index) in historyRecord" :key="index">
            <p class="history-date">日期：{{ transferDate(parseInt(item.time)) }}</p>
            <p class="history-content">内容：{{item.content}}</p>
          </li>
        </ul>
        <el-input v-model="searchResult" @keyup.enter="searchHistoryRecord"></el-input>
        <span class="chat-sendbtn" @click="searchHistoryRecord">搜索</span>
      </div>
    </div>
  </div>
</template>
<script>
// 库
import md5 from 'js-md5'
import { transferDate } from '@/utils/validate.js'
import { initialIndexDb, addData, searchData, readData } from '@/utils/indexDb.js'
// import $ from 'jquery'
// 组件
import MessageBtn from '@/components/common/MessageBtn'
import defaultImg from '@/assets/images/vip.png'
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
  computed: {
    OperateBtnClassName: function () {
      return OperateBtnClassName['min']
    }
  },
  components: {
    MessageBtn
  },
  watch: {
    totalRecord: function (newQuestion, oldQuestion) {
      this.$nextTick(() => {
        var div = document.getElementsByClassName('el-scrollbar__wrap')[0]
        div.scrollTop = div.scrollHeight
      })
    }
  },
  data () {
    return {
      websock: null,
      message: null, // 总体消息
      chat: null, // 聊天信息
      defaultImg,
      content: '',
      userId: '',
      db: '',
      exampleContent: '',
      records: [],
      historyRecord: [],
      visibleRecords: false,
      transferDate: null,
      searchResult: '',
      totalRecord: '',
      pageSize: 5,
      loading: true,
      loadingStatus: false
    }
  },
  methods: {
    click () {
      console.info(111)
    },
    async initWebpack () {
      this.transferDate = transferDate
      const { token, userInfo } = this.$store.getters
      const timestamp = Date.parse(new Date())
      const rand = Math.random().toString().slice(-8)
      const version = '1.0'
      const userId = userInfo.user ? userInfo.user.userID : userInfo.company.companyId
      const loginMobile = userInfo.loginMobile
      const userkey = 'LUOBO_' + md5(`${userId}2`).toUpperCase()
      const signature = md5(rand + timestamp + token + version).toUpperCase()
      const wsConfig = {
        signature,
        timestamp,
        userkey,
        rand,
        version
      }
      this.initialWS(wsConfig)
      this.onOpenWS()
      this.onCloseWS()
      this.onErrorWS()
      this.onMessageWS()
        .then(async (messages) => {
          let totalRecord = await addData(messages)
          this.totalRecord = totalRecord
        })
      this.userId = userId
      // // 创建本地数据库 or 获取数据库
      let totalRecords = await initialIndexDb(loginMobile, 5)
      this.totalRecord = totalRecords
    },
    // 发送消息 新增
    async sendMsg () {
      const { content, userId } = this
      if (content.trim() !== '') {
        const messages = await this.onSendWS('0', userId, content, '1')
        let totalRecord = await addData(messages)
        this.totalRecord = totalRecord
        this.content = ''
      }
    },
    // 搜索历史记录 查询
    async searchHistoryRecord () {
      const { searchResult } = this
      let historyRecord = await searchData(searchResult.trim())
      this.historyRecord = historyRecord
    },
    // 搜索更多消息 查询
    async checkMoreRecord () {
      const { pageSize } = this
      this.pageSize = pageSize + 5
      const totalRecord = await readData(this.pageSize)
      this.totalRecord = totalRecord
    }
  },
  mounted () {
    this.initWebpack()
  }
}
</script>
<style lang="scss" scoped>
.message{
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  background-color: white;
  .message-head{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    border-bottom: 1px solid #E5E5E5;
    .message-name{
      color: #333;
      font-size: 18px;
    }
  }
  .message-chat{
    display: flex;
    height: 92%;
    .chat-left{
      width: 68%;
      .el-scrollbar{
        width: 100%;
        height: 77%;
        border-right: 1px solid #E5E5E5;
        .chat-top{
          // width: 68%;
          // height: 428px;
          // overflow: hidden;
          // overflow-y: scroll;
          padding: 32px 30px 0;
          .chat-loading{
            display: flex;
            justify-content: center;
            color: #FFB186;
            font-size: 14px;
            margin-bottom: 20px;
            .el-loading-spinner{
              margin-top: -14px;
              .circular{
                width: 26px;
                height: 26px;
              }
            }
          }
          .chat-list{
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
            .chat-time{
              color: #999999;
              font-size: 14px;
              text-align: center;
            }
            .list-left{
              display: flex;
              flex: 1;
              justify-content:flex-start;
            }
            .list-right{
              display: flex;
              flex: 1;
              justify-content:flex-end;
            }
            .chat-headimg{
              width:34px;
              height:34px;
              background:rgba(242,243,246,1);
              border-radius:50%;
            }
            .chat-bubble{
              position:relative;/*日常相对定位*/
              // border:1px solid black;
              border-radius: 17px;
              background: #FFB186;
              font-size: 14px;
              color: #333;
              padding: 7.5px 10px;
              display: inline-block;
            }
            .chat-bubble-left{
              margin-left: 10px;
              &::before, &::after{
                content:"";/*:before和:after必带技能*/
                display:block;
                position:absolute;/*日常绝对定位*/
                top:12px;
                width:0;
                height:0;
                border:6px solid transparent;
              }
              &::before{
                left:-11px;
                // border-right-color:rgba(245,245,245,1);
                border-right-color:#FFB186;
                z-index:1
              }
              // &::after{
              //   left:-12px;
              //   border-right-color :#FFB186;
              //   z-index:0
              // }

            }
            .chat-bubble-right{
              margin-right: 10px;
              justify-content: flex-end;
              &::before, &::after{
                content:"";/*:before和:after必带技能*/
                display:block;
                position:absolute;/*日常绝对定位*/
                top:12px;
                width:0;
                height:0;
                border:6px solid transparent;
              }
              &::before{
                right:-11px;
                // border-right-color:rgba(245,245,245,1);
                border-left-color:#FFB186;
                z-index:1
              }
              // &::after{
              //   left:-12px;
              //   border-right-color :#FFB186;
              //   z-index:0
              // }

            }
          }
        }
      }
      .chat-bottom{
        height: 23%;
        width: 100%;
        padding: 15px 30px 10px;
        border-top: 1px solid #E5E5E5;
        border-right: 1px solid #E5E5E5;
        .chat-type{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .type-left{
            font-size: 17px;
            .iconfont{
              margin-right: 22px;
            }
          }
          .type-right{

          }
        }
        .chat-send{
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .chat-content{
            border: none;
            border-radius: 0;
            width: 410px;
            height: 46px;
          }
          .chat-sendbtn{
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
            width:58px;
            height:28px;
            background:rgba(243,115,45,1);
            border-radius:14px;
            cursor: pointer;
          }
        }
      }
    }
    .chat-right{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      .chat-history{
        .history-list{
          display: flex;
          flex-direction: column;
          .history-date{
            display: block;
            color: #999999;
            font-size: 14px;
            margin: 10px 0;
          }
          .history-content{
            display: block;
            color: #333;
            font-size: 14px;
            margin-bottom: 20px;
          }
        }
      }
      .chat-sendbtn{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        width:58px;
        height:28px;
        background:rgba(243,115,45,1);
        border-radius:14px;
        cursor: pointer;
      }
    }
    .el-scrollbar__bar.is-horizontal{
      height: 0;
    }
  }
}
</style>


