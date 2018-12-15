import request from '@/utils/request'
import qs from 'qs'

// 企业用户登录 全部会议室接口
export function getAllMeetingRoomCList (param) {
  return request({
    url: '/meeting/getAllMeetingRoomCList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 个人用户登录 全部会议室+筛选接口
export function getAllMeetingRoomPList (param) {
  return request({
    url: '/meeting/getAllMeetingRoomPList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 会议室—加入会议
export function enterNew (param) {
  return request({
    url: '/meeting/enterNew',
    method: 'post',
    data: qs.stringify(param)
  })
}
