import request from '@/utils/request'

/* 登出 */
export function test() {
  return request({
    url: '/index/test',
    method: 'post'
  })
}
