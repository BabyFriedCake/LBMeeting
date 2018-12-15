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
		    <el-scrollbar ref="elscrollbar" class="page-component__scroll">
          <div class="chat-top" style="height:100%">
            <div class="chat-list" v-for="(item, index) in recordsHistory" :key="index">
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
          <span class="chat-sendbtn" @click="searchMsg">搜索456</span>
          <textarea v-model="content" class="chat-content" cols="30" rows="10" @keyup.enter="sendMsg" @keyup.ctrl.enter="setNewLine"></textarea>
          <span class="chat-sendbtn" @click="sendMsg">发送</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 库
import md5 from 'js-md5'
import messages from '@/module/newMessage.js'
import { transferDate } from '@/utils/validate.js'
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
    recordsHistory: function (newQuestion, oldQuestion) {
      // $('.el-scrollbar__wrap').scrollTop(900)
      // div.scrollTop = div.scrollHeight
      // console.info(789, $('.el-scrollbar__wrap').scrollTop())
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
      recordsHistory: [],
      visibleRecords: false,
      transferDate: null
    }
  },
  methods: {
    click () {
      console.info(111)
    },
    // scrollToBottom () {
    //   this.$nextTick(() => {
    //     var div = document.getElementClassName('el-scrollbar__wrap')
    //     console.info(123, div)
    //     div.scrollTop = div.scrollHeight
    //   })
    // },
    initWebpack () {
      // console.info(1, div.scrollHeight)
      // console.info(2, div.scrollTop)
      // $('.chat-top').scrollTop(300)
      // $('.el-scrollbar__view').scrollTop(300)
      // $('.el-scrollbar__wrap').scrollTop(300)
      // $('.el-scrollbar').scrollTop(300)
      // document.getElementsByClassName('el-scrollbar__wrap')[0].addEventListener('scroll', (ddd, aaa) => {
      //   console.info(1, $('.el-scrollbar__wrap').scrollTop())
      // })
      this.transferDate = transferDate
      const { token, userInfo } = this.$store.getters
      const timestamp = Date.parse(new Date())
      const rand = Math.random().toString().slice(-8)
      const version = '1.0'
      const userId = userInfo.user ? userInfo.user.userID : userInfo.company.companyId
      console.info(111, userId)
      const userkey = 'LUOBO_' + md5(`${userId}2`).toUpperCase()
      const signature = md5(rand + timestamp + token + version).toUpperCase()
      this.message = messages.lookup('Message')
      this.chat = messages.lookup('MessageBody')
      // console.log(this.req)
      // const wsuri = 'ws://172.26.1.200:5566/im?signature=10065E1537D3075CC9CB40B5E517B969&timestamp=123456&userkey=LUOBO_10933D39E14BB7DB5952CACBEAF65BD2&rand=123456&version=1.0'
      const wsuri = `ws://172.26.1.200:5566/im?signature=${signature}&timestamp=${timestamp}&userkey=${userkey}&rand=${rand}&version=${version}`
      this.websock = new WebSocket(wsuri)// 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
      this.userId = userId
      // 创建本地数据库
      // 获取数据库
      var request = window.indexedDB.open('chat', 1)
      var db
      // 创建数据库、新建索引
      request.onsuccess = (event) => {
        db = request.result
        this.db = db
        this.readAll()
        console.log('数据库打开成功', event)
      }
      request.onupgradeneeded = function (event) {
        var objectStore
        db = event.target.result
        // console.log(2, db)
        if (!db.objectStoreNames.contains('person')) {
          // 创建表结构
          objectStore = db.createObjectStore('person', { autoIncrement: true })
          // 建立索引
          objectStore.createIndex('cmd', 'cmd', { unique: false })
          objectStore.createIndex('from', 'from', { unique: false })
          objectStore.createIndex('to', 'to', { unique: false })
          objectStore.createIndex('time', 'time', { unique: false })
          objectStore.createIndex('content', 'content', { unique: false })
          objectStore.createIndex('type', 'type', { unique: false })
          objectStore.createIndex('groupid', 'groupid', { unique: false })
          objectStore.createIndex('extend', 'extend', { unique: false })
          console.log('数据库创建成功', objectStore)
        }
      }
    },
    websocketopen () { // 打开
      console.log('WebSocket连接成功')
    },
    websocketonmessage (e) { // 数据接收
      console.log(e)
      var reader = new FileReader()
      reader.readAsArrayBuffer(e.data)
      var self = this
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
        self.records.push(receiveMsg)
        self.add(receiveMsg)
      }
    },
    websocketclose () { // 关闭
      console.log('WebSocket关闭')
    },
    websocketerror () { // 失败
      console.log('WebSocket连接失败')
    },
    websocketsend (userId, content) {
      var self = this
      const time = new Date().getTime().toString()
      var messages = this.message.create({
        cmd: '0',
        from: userId,
        to: '2c9aeacb674de3d901674de3d9b80001',
        time: time,
        data: this.chat.create({
          content,
          type: '1'
        })
      })
      this.websock.send(this.message.encode(messages).finish())
      this.add(messages)
      self.records.push(messages)
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
      console.info(111)
    },
    // 新增数据
    add (messages) {
      console.info(111, messages)
      const { db } = this
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add({
          cmd: messages.cmd,
          from: messages.from,
          to: messages.to,
          time: messages.time,
          content: messages.data.content,
          type: messages.data.type
        })

      request.onsuccess = (event) => {
        console.log('数据写入成功')
        this.readAll()
      }

      request.onerror = (event) => {
        console.log('数据写入失败')
      }
    },
    // 读取数据
    read () {
      const { db } = this
      var transaction = db.transaction(['person'])
      console.info(222, transaction)
      var objectStore = transaction.objectStore('person')
      var request = objectStore.get(1)

      request.onerror = (event) => {
        console.log('事务失败')
      }

      request.onsuccess = (event) => {
        if (request.result) {
          alert('数据读取成功', request.result)
        } else {
          console.log('未获得数据记录')
        }
      }
    },
    // 读取所有数据
    readAll () {
      const { db } = this
      const self = this
      const records = []
      var objectStore = db.transaction('person').objectStore('person')

      objectStore.openCursor().onsuccess = (event) => {
        var cursor = event.target.result
        if (cursor) {
          console.info('遍历所有数据：', cursor.value.content)
          if (cursor.value.content === '345') {
            records.push(cursor.value)
          }
          cursor.continue()
        } else {
          self.recordsHistory = records
          console.info('遍历所有数据：', self.recordsHistory)
          // return records
        }
      }
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
    height: 92%;
    /*全局滚动条美化*/
  .el-scrollbar{
    width: 68%;
    height: 77%;
    border-right: 1px solid #E5E5E5;
    .chat-top{
      // width: 68%;
      // height: 428px;
      // overflow: hidden;
      // overflow-y: scroll;
      padding: 32px 30px 0;
      // border-right: 1px solid #E5E5E5;
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
      width: 68%;
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
        }
      }
    }
    .el-scrollbar__bar.is-horizontal{
      height: 0;
    }
  }
}
</style>


