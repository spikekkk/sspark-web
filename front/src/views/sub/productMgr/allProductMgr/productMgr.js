import {
  fetchProductMgrList, // 获取商品列表
  fetchCategoryMgrList, // 获取零售分类
  deleteProduct, // 删除条目
  onSaleProduct, // 上架
  offSaleProduct, // 下架
  changePriceProduct, // 改价格
  queryDetailGoodsPrice, // 零售商品详细价格查询
  updateGoodsPrice // 零售商品价格更改
} from '@/api/sub/productMgr'
import { mapGetters } from 'vuex'

import addGoods from './components/addGoods/addGoods.vue'
import addTickets from './components/addTickets/addTickets.vue'
import addMembershipCard from './components/addMemberCard/addMemberCard.vue'

import recharge from './components/recharge/recharge.vue'

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
    dictFilter(status, arr, cn) {
      if (cn) {
        return cn
      }
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    }
  },

  components: {
    addGoods,
    addMembershipCard,
    addTickets,
    recharge
  },

  data() {
    return {
      dialogChangPrice: false,
      // 新增页面选择打开机制
      openAddGoods: false,
      openAddMemberShipCard: false,
      openRecharge: false,
      openAddTickets: false,

      addDialogTitle: '',

      // 新增商品多项checked
      checkedItems: '', // checked
      choiceItems: ['门票', '会员卡', '零售商品', '充值套餐'],
      rules: {
        price: [
          {
            required: true,
            message: '请输入售卖价格'
          },
          {
            type: 'number',
            message: '必须为数字'
          }
        ],
        newPrice: [
          {
            required: true,
            message: '请输入售卖价格'
          },
          {
            type: 'number',
            message: '必须为数字'
          }
        ]
      },
      confirmVisible: false,
      /* 页面加载*/
      loading: false,

      // 新增商品确认
      addProductDialog: false,

      // 搜索
      multipleSearch: null,
      listQuery: {
        specNo: '',
        status: '',
        type: '',
        chananl: '',
        goodsCate: ''
      },

      list: [], // 数据暂存

      showGoodsCate: false, // 展示零售分类
      goodsCate: '', // 零售商品分类
      // checkbox选中
      multipleSelection: [],

      // 分页数
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,

      // 添加数据
      editDatas: [],

      // 改价
      priceData: [],
      showSku: false, // 有规格
      saveSpuId: ''
    }
  },
  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },

  created() {
    this.$store
      .dispatch(
        'LoadDicts',
        'goods_category,status,goods_spu_status,channel,goods_status_action'
      )
      .then(() => {
        const arr = this.dictInfo['goods_category']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
    this.queryCategory()
  },

  mounted() {
    this.getList()
  },

  methods: {
    // 获取列表
    getList() {
      const queryParams = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        specNo: this.multipleSearch || '', // 名称编码
        status: this.listQuery.status || '', // 商品状态
        type: this.listQuery.sepcNo || '', // 商品类别
        chananl: this.listQuery.chananl || '', // 销售渠道
        categoryId: this.listQuery.goodsCate || ''
      }
      this.loading = true

      fetchProductMgrList(queryParams).then(res => {
        if (res.errorCode === 9000) {
          this.list = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
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
    // 零售商品分类调用显示
    choiceSpecs(val) {
      // eslint-disable-next-line
      if (val == 3) {
        this.showGoodsCate = true
      } else {
        this.showGoodsCate = false
      }
    },
    // 高级搜索
    handleFilter() {
      this.pageIndex = 1
      this.getList()
    },

    // 清空select数据
    searchRefresh() {
      this.$refs.listQuery.resetFields()
      this.multipleSearch = ''
      this.showGoodsCate = false
      this.pageIndex = 1
      this.getList()
    },

    // checkbox选择---暂时未用到
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    cancleEditPrice() {
      this.dialogChangPrice = false
      this.priceData = []
      this.saveSpuId = ''
    },

    // 改价格
    handlePrice(index, row) {
      const tmp = Object.assign({}, row)
      tmp.edit = !tmp.edit
      // eslint-disable-next-line
      if (row.spuStatus == 1) {
        this.$message({
          title: '请下架',
          message: '编辑前请下架',
          type: 'warning',
          duration: 2000
        }) // eslint-disable-next-line
      } else if (row.spuStatus == 2) {
        var _this = this
        // eslint-disable-next-line
        if (row.type == 3) {
          // 999
          this.dialogChangPrice = true
          tmp.edit = false
          const data = {
            spuId: row.id
          }
          queryDetailGoodsPrice(data).then(res => {
            if (res.skuPrices) {
              this.priceData = res.skuPrices
              this.showSku = true
              this.saveSpuId = res.spuId
            } else {
              //  this.priceData = Object.assign([], res)
              this.priceData.push(res)
              this.showSku = false
            }
          })
        }

        this.list.splice(index, 1, tmp)

        if (row.edit) {
          const data = {
            spuId: row.id,
            price: row.price
          }
          changePriceProduct(data).then(res => {
            if (res.errorCode === 9000) {
              _this.$message({
                title: '成功',
                message: '改价成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
          tmp.edit = false
        }
      }
    },
    // 价格验证
    checkValue(val) {
      const Reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
      if (!Reg.test(val)) {
        this.$message({
          title: '警告',
          message: '请输入正确的价格！',
          type: 'error',
          duration: 2000
        })
      }
    },
    // 零售改价新操作
    changePrice(val) {
      if (this.showSku) {
        val.forEach((item, index, array) => {
          const itemsdata = {
            spuId: this.saveSpuId,
            skuPrices: [
              {
                skuId: item.skuId,
                price: item.newprice
              }
            ]
          }
          updateGoodsPrice(itemsdata).then(res => {
            if (res.errorCode === 9000) {
              this.$message({
                title: '成功',
                message: '零售商品改价成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.cancleEditPrice()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        })
      } else {
        const data = {
          spuId: this.priceData[0].spuId,
          skuPrices: [
            {
              skuId: val[0].skuId,
              price: val[0].newprice
            }
          ]
        }
        updateGoodsPrice(data).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '零售商品改价成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.cancleEditPrice()
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      }
    },

    // 上下架-
    handleUpDown(index, row) {
      // eslint-disable-next-line
      if (row.spuStatus == 1) {
        const data = {
          spuIds: row.id
        }

        onSaleProduct(data).then(res => {
          // 进行上架操作
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '上架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message.error(res.errorMessage)
          }
          this.getList()
        })
      }
      // eslint-disable-next-line
      if (row.spuStatus == 2) {
        const data = {
          spuIds: row.id
        }

        offSaleProduct(data).then(res => {
          // 进行下架操作
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '下架成功',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$message.error(res.errorMessage)
          }
          this.getList()
        })
      }
    },

    // 分页大小选中
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    // 当前页触发
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },

    // 打开新增商品页面
    addProduct() {
      this.addProductDialog = true
    },
    // 取消新增商品打开
    handleCancle() {
      this.addProductDialog = false
      this.checkedItems = ''
    },

    // 新增界面
    handleRouterPush() {
      this.addProductDialog = false

      if (this.checkedItems === '零售商品') {
        this.openAddGoods = true
        this.addDialogTitle = '新增商品'
        this.$refs.addGoods.queryCategory()
      }
      if (this.checkedItems === '门票') {
        this.addDialogTitle = '新增门票'
        this.openAddTickets = true
      }
      if (this.checkedItems === '会员卡') {
        this.addDialogTitle = '新增会员卡'
        this.openAddMemberShipCard = true
        this.$refs.addCards.getTicketInShop()
      }
      if (this.checkedItems === '充值套餐') {
        this.addDialogTitle = '充值套餐'
        this.openRecharge = true
        this.$refs.recharge.getTicketInShop()
      }
    },

    // 编辑页面
    handleEdit(index, row) {
      // eslint-disable-next-line
      if (row.spuStatus == 1) {
        this.$message({
          title: '请下架',
          message: '编辑前请下架',
          type: 'warning',
          duration: 2000
        })
      } else {
        // eslint-disable-next-line
        if (row.type == '2') {
          this.$refs.addCards.getTicketInShop()
          this.openAddMemberShipCard = true
          this.addDialogTitle = '编辑会员卡'
          this.editDatas = Object.assign({}, row)
          this.$refs.addCards.sendDate()
        }
        // eslint-disable-next-line
        if (row.type == '1') {
          this.openAddTickets = true
          this.addDialogTitle = '编辑门票'
          this.editDatas = Object.assign({}, row)
          this.$refs.addT.sendDate()
        }
        // eslint-disable-next-line
        if (row.type == '3') {
          this.openAddGoods = true
          this.addDialogTitle = '编辑商品'
          this.editDatas = Object.assign({}, row)
          this.$refs.addGoods.sendDate()
          this.$refs.addGoods.querySpecs()
        }

        // eslint-disable-next-line
        if (row.type == '5') {
          // this.$refs.recharge.getTicketInShop()
          this.openRecharge = true
          this.addDialogTitle = '编辑套餐'
          this.editDatas = Object.assign({}, row)
          this.$refs.recharge.sendDate()
        }
      }
    },

    // 删除商品确认
    deleProductDialog(index, row) {
      const tmp = Object.assign({}, row)
      tmp.delete = !tmp.delete

      this.list.splice(index, 1, tmp)
    },
    // 删除商品条目
    deleteProductItem(row) {
      const data = {
        spuIds: row.id
      }
      deleteProduct(data).then(res => {
        if (res.errorCode === 9000) {
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    }
  }
}
