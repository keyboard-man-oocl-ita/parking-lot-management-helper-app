import request from '@/utils/request'

export function fetchUserProfile() {
  return request({
    url: `/users`,
    method: 'get',
  })
}