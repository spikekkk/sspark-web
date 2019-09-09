import request from '@/utils/request'

// 数据统计---商品管理列表
export function spuStatList(data) {
  return request({
    url: '/sub/statistics/spuStatList',
    method: 'post',
    data: data
  })
}

// 数据统计---今日会员统计头部
export function custTodayStat(data) {
  return request({
    url: '/sub/statistics/custTodayStat',
    method: 'post',
    data: data
  })
}

// 数据统计---会员统计列表
export function custStat(data) {
  return request({
    url: '/sub/statistics/custStat',
    method: 'post',
    data: data
  })
}

// 数据统计---今日经营统计
export function businessTodayStat(data) {
  return request({
    url: '/sub/statistics/businessTodayStat',
    method: 'post',
    data: data
  })
}

// 数据统计---支付方式统计
export function spuStatPay(data) {
  return request({
    url: '/sub/statistics/spuStatPay',
    method: 'post',
    data: data
  })
}

// 数据统计---经营统计列表
export function businessStat(data) {
  return request({
    url: '/sub/statistics/businessStat',
    method: 'post',
    data: data
  })
}

// 数据统计--经营-统计导出
export function businessStatExport(data) {
  return request({
    url: '/sub/statistics/businessStatExport',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

// 数据统计--商品-统计导出
export function spuStatExport(data) {
  return request({
    url: '/sub/statistics/spuStatExport',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

// 充值流水查询（bu含导出）
export function rechargeFlow(data) {
  return request({
    url: '/sub/statistics/rechargeFlow',
    method: 'post',
    data: data
  })
}

// 充值流水查询（含导出）
export function rechargeFlowExcle(data) {
  return request({
    url: '/sub/statistics/rechargeFlowExcle',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

// 数据统计--收款方式累计
export function payTypeCumulative(data) {
  return request({
    url: '/sub/statistics/payTypeCumulative',
    method: 'post',
    data: data
  })
}

// 数据统计--收款方式列表
export function businessPayTypeCumulativeList(data) {
  return request({
    url: '/sub/statistics/businessPayTypeCumulativeList',
    method: 'post',
    data: data
  })
}

// 数据统计--商品票务累计
export function businessGoodsCumulative(data) {
  return request({
    url: '/sub/statistics/businessGoodsCumulative',
    method: 'post',
    data: data
  })
}

// 数据统计--商品票务列表
export function businessGoodsCumulativeList(data) {
  return request({
    url: '/sub/statistics/businessGoodsCumulativeList',
    method: 'post',
    data: data
  })
}
