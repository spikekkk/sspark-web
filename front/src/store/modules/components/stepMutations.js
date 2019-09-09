const RESET_DATA = 'RESET_DATA' // 重置所有数据
const SHOW_LOADING = 'SHOW_LOADING' // 显示loading
const HIDE_LOADING = 'HIDE_LOADING' // 隐藏loading
const BEATCH_NUMBER = 'BEATCH_NUMBER' // 查询批次号
const TIME_NUMBER = 'TIME_NUMBER' // 查询验证码
const FILE_URL = 'FILE_URL' // 文件地址
const DIA_TITLE = 'DIA_TITLE' // 当前进行上传内容
const IS_LOADING = 'IS_LOADING' // 当前进行上传内容ING
const STEP_COUNT = 'STEP_COUNT' // 计算步数
const TABLE_DATA = 'TABLE_DATA' // 第二步表格数据
const PAGE_INDEX = 'PAGE_INDEX' // 分页表格数据
const PAGE_COUNT = 'PAGE_COUNT' // 分页表格数据
const RESULT_COUNT = 'RESULT_COUNT' // 分页表格数据
const RESET_PAGE_COUNT = 'RESET_PAGE_COUNT' // 分页表格数据
var mutations = {
  /* 重置所有数据*/
  [RESET_PAGE_COUNT](state) {
    state.pageIndex = 0
    state.pageSize = 10
    state.resultCount = 0
  },

  [RESET_DATA](state) {
    state.activeStep = 0
  },
  /** 显示loading */
  [SHOW_LOADING](state) {
    state.loading = true
  },
  /** 隐藏loading */
  [HIDE_LOADING](state) {
    state.loading = false
  },
  /* 显示上传按钮flag*/
  [IS_LOADING](state, flag) {
    state.flag = flag
  },
  /* 计算步骤*/
  [STEP_COUNT](state) {
    state.activeStep++
  },
  /** 查询批次号 */
  [BEATCH_NUMBER](state, num) {
    state.batchNumber = num
  },

  /** 实时导入量 */
  [TIME_NUMBER](state, count) {
    state.importCount = count
  },
  /* 弹窗标题*/
  [DIA_TITLE](state, title) {
    state.dialogTitle = title
  },
  /** 上传文件地址*/
  [FILE_URL](state, url) {
    state.fileUrl = url
  },

  /** 表格数据*/
  [TABLE_DATA](state, data) {
    state.tableData = data
  },

  /** 表格分页*/
  [PAGE_INDEX](state, index) {
    state.pageIndex = index
  },

  [PAGE_COUNT](state, size) {
    state.pageSize = size
  },
  [RESULT_COUNT](state, count) {
    state.resultCount = parseInt(count)
  }
}
export default mutations
