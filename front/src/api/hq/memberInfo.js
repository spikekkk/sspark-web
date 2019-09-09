import request from '@/utils/request'

// 会员管理---获取会员数据
export function fetchMemberMgrList(query) {
  return request({
    url: '/hq/memberMgr/queryMemberList',
    method: 'post',
    data: query
  })
}

// 会员卡信息查询
export function fetchCardList(query) {
  return request({
    url: '/hq/memberMgr/queryMemberCardList',
    method: 'post',
    data: query
  })
}

// 订单记录查询
export function fetchOrderList(query) {
  return request({
    url: '/hq/memberMgr/queryOrderList',
    method: 'post',
    data: query
  })
}

// 核销记录查询
export function queryCustomerVerify(query) {
  return request({
    url: '/hq/memberMgr/queryCustomerVerify',
    method: 'post',
    data: query
  })
}
