import request from '@/utils/request'

// 获取游戏label----微游戏
export function queryAllLabel(query) {
  return request({
    url: '/sub/marketActivity/queryAllLabel',
    method: 'post',
    data: query
  })
}

// 获取游戏Info----微游戏
export function queryGameInfosWithTenant(query) {
  return request({
    url: '/sub/marketActivity/queryGameInfosWithTenant',
    method: 'post',
    data: query
  })
}

// 选择游戏Info
export function gameChoose(query) {
  return request({
    url: '/sub/marketActivity/gameChoose',
    method: 'post',
    data: query
  })
}

// 我的游戏列表
export function queryGameInsts(query) {
  return request({
    url: '/sub/marketActivity/queryGameInsts',
    method: 'post',
    data: query
  })
}

// 添加游戏实例
export function addGameInfo(query) {
  return request({
    url: '/sub/marketActivity/addGameInfo',
    method: 'post',
    data: query
  })
}

// 游戏下拉列表
export function queryGameInfos(query) {
  return request({
    url: '/sub/marketActivity/queryGameInfos',
    method: 'post',
    data: query
  })
}

// 添加游戏实例
export function addBargainGameInfo(query) {
  return request({
    url: '/sub/marketActivity/addBargainGameInfo',
    method: 'post',
    data: query
  })
}
// 更新砍价活动
export function bargainUpdateGameInfo(query) {
  return request({
    url: '/sub/marketActivity/bargainUpdateGameInfo',
    method: 'post',
    data: query
  })
}
// 更新抽奖活动
export function raffleUpdateGameInfo(query) {
  return request({
    url: '/sub/marketActivity/raffleUpdateGameInfo',
    method: 'post',
    data: query
  })
}
// 查询抽奖活动表单
export function queryFormConfig(query) {
  return request({
    url: '/sub/marketActivity/queryFormConfig',
    method: 'post',
    data: query
  })
}
// 查询砍价游戏---基础详情
export function queryBargainConfig(query) {
  return request({
    url: '/sub/marketActivity/queryConfig',
    method: 'post',
    data: query
  })
}

// 查询---砍价游戏---详情
export function queryBargainGameInfo(query) {
  return request({
    url: '/sub/marketActivity/queryGameInfo',
    method: 'post',
    data: query
  })
}
// 查询---抽奖游戏---详情
export function queryRaffleGameInfo(query) {
  return request({
    url: '/sub/marketActivity/queryGameInfoRaffle',
    method: 'post',
    data: query
  })
}
// 我的游戏--下架游戏--砍价
export function obtainedGame(query) {
  return request({
    url: '/sub/marketActivity/obtainedGame',
    method: 'post',
    data: query
  })
}
// 我的游戏--下架游戏--抽奖
export function obtainedRaffleGame(query) {
  return request({
    url: '/sub/marketActivity/obtainedRaffleGame',
    method: 'post',
    data: query
  })
}
// 我的游戏--查看砍价游戏---数据详情
export function queryRankInfo(query) {
  return request({
    url: '/sub/marketActivity/queryRankInfo',
    method: 'post',
    data: query
  })
}

// 我的游戏--查看砍价游戏---退款操作
export function payRefund(query) {
  return request({
    url: '/sub/marketActivity/payRefund',
    method: 'post',
    data: query
  })
}
