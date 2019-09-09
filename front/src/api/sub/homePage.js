import request from '@/utils/request'

// 查询日营业额走势
export function queryDayTrendChart(query) {
  return request({
    url: '/sub/homePage/queryDayTrendChart',
    method: 'post',
    data: query
  })
}

// 查询月支付方式营业额占比
export function queryMonthPayBusiness(query) {
  return request({
    url: '/sub/homePage/queryMonthPayBusiness',
    method: 'post',
    data: query
  })
}

// 查询月营业额走势
export function queryMonthTrendChart(query) {
  return request({
    url: '/sub/homePage/queryMonthTrendChart',
    method: 'post',
    data: query
  })
}

// 查询经营统计
export function querybusinessStatView(query) {
  return request({
    url: '/sub/homePage/querybusinessStatView',
    method: 'post',
    data: query
  })
}

// 查询店铺概况
export function queryShopSurveyStat(query) {
  return request({
    url: '/sub/homePage/queryShopSurveyStat',
    method: 'post',
    data: query
  })
}

// 查询商品过期概况
export function queryExpireGoods(query) {
  return request({
    url: '/sub/homePage/queryExpireGoods',
    method: 'post',
    data: query
  })
}
