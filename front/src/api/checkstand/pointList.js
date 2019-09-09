import request from '@/utils/request'

// 票和会员卡查询
export function getGoodsQueryList(data) {
  return request({
    url: '/checkstand/pointList/goodsQuery',
    method: 'post',
    data: data
  })
}
// 零售查询
export function getGoods2QueryList(data) {
  return request({
    url: '/checkstand/pointList/goods2Query',
    method: 'post',
    data: data
  })
}
// 零售规格框列表查询
export function getSkuQueryList(data) {
  return request({
    url: '/checkstand/pointList/skuQuery',
    method: 'post',
    data: data
  })
}
// 销售列表查询
export function getSalesQueryList(data) {
  return request({
    url: '/checkstand/pointList/salesQuery',
    method: 'post',
    data: data
  })
}
// 零售商品中某个规格显示查询
export function getGoodsSpecQueryList(data) {
  return request({
    url: '/checkstand/pointList/goodsSpecQuery',
    method: 'post',
    data: data
  })
}
// 根据电话查询会员
export function getCustByTelList(data) {
  return request({
    url: '/checkstand/pointList/getCustByTel',
    method: 'post',
    data: data
  })
}
// 零售的tab获取
export function getSpecQueryList(data) {
  return request({
    url: '/checkstand/pointList/specQuery',
    method: 'post',
    data: data
  })
}
// 巴枪收银
export function payTrade(data) {
  return request({
    url: '/checkstand/pointList/payTrade',
    method: 'post',
    data: data
  })
}
// pos和现金
export function createOrder(data) {
  return request({
    url: '/checkstand/pointList/createOrder',
    method: 'post',
    data: data
  })
}
// 当日入场人数
export function dayVerifyStat(data) {
  return request({
    url: '/checkstand/pointList/dayVerifyStat',
    method: 'post',
    data: data
  })
}
