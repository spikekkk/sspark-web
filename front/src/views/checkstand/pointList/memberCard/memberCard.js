import { getGoodsQueryList } from '@/api/checkstand/pointList'
export default {
  components: {
    Cart: require('../common/cart.vue').default
  },
  data() {
    return {
      memberList: [],
      ticketCartList: []
    }
  },
  mounted() {
    this.getMemberCardData()
  },
  methods: {
    /**
     * 获取会员卡数据
     */
    getMemberCardData() {
      const params = {
        categoryId: '2'
      }
      getGoodsQueryList(params).then(res => {
        if (res.errorCode === 9000) {
          this.memberList = res.goodsList
          for (const item of this.memberList) {
            item.cartNum = '1'
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 添加购物车*/
    addGoodsToCart(item) {
      if (sessionStorage.getItem('memberTel')) {
        this.$refs.toCart.addToCart(item)
      } else {
        this.$message.error('请查询会员，才能添加会员卡')
      }
    }
  }
}
