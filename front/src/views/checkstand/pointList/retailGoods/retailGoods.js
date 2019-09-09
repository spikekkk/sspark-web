import { getSpecQueryList, getGoods2QueryList, getSkuQueryList } from '@/api/checkstand/pointList'
export default {
  components: {
    SpecSelect: require('../dialog/specSelectDialog.vue').default,
    Cart: require('../common/cart.vue').default
  },
  data() {
    return {
      tabList: [], // tab列表
      foodList: [], // 内容列表
      specList: [], // 规格列表
      currentTab: '', // 当前tab的id
      spuId: '',
      spec: ''// 商品规格
    }
  },
  mounted() {
    this.getTabData()
  },
  methods: {
    /* 规格选择*/
    specSelect(item) {
      const params = {
        spuId: item.spuId
      }
      getSkuQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          if (res.results.specs && res.results.specs.length > 0) {
            this.$refs.select.show(item, res)
          } else if (res.skus && res.skus.length > 0) {
            if (res.skus[0].stock > 0) {
              this.$refs.cart.addToCart(item)
            } else {
              this.$message.error('该商品暂无库存')
            }
          }
        }
      })
    },
    /**
     * 获取零售商品tab数据
     */
    getTabData() {
      const params = {
        categoryId: '3'
      }
      getSpecQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          this.tabList = res.goodsList
          if (this.tabList.length > 0) {
            const data = {
              categoryId: this.tabList[0].id
            }
            getGoods2QueryList(data).then(res => {
              if (res.errorCode === 9000) {
                this.foodList = res.goodsList
                for (const item of this.foodList) {
                  item.cartNum = '1'
                }
                if (res.goodsList.length > 0) {
                  this.spuId = res.goodsList[0].spuId
                }
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 点击某个tab切换的内容*/
    tabOnchange(value) {
      this.currentTab = this.tabList[value.paneName].id
      const params = {
        categoryId: this.currentTab
      }
      getGoods2QueryList(params).then(res => {
        this.foodList = []
        if (res.errorCode === 9000) {
          this.foodList = res.goodsList
          for (const item of this.foodList) {
            this.spuId = item.spuId
            item.cartNum = '1'
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 所选择的规格值*/
    getSpecData(spec, item) {
      const specArr = []
      for (const i in spec) {
        specArr.push(spec[i])
        this.spec = specArr.join(',')
      }
      item.spec = this.spec
      this.$refs.cart.addToCart(item)
      item = {}
    }
  }
}
