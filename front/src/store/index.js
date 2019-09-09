import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import dict from './modules/dict'
import getters from './getters'
import microGame from './modules/microGame'
import importStep from './modules/importStep'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    dict /* 字典*/,
    microGame,
    importStep
  },
  getters
})

export default store
