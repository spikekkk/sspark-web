import mutations from './components/stepMutations'
import actions from './components/stepActions'
const steps = {
  namespaced: true,
  state: {
    dialogTitle: '',
    batchNumber: '',
    loading: true,
    fileUrl: '',
    importCount: '',
    activeStep: 0,
    isExport: 0,
    tableData: [],

    pageIndex: 0,
    pageSize: 10,
    resultCount: 0,

    // 第一步
    flag: false // 是否摸板
  },

  mutations,
  actions
}

export default steps
