import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
import router from '@/router/index'
if (process.env.NODE_ENV === 'development') {
  process.env.BASE_API = 'http://172.26.1.203/api'
} else {
  process.env.BASE_API = 'https://m.troila.com/api'
}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000 // 请求超时时间
})

// 继承axios并发方法
service.all = axios.all
service.spread = axios.spread
// request拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  config.headers['version'] = '3_2' // 让每个请求携带自定义version
  // console.log(store)
  if (store.getters.token) {
    // console.log(1111111)
    config.headers['token'] = store.getters.token // 让每个请求携带自定义token
  } else {
    // console.log(2222222)
  }
  showFullScreenLoading()
  return config
}, error => {
// Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * state为非200是抛错
    */
    tryHideFullScreenLoading()
    const res = response.data
    if (res.state !== 200) {
      // 111:无效的token
      if (res.state === 201) {
        // store.originalDispatch('LogOut').then(() => {
        // debugger
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        // window.location.href = '/login'
        // })
      } else if (res.state === 529) { // 密码错误需重新修改
        return response.data
      } else if (res.state === 528) {
        // window.location.href = '/admin/findnone'
        router.push('/admin/findnone')
      } else if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8') { // 下载excel表格判定
        return response.data
      } else if (res.state === 1200) {
        router.push('/404')
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 2 * 1000,
          center: true,
          customClass: 'errorMes'
        })
        return Promise.reject(res)
      }
    } else {
      return response.data
    }
  },
  error => {
    tryHideFullScreenLoading()
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
