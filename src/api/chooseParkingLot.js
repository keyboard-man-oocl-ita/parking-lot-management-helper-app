import request from '@/utils/request'

export function getParkingLotsByParkingBoyId() {
    return request({
        url: "/parkingBoys/parkingLots",
        method: 'get'
    })
}

export function updateOrdersParkingLotAndStatus(data) {
    return request({
        url: `/orders`,
        method: 'put',
        data
    })
}