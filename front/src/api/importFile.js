import request from '@/utils/request'

/* 下载模板 */
export function downloadTemplate(data) {
  return request({
    url: '/importFile/downloadTemplate',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

/* 获取批次号*/
export function takeBatchNumber() {
  return request({
    url: '/importFile/takeBatchNumber',
    method: 'post'
  })
}

/* 查询实时导入量 */
export function inTimeImportCount(data) {
  return request({
    url: '/importFile/inTimeImportCount',
    method: 'post',
    data: data
  })
}

/* 上传---会员---first*/
export function customerFirst(data) {
  return request({
    url: '/importFile/customerFirst',
    method: 'post',
    data: data
  })
}

/* 上传---会员---second*/
export function customerSecond(data) {
  return request({
    url: '/importFile/customerSecond',
    method: 'post',
    data: data
  })
}
/* 上传---会员---Third*/
export function customerThird(data) {
  return request({
    url: '/importFile/customerThird',
    method: 'post',
    data: data
  })
}
/* 上传---会员---Fourth*/
export function customerFourth(data) {
  return request({
    url: '/importFile/customerFourth',
    method: 'post',
    data: data
  })
}
/* 上传---会员---Fourth---导入文件*/
export function customerFourthExport(data) {
  return request({
    url: '/importFile/customerFourthExport',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}

/* 上传---会员卡---first*/
export function customerResourceFirst(data) {
  return request({
    url: '/importFile/customerResourceFirst',
    method: 'post',
    data: data
  })
}

/* 上传---会员卡---second*/
export function customerResourceSecond(data) {
  return request({
    url: '/importFile/customerResourceSecond',
    method: 'post',
    data: data
  })
}
/* 上传---会员卡---Third*/
export function customerResourceThird(data) {
  return request({
    url: '/importFile/customerResourceThird',
    method: 'post',
    data: data
  })
}
/* 上传---会员卡---Fourth*/
export function customerResourceFourth(data) {
  return request({
    url: '/importFile/customerResourceFourth',
    method: 'post',
    data: data
  })
}

/* 上传---会员卡---Fourth---导出文件*/
export function customerResourceFourthExport(data) {
  return request({
    url: '/importFile/customerResourceFourthExport',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
