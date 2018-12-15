<template>
<div >
    <div :style="{width:chatWidht}">
      <p>聊天窗口</p>
      <ul id="chatWindow"  style="width:100%;height:313px;border-top:1px solid;border-bottom:1px solid;padding:0;margin:0;overflow:scroll;">
        <li v-for="item in records" :key="item.id">
          <p style="text-align:center;">时间：{{item.time | fillterTime}}</p>
          <div :class="[item.from!=userId?'left':'right']">
            <!-- <p>发送人：{{item.from}} 接收人：{{item.to}} 时间：{{item.time}}</p> -->
            <p>聊天内容：{{item.data.content}}</p>
          </div>
          
        </li>
      </ul>
      <div style="border-bottom:1px solid;">
        <el-button @click="getRecords">查看聊天记录</el-button>
      </div>
      <div style="position:relative;">
        <el-input type="textarea" rows="4" v-model.trim="exampleContent" @keyup.enter.native="handleSend"></el-input>
        <el-button style="position:absolute;bottom:0;right:0;" :round='false' @click="handleSend">发送</el-button>
      </div>
    </div>
    <div v-show="visibleRecords" id="recordsRef" style="width:300px;height:500px;border:1px solid;overflow:scroll;float:left;">
      <div  v-for="item in recordsHistory" :key="item.time"  :class="[item.from!=userId?'left':'right']">
         <p style="text-align:center;">时间：{{item.time | fillterTime}}</p>
      <!-- <p>发送人：{{item.from}} 接收人：{{item.to}} 时间：{{item.time}}</p> -->
      <p>聊天内容：{{item.data.content}}</p>
    </div>
    </div>
   
  <!-- <el-button @click="add">写入</el-button>
  <el-button @click="read">读取</el-button>
  <el-button @click="readAll">读取全部</el-button>
  <el-button @click="update">更新</el-button>
  <el-button @click="remove">删除</el-button>
  <el-button @click="removeDatabase">删除数据库</el-button> -->
</div>
</template>
<script>
import messages from '@/module/newMessage.js'
export default {
  data () {
    return {
      websock: null,
      message: null, // 总体消息
      chat: null, // 聊天信息
      userId: '33333',
      db: '',
      exampleContent: '',
      records: [],
      recordsHistory: [],
      visibleRecords: false
      // receiveUserId: '22222'
    }
  },
  watch: {
    records (val) {
      this.$nextTick(() => {
        document.getElementById('chatWindow').scrollTop = document.getElementById('chatWindow').scrollHeight
      })
    },
    recordsHistory (value) {
      if (value) {
        this.$nextTick(() => {
          document.getElementById('recordsRef').scrollTop = document.getElementById('recordsRef').scrollHeight
        })
      }
    }
  },
  computed: {
    chatWidht: function (value) {
      if (this.visibleRecords) {
        return 'calc( 100% - 305px )'
      } else {
        return '100%'
      }
    }
  },
  filters: {
    fillterTime: function (value) {
      if (!value) return
      const date = new Date(parseInt(value))
      let hours = date.getHours()
      if (hours - 9 < 0) {
        hours = '0' + hours
      }
      let minutes = date.getMinutes()
      if (minutes - 9 < 0) {
        minutes = '0' + minutes
      }
      let seconds = date.getSeconds()
      if (seconds - 9 < 0) {
        seconds = '0' + seconds
      }
      return hours + ':' + minutes + ':' + seconds
    }
  },
  methods: {
    initWebpack () {
      this.message = messages.lookup('Message')
      this.chat = messages.lookup('MessageBody')
      // console.log(this.req)
      const wsuri = 'ws://172.26.106.164:5566/im/' + this.userId
      this.websock = new WebSocket(wsuri)// 这里面的this都指向vue
      this.websock.onopen = this.websocketopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
      this.websock.onerror = this.websocketerror
      // 创建本地数据库
      // 获取数据库
      var request = window.indexedDB.open('Test6', 1)
      var db
      const that = this
      // 创建数据库、新建索引
      request.onsuccess = function (event) {
        db = request.result
        that.db = db
        console.log('数据库打开成功', event)
      }
      request.onupgradeneeded = function (event) {
        var objectStore
        db = event.target.result
        // console.log(2, db)
        if (!db.objectStoreNames.contains('person')) {
          objectStore = db.createObjectStore('person', { autoIncrement: true })
          console.log('数据库创建成功', objectStore)
          objectStore.createIndex('name', 'name', { unique: false })
          objectStore.createIndex('email', 'email', { unique: false })
          objectStore.createIndex('age', 'age', { unique: false })
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
    websocketsend () {
      var self = this
      const time = new Date().getTime().toString()
      var messages = this.message.create({
        cmd: '0',
        from: self.userId,
        to: '11111,333',
        time: time,
        data: this.chat.create({
          content: self.exampleContent,
          type: '0'
        })
      })
      this.websock.send(this.message.encode(messages).finish())
      this.add(messages)
      self.records.push(messages)
      this.exampleContent = ''
    },
    handleSend () {
      if (this.exampleContent) {
        this.websocketsend()
      } else {
      }
    },
    handleStream (stream) {
      console.log(123, stream)
      const video = document.getElementById('dd')
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    },
    handleError (e) {
      console.log(e)
    },
    getRecords () {
      this.visibleRecords = !this.visibleRecords
      this.readAll()
      // console.log('recordsHistory:', recordsHistory)
      // this.recordsHistory = []
      // this.recordsHistory = recordsHistory
    },
    // 新增数据
    add (messages) {
      const { db } = this
      var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add(messages)

      request.onsuccess = function (event) {
        console.log('数据写入成功')
      }

      request.onerror = function (event) {
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

      request.onerror = function (event) {
        console.log('事务失败')
      }

      request.onsuccess = function (event) {
        if (request.result) {
          console.log('Name: ' + request.result.name)
          console.log('Age: ' + request.result.age)
          console.log('Email: ' + request.result.email)
          alert('数据读取成功', request.result.name)
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

      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result
        console.info('cursor:', cursor)
        if (cursor) {
          records.push(cursor.value)
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
    // 获取数据库
    var request = window.indexedDB.open('Test6', 1)
    var db
    const that = this
    // 创建数据库、新建索引
    request.onsuccess = function (event) {
      db = request.result
      that.db = db
      console.log('数据库打开成功', event)
    }
    request.onupgradeneeded = function (event) {
      var objectStore
      db = event.target.result
      // console.log(2, db)
      if (!db.objectStoreNames.contains('person')) {
        objectStore = db.createObjectStore('person', { autoIncrement: true })
        console.log('数据库创建成功', objectStore)
        objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('email', 'email', { unique: false })
        objectStore.createIndex('age', 'age', { unique: false })
      }
    }
    // this.$Win.openWin({
    //   // browserwindow原生属性
    //   width: 700, // 窗口宽
    //   height: 600, // 窗口高
    //   // electron-vue-windows自定义的属性
    //   windowConfig: {
    //     router: '/user', // 路由 *必填
    //     // data: {id: 1}, // 传送数据
    //     name: 'user' // 窗口名称
    //   }
    // })
    // console.log(data)
  }
}
</script>
<style scoped>
.left p{
  text-align: left;
}
.right p{
  text-align: right;
}
</style>


