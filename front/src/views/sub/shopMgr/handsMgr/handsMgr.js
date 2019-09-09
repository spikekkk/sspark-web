import { fetchHandsList } from '@/api/sub/shopMgr'

export default {
  data() {
    return {
      handsList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      listQuery: {
        userName: '',
        modifyTime: []
      }
    }
  },

  created() {
    this.getHandsList()
  },
  methods: {
    /* 获取交接班列表 */
    getHandsList() {
      let start
      let end
      if (this.listQuery.modifyTime) {
        start = this.listQuery.modifyTime[0]
        end = this.listQuery.modifyTime[1]
      } else {
        start = ''
        end = ''
      }
      const params = {
        userName: '' || this.listQuery.userName,
        shiftTimeEnd: end,
        shiftTimeStart: start,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1
      }
      this.loading = true
      fetchHandsList(params).then(res => {
        if (res.errorCode === 9000) {
          this.handsList = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '查询交接班列表出错了')
        }
        this.loading = false
      })
    },
    /* 搜索 */
    handleFilter() {
      const _this = this
      _this.pageIndex = 1
      _this.getHandsList()
    },
    /* 刷新 */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.listQuery = {
        userName: '',
        modifyTime: []
      }
      this.pageIndex = 1
      this.getHandsList()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getHandsList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getHandsList()
    }
  }
}
