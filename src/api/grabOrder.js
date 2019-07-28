import request from '@/utils/request'

export function fetchOrders(id) {
  return request({
    url: '/orders',
    method: 'get',
    params: id
  })
}

export function fetchParkingLots() {
  return request({
    url: '/parkingLots',
    method: 'get',
  })
}
