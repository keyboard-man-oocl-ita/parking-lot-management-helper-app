import request from '@/utils/request'

export function fetchUserOrder() {
  return request({
    url: `/users/orders`,
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
