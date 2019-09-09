// 获取所有游戏数据
const GET_GAME_DETAIL = 'GET_GAME_DETAIL'

const GET_EDIT_GAME_DETAIL = 'GET_EDIT_GAME_DETAIL'

const RESET_GAME_DETAIL = 'RESET_GAME_DETAIL'
// 是否编辑
const GET_EDIT = 'GET_EDIT'

// 切换tab
const CHANGE_TAB = 'CHANGE_TAB'
// 是否改变
const IS_CHANGE = 'IS_CHANGE'

const microGame = {
  namespaced: true,
  state: {
    editUrl: '',
    isCreate: false,
    gameDetail: '',
    isChange: false,
    activeName: 'first',
    editGameDetail: '',
    initialActList: []
  },

  mutations: {
    [GET_EDIT](state, payload) {
      state.isCreate = payload
    },

    [IS_CHANGE](state, payload) {
      state.isChange = payload
    },

    [CHANGE_TAB](state, payload) {
      state.activeName = payload
    },

    [GET_GAME_DETAIL](state, payload) {
      state.gameDetail = payload
    },
    [GET_EDIT_GAME_DETAIL](state, payload) {
      state.editGameDetail = payload
    },

    [RESET_GAME_DETAIL](state) {
      state.editGameDetail = ''
    }
  }
}

export default microGame
