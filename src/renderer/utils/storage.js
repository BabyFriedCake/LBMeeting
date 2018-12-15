
// 获取cookie
export function getCookie (name) {
  var arr
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) { return (arr[2]) } else { return null }
}

// 设置cookie
export function setCookie (cname, value, expiredays, path = '/') {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  // 存贮对象时
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  document.cookie = cname + '=' + encodeURI(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + ';path=' + path
}

// 删除cookie
export function delCookie (name) {
  setCookie(name, '', -1)
}
