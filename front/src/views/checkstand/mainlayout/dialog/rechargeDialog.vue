<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="充值套餐"
      width="600px"
    >
      <div>
        <div class="sku_box">
          <span
            v-repeatdely="2000"
            v-for="(v,index) in goodsList"
            :key="index"
            class="sku_name"
            @click="opCardRecharge(v)"
          >

            <span class="sku_content">
              {{ v.skuName }}

            </span>
          </span>

        </div>

      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          plain
          @click="dialogVisible = false"
        >取 消</el-button>

      </span>

    </el-dialog>
    <el-dialog
      :visible.sync="dialogCard"
      :before-close="handleCardClose"
      title="储值卡充值"
    >
      <div>

        <el-form
          ref="cardData"
          :model="cardData"
        >

          <el-form-item
            :rules="[{
              required: true, message: '手机号不能为空', trigger: 'blur'
            },{ pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,
                message: '手机号格式错误', trigger: 'blur'}]"
            prop="tel"
          >
            <p class="form_title"><span>会员</span><span
              style="margin-left: 20px;"
              class="detail_content"
            >{{ memberTel }}</span></p>
            <el-input
              v-model="cardData.tel"
              class="member_card"
              clearable
              placeholder="请输入会员手机号"
            />
            <el-button
              v-repeatdely="2000"
              type="primary"
              size="mini"
              class="search_btn"
              @click="searchMember"
            >
              <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
            </el-button>
          </el-form-item>
          <el-collapse-transition name="el-zoom-in-top">
            <el-card
              v-show="openRechargeCard"
              shadow="always"
            >
              <p style="color: #FE9E0F;">
                暂无关联储值卡，是否立即开通？
              </p>
              <div>

                <el-button
                  plain
                  @click="openRechargeCard = false"
                >取 消</el-button>
                <el-button
                  v-repeatdely="2000"
                  type="primary"
                  @click="openCard"
                >确 定</el-button>

              </div>
            </el-card>

          </el-collapse-transition>
          <el-form-item
            :rules="[{
              required: true, message: '储值卡号不能为空', trigger: 'change'
            }]"
            prop="cardNum"
          >
            <p class="form_title"><span>储值卡</span><span
              style="margin-left: 8px;"
              class="detail_content"
            >{{ cardData.cardNum }}</span></p>

            <el-select
              v-model="cardData.cardNum"
              class="form_slelect"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectCardList"
                :key="item.cardId"
                :label="item.cardId"
                :value="item.cardId"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="name">
            <p class="form_title"><span>会员名称:</span><span>{{ cardData.name }}</span></p>
          </el-form-item>
          <el-form-item prop="surplus">
            <p class="form_title"><span>当前余额:</span><span>{{ cardData.surplus }}</span></p>
          </el-form-item>
          <el-form-item
            prop="saleId"
            label="销售员"
          >

            <el-select
              v-model="saleId"
              placeholder="请选择"
              class="sale_select"
              @change="saleChange"
            >
              <el-option
                v-for="item in saleList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            class="recharge"
            label="充值"
          >
            <span>
              <span style="color: #f04343;">￥</span><span class="recharge_text">{{ cardDetail.price }}</span>
            </span>
          </el-form-item>
        </el-form>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          v-repeatdely="2000"
          :disabled="openRechargeCard"
          type="primary"
          @click="payBill('cardData')"
        >结算</el-button>
      </span>

    </el-dialog>

    <pay-select
      ref="pay"
      :pay-total="total"
      @close="handleCardClose"
      @toParent="getChildData"
    />
  </div>

</template>
<script>

