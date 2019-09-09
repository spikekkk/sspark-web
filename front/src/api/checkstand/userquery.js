import request from '@/utils/request'
// 会员管理---id查询--获取数据
export function fetchIdUserList(query) {
  return request({
    url: '/checkstand/userquery/userIdQuery',
    method: 'post',
    data: query
  })
}

// 会员管理---手机查询会员
export function fetchPhoneUserList(data) {
  return request({
    url: '/checkstand/userquery/userPhoneQuery',
    method: 'post',
    data: data
  })
}

// 会员管理----注册会员
export function createUser(data) {
  return request({
    url: '/checkstand/userquery/userReg',
    method: 'post',
    data: data
  })
}

// 会员管理---编辑会员信息
export function updateUser(data) {
  return request({
    url: '/checkstand/userquery/userUpdate',
    method: 'post',
    data: data
  })
}
// 会员管理---核销兑换
export function writeoffUser(data) {
  return request({
    url: '/checkstand/userquery/userWriteOff',
    method: 'post',
    data: data
  })
}

// 会员管理---赠票兑换
export function presentTicket(data) {
  return request({
    url: '/checkstand/userquery/userPresent',
    method: 'post',
    data: data
  })
}

// 会员管理---停卡
export function userCeaseCustomerCard(data) {
  return request({
    url: '/checkstand/userquery/userCeaseCustomerCard',
    method: 'post',
    data: data
  })
}

// 会员管理---开卡
export function userOpenCustomerCard(data) {
  return request({
    url: '/checkstand/userquery/userOpenCustomerCard',
    method: 'post',
    data: data
  })
}

// 会员管理----上传照片
export function uploadImage(data) {
  return request({
    url: '/checkstand/userquery/uploadImage',
    method: 'post',
    data: data
  })
}
// recallExchange
// 会员管理----上传照片
export function recallExchange(data) {
  return request({
    url: '/checkstand/userquery/recallExchange',
    method: 'post',
    data: data
  })
}
