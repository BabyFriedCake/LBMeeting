import request from '@/utils/request'
import qs from 'qs'

//  注册
export function register (params) {
  return request({
    url: '/sys/regist',
    method: 'post',
    data: qs.stringify(params)
  })
}
//  获取验证码
export function valicode (params) {
  return request({
    url: '/sys/sendValidCode',
    method: 'post',
    data: qs.stringify(params)
  })
}
//  验证手机验证码
export function checkValidCode (params) {
  return request({
    url: '/sys/checkValidCode',
    method: 'post',
    data: qs.stringify(params)
  })
}
//  验证企业名称
export function checkCompanyName (params) {
  return request({
    url: '/sys/checkCompanyName',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 验证企业账号
export function checkAccounts (params) {
  return request({
    url: '/sys/checkAccounts',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 验证个人手机号
export function checkMobile (params) {
  return request({
    url: '/sys/checkMobile',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 修改密码
export function findPwdUpdate (params) {
  return request({
    url: '/sys/findPwdUpdate',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 绑定已有账号
export function bindPlatformInfo (params) {
  return request({
    url: '/sys/bindPlatformInfo',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 添加咨询列表内容
export function createAdvisory (params) {
  return request({
    url: '/contcat/createAdvisory',
    method: 'post',
    data: qs.stringify(params)
  })
}
