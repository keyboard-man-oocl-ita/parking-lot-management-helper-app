import request from '@/utils/request'

export function fetchHistoryOrdersByParkingBoyId(status) {
  return request({
    url: `/orders?status=${status}`,
    method: 'get',
  })
}
