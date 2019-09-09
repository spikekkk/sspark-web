import { fetchCancelList } from '@/api/checkstand/cashier'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      pageIndex: 1, // 当前页数
      pageSize: 20, // 当前页的条数
      totalCount: 0, // 总条数
      modifyTime: '',
      cancelList: [], // 核销表格数据
      loading: false // loading加载
    }
  },

  created() {
    this.getCancelList()
  },
  methods: {
    getCancelList() {
      const tenantId = Cookies.get('tenantId')
      const shopId = Cookies.get('currentShopId')
      const userId = Cookies.get('userId')
      let startTime
      let endTime
      if (this.modifyTime) {
        startTime = this.modifyTime[0]
        endTime = this.modifyTime[1]
      } else {
        startTime = ''
        endTime = ''
      }
      this.loading = true
      const params = {
        tenantId: tenantId,
        shopId: shopId,
        userId: userId,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        verifyDateStart: startTime,
        verifyDateEnd: endTime
      }
      fetchCancelList(params).then(res => {
        if (res.errorCode === 9000) {
          this.cancelList = res.results
          this.totalCount = res.data.resultCount
        } else {
          this.$message.error(res.errorMessage)
        }
        this.loading = false
      })
    },
    /* 搜索*/
    handleFilter() {
      this.pageIndex = 1
      this.getCancelList()
    },
    /* 重置*/
    handleCancel() {
      this.pageIndex = 1
      this.modifyTime = []
      this.getCancelList()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getCancelList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getCancelList()
    }
  }
}
