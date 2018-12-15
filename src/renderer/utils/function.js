import {
  Message
} from 'element-ui'
const {
  BrowserWindow
} = require('electron').remote
const ipcRenderer = require('electron').ipcRenderer
const {webContents} = require('electron').remote

// const { ipcRenderer } = require('electron')
export function openNewWindow (windowConfig, callback) {
  const newWindow = new Promise((resolve, reject) => {
    try {
      const modalPath = process.env.NODE_ENV === 'development' ? `http://localhost:9080/#/${windowConfig.params}` : `file://${__dirname}/index.html#${windowConfig.params}`
      // browserWindow 配置
      let win = new BrowserWindow({
        x: windowConfig.x,
        y: windowConfig.y,
        title: windowConfig.title,
        icon: windowConfig.icon,
        modal: windowConfig.modal, // 窗口模态显示
        center: windowConfig.center, // 窗口在屏幕居中
        resizable: windowConfig.resizable, // 窗口是否可以改变尺寸 默认 true
        movable: windowConfig.movable,
        width: windowConfig.width, // 宽
        height: windowConfig.height, // 高
        fullscreen: windowConfig.fullscreen, // 窗口是否全屏 默认 false
        alwaysOnTop: windowConfig.alwaysOnTop, // 窗口是否永远在别的窗口的上面
        skipTaskbar: windowConfig.skipTaskbar,
        backgroundColor: windowConfig.backgroundColor, // 窗口背景色
        // ......
        webPreferences: { // 网页功能的设置
          devTools: windowConfig.devTools || true, // 是否开启 DevTools 默认为false
          webSecurity: windowConfig.webSecurity // 是否禁用同源策略 默认为true
          // ......
        },
        frame: windowConfig.frame, // 无边框窗口
        transparent: windowConfig.transparent // 透明窗口
      })
      // ipc.send('params', windowConfig.params)
      win.loadURL(modalPath)
      win.webContents.on('did-finish-load', function () {
        if (callback) {
          callback()
        }
      })

      resolve(win)
    } catch (e) {
      reject(e)
    }
  })
  return newWindow
}
export function transferTo (url, channel, data) { // url:路由 , //channel:自定义传送通道, data:要传的数据
  /*eslint-disable*/
  debugger 
  var allWebContents = webContents.getAllWebContents()
  for (var i = 0; i < allWebContents.length; i++) {
    if (allWebContents[i].getURL().indexOf(url) > -1) {
      ipcRenderer.sendTo(allWebContents[i].id, channel, data)
    }
  }
}
export function acceptData (channel, callback) {

  ipcRenderer.on(channel, function (e, args) {    
    callback(args)
  })
}
// 下载文件
const http = require('http')
const fs = require('fs')
export function downloadFile (url, path, isBase64 = false) {
  if (!isBase64) {
    // 网络资源保存
    http.get(url, res => {
      res.setEncoding('binary')
      let fileData = ''
      res.on('data', chunk => {
        fileData += chunk
      })
      res.on('end', () => {
        fs.writeFile(path, fileData, 'binary', err => {
          if (err) {
            console.error(err)
          }
        })
      })
    })
  } else {
    // 保存base64图片
    let imgData = url
    // 过滤data:URL
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')
    let dataBuffer = Buffer.from(base64Data, 'base64')
    fs.writeFile(path, dataBuffer, err => {
      if (err) {
        console.error(err)
      }
    })
  }
}
export function failure (txt) {
  Message({
    message: txt,
    type: 'error',
    duration: 3 * 1000,
    center: true,
    customClass: 'errorMes'
  })
}
export function success (txt) {
  Message({
    message: txt,
    type: 'success',
    duration: 3 * 1000,
    center: true,
    customClass: 'sucessMes'
  })
}
