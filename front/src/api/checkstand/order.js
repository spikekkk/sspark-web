import request from '@/utils/request'

// 订单列表查询
export function getPurQueryList(data) {
  return request({
    url: '/checkstand/order/purQuery',
    method: 'post',
    data: data
  })
}
// 订单详情以及商品列表
export function getPurDetailQueryList(data) {
  return request({
    url: '/checkstand/order/purDetailQuery',
    method: 'post',
    data: data
  })
}
// 订单小票数据
export function getPurPrintQueryList(data) {
  return request({
    url: '/checkstand/order/purPrintQuery',
    method: 'post',
    data: data
  })
}
// 核销小票数据
export function getCancelPrintQueryList(data) {
  return request({
    url: '/checkstand/order/cancelPrintQuery',
    method: 'post',
    data: data
  })
}
// 退款
export function refund(data) {
  return request({
    url: '/checkstand/order/refund',
    method: 'post',
    data: data
  })
}
// 退款确认
export function refundConfirm(data) {
  return request({
    url: '/checkstand/order/refundConfirm',
    method: 'post',
    data: data
  })
}
// 门票核销小票打印
export function ticketPrint(data) {
  return request({
    url: '/checkstand/order/ticketPrint',
    method: 'post',
    data: data
  })
}
