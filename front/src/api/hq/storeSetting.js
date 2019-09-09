import request from '@/utils/request'

// 门店设置---门店信息列表
export function fetchStoreSetList(data) {
  return request({
    url: '/sub/storeSetting/queryStoreList',
    method: 'post',
    data: data
  })
}

// 门店设置---编辑更新门店信息
export function updateStoreFun(data) {
  return request({
    url: '/sub/storeSetting/updateStoreInfo',
    method: 'post',
    data: data
  })
}

// 门店设置---门店地址省市区
export function citySelectChange(data) {
  return request({
    url: '/sub/storeSetting/citySelectChange',
    method: 'post',
    data: data
  })
}

// 门店设置---个人信息列表
export function fetchPersonList(data) {
  return request({
    url: '/hq/storeSetting/queryPersonList',
    method: 'post',
    data: data
  })
}

// 门店设置---编辑个人信息
export function updatePersonFun(data) {
  return request({
    url: '/hq/storeSetting/updatePersonInfo',
    method: 'post',
    data: data
  })
}

// 门店设置---修改登陆密码
export function updatePassword(data) {
  return request({
    url: '/sub/storeSetting/updatePassword',
    method: 'post',
    data: data
  })
}

// 门店设置---发送验证码
export function sendMessageCode(data) {
  return request({
    url: '/sub/storeSetting/sendMessageCode',
    method: 'post',
    data: data
  })
}

// 门店设置---发送验证码
export function checkMessageCode(data) {
  return request({
    url: '/sub/storeSetting/checkMessageCode',
    method: 'post',
    data: data
  })
}

// // 门店设置---获取收银宝开通二维码
// export function cashierOpenQr(data) {
//   return request({
//     url: '/sub/storeSetting/cashierOpenQr',
//     method: 'post',
//     data: data
//   })
// }

// // 门店设置---收银宝开通
// export function cashierOpenSure(data) {
//   return request({
//     url: '/sub/storeSetting/cashierOpenSure',
//     method: 'post',
//     data: data
//   })
// }

// // 门店设置---编辑收银宝开通
// export function cashierEditSure(data) {
//   return request({
//     url: '/sub/storeSetting/cashierEditSure',
//     method: 'post',
//     data: data
//   })
// }
