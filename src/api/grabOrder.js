import request from '@/utils/request'

export function fetchOrdersByParkingBoyId(parkingBoyId) {
  return request({
    url: `/orders?parkingBoyId=${parkingBoyId}`,
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
