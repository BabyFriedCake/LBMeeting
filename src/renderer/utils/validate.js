/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 手机号 */
export function validateTelephone (str) {
  const reg = new RegExp('^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[012345678]|18[0-9]|14[579])[0-9]{8}$')
  return reg.test(str)
}
/* 4位验证码 */
export function validateCaptcha (str, count) {
  const reg = new RegExp('^\\d{' + count + '}$')
  return reg.test(str)
}
/* 直播间id验证数字 */
export function validateNum (str, count) {
  const reg = new RegExp('^\\d+$')
  return reg.test(str)
}
/* 企业电话 只包括数字 和- */
export function validatEnterphone (str) {
  const reg = new RegExp('^([0-9-]){8,40}$')
  return reg.test(str)
}
/* 邮箱 */
export function validateEmail (str) {
  const reg = new RegExp('^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$')
  return reg.test(str)
}
/* 企业账号 */
export function validateAccount (str) {
  /*eslint-disable*/
  const reg = new RegExp('^[a-zA-Z]([a-zA-Z0-9\.\_\@]){5,29}$')
  return reg.test(str)
}
/* 企业名称 */
export function validateName (str) {
  const reg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5_]+$')
  return reg.test(str)
}
/* 企业名称不超过20个字 */
export function validateUserName (str) {
  const reg = new RegExp('^[A-Za-z\u4e00-\u9fa5]{2,30}$')
  return reg.test(str)
}
/* 密码  数字或字母或者数字字母组合，符号包括@_ . 三个  最少6位，最长20位 */
export function validatePassword (str) {
  const reg = /^[\w@.]{6,18}$/
  return reg.test(str)
}
/* 密码  数字或字母或者数字字母组合，符号包括@_ . 三个  最少6位，最长20位 */
export function modiValidatePassword (str) {
  const reg = /^[\w@.]{6,20}$/
  return reg.test(str)
}
/* 字符串去除所有空格验证 且不能都是数字 */
export function validateStringRealy (str, min, max) {
  let newStr = ''
  if (str) {
    newStr = str.replace(/\s+/g, '')
  }
  if (newStr.length >= min && newStr.length <= max) {
    return true
  } else {
    return false
  }
}
/* 字符串去除前后空格验证 */
export function validateStringSide (str, min, max) {
  let newStr = ''
  if (str) {
    newStr = str.replace(/^\s+|\s+$/g, '')
  }
  if (newStr.length >= min && newStr.length <= max) {
    return true
  } else {
    return false
  }
}
/* 4-8位纯数字 */
export function validateHAPassword (str) {
  const reg = /[0-9]{4,8}$/
  return reg.test(str)
}
/// 格式化文件大小
export function formatFileSize (fileSize) {
  let temp
  if (fileSize < 1024) {
    return fileSize + 'B'
  } else if (fileSize < (1024 * 1024)) {
    temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  } else {
    temp = fileSize / (1024 * 1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'GB'
  }
}
//验证手机号和座机号
export function mobileTel (str) {
  const reg=/^([0-9-]){12}$|^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[012345678]|18[0-9]|14[579])[0-9]{8}$/
  return reg.test(str)
}

// 时间戳转时分秒

export const transferDate = (time, type = 1) => {
  let tag = ''
  tag = type === 1 ? '/' : '-'
  let date = new Date(time);
  const Y = date.getFullYear() + tag;
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + tag;
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  const h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
  const s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
  return (Y + M + D + h + m + s)
}