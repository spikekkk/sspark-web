import request from '@/utils/request'

// 统计---收银统计列表
export function fetchCashierList(data) {
  return request({
    url: '/checkstand/cashier/queryCashierList',
    method: 'post',
    data: data
  })
}

// 统计---核销统计列表
export function fetchCancelList(data) {
  return request({
    url: '/checkstand/cashier/queryCancelList',
    method: 'post',
    data: data
  })
}

// 充值流水查询（bu含导出）
export function rechargeFlow(data) {
  return request({
    url: '/checkstand/cashier/rechargeFlow',
    method: 'post',
    data: data
  })
}

// 充值流水查询（含导出）
export function rechargeFlowExcle(data) {
  return request({
    url: '/checkstand/cashier/rechargeFlowExcle',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
