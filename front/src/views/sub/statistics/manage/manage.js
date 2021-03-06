import {
  businessStatExport,
  payTypeCumulative,
  businessPayTypeCumulativeList,
  businessGoodsCumulative,
  businessGoodsCumulativeList
} from '@/api/sub/statistics'
import { exportFile } from '@/utils/exportFile'
export default {
  components: {},
  filters: {},
  data() {
    return {
      bussinessList: [],
      businessTodayData: '',
      money: '',
      orderNum: '',
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      listQuery: {
        modifyTime: ''
      },
      exportData: '',
      changeValue: 'pay'
    }
  },

  mounted() {
    this.changeStatistics('pay')
    this.getBusinessStat()
  },
  methods: {
    changeStatistics(val) {
      this.changeValue = val
      // eslint-disable-next-line
      if (val == 'pay') {
        payTypeCumulative().then(res => {
          if (res.errorCode === 9000) {
            this.money = res.money
            this.orderNum = res.orderNum
          } else {
            this.$message.error(res.errorMessage)
          }
        })
        // eslint-disable-next-line
      } else if (val == 'goods') {
        businessGoodsCumulative().then(res => {
          if (res.errorCode === 9000) {
            this.money = res.money
            this.orderNum = res.orderNum
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      }

      this.getBusinessStat()
    },

    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getBusinessStat()
    },

    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getBusinessStat()
    },
    /* 获取今日经营统计头数据 */
    // getTodayData() {
    //   businessTodayStat().then(res => {
    //     if (res.errorCode === 9000) {
    //       this.businessTodayData = res
    //     } else {
    //       this.$message.error(res.errorMessage || '获取今日经营数据出错了')
    //     }
    //   })
    // },
    /* 获取经营统计数据列表 */
    getBusinessStat() {
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
        endTime: end
      }
      this.exportData = params
      params.pageSize = this.pageSize
      params.pageIndex = this.pageIndex - 1
      this.loading = true
      if (this.changeValue === 'pay') {
        businessPayTypeCumulativeList(params).then(res => {
          if (res.errorCode === 9000) {
            this.bussinessList = res.results
            this.totalCount = parseInt(res.data.resultCount)
          } else {
            this.$message.error(res.errorMessage || '列表查询出错了')
          }
          this.loading = false
        })
      } else {
        businessGoodsCumulativeList(params).then(res => {
          if (res.errorCode === 9000) {
            this.bussinessList = res.results
            this.totalCount = parseInt(res.data.resultCount)
          } else {
            this.$message.error(res.errorMessage || '列表查询出错了')
          }
          this.loading = false
        })
      }
    },
    /* 搜索*/
    onSearch() {
      const _this = this
      _this.pageIndex = 1
      _this.getBusinessStat()
    },

    filesDownload(val) {
      if (val && val.length > 0) {
        if (val && val === '当前报表') {
          this.exportData.exportType = 9
        } else if (val && val === '周报表') {
          this.exportData.exportType = 1
        } else if (val && val === '月报表') {
          this.exportData.exportType = 2
        }
        let filesName = '经营统计'
        if (this.changeValue === 'pay') {
          this.exportData.businessType = 1
          filesName += '--收款方式统计--'
        } else {
          this.exportData.businessType = 2
          filesName += '--商品票务统计--'
        }

        businessStatExport(this.exportData).then(res => {
          exportFile(res, val, filesName)
        })
      } else {
        this.$message({
          message: '请先选中月份',
          type: 'warning'
        })
      }
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
      this.getBusinessStat()
    }
  }
}
