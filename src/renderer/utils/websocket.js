import messages from '@/module/newMessage.js'

let message = messages.lookup('Message')
let chat = messages.lookup('MessageBody')
let ws = ''

export default {
  install (Vue) {
    // 初始化WS
    Vue.prototype.initialWS = (wsConfig) => {
      const wsuri = `ws://172.26.1.200:5566/im?signature=${wsConfig.signature}&timestamp=${wsConfig.timestamp}&userkey=${wsConfig.userkey}&rand=${wsConfig.rand}&version=${wsConfig.version}`
      let websocket = new WebSocket(wsuri)
      ws = websocket
    }
    // 打开WS
    Vue.prototype.onOpenWS = () => {
      ws.onopen = () => {
        console.log('WebSocket连接成功')
      }
    }
    // 发送WS
    Vue.prototype.onSendWS = (cmd, userId, content, type) => {
      const time = new Date().getTime().toString()
      var messages = message.create({
        cmd,
        from: userId,
        to: '2c9aeacb674dfc9501674e0f19b7010f',
        time: time,
        data: chat.create({
          content: content.trim(),
          type
        })
      })
      ws.send(message.encode(messages).finish())
      return Promise.resolve(messages)
    }
    // 接收WS
    Vue.prototype.onMessageWS = () => {
      return new Promise(function (resolve, reject) {
        ws.onmessage = (e) => {
          console.log('收到消息：', e)
          var reader = new FileReader()
          reader.readAsArrayBuffer(e.data)
          reader.onload = (event) => {
            var content = reader.result
            const code = new Uint8Array(content)
            const decoded = message.decode(code)
            const messages = message.toObject(decoded, {
              longs: String,
              enums: String,
              bytes: String
            })
            const receiveMsg = JSON.parse(JSON.stringify(messages))
            console.log('收到消息：', receiveMsg)
            resolve(receiveMsg)
          }
        }
      })
    }
    // 关闭WS
    Vue.prototype.onCloseWS = () => {
      ws.onclose = function () {
        console.log('WebSocket关闭')
      }
    }
    // WS连接失败
    Vue.prototype.onErrorWS = () => {
      ws.onerror = function () {
        console.log('WebSocket连接失败')
        new Vue().initialWS()
      }
    }
  }
}
