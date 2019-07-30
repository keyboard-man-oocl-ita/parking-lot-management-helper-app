import request from '@/utils/request'

export function userRegister(userInfo) {
  return request({
    url: `users`,
    method: 'post',
    data:userInfo
  })
}