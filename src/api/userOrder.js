import request from '@/utils/request'

export function fetchUserOrder(id) {
  return request({
    url: `/orders?userId=${id}`,
    method: 'get',
  })
}

export function updateOrderStatusByUserId(data) {
  return request({
    url: `/orders/${data.orderId}`,
    method: 'patch',
    data: {
      status: data.status
    }
  })
}
