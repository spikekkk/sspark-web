import request from '@/utils/request'

// 订单管理---获取数据
export function fetchOrderMgrList(query) {
  return request({
    url: '/hq/orderMgr/queryOrderList',
    method: 'post',
    data: query
  })
}

// 订单管理---获取员工数据
export function fetchEmployeeList(query) {
  return request({
    url: '/hq/orderMgr/queryShopEmployeeList',
    method: 'post',
    data: query
  })
}

// 订单管理---获取门店数据
export function fetchShopMgrList(query) {
  return request({
    url: '/hq/orderMgr/queryShopList',
    method: 'post',
    data: query
  })
}
