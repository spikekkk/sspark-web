import request from '@/utils/request'

// 订单管理---获取数据
export function fetchOrderMgrList(query) {
  return request({
    url: '/sub/orderMgr/queryOrderList',
    method: 'post',
    data: query
  })
}

// 订单管理---获取数据
export function queryEmployeeList(query) {
  return request({
    url: '/sub/orderMgr/queryUserList',
    method: 'post',
    data: query
  })
}

