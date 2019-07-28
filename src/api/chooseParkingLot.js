import request from '@/utils/request'

export function getParkingLotsByParkingBoyId(id) {
    return request({
        url: `/parkingLots/${id}`,
        method: 'get'
    })
}

export function updateOrdersParkingLotAndStatus(order) {
    return request({
        url: `/orders/${order.id}`,
        method: 'put',
        body: order
    })
}