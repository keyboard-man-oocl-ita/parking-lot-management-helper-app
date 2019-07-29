import request from '@/utils/request'

export function fetchHistoryOrdersByParkingBoyId(parkingBoyId) {
  return request({
    url: `/orders?parkingBoyId=${parkingBoyId}`,
    method: 'get',
  })
}
