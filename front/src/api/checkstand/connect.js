import request from '@/utils/request'

// 交接班----交接班信息详情查询
export function fetchConnectClass() {
  return request({
    url: '/checkstand/connect/connectClass',
    method: 'post',
    data: {}
  })
}

// 交接班----交接班确定新增信息
export function connectInfoSub(data) {
  return request({
    url: '/checkstand/connect/connectOut',
    method: 'post',
    data: data
  })
}

// 交接班----打印
export function connectPrint(data) {
  return request({
    url: '/checkstand/connect/connectPrint',
    method: 'post',
    data: data
  })
}

// 会员注册
export function addCustomer(data) {
  return request({
    url: '/checkstand/connect/addCustomer',
    method: 'post',
    data: data
  })
}
