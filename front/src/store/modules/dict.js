import { loadDicts, loadUsers } from '@/api/sys'
import { queryRoleListDown, fetchDeptList } from '@/api/sub/shopMgr'

import { hqQueryRoleListDown, queryHqDepartment } from '@/api/hq/shopMgr'

const dict = {
  state: {
    info: {},
    users: [],
    roles: [],
    depts: []
  },
  mutations: {
    SET_DICT_DATA(state, payload) {
      // state.info[payload['key']] = payload['data']
      payload.map((item, index) => {
        state.info[item['code']] = item['items']
      })
    },

    QUERY_DICT_DATA(state, payload) {
      payload.map((item, index) => {
        // console.log('存入的查询消息', index, item)
        state.info[item['code']] = item['items']
      })
    },

    DEL_DICT_KEY(state, key) {
      delete state.info[key]
    },
    CLEAR_DICT(state) {
      state.info = {}
    },

    SET_USERS(state, users) {
      state.users = users
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    SET_DEPTS(state, depts) {
      state.depts = depts
    }
  },
  actions: {
    // 加载字典
    LoadDicts({ commit, state }, payload) {
      const params = {
        codes: payload
      }
      return new Promise((resolve, reject) => {
        loadDicts(params)
          .then(res => {
            // console.log('---------字典 res data', res)
            const data = res.dicts
            commit('SET_DICT_DATA', data)
            resolve()
          })
          .catch(error => {
            console.log('error=====>', error)
            reject(error)
          })
      })
    },

    // //加载查询字典
    // QueryDicts({ commit, state }, payload) {
    //   const params = {
    //     codes: payload
    //   }
    //   queryDicts(params).then(res => {
    //     console.log('查询---------字典', res)
    //     const data = res.dicts
    //     commit('QUERY_DICT_DATA', data)
    //   }).catch(error => {
    //     console.log('error-----------', error)
    //   })
    // },

    ClearDict({ commit }) {
      commit('CLEAR_DICT')
    },

    DelDictKey({ commit }, key) {
      commit('DEL_DICT_KEY', key)
    },

    LoadUsers({ commit, state }, payload = {}) {
      const force = payload['force'] || false
      if (state.users.length === 0 || force) {
        return new Promise((resolve, reject) => {
          loadUsers()
            .then(res => {
              const data = res.results
              commit('SET_USERS', data)
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    /* sub角色职位下拉框列表 */
    FetchRoleList({ commit, state }, payload = {}) {
      // const force = payload['force'] || false
      // if (state.roles.length === 0 || force) {
      return new Promise((resolve, reject) => {
        queryRoleListDown(payload)
          .then(res => {
            const data = res.results
            commit('SET_ROLES', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
      // }
    },
    /* sub 部门列表 */
    FetchDeptList({ commit, state }, payload = {}) {
      // const force = payload['force'] || false
      // if (state.depts.length === 0 || force) {
      return new Promise((resolve, reject) => {
        fetchDeptList(payload)
          .then(res => {
            const data = res.results
            commit('SET_DEPTS', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /* hq角色职位下拉框列表 */
    hqFetchRoleList({ commit, state }, payload = {}) {
      // const force = payload['force'] || false
      // if (state.roles.length === 0 || force) {
      return new Promise((resolve, reject) => {
        hqQueryRoleListDown(payload)
          .then(res => {
            const data = res.results
            commit('SET_ROLES', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
      // }
    },
    /* hq 部门列表 */
    hqFetchDeptList({ commit, state }, payload = {}) {
      // const force = payload['force'] || false
      // if (state.depts.length === 0 || force) {
      return new Promise((resolve, reject) => {
        queryHqDepartment(payload)
          .then(res => {
            const data = res.results
            commit('SET_DEPTS', data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default dict
