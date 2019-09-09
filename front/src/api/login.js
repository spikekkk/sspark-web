import request from '@/utils/request'

export function loginByUsername(username, password, authType) {
  const data = {
    username,
    password,
    authType
  }
  return request({
    url: '/login/login',
    method: 'post',
    data: data
  })
}

/* 登出 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

/* 获取用户信息 */
export function getUserInfo(token, currentSystem) {
  return request({
    url: '/login/info',
    method: 'post',
    data: { token, currentSystem }
  })
}

/* 切换系统 */
export function changeUserInfo(systemType) {
  return request({
    url: '/login/changeSystem',
    method: 'post',
    data: { systemType }
  })
}

/* 切换门店 */
export function switchShop(shopId) {
  return request({
    url: '/login/switchShop',
    method: 'post',
    data: { shopId }
  })
}

// 登陆激活
export function activationPerson(data) {
  return request({
    url: '/login/activationPerson',
    method: 'post',
    data: data
  })
}

// 忘记密码
export function resetPassword(data) {
  return request({
    url: '/login/resetPassword',
    method: 'post',
    data: data
  })
}
