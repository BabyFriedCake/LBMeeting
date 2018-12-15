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
        <el-input v-model="searchResult" @keyup.enter="searchData"></el-input>
        <span class="chat-sendbtn" @click="searchData">搜索</span>
      </div>
    </div>
  </div>
</template>
<script>
// 库
import md5 from 'js-md5'
// import messages from '@/module/newMessage.js'
import { transferDate } from '@/utils/validate.js'
// import $ from 'jquery'
// 组件
import MessageBtn from '@/components/common/MessageBtn'
import defaultImg from '@/assets/images/vip.png'
// import Dexie from 'dexie'
let totalRecord = ''
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
    initWebpack () {
      console.info(1, this)
      this.transferDate = transferDate
      const { token, userInfo } = this.$store.getters
      const timestamp = Date.parse(new Date())
      const rand = Math.random().toString().slice(-8)
      const version = '1.0'
      const userId = userInfo.user ? userInfo.user.userID : userInfo.company.companyId
      const userkey = 'LUOBO_' + md5(`${userId}2`).toUpperCase()
      const signature = md5(rand + timestamp + token + version).toUpperCase()
      // const wsConfig = {
      //   signature,
      //   timestamp,
      //   userkey,
      //   rand,
      //   version
      // }
      // this.onOpenWS()
      // this.message = messages.lookup('Message')
      // this.chat = messages.lookup('MessageBody')
      const wsuri = `ws://172.26.1.200:5566/im?signature=${signature}&timestamp=${timestamp}&userkey=${userkey}&rand=${rand}&version=${version}`
      let websocket = new WebSocket(wsuri)// 这里面的this都指向vue
      this.onOpenWS(websocket)
      // this.websock.onopen = this.websocketopen
      // this.websock.onmessage = this.websocketonmessage
      // this.websock.onclose = this.websocketclose
      // this.websock.onerror = this.websocketerror
      // this.userId = userId
      // // 创建本地数据库 or 获取数据库
      // const db = new Dexie('Chat')
      // db.version(1).stores({
      //   friends: '++id,from,to,time,content,type,groupid,extend'
      // })
      // db.transaction('rw', db.friends, async () => {
      //   this.db = db
      //   this.readAll()
      // }).catch(e => {
      //   console.info(e.stack || e)
      // })
    },
    websocketopen () { // 打开
      console.log('WebSocket连接成功')
    },
    websocketonmessage (e) { // 数据接收
      console.log(e)
      var reader = new FileReader()
      reader.readAsArrayBuffer(e.data)
      // var self = this
      reader.onload = function (event) {
        var content = reader.result
        const code = new Uint8Array(content)
        const decoded = self.message.decode(code)
        const message = self.message.toObject(decoded, {
          longs: String,
          enums: String,
          bytes: String
        })
        console.log('收到消息：', message)
        const receiveMsg = JSON.parse(JSON.stringify(message))
        console.log('收到消息深拷贝：', receiveMsg)
        // self.records.push(receiveMsg)
        // self.add(receiveMsg)
      }
    },
    websocketclose () { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror () { // 失败
      console.log('WebSocket连接失败')
    },
    websocketsend (userId, content) {
      // var self = this
      const time = new Date().getTime().toString()
      var messages = this.message.create({
        cmd: '0',
        from: userId,
        to: '2c9aeacb674dfc9501674e0f19b7010f',
        time: time,
        data: this.chat.create({
          content,
          type: '1'
        })
      })
      this.websock.send(this.message.encode(messages).finish())
      this.add(messages)
      this.records.push(messages)
      this.exampleContent = ''
    },
    // 发送消息
    sendMsg () {
      const { content, userId } = this
      if (content.trim() !== '') {
        this.websocketsend(userId, content.trim())
        this.content = ''
      }
    },
    // 搜索消息
    searchMsg () {
      const { db } = this
      var transaction = db.transaction(['person'], 'readonly')
      var store = transaction.objectStore('person')
      var index = store.index('content')
      console.info('index', index)
      // console.info('getAllKeys', store.getAll(IDBKeyRange.bound(1, 4)))
      var request = index.get('345')
      request.onsuccess = function (e) {
        var result = e.target.result
        if (result) {
          console.info('result', result)
        } else {
          console.info('result', 1111)
        }
      }
    },
    setNewLine () {
      this.read()
    },
    // 新增数据
    async add (messages) {
      console.info(111, messages)
      const { db } = this
      let id = await db.friends.add(
        {
          cmd: messages.cmd,
          from: messages.from,
          to: messages.to,
          time: messages.time,
          content: messages.data.content,
          type: messages.data.type
        }
      )
      if (id > 0) {
        console.log('数据写入成功', id)
        this.readAll()
      } else {
        console.log('数据写入失败')
      }
    },
    // 搜索历史记录
    async searchData () {
      const { db, searchResult } = this
      const historyRecord = await db.friends.where({content: searchResult}).toArray()
      let jsonArr = []
      historyRecord.map((i) => jsonArr.push(i))
      this.historyRecord = jsonArr
      console.info('historyRecord', jsonArr)
    },
    // 读取所有聊天消息
    async readAll () {
      const { db, pageSize } = this
      totalRecord = await db.friends.orderBy('time').reverse().limit(pageSize).toArray()
      if (totalRecord.length > 0) {
        this.loading = true
      } else {
        this.loading = false
      }
      let jsonArr = []
      totalRecord.reverse().map((i) => jsonArr.push(i))
      this.totalRecord = jsonArr
    },
    async checkMoreRecord () {
      const { pageSize } = this
      this.loading = false
      this.pageSize = pageSize + 5
      this.loadingStatus = true
      this.readAll()
    },
    // 更新数据
    update () {
      const { db } = this
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' }, 1)

      request.onsuccess = function (event) {
        console.log('数据更新成功')
      }

      request.onerror = function (event) {
        console.log('数据更新失败')
      }
    },
    // 删除数据
    remove () {
      const { db } = this
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .delete(7)

      request.onsuccess = function (event) {
        console.log('数据删除成功')
      }
    },
    // 删除数据库所有记录
    removeDatabase () {
      const { db } = this
      var DBDeleteRequest = db.transaction('person').objectStore('person').clear()
      DBDeleteRequest.onerror = function (event) {
        console.log('数据库删除失败')
      }
      DBDeleteRequest.onsuccess = function (event) {
        console.log('数据库删除成功')
      }
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


