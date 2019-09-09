import request from '@/utils/request'

// 商品管理---获取数据
export function fetchMemberMgrList(query) {
  return request({
    url: '/sub/memberMgr/queryMemberList',
    method: 'post',
    data: query
  })
}

// 会员卡信息查询
export function fetchCardList(query) {
  return request({
    url: '/sub/memberMgr/queryMemberCardList',
    method: 'post',
    data: query
  })
}

// 订单记录查询
export function fetchOrderList(query) {
  return request({
    url: '/sub/memberMgr/queryOrderList',
    method: 'post',
    data: query
  })
}

// 核销记录查询
export function queryCustomerVerify(query) {
  return request({
    url: '/sub/memberMgr/queryCustomerVerify',
    method: 'post',
    data: query
  })
}
