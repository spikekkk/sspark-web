import {
  asyncRouterMap,
  constantRouterMap,
  hqAsyncRouterMap,
  cashierRouterMap
} from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.mKey) {
    return menus.includes(route.meta.mKey)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// eslint-disable-next-line
function filterAsyncRouter(routes, menus) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, menus)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menus: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // state.routers = constantRouterMap.concat(routers)
      state.routers = [...constantRouterMap, ...routers]
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      console.log('----router--', data)
      return new Promise(resolve => {
        const { menus, currentSystem } = data
        commit('SET_MENUS', menus)
        switch (currentSystem) {
          case '1':
            commit('SET_ROUTERS', filterAsyncRouter(hqAsyncRouterMap, menus))
            break
          case '2':
            commit('SET_ROUTERS', filterAsyncRouter(asyncRouterMap, menus))
            break
          case '3':
            commit('SET_ROUTERS', filterAsyncRouter(cashierRouterMap, menus))
            break
        }
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        // commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
    UpdateRoutes({ state, commit }, data) {
      return new Promise(resolve => {
        const { currentSystem } = data
        // console.log(state.menus)
        switch (currentSystem) {
          case '1':
            commit(
              'SET_ROUTERS',
              filterAsyncRouter(hqAsyncRouterMap, state.menus)
            )
            break
          case '2':
            commit(
              'SET_ROUTERS',
              filterAsyncRouter(asyncRouterMap, state.menus)
            )
            break
          case '3':
            commit(
              'SET_ROUTERS',
              filterAsyncRouter(cashierRouterMap, state.menus)
            )
            break
        }
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, menus)
        // commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
