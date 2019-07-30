import request from '@/utils/request'

export function getOrderList() {
  return request({
    url: `/orders?status=1`,
    method: 'get',
  })
}

export function updateOrdersStatus(data) {
  return request({
    url: `/orders`,
    method: 'put',
    data
  })
}
