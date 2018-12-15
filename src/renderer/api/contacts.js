import request from '@/utils/request'
import qs from 'qs'

// 获取全部的exe的东西
export function getExeAllList (param) {
  return request({
    url: '/phoneBook/getExeAllList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 修改好友昵称
export function updateBaseFriendNickName (param) {
  return request({
    url: '/phoneBook/updateBaseFriendNickName',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 添加联系人--通过手机号搜索
export function getCUByPhoneNum (param) {
  return request({
    url: '/phoneBook/getCUByPhoneNum',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 添加好友
export function addBaseFriend (param) {
  return request({
    url: 'phoneBook/addBaseFriend',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 删除好友
export function delBaseFriend (param) {
  return request({
    url: 'phoneBook/delBaseFriend',
    method: 'post',
    data: qs.stringify(param)
  })
}
