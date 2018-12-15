import request from '@/utils/request'
import qs from 'qs'

// 预约会议--本地上传附件
export function uploadAtt (param, config) {
  return request({
    url: '/meeting/uploadAtt',
    method: 'post',
    config,
    data: param
  })
}
// exe-获取全部的exe的东西
export function getExeAllList (param) {
  return request({
    url: '/phoneBook/getExeAllList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// exe-获取企业部门详细信息
export function getDIForApp (param) {
  return request({
    url: '/department/getDIForApp',
    method: 'post',
    data: qs.stringify(param)
  })
}
// exe 通过关键字搜索公司内的联系人
export function getCCByKeyword (param) {
  return request({
    url: '/phoneBook/getCCByKeyword',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 预约会议—获取会议室
export function getRoomListQM (param) {
  return request({
    url: '/meeting/getRoomListQM',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 立即开会—召开会议—创建
export function createMeetingNow (param) {
  return request({
    url: '/meeting/createMeetingNow',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 会议中心列表
export function moPageList (param) {
  return request({
    url: '/meeting/moPageList',
    method: 'post',
    data: qs.stringify(param)
  })
}
