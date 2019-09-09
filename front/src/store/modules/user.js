import {
  loginByUsername,
  logout,
  getUserInfo,
  changeUserInfo,
  switchShop
} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: [],
    funcs: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus || []
    },
    SET_FUNCS: (state, funcs) => {
      state.funcs = funcs || []
    },
    SET_DATA: (state, data) => {
      state.data = data || {}
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password.trim()
      const authType = userInfo.authType.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, password, authType)
          .then(res => {
            const token = res.token
            if (res && res.menuKeys && res.menuKeys.length > 0) {
              Cookies.set('currentSystem', res.currentSystem)
              Cookies.set('username', res.username)
              Cookies.set('currentShopId', res.currentShopId)
              Cookies.set('systemTypes', res.systemTypes)
              Cookies.set('mobile', res.mobile)
              Cookies.set('shopInfos', res.shopInfos)
              Cookies.set('userId', res.userId)
              Cookies.set('tenantId', res.tenantId)
              Cookies.set('hqShopId', res.hqShopId)
              Cookies.set('hqShopName', res.hqShopName)
              commit('SET_TOKEN', token)
              setToken(token)
              resolve(res)
            } else {
              reject(res)

              reject(new Error('菜单为空没有权限!'))
            }

            // commit('SET_TOKEN', data.token)
            // setToken(response.data.token)
            // resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const currentSystem = Cookies.get('currentSystem')
        // console.log("currentSystem=======>",currentSystem)
        getUserInfo(state.token, currentSystem)
          .then(res => {
            // console.log("res userinfo----------->",res)
            const data = res.data
            if (data.perms && data.perms.menus && data.perms.menus.length > 0) {
              commit('SET_MENUS', data.perms.menus)
              commit('SET_FUNCS', data.perms.funcs)
              commit('SET_NAME', data.name)
              commit('SET_AVATAR', data.avatar || '')
              commit('SET_INTRODUCTION', data.introduction || '')
              resolve(res)
            } else {
              reject('没有权限!')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 切换系统用户信息
    ChangeUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        const currentSystem = Cookies.get('currentSystem')
        changeUserInfo(currentSystem)
          .then(res => {
            // console.log('切换系统 res =====>', res)
            Cookies.set('currentShopId', res.currentShopId)
            if (res && res.menuKeys && res.menuKeys.length > 0) {
              commit('SET_MENUS', res.menuKeys)
              resolve(res)
            } else {
              reject('没有权限!')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 切换门店信息
    SwitchShop({ commit, state }) {
      return new Promise((resolve, reject) => {
        const currentShopId = Cookies.get('currentShopId')
        switchShop(currentShopId)
          .then(res => {
            // console.log('切换门店 res =====>', res)
            // Cookies.set('currentShopId', res.currentShopId)
            if (res && res.menuKeys && res.menuKeys.length > 0) {
              commit('SET_MENUS', res.menuKeys)
              resolve(res)
            } else {
              reject('没有权限!')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(res => {
            if (res.errorCode === 9000) {
              Cookies.remove('currentSystem')
              Cookies.remove('currentShopId')
              Cookies.remove('shopInfos')
              Cookies.remove('systemTypes')
              Cookies.remove('username')
              Cookies.remove('mobile')
              Cookies.remove('currentShopName')
              Cookies.remove('userId')
              Cookies.remove('tenantId')
              Cookies.remove('hqShopId')
              Cookies.remove('hqShopName')
              commit('SET_TOKEN', '')
              commit('SET_ROLES', [])
              removeToken()
              resolve()
            }
            if (res.errorCode === 2100) {
              Cookies.remove('currentSystem')
              Cookies.remove('currentShopId')
              Cookies.remove('shopInfos')
              Cookies.remove('systemTypes')
              Cookies.remove('username')
              Cookies.remove('mobile')
              Cookies.remove('currentShopName')
              Cookies.remove('userId')
              Cookies.remove('tenantId')
              Cookies.remove('hqShopId')
              Cookies.remove('hqShopName')
              commit('SET_TOKEN', '')
              commit('SET_ROLES', [])
              removeToken()
              resolve()
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
