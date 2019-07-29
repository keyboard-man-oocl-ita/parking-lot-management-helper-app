import request from '@/utils/request'

export function fetchHistoryOrdersByParkingBoyId(id, status) {
  return request({
    url: `/orders?clerkId=${id}&status=${status}`,
    method: 'get',
  })
}
