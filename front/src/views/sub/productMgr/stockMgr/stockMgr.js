import {
  fetchCategoryMgrList, // 分类查询
  stockQuery, // 库存查询
  goodsStockUpdate, // 库存更新
  goodsStockQuery // 详细商品查询
} from '@/api/sub/productMgr'

export default {
  data() {
    return {
      formInline: {
        type: '', // 分类
        id: '' // 商品名称/编码
      },

      rowDates: '',
      // select---分类条件框
      classifyChannels: [],

      pageIndex: 1,
      pageSize: 20,
      totalCount: 200,
      tableData: [],
      stockUpdateDialogVisible: false, // 修改库存弹窗
      isSpecShow: false, // 规格组合是否显示

      stockUpdateData: [], // 库存修改数据

      listQuery: {
        page: 1,
        limit: 20,
        queryParams: {
          id: '',
          name: '',
          type: ''
        }
      }
    }
  },
  mounted() {
    this.getList()
  },

  created() {
    this.queryCategory()
  },
  methods: {
    getList() {
      const querydatas = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        specNo:
          '' ||
          this.listQuery.queryParams.id ||
          this.listQuery.queryParams.name,
        category: '' || this.listQuery.queryParams.type
      }

      stockQuery(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 查询商品分类
    queryCategory() {
      fetchCategoryMgrList().then(res => {
        if (res.errorCode === 9000) {
          this.classifyChannels = res.categorys
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    /* 搜索*/
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInline.id) {
            this.listQuery.queryParams.id = this.formInline.id
          } else {
            this.listQuery.queryParams.id = ''
          }

          if (this.formInline.type) {
            this.listQuery.queryParams.type = this.formInline.type
          }
          this.listQuery.page = 1
          this.getList()
        } else {
          return false
        }
      })

      // 库存类别
    },
    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()

      this.formInline.id = ''
      this.listQuery.queryParams = {}

      this.getList()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
    },
    /**
     * 修改库存
     */
    editStock(spec) {
      this.stockUpdateDialogVisible = true
      const data = {
        spuId: spec.id
      }
      this.rowDates = spec.id
      goodsStockQuery(data).then(res => {
        if (res.errorCode === 9000) {
          // eslint-disable-next-line
          if (res.existSpec == '1') {
            this.isSpecShow = true

            this.stockUpdateData = res.skuStocks
            // eslint-disable-next-line
          } else if (res.existSpec == '0') {
            this.isSpecShow = false
            this.stockUpdateData.push(res)
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 取消更新
    cancleUpdate() {
      this.stockUpdateDialogVisible = false
      this.stockUpdateData = []
    },

    checkValue(val) {
      if (typeof val !== 'number') {
        this.$message.error('请输入数字！！！')
      }
    },

    // 更新库存
    updateStock(val) {
      if (parseInt(val[0].goodsOut) > parseInt(val[0].stock)) {
        this.$message.error('出库数量大于当前库存')
      } else if (this.isSpecShow) {
        // 多规格更新
        val.forEach((item, index, array) => {
          const editdatas = {
            spuId: this.rowDates,
            skuStocks: [
              {
                skuId: item.skuId,
                outStock: item.goodsOut || 0,
                inStock: item.goodsIn || 0
              }
            ]
          }
          goodsStockUpdate(editdatas).then(res => {
            if (res.errorCode === 9000) {
              this.$message({
                title: '成功',
                message: '出入库成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
              this.cancleUpdate()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        })
      } else if (!this.isSpecShow) {
        // 单规格更新
        const editdatas = {
          spuId: this.rowDates,
          skuStocks: [
            {
              skuId: val[0].skuId,
              outStock: val[0].goodsOut || 0,
              inStock: val[0].goodsIn || 0
            }
          ]
        }
        goodsStockUpdate(editdatas).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '出入库成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.cancleUpdate()
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      }
    }
  }
}
