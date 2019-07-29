import request from '@/utils/request'

export function fetchHistoryOrdersByParkingBoyId(parkingBoyId, status) {
  return request({
    url: `/orders?parkingBoyId=${parkingBoyId}&status=${status}`,
    method: 'get',
  })
}
