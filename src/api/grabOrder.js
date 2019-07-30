import request from '@/utils/request'

export function fetchOrdersByParkingBoyId() {
  return request({
    url: `/clerks/orders`,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    method: 'get',
  })
}

export function updateOrdersClerkIdAndStatus(data) {
  return request({
    url: '/orders',
    method: 'put',
    data
  })
}
