import { fetchCashierList } from '@/api/checkstand/cashier'
import { mapGetters } from 'vuex'
function dictFilter(status, arr) {
  for (const item of arr || []) {
    if (String(item.value) === String(status)) {
      return item.label
    }
  }
  return status
}
export default {
  filters: {
    dictFilter(status, arr, cname) {
      if (cname) {
        return cname
      }
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    },
    dictColorFilter(status, arr) {
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return { color: item.color }
        }
      }
      return {}
    }
  },
  data() {
    return {
      pageIndex: 1, // 当前页数
      pageSize: 20, // 当前页的条数
      totalCount: 0, // 总条数
      cashierList: [], // 收银统计数据
      pay_type: '', // 支付方式
      modifyTime: [
        this.$moment().format('YYYY-MM-DD 00:00:00'),
        this.$moment().format('YYYY-MM-DD 23:59:59')
      ], // 时间
      cashier: '', // 员工姓名
      aliNum: '', // 支付宝收款
      wxNum: '', // 微信收款
      cashNum: '', // 现金收款
      posNum: '', // pos机收款
      countNum: '', // 总收入
      loading: false, // loading加载
      otaNum: '',
      cardNum: '',
      refund: '',
      payArr: []
    }
  },

  computed: {
    ...mapGetters(['dictInfo'])
  },
  created() {
    // 调用字典的数据
    this.$store.dispatch('LoadDicts', 'order_status,pay_type').then(() => {
      const statusArr = this.dictInfo['order_status']
      this.payArr = this.dictInfo['pay_type']
      if (this.cashierList && this.cashierList.length > 0) {
        this.cashierList = this.cashierList.map(item => {
          item.orderStatusCn = dictFilter(item.orderStatus, statusArr)
          return item
        })
      }
    })
    this.getCashierList()
  },
  methods: {
    // 获取表格数据
    getCashierList() {
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
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        userName: this.cashier,
        orderTimeStart: startTime,
        orderTimeEnd: endTime,
        payType: this.pay_type
      }
      fetchCashierList(params).then(res => {
        if (res.errorCode === 9000) {
          this.cashierList = res.results
          this.totalCount = res.data.resultCount
          this.aliNum = res.incomeStat.aliAmount
          this.wxNum = res.incomeStat.wxAmount
          this.cashNum = res.incomeStat.cashAmount
          this.posNum = res.incomeStat.posAmount
          this.countNum = res.incomeStat.totalAmount
          this.otaNum = res.incomeStat.otaAmount
          this.cardNum = res.incomeStat.balanceAmount
          this.refund = res.incomeStat.refundAmount
        } else {
          this.$message.error(res.errorMessage)
        }
        this.loading = false
      })
    },
    /* 搜索*/
    handleFilter() {
      this.pageIndex = 1
      this.getCashierList()
    },
    /* 重置*/
    handleCancel() {
      this.pageIndex = 1
      this.modifyTime = [
        this.$moment().format('YYYY-MM-DD 00:00:00'),
        this.$moment().format('YYYY-MM-DD 23:59:59')
      ]
      this.cashier = ''
      this.pay_type = ''
      this.getCashierList()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getCashierList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getCashierList()
    }
  }
}
