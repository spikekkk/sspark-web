import {
  getPurQueryList,
  getPurDetailQueryList,
  getPurPrintQueryList,
  refund
} from '@/api/checkstand/order'
import { mapGetters } from 'vuex'
import { printReceiptData } from '../../../utils/print'
function dictFilter(status, arr) {
  for (const item of arr || []) {
    if (String(item.value) === String(status)) {
      return item.label
    }
  }
  return status
}
export default {
  components: {
    RefundProduct: require('./refundProductDialog.vue').default
  },
  data() {
    return {
      formInline: {
        modifyTime: '', // 时间
        status: '', // 订单状态
        id: '' // 订单编号
      },
      mixPayType: [],
      pageIndex: 1, // 当前页码
      pageSize: 20, // 一页显示条数
      totalCount: 0, // 总条数
      tableData: [], // 表格数据
      totalPrice: 0, // 购物车总价格
      currentCheckArray: [], // 当前选中的
      orderId: '', // 下单号
      orderTime: '', // 下单时间
      cartList: [], // 购物车商品
      orderDetail: {}, // 详情数据
      orderPrintData: {}, // 订单小票打印数据
      loading: false, // loading加载
      detailIds: '', // 详情id
      payType: '', // 支付类型
      rowData: {}, // 点击某行获取的数据
      orderStatus: '' // 初始订单状态
    }
  },

  computed: {
    ...mapGetters(['dictInfo'])
  },
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
    }
  },
  created() {
    // 调用字典的数据
    this.$store.dispatch('LoadDicts', 'order_status,pay_type').then(() => {
      const statusArr = this.dictInfo['order_status']
      if (this.tableData && this.tableData.length > 0) {
        this.tableData = this.tableData.map(item => {
          item.orderStatusCn = dictFilter(item.orderStatus, statusArr)
          return item
        })
      }
    })
  },
  mounted() {
    this.getTableData() // 表格渲染
  },
  methods: {
    getData() {
      this.getTableData()
    },
    /**
     * 表格数据
     */
    getTableData() {
      let start
      let end
      if (this.formInline.modifyTime) {
        start = this.formInline.modifyTime[0]
        end = this.formInline.modifyTime[1]
      } else {
        start = ''
        end = ''
      }
      const params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,
        orderId: this.formInline.id,
        startTime: start,
        endTime: end,
        status: this.formInline.status
      }
      this.loading = true
      getPurQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
          this.totalCount = parseInt(res.data.resultCount)
          this.orderId =
            (res && res.results.length > 0 && res.results[0].id) || ''
          this.orderTime =
            (res && res.results.length > 0 && res.results[0].orderTime) || ''
          this.orderStatus =
            (res && res.results.length > 0 && res.results[0].orderStatus) || ''
          if (this.orderId) {
            const params = {
              orderId: this.orderId
            }
            getPurDetailQueryList(params).then(res => {
              if (res.errorCode === 9000) {
                this.orderDetail = res
                this.cartList = this.orderDetail.detailList
                this.computeTotal() // 总价格
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }
        } else {
          this.$message.error(res.errorMessage)
        }
        this.loading = false
      })
    },

    /**
     * 购物车总价格
     */
    computeTotal() {
      let totalPrice = 0
      this.cartList.forEach(function(val, index) {
        totalPrice += val.goodsQuantity * val.goodsPrice // 累计总价
      })
      this.totalPrice = parseFloat(totalPrice).toFixed(2)
    },
    /* 搜索*/
    onSubmit() {
      const _this = this
      _this.pageIndex = 1
      _this.getTableData()
    },
    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.pageIndex = 1
      this.getTableData()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getTableData()
    },
    /**
     * 某行点击事件
     */
    rowClick(row) {
      this.rowData = row
      this.orderId = row.id
      this.orderTime = row.orderTime
      this.orderStatus = row.orderStatus
      const params = {
        orderId: row.id
      }
      getPurDetailQueryList(params).then(res => {
        this.mixPayType = []
        if (res.errorCode === 9000) {
          this.orderDetail = res
          // eslint-disable-next-line
          if (this.orderDetail.payType == '1') {
            this.payType = '会员余额支付'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '2') {
            this.payType = '微信'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '3') {
            this.payType = '支付宝'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '4') {
            this.payType = '刷卡'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '5') {
            this.payType = '现金'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '6') {
            this.payType = 'POS支付'
            // eslint-disable-next-line
          } else if (this.orderDetail.payType == '9') {
            this.payType = '其他付款方式'
          }

          if (res.mixPayDetail) {
            res.mixPayDetail.map((v, i) => {
              const data = {
                num: v.payAmount,
                type: dictFilter(v.payType, this.dictInfo['pay_type'])
              }
              this.mixPayType.push(data)
            })
          }
          this.cartList = this.orderDetail.detailList
          this.computeTotal() // 总价格
        } else {
          this.$message.error(this.errorMessage)
        }
      })
    },
    /* 多选*/
    // mutiCheckFunc(item) {
    //   if (this.isSureRefund && item.goodsStatus !== '已退款') {
    //     if (this.currentCheckArray.indexOf(item.id) == -1) {//eslint-disable-line
    //       this.currentCheckArray.push(item.id)
    //     } else {
    //       this.currentCheckArray.splice(this.currentCheckArray.indexOf(item.id), 1)
    //     }
    //   }
    // },
    /**
     * 是否退款
     */
    refundToSure() {
      this.$refs.sureRefund.show(this.cartList, this.rowData, this.tableData)
    },
    /**
     * 确定退款
     */
    sureRefund() {
      this.detailIds = this.currentCheckArray.join(',')
      // eslint-disable-next-line
      if (this.orderStatus == '4' && !this.detailIds) {
        this.$message.error('已退款的账单无法退款')
      } else if (this.detailIds) {
        // eslint-disable-next-line
        if (this.orderStatus == '1' || this.orderStatus == '8') {
          const params = {
            purchaseId: this.orderId,
            detailId: this.detailIds
          }
          refund(params).then(res => {
            if (res.errorCode === 9000) {
              this.$message.success(res.errorMessage)
              this.getTableData()
              this.currentCheckArray = []
            } else {
              this.$message.error(res.errorMessage)
            }
          })
          // eslint-disable-next-line
        } else if (this.orderStatus == '3') {
          this.$message.error('订单目前不支持多次退款')
        } else {
          this.$message.error('待支付的账单不能退款')
        }
      } else {
        this.$message.error('请选择需要退款的商品')
      }
    },
    /**
     * 取消退款
     */
    // cancelRefund() {
    //   this.currentCheckArray = []
    // },
    /* 打印小票*/
    printReceipt() {
      const params = {
        purchaseId: this.orderId
      }
      getPurPrintQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          this.orderPrintData = res
          printReceiptData(this.orderPrintData)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    }
  }
}
