import request from '@/utils/request'

export function appLogin(loginUser) {
  return request({
    url: `${loginUser.role}/login`,
    method: 'post',
    data:loginUser
  })
}
