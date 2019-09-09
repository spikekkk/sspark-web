import { custTodayStat, custStat } from '@/api/sub/statistics'

export default {
  components: {},
  filters: {},
  data() {
    return {
      custStatList: [],
      custTodayData: '',
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      listQuery: {
        modifyTime: ''
      }
    }
  },

  computed: {},
  created() {
    this.getTodayData()
    this.getCustStat()
  },
  mounted() {},
  methods: {
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getCustStat()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getCustStat()
    },
    /* 获取今日会员统计 */
    getTodayData() {
      custTodayStat().then(res => {
        if (res.errorCode === 9000) {
          this.custTodayData = res
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
      })
    },
    /* 获取会员列表数据 */
    getCustStat() {
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
        startTime: start,
        entTime: end,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1
      }

      this.loading = true
      custStat(params).then(res => {
        if (res.errorCode === 9000) {
          this.custStatList = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
        this.loading = false
      })
    },
    /* 搜索*/
    onSearch() {
      const _this = this
      _this.pageIndex = 1
      _this.getCustStat()
    },
    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.listQuery = {
        modifyTime: ''
      }
      this.pageIndex = 1
      this.getCustStat()
    }
  }
}
