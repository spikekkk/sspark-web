import { custTodayStat, custStat } from '@/api/hq/statistics'
import { queryHqShopList } from '@/api/hq/shopMgr'
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
        modifyTime: '',
        name: ''
      },
      storeList: []
    }
  },

  computed: {},
  created() {
    this.getTodayData()
    this.getCustStat()
    this.getStoreList()
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
    getTodayData(shopId) {
      const params = {
        shopId: shopId
      }
      custTodayStat(params).then(res => {
        if (res.errorCode === 9000) {
          this.custTodayData = res
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
      })
    },
    /* 获取所有门店 */
    getStoreList() {
      const params = {
        name: ''
      }
      queryHqShopList(params).then(res => {
        if (res.errorCode === 9000) {
          this.storeList = res.results
        } else {
          this.$message.error(res.errorMessage || '获取所有门店失败')
        }
      })
    },

    /* 获取会员列表数据 */
    getCustStat() {
      let start
      let end
      let shopId

      if (this.listQuery.modifyTime) {
        start = this.listQuery.modifyTime[0]
        end = this.listQuery.modifyTime[1]
      } else {
        start = ''
        end = ''
      }
      if (this.listQuery.name) {
        shopId = this.listQuery.name
      } else {
        shopId = ''
      }

      const params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        startTime: start,
        endTime: end,
        shopId: shopId
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
      this.getTodayData(shopId)
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
      this.pageIndex = 1
      this.getCustStat()
    }
  }
}