import { goodsStoredQuery, cardQueryByMobile, storedCreate } from '@/api/checkstand/recharge'
import { getSalesQueryList } from '@/api/checkstand/pointList'
export default {
  components: {
    PaySelect: require('../../pointList/dialog/paySelectDialog').default
  },

  data() {
    return {
      memberId: '',
      dialogVisible: false,
      dialogCard: false,
      goodsList: '',
      cartList: [],
      cardData: {
        tel: '',
        cardNum: '',
        sales: [],
        payCount: '',
        name: '',
        surplus: ''
      },
      selectCardList: [],
      total: '',
      cardDetail: '',
      openRechargeCard: false,
      memberTel: '',
      saleList: [], // 销售查询列表
      saleId: '',
      saveMemberId: ''
    }
  },
  mounted() {
    this.saleQuery()
  },
  methods: {
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
    /* 获取支付选择的数据*/
    getChildData(val1, val2) {
      this.total = val1
      this.$nextTick(() => {
        this.memberTel = val2
        this.mobile = ''
        this.saleId = ''
      })
    },
    openCard() {
      const data = {
        buyerId: this.saveMemberId,
        orderChannel: '1',
        payType: '9',
        mobile: this.cardData.tel
      }
      storedCreate(data).then(res => {
        if (res.errorCode === 9000) {
          this.openRechargeCard = false
          this.searchMember()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    searchMember() {
      const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/
      if (!reg.test(this.cardData.tel)) {
        this.$message.error('手机号格式错误')
      } else {
        const data = {
          mobile: this.cardData.tel
        }
        cardQueryByMobile(data).then(res => {
          if (res.errorCode === 9000) {
            if (!res.custId) {
              this.$message.warning('当前账号未注册会员,请先注册会员!')
            } else if (!res.results || res.results.length === 0) {
              this.openRechargeCard = true
              this.saveMemberId = res.custId
              this.$message.warning('当前账户未开通储值卡')
            } else {
              this.cardData.cardNum = res.results[0].cardId
              this.cardData.surplus = res.results[0].cashBalance
              this.selectCardList = res.results
            }
            this.memberTel = data.mobile
            this.cardData.name = res.name

            this.memberId = res.custId
          } else {
            this.$message.error(res.data.errorMessage)
          }
        })
      }
    },
    show() {
      this.dialogVisible = true
      this.getRechargeList()
    },
    opCardRecharge(val) {
      this.cardDetail = val
      this.total = JSON.stringify(val.price)
      this.dialogCard = true
      val.isRecharge = true
      this.cartList.push(val)
    },
    handleClose(val) {
      this.dialogVisible = false
    },
    handleCardClose() {
      // this.dialogCard = false
      this.cartList = []
      this.selectCardList = []
      this.openRechargeCard = false
      this.memberId = null
      this.saveMemberId = ''
      this.$refs.cardData.resetFields()

      this.memberTel = null
      this.total = null
      this.$nextTick(() => {
        this.dialogCard = false
      })
    },
    getRechargeList() {
      const data = {
        categoryId: '5'
      }
      goodsStoredQuery(data).then(res => {
        if (res.errorCode === 9000) {
          this.goodsList = res.goodsList
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },
    // 结算
    payBill(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.cartList[0].storedCardId = this.cardData.cardNum
          this.cartList[0].buyerId = this.memberId
          const arr = []
          this.cartList.map(function(item, index) {
            const obj = {}
            obj.goodsId = item.goodsId + ''
            obj.goodsQuantity = 1 + ''
            arr.push(obj)
          })
          this.$refs.pay.show(arr, this.saleId, this.cartList)
        } else {
          return false
        }
      })
    }

  }
}
</script>
<style lang="scss" scope>
.el-card {
  margin: 26px 0;
}
.sku_box {
  padding-left: 10px;
  text-align: -webkit-auto;
}
.el-form-item--mini .el-form-item__error {
  padding-left: 9px;
}
.el-dialog__body {
  padding: 30px 20px 0 !important;
}
.sku_name {
  width: 174px;
  height: 80px;
  background: rgba(244, 246, 248, 1);
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  line-height: 80px;
  color: #898989;
  margin-top: 20px;
  cursor: pointer;
}

.sku_name:nth-child(3n + 2) {
  margin: 0 10px;
}
.sku_content {
  word-wrap: break-word;
  line-height: 14px;
  height: 20px;
  text-align: -webkit-center;
  display: -webkit-inline-box;
}

.member_card {
  width: 296px;
  margin-right: 10px;
}
.form_title {
  text-align: start;
  margin: 0 6px;
  span {
    color: #333333;
    margin-right: 12px;
  }
}
.form_slelect {
  width: 350px;
}
.sale_select {
  width: 285px;
}
.detail_content {
  color: #999999 !important;
}
.recharge {
  .el-form-item__content {
    text-align: start;
  }
  .recharge_text {
    color: #f04343;
    font-size: 20px;
    font-weight: 800;
    line-height: 23px;
  }
}
</style>

