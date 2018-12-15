import request from '@/utils/request'
import qs from 'qs'

// 反馈信息提交
export function feedbackInfo (param) {
  return request({
    url: 'contcat/createFeedback',
    method: 'post',
    data: qs.stringify(param)
  })
}
