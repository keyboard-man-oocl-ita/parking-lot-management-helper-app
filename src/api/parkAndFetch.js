import request from '@/utils/request'

export function getOrderList(id) {
  return request({
    url: `/orders/${id}`,
    method: 'get',
  })
}

