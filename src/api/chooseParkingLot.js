import request from '@/utils/request'

export function getParkingLotsByParkingBoyId(id) {
    return request({
        url: `/parkingLots/${id}`,
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