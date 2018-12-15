import request from '@/utils/request'
import qs from 'qs'

// 获取会议室列表
export function getMeetingCenterList (param) {
  return request({
    url: '/meeting/moPageList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// // 获取全部部门列表
// export function getAllDepartmentList (param) {
//   return request({
//     url: '/department/getAllForSelect',
//     method: 'post',
//     data: qs.stringify(param)
//   })
// }
//  获取、搜索员工
export function getUsersGroupByDepartment (param) {
  return request({
    url: '/company/getUsersGroupByDepartments',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 会议详情
export function meetingDetailFn (param) {
  return request({
    url: '/meeting/moInfo',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 取消会议
export function meetingCancel (param) {
  return request({
    url: '/meeting/cancelMeetingOrder',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 创建会议
export function createMeeting (param) {
  return request({
    url: '/meeting/moCreate',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 固定会议室号
export function getMeetingCode (param) {
  return request({
    url: '/company/getMeetingRoomByCompanyId',
    method: 'post',
    data: qs.stringify(param)
  })
}

// //附件上传
// export function upload () {
//   return request({
//     url: '/company/getMeetingRoomByCompanyId',
//     method: 'post',
//   })
// }

// 个人云盘列表

export function getCloudList (param) {
  return request({
    url: '/cloud/getCloudDiskList',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 从云盘上传到附件
export function uploadFileToCompanySpace (data) {
  return request({
    url: '/cloud/uploadFileToCompanySpace',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 验证会议室是否被占用
export function meetingRoomAvailable (data) {
  return request({
    url: '/meeting/meetingRoomAvailable',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 本地上传文件删除
export function attDelete (param) {
  return request({
    url: '/meeting/attDelete',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 获取多个企业的固定会议室
export function getMultipe (param) {
  return request({
    url: '/company/getMeetingRoomByCompanyIds',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 获取多个企业部门组织架构
export function getMultipeCompanyOrg (param) {
  return request({
    url: '/company/getUsersGroupByDepartments',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 关闭新手引导
export function closeGuide (param) {
  return request({
    url: '/sys/closeTips',
    method: 'post',
    data: qs.stringify(param)
  })
}

// 获取临时分组列表
export function getMeetingGroupList () {
  return request({
    url: '/company/getMeetingGroupList',
    method: 'post'
  })
}
// 删除临时分组
export function delMeetingGroup (param) {
  return request({
    url: '/company/delMeetingGroup',
    method: 'post',
    data: qs.stringify(param)
  })
}

// // 添加临时分组
// export function addMeetingGroup (param) {
//   return request({
//     url: '/company/addMeetingGroup',
//     method: 'post',
//     data: qs.stringify(param)
//   })
// }

// 获取已加入的多个企业列表
export function joinedCompany (param) {
  return request({
    url: '/sys/getAllJoinedCompaniesByUserId',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 获取群组列表
export function groupList (param) {
  return request({
    url: '/company/queryMGList',
    method: 'post',
    data: qs.stringify(param)
  })
}
// 创建群组
export function addMeetingGroup (param) {
  return request({
    url: '/company/addMeetingGroup',
    method: 'post',
    data: qs.stringify(param)
  })
}
