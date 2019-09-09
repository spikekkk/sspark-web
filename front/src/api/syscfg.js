import request from '@/utils/request'

export function modifyOrg(data) {
  return request({
    url: '/vue/syscfg/modifyOrg',
    method: 'post',
    data: data
  })
}

export function loadOrg() {
  return request({
    url: '/vue/syscfg/loadOrg',
    method: 'post'
  })
}

export function fetchSeats(query) {
  return request({
    url: '/vue/syscfg/seats',
    method: 'post',
    data: query
  })
}

export function mergeSeat(data) {
  return request({
    url: '/vue/syscfg/mergeSeat',
    method: 'post',
    data: data
  })
}

export function allocSeat(data) {
  return request({
    url: '/vue/syscfg/allocSeat',
    method: 'post',
    data: data
  })
}

export function deleteSeat(seatId) {
  return request({
    url: `/vue/syscfg/deleteSeat/${seatId}`,
    method: 'post'
  })
}
