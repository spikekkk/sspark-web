import { getCustByTelList, getSalesQueryList } from '@/api/checkstand/pointList'
export default {
  components: {
    PaySelect: require('../dialog/paySelectDialog.vue').default
  },
  data() {
    return {
      mobile: '', // 搜索手机号
      memberTel: '', // 会员手机号
      memberId: '', // 会员Id
      total: '', // 合计金额
      cartList: [], // 购物车列表
      goodItem: {}, // 商品对象
      saleId: '', // 销售Id
      saleList: [], // 销售查询列表
      ticketCartList: [],
      isDelete: false // 是否清空购物车二次确认显示
    }
  },

  mounted() {
    this.computeTotal()
    this.saleQuery()
    if (sessionStorage.getItem('cartList')) {
      this.ticketCartList = JSON.parse(sessionStorage.getItem('cartList'))
      if (this.ticketCartList && this.ticketCartList.length > 0) {
        for (const item of this.ticketCartList) {
          this.cartList.push(item)
          this.computeTotal()
        }
      }
    }
    if (sessionStorage.getItem('memberTel')) {
      this.memberTel = sessionStorage.getItem('memberTel')
    }
  },
  methods: {
    /* 查询手机号*/
    mobileQuery() {
      if (this.mobile) {
        const params = {
          mobile: this.mobile
        }
        getCustByTelList(params).then(res => {
          if (res.errorCode === 9000) {
            this.memberTel = res.mobile
            this.memberId = res.custId
            if (this.memberId && this.memberTel) {
              sessionStorage.setItem('memberId', this.memberId)
              sessionStorage.setItem('memberTel', this.memberTel)
              this.$message.success('登录会员成功')
            } else {
              this.$message.error('该号码不是会员')
            }
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      } else {
        this.$message.error('请输入手机号')
      }
    },
    /* 销售列表查询*/
    saleQuery() {
      getSalesQueryList().then(res => {
        this.saleList = res.result
      })
    },
    /* 销售列表的id获取*/
    saleChange(value) {
      this.saleId = value
    },
    /* 商品数量变更数量*/
    changeNumber(num, index) {
      if (num === 0 || num === undefined) {
        this.$nextTick(() => {
          this.cartList.splice(index, 1)
          this.computeTotal()
          sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
        })
      } else {
        this.computeTotal()
        sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
    },
    /**
     * 购物车总价格
     */
    computeTotal() {
      let totalPrice = 0
      this.cartList.forEach(function(val, index) {
        totalPrice += val.nums * val.price // 累计总价
      })
      this.total = parseFloat(totalPrice).toFixed(2)
    },
    /* 添加到购物车*/
    addToCart(good) {
      // 创建用户当前添加的商品对象
      this.goodItem = {
        id: good.goodsId,
        name: good.skuName,
        price: good.price,
        nums: good.cartNum,
        spec: good.spec,
        otaGood: good.saleChannel
      }

      var index = this.cartList.findIndex((value, index, arr) => {
        return value.id == this.goodItem.id //eslint-disable-line
      })

      var index1 = this.cartList.findIndex((value, index, arr) => {
        return value.id == this.goodItem.id && value.spec == this.goodItem.spec //eslint-disable-line
      })

      var index2 = this.cartList.findIndex((value, index, arr) => {
        return (
          // eslint-disable-next-line
          value.id == this.goodItem.id &&
          // eslint-disable-next-line
          value.spec == this.goodItem.spec &&
          // eslint-disable-next-line
          value.otaGood == this.goodItem.otaGood
        ) //eslint-disable-line
      })
      /* OTA判断*/
      if (this.cartList && this.cartList.length >= 1) {
        // eslint-disable-next-line
        if (this.cartList[0].otaGood == '9') {
          // eslint-disable-next-line
          if (this.goodItem.otaGood == '9') {
            // eslint-disable-next-line
            if (index2 == -1) {
              // eslint-disable-next-line
              this.cartList.push(this.goodItem)
            } else {
              this.cartList[index].nums += parseInt(good.cartNum)
            }
          }
        } else if (this.cartList[0].otaGood !== '9') {
          if (this.goodItem.otaGood !== '9') {
            // eslint-disable-next-line
            if (index == -1) {
              this.cartList.push(this.goodItem)
              // eslint-disable-next-line
            } else if (index1 == -1) {
              this.cartList.push(this.goodItem)
            } else {
              this.cartList[index].nums += parseInt(good.cartNum)
            }
          }
        }
      } else {
        this.cartList.push(this.goodItem)
      }
      this.computeTotal()
      // sessionStorage存值
      sessionStorage.setItem('cartList', JSON.stringify(this.cartList))
    },
    /* 结算*/
    settleFunc() {
      if (this.cartList.length > 0) {
        const arr = []
        this.cartList.map(function(item, index) {
          const obj = {}
          obj.goodsId = item.id + ''
          obj.goodsQuantity = item.nums + ''
          arr.push(obj)
        })
        this.$refs.pay.show(arr, this.saleId, this.cartList)
      } else {
        this.$message.error('还未添加商品，请添加')
      }
    },
    /* 获取支付选择的数据*/
    getChildData(val1, val2) {
      this.total = val1
      this.$nextTick(() => {
        this.memberTel = val2
        this.mobile = ''
        this.saleId = ''
      })
    },
    /* 清空购物车*/
    clearCart() {
      if (sessionStorage.getItem('cartList')) {
        this.$nextTick(() => {
          this.saleId = ''
        })
        this.cartList = []
        this.total = '0.00'
        sessionStorage.removeItem('cartList')
        sessionStorage.removeItem('hasOTA')
        this.isDelete = false
      } else {
        this.$message.error('还未添加商品，请添加')
      }
    }
  }
}
