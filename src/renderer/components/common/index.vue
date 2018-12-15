<template>
   <div id="wrapper">
    <div>{{res}}</div>
    <input v-model="val">
    <!-- <button @click="con">连接</button> -->
    <button @click="websocketsend">提交</button>
    <el-button @click="toStyle">组件样式</el-button>
    <router-link to="/themeDemo">222</router-link>
  </div>
</template>
<script>
  import messages from '@/module/newMessage.js'
  import { openNewWindow } from '@/utils/function.js'
  export default {
    data () {
      return {
        websock: null,
        res: '',
        val: '',
        message: null, // 总体消息
        chat: null, // 聊天信息
        userId: '33333'
        // receiveUserId: '22222'
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
          self.res = message.content
          console.log(message)
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
        var messages = this.message.create({
          cmd: '0',
          from: self.userId,
          to: '11111,333',
          time: '2018-12-12',
          data: this.chat.create({
            content: self.val,
            type: '0'
          })
        })
  /*eslint-disable*/ 
  // debugger
        // console.log(messages)
        this.websock.send(this.message.encode(messages).finish())
      },
      handleStream (stream) {
        const video = document.getElementById('dd')
        video.srcObject = stream
        video.onloadedmetadata = (e) => video.play()
      },
      handleError (e) {
        console.log(e)
      },
      toStyle () {
        // browserWindow 配置
        const windowConfig = {
          params: 'themeDemo',
          width: 1200,
          height: 900
        }
        // browserWindow 成功回调、事件处理（详看api）
        openNewWindow(windowConfig)
          .then((win) => {
            win.on('close', function () {
              console.info('窗口关闭')
              win = null
            })
          })
      }  
    },
    mounted () {
    }
  }
</script>

