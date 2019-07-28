import request from '@/utils/request'

export function fetchOrdersByParkingBoyId(parkingBoyId) {
  return request({
    url: `/orders?parkingBoyId=${parkingBoyId}`,
    method: 'get',
  })
}
