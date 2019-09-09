import {
  takeBatchNumber,
  inTimeImportCount,
  customerFirst,
  customerResourceFirst,
  customerSecond,
  customerResourceSecond,
  customerThird,
  customerResourceThird,
  customerFourth,
  customerResourceFourth,
  customerFourthExport,
  customerResourceFourthExport
} from '@/api/importFile'
import { exportFile } from '@/utils/exportFile'
import { Message } from 'element-ui'
var actions = {
  /* 获取批次号*/
  async takeBatchNumbers({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      takeBatchNumber(payload)
        .then(res => {
          const data = res.batchNumber
          commit('BEATCH_NUMBER', data)
          commit('IS_LOADING', true)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /* 查询实时的导入数量*/
  inTimeImportCounts({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      inTimeImportCount(payload)
        .then(res => {
          const data = res.inTimeImportCount
          commit('TIME_NUMBER', data)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /* 导入----first*/
  async firstStep({ commit, state, dispatch }, payload = {}) {
    await dispatch('takeBatchNumbers')
    return new Promise((resolve, reject) => {
      const data = {
        file: state.fileUrl,
        batchNumber: state.batchNumber
      }

      const func =
        state.dialogTitle === '会员导入' ? customerFirst : customerResourceFirst

      func(data)
        .then(res => {
          if (res.errorCode === 9000) {
            Message.success(res.errorMessage)
            commit('IS_LOADING', false)
            commit('HIDE_LOADING')
            const data = {
              batchNumber: res.batchNumber
            }
            dispatch('inTimeImportCounts', data)
            commit('STEP_COUNT')
            dispatch('secondStep', data)
          } else {
            Message.error(res.errorMessage)
            commit('SHOW_LOADING')
            commit('IS_LOADING', false)
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  /* second------查询实时的导入数量*/
  secondStep({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      payload.pageSize = state.pageSize
      payload.pageIndex = state.pageIndex - 1
      payload.batchNumber = state.batchNumber

      const func =
        state.dialogTitle === '会员导入'
          ? customerSecond
          : customerResourceSecond

      func(payload)
        .then(res => {
          const data = res.results
          commit('TABLE_DATA', data)
          commit('RESULT_COUNT', res.data.resultCount)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /* third------查询实时的导入数量*/
  thirdStep({ commit, state, dispatch }, payload = {}) {
    return new Promise((resolve, reject) => {
      const data = {
        batchNumber: state.batchNumber
      }
      const func =
        state.dialogTitle === '会员导入' ? customerThird : customerResourceThird

      func(data)
        .then(res => {
          if (res.errorCode === 9000) {
            Message.success('导入成功')
            commit('STEP_COUNT')
            dispatch('fourthStep')
          } else {
            commit('RESET_DATA')
          }
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  /* Fourth-----导入结果查询*/
  fourthStep({ commit, state }, payload = {}) {
    return new Promise((resolve, reject) => {
      const data = {
        isExport: state.isExport,
        batchNumber: state.batchNumber,
        pageSize: state.pageSize,
        pageIndex: state.pageIndex - 1
      }
      if (payload === '导出') {
        data.isExport = 1
      }
      if (state.dialogTitle === '会员导入') {
        if (data.isExport === 1) {
          customerFourthExport(data).then(res => {
            exportFile(res, '', '会员导入错误信息')
          })
        } else {
          customerFourth(data)
            .then(res => {
              if (res.errorCode === 9000) {
                const data = res.results
                commit('TABLE_DATA', data)
                commit('RESULT_COUNT', res.data.resultCount)
              } else {
                commit('RESET_DATA')
              }
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        }
      } else {
        if (data.isExport === 1) {
          customerResourceFourthExport(data).then(res => {
            exportFile(res, '', '会员卡导入错误信息')
          })
        } else {
          customerResourceFourth(data)
            .then(res => {
              if (res.errorCode === 9000) {
                const data = res.results
                commit('TABLE_DATA', data)
                commit('RESULT_COUNT', res.data.resultCount)
              } else {
                commit('RESET_DATA')
              }
              resolve()
            })
            .catch(error => {
              reject(error)
            })
        }
      }
    })
  }
}

export default actions
