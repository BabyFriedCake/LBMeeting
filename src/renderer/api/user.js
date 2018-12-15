import request from '@/utils/request'
import qs from 'qs'

//  用户登录
export function login (loginInput, password, loginClient) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: qs.stringify({
      loginInput,
      password,
      loginClient
    })
  })
}
//  登录后获取token
// export function getInfo (userId) {
//   return request({
//     url: '/sys/getInfoByLoginId',
//     method: 'post'
//     // data: qs.stringify({
//     // })
//   })
// }
//  个人登录后获取模拟接口token
export function getInfo () {
  return request({
    url: '/sys/getInfoByLoginId',
    method: 'post'
    // data: qs.stringify({
    // })
  })
}

// 获取已申请和已加入的企业
export function getMyCompany (userId) {
  return request({
    url: '/sys/getCompanyListOfUser',
    method: 'post',
    data: qs.stringify(userId)
  })
}
// 设置常用企业
export function setDefaultCompany (userId) {
  return request({
    url: '/sys/setDefaultCompany',
    method: 'post',
    data: qs.stringify(userId)
  })
}
// 取消设置常用企业
export function resetDefaultCompany (param) {
  return request({
    url: '/sys/resetDefaultCompany',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 验证旧密码
export function validateOldPass (param) {
  return request({
    url: '/sys/checkPwd',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 修改密码
export function modifyPass (param) {
  return request({
    url: '/sys/modifyPwd',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 修改头像信息
export function modifyPic (param) {
  return request({
    url: '/sys/modifyPwd',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 设置个人姓名
export function setUserName (param) {
  return request({
    url: '/user/setName',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 设置企业姓名
export function setCompanyName (param) {
  return request({
    url: '/company/updateCompanyInfo',
    method: 'post',
    data: qs.stringify(param)
  })
}

//  退出登录
export function logout () {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}

// 更新新手引导步骤
export function userGuide (param) {
  return request({
    url: '/sys/updateTips',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 关闭新手引导步骤
export function closeGuide (param) {
  return request({
    url: '/sys/closeTips',
    method: 'post',
    data: qs.stringify(param)
  })
}

//  获取个性化登录界面
export function getLoginLogo (param) {
  return request({
    url: '/sys/getCompanyConfig',
    method: 'post',
    data: qs.stringify(param)
  })
}

//  Web端获取openId与unionId
export function webGetOpenId (param) {
  return request({
    url: '/weixin/webGetOpenId',
    method: 'post',
    data: qs.stringify(param)
  })
}

//  APP 端微信登录
export function webLogin (param2) {
  return request({
    url: '/weixin/webLogin',
    method: 'post',
    data: qs.stringify(param2)
  })
}
//  个人信息
export function getInfoByPerson () {
  return request({
    url: '/user/getInfoByPerson',
    method: 'post'
    // data: qs.stringify(param)
  })
}
//  微信绑定账号
export function wxBindUser (param) {
  return request({
    url: '/weixin/wxBindUser',
    method: 'post',
    data: qs.stringify(param)
  })
}
