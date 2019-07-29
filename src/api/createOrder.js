import request from '@/utils/request'

export function parkCarByUserIdAndCar(data) {
  return request({
    url: "/orders",
    method: 'post',
    data
  })
}

export function fetchCarByUserId(data) {
  return request({
    url: "/orders",
    method: 'put',
    data
  })
}