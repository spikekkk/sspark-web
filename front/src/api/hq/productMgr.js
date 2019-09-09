import request from '@/utils/request'

// 商品管理---获取数据
export function fetchProductMgrList(query) {
  return request({
    url: '/hq/productMgr/queryList',
    method: 'post',
    data: query
  })
}

// 商品管理---获取数据
export function queryTicketInShop(query) {
  return request({
    url: '/hq/productMgr/queryTicketInShop',
    method: 'post',
    data: query
  })
}

// 商品管理---删除条目
export function deleteProduct(query) {
  return request({
    url: '/hq/productMgr/delete',
    method: 'post',
    data: query
  })
}

// 商品管理---上架
export function onSaleProduct(query) {
  return request({
    url: '/hq/productMgr/onSale',
    method: 'post',
    data: query
  })
}

// 商品管理---下架
export function offSaleProduct(query) {
  return request({
    url: '/hq/productMgr/offSale',
    method: 'post',
    data: query
  })
}

// 商品管理---改价格
export function changePriceProduct(query) {
  return request({
    url: '/hq/productMgr/changePrice',
    method: 'post',
    data: query
  })
}

// 商品管理----门票二次查询修改
export function queryTicket(data) {
  return request({
    url: '/hq/productMgr/ticketQuery',
    method: 'post',
    data: data
  })
}

// 商品管理----新增门票
export function createTicket(data) {
  return request({
    url: '/hq/productMgr/ticketCreate',
    method: 'post',
    data: data
  })
}

// 商品管理----编辑门票
export function updateTicket(data) {
  return request({
    url: '/hq/productMgr/ticketUpdate',
    method: 'post',
    data: data
  })
}

// 商品管理----二次查询会员卡
export function queryCard(data) {
  return request({
    url: '/hq/productMgr/cardQuery',
    method: 'post',
    data: data
  })
}

// 商品管理----新增会员卡
export function createCard(data) {
  return request({
    url: '/hq/productMgr/cardCreate',
    method: 'post',
    data: data
  })
}

// 商品管理----更新会员卡
export function updateCard(data) {
  return request({
    url: '/hq/productMgr/cardUpdate',
    method: 'post',
    data: data
  })
}

// 商品管理----零售商品二次查询
export function queryGoods(data) {
  return request({
    url: '/hq/productMgr/normalQuery',
    method: 'post',
    data: data
  })
}

// 商品管理----新增零售商品
export function createGoods(data) {
  return request({
    url: '/hq/productMgr/createGoods',
    method: 'post',
    data: data
  })
}

// 商品管理----零售商品详细价格查询
export function queryDetailGoodsPrice(data) {
  return request({
    url: '/hq/productMgr/queryDetailPrice',
    method: 'post',
    data: data
  })
}

// 商品管理----零售商品详细---价格更改
export function updateGoodsPrice(data) {
  return request({
    url: '/hq/productMgr/detailPriceUpdate',
    method: 'post',
    data: data
  })
}

// 商品管理----update零售商品
export function updateGoods(data) {
  return request({
    url: '/hq/productMgr/goodsUpdate',
    method: 'post',
    data: data
  })
}

// 分类管理---获取信息

export function fetchCategoryMgrList(query) {
  return request({
    url: '/hq/productMgr/queryCategoryList',
    method: 'post',
    data: query
  })
}

// 分类管理---编辑信息
export function updateCategory(data) {
  return request({
    url: '/hq/productMgr/updateCategory',
    method: 'post',
    data: data
  })
}
// 分类管理---删除
export function deleteCategory(data) {
  return request({
    url: '/hq/productMgr/deleteCategory',
    method: 'post',
    data: data
  })
}

// 分类管理----新增
export function createCategory(data) {
  return request({
    url: '/hq/productMgr/createCategory',
    method: 'post',
    data: data
  })
}

// 规格管理---获取全部规格信息

export function fetchSpecMgrList(query) {
  return request({
    url: '/hq/productMgr/querySpecList',
    method: 'post',
    data: query
  })
}

// 规格组管理---编辑信息
export function updateSpecification(data) {
  return request({
    url: '/hq/productMgr/updateSpec',
    method: 'post',
    data: data
  })
}
// 规格组管理---删除
export function deleteSpec(data) {
  return request({
    url: '/hq/productMgr/deleteSpec',
    method: 'post',
    data: data
  })
}

// 规格组管理----新增
export function createSpec(data) {
  return request({
    url: '/hq/productMgr/createSpec',
    method: 'post',
    data: data
  })
}

// 规格选址值管理----新增
export function createSpecOptions(data) {
  return request({
    url: '/hq/productMgr/createSpecOptions',
    method: 'post',
    data: data
  })
}
// 规格选址组&值管理----编辑
export function editSpecOptions(data) {
  return request({
    url: '/hq/productMgr/updateWithOption',
    method: 'post',
    data: data
  })
}

// 规格选址值管理----编辑
export function updateSpecOptions(data) {
  return request({
    url: '/hq/productMgr/updateSpecOptions',
    method: 'post',
    data: data
  })
}

// 规格选址值管理----删除
export function deleteSpecsOptions(data) {
  return request({
    url: '/hq/productMgr/deleteSpecsOptions',
    method: 'post',
    data: data
  })
}

// 库存管理----查询
export function stockQuery(data) {
  return request({
    url: '/hq/productMgr/stockQueryList',
    method: 'post',
    data: data
  })
}

// 库存管理----零售商品查询
export function goodsStockQuery(data) {
  return request({
    url: '/hq/productMgr/goodsStockQuery',
    method: 'post',
    data: data
  })
}

// 库存管理----零售商品查询
export function goodsStockUpdate(data) {
  return request({
    url: '/hq/productMgr/goodsStockUpdate',
    method: 'post',
    data: data
  })
}
