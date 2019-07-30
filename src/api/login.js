import request from '@/utils/request'

export function appLogin(loginUser) {
  return request({
    url: `/auth`,
    method: 'post',
    data:loginUser
  })
}
