import request from '@/utils/request'

export function userRegister(userInfo) {
  return request({
    url: `users/register`,
    method: 'post',
    data:userInfo
  })
}