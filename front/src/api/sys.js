import request from '@/utils/request'

// 字典的接口
export function loadDicts(data) {
  return request({
    url: '/sys/loadDicts',
    method: 'post',
    data: data
  })
}

// // 字典的查询
// export function queryDicts(data) {
//   console.log('data-------', data)
//   return request({
//     url: '/sys/queryDicts',
//     method: 'post',
//     data: data
//   })
// }

export function loadUsers() {
  return request({
    url: '/sys/loadUsers',
    method: 'post'
  })
}

export function loadMenus() {
  return request({
    url: '/vue/sys/loadMenus',
    method: 'post'
  })
}

export function loadArea(pid) {
  return request({
    url: `/vue/sys/loadArea/${pid}`,
    method: 'post'
  })
}

export function loadAreaAll() {
  return request({
    url: `/vue/sys/loadArea`,
    method: 'post'
  })
}
