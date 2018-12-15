import Vue from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import App from './App'
import 'babel-polyfill'
import websocket from './utils/websocket.js'

import './assets/css/element'
import './assets/css/element/newElement.css'
import './assets/css/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(websocket)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
