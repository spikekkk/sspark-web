import request from '@/utils/request'

// 储值卡详情查询
export function goodsStoredQuery(data) {
  return request({
    url: '/checkstand/recharge/goodsStoredQuery',
    method: 'post',
    data: data
  })
}
// 根据手机号查询用户储值卡
export function cardQueryByMobile(data) {
  return request({
    url: '/checkstand/recharge/cardQueryByMobile',
    method: 'post',
    data: data
  })
}

// 储值卡开通
export function storedCreate(data) {
  return request({
    url: '/checkstand/recharge/storedCreate',
    method: 'post',
    data: data
  })
}

// 储值卡充值
export function storedRecharge(data) {
  return request({
    url: '/checkstand/recharge/storedRecharge',
    method: 'post',
    data: data
  })
}
