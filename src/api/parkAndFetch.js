import request from '@/utils/request'

export function getOrderList(id) {
  return request({
    url: `/orders?clerkId=${id}&status=1`,
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
