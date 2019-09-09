import { getGoodsQueryList } from '@/api/checkstand/pointList'
export default {
  components: {
    Cart: require('../common/cart.vue').default
  },
  data() {
    return {
      ticketList: [],
      ticketCheckArr: [], // 选中的商品
      isOTA: false
    }
  },
  mounted() {
    this.getTicketData()
  },
  methods: {
    /**
     * 获取门票数据
     */
    getTicketData() {
      const params = {
        categoryId: '1'
      }
      getGoodsQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          this.ticketList = res.goodsList
          for (const item of this.ticketList) {
            item.cartNum = '1'
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 加入购物车*/
    toCart(item) {
      this.$refs.cart.addToCart(item)
    }
  }
}
