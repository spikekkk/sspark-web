import { spuStatList, spuStatPay, spuStatExport } from '@/api/sub/statistics'
import { fetchCategoryMgrList } from '@/api/sub/productMgr'
import { mapGetters } from 'vuex'
import { exportFile } from '@/utils/exportFile'
export default {
  data() {
    return {
      activeTabNum: '1',
      activeTabs: '1',
      value4: '',
      ticketsList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      goodsCate: '',
      aliNum: '', // 支付宝收款
      wxNum: '', // 微信收款
      cashNum: '', // 现金收款
      posNum: '', // pos机收款
      otaNum: '', // ota收款
      countNum: '', // 总收入
      countName: '门票',
      listQuery: {
        modifyTime: '',
        goodsCate: '',
        cardType: ''
      },
      storeList: []
    }
  },

  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },

  created() {
    this.$store.dispatch('LoadDicts', 'card_type')
    this.getTicketsList(this.activeTabNum)

    this.queryCategory()
  },

  methods: {
    handleClick(tab, event) {
      this.value4 = ''
      // this.$refs.listQuery.resetFields()
      // eslint-disable-next-line
      if (tab === '3') {
        this.countName = '零售商品'
      } else {
        this.listQuery.goodsCate = ''

        if (tab === '2') {
          this.countName = '会员卡'
        } else if (tab === '1') {
          this.countName = '门票'
        }
      }
      if (tab !== '2') {
        this.listQuery.cardType = ''
      }

      this.activeTabNum = tab
      this.getTicketsList(this.activeTabNum)
    },

    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getTicketsList(this.activeTabNum)
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getTicketsList(this.activeTabNum)
    },
    filesDownload() {
      const val = this.value4
      if (val && val.length > 0) {
        const data = {
          year: val.split('-')[0],
          month: val.split('-')[1]
        }

        spuStatExport(data).then(res => {
          exportFile(res, val, '商品统计')

          this.value4 = ''
        })
      } else {
        this.$message({
          message: '请先选中月份',
          type: 'warning'
        })
      }
    },
    /* 获取所有列表 */
    /* 获取所有门票列表 */
    getTicketsList(value) {
      let start
      let end
      let goodsTypeId
      let cardType

      if (this.listQuery.modifyTime) {
        start = this.listQuery.modifyTime[0]
        end = this.listQuery.modifyTime[1]
      } else {
        start = ''
        end = ''
      }

      if (this.listQuery.goodsCate) {
        goodsTypeId = this.listQuery.goodsCate
      } else {
        goodsTypeId = ''
      }

      if (this.listQuery.cardType) {
        cardType = this.listQuery.cardType
      } else {
        cardType = ''
      }

      const params = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        startTime: start,
        endTime: end,
        categoryId: value,
        sortName: '',
        sort: '',
        cardType: cardType,
        goodsType: goodsTypeId
      }

      spuStatPay(params).then(res => {
        if (res.errorCode === 9000) {
          this.aliNum = res.ali
          this.wxNum = res.wx
          this.cashNum = res.cashs
          this.posNum = res.pos
          this.otaNum = res.other
          this.countNum = res.cash
        }
      })
      this.loading = true
      spuStatList(params).then(res => {
        if (res.errorCode === 9000) {
          this.ticketsList = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
        this.loading = false
      })
    },

    // 查询商品分类
    queryCategory() {
      fetchCategoryMgrList().then(res => {
        if (res.errorCode === 9000) {
          this.goodsCate = res.categorys
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    /* 表格排序 */
    sortChange(column, prop, order) {
      let start
      let end
      if (this.listQuery.modifyTime) {
        start = this.listQuery.modifyTime[0]
        end = this.listQuery.modifyTime[1]
      } else {
        start = ''
        end = ''
      }
      let sort
      // eslint-disable-next-line
      if (column.order == 'ascending') {
        sort = '0'
      } // eslint-disable-next-line
      if (column.order == 'descending') {
        sort = '1'
      }
      const params = {
        startTime: start,
        endTime: end,
        categoryId: this.activeTabNum,
        sortName: column.prop,
        sort: sort
      }
      this.loading = true
      spuStatList(params).then(res => {
        if (res.errorCode === 9000) {
          this.ticketsList = res.results
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
      _this.getTicketsList(this.activeTabNum)
    },
    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.pageIndex = 1
      this.getTicketsList(this.activeTabNum)
      this.value4 = ''
    }
  }
}
