<template>
  <div>
    <el-dialog
      v-if="paySelectDialogVisible"
      :visible.sync="paySelectDialogVisible"
      :modal-append-to-body="false"
      class="pay_select"
      append-to-body
      title="支付方式"
      width="400px"
    >
      <div
        v-if="hasOTA == '1'"
        class="pay_all"
      >
        <div class="pay_all_title">应收金额</div>
        <div class="pay_money">￥<span>{{ payTotal }}</span></div>
        <div class="pay_type">
          <div
            v-for="(item,index) in payTypList"
            :key="index"
            class="pay_type_item"
            @click="payOnchange(item)"
          >
            <img :src="item.img">
            <div class="pay_type_text">{{ item.text }}</div>
            <div class="pay_disabled" />
          </div>
          <div class="pay_type_item">
            <img src="//img.ishanshan.com/gimg/n/20181214/c7dab70c3beb45993286bbb15d2806e1">
            <div class="pay_type_text">OTA支付</div>
            <div class="classBg">
              <i
                style="margin:2px 0 0 2px"
                class="el-icon-check"
              />
            </div>
          </div>
          <div class="placeholder_ota" />
        </div>
      </div>

      <div
        v-loading="loading"
        v-if="hasOTA == '2'"
        class="pay_all"
        element-loading-text="支付中"
      >
        <div class="pay_all_title">应收金额</div>
        <div class="pay_money">￥<span>{{ payTotal }}</span></div>
        <div class="pay_type">
          <div
            v-for="(item,index) in payTypList"
            :key="index"
            class="pay_type_item"
            @click="payOnchange(item)"
          >
            <img :src="item.img">
            <div class="pay_type_text">{{ item.text }}</div>
            <div
              v-if="item.isdisabled == false && payTotal =='0.00'"
              :class="payTypeAble&&item.id==currentType? 'classBg':'pay_type_select'"
            >
              <i
                v-if="payTypeAble&&item.id==currentType"
                style="margin:2px 0 0 2px;font-weight:800;font-size:15px"
                class="el-icon-check"
              />
            </div>
            <div
              v-if="item.isdisabled == true && payTotal == '0.00'"
              class="pay_disabled"
            />

            <div
              v-if="payTotal !='0.00'"
              :class="payTypeAble&&item.id==currentType? 'classBg':'pay_type_select'"
            >
              <i
                v-if="payTypeAble&&item.id==currentType"
                style="margin:2px 0 0 2px;font-weight:800;font-size:15px"
                class="el-icon-check"
              />
            </div>
          </div>
          <div class="pay_type_item">
            <img src="//img.ishanshan.com/gimg/n/20181214/e8876de71ee770631933e8728a1cded8">
            <div class="pay_type_text">OTA支付</div>
            <div class="pay_disabled" />
          </div>
          <div
            v-if="isRecharge"
            class="pay_type_item"
          >
            <img src="//img.ishanshan.com/gimg/n/20190316/417bbed84a6aea4cb1e597ba5c0abcb6">
            <div class="pay_type_text">储值卡支付</div>
            <div class="pay_disabled" />
          </div>
        </div>
        <div class="pay_code">
          <!-- 支付宝微信支付 -->
          <el-input
            v-focus
            v-show="currentType == '1' && payTotal!== '0.00'"
            ref="input"
            v-model="payCode"
            size="mini"
            placeholder="输入收款码"
            autofocus
            clearable
          />
          <!-- 现金支付 -->
          <div v-if="currentType == '3'">
            <div class="pay_amount">
              <span>实收金额</span>
              <el-input
                v-model="payList.amount"
                size="mini"
                clearable
                @keyup.native="getRemain"
              />
            </div>
            <div class="pay_remain">
              <span>找零</span>
              <el-input
                v-model="payList.remain_money"
                size="mini"
                disabled
              />
            </div>
          </div>
          <!-- 混合支付 -->
          <el-dialog
            :visible.sync="mixPay"
            :before-close="handleClose"
            append-to-body
            class="mix_pay"
            title="请选择支付方式"
            width="400px"
          >
            <div class="pay_all_title">应收金额 <span class="notice fr">

              <el-popover
                placement="left"
                width="300"
                trigger="hover"
              >
                <span style="color:#fe9e0f">
                  组合支付仅能选择两种支付方式

                </span>
                <i
                  slot="reference"
                  class="el-icon-question"
                  style="color:#5D9CEC"
                />
              </el-popover>
            </span>
            </div>

            <div class="pay_money">￥<span>{{ payTotal }}</span></div>

            <el-checkbox-group
              v-model="checkboxGroup"
              :max="2"
              @change="getMixLength"
            >
              <div class="pay_content">

                <div class="pay_item">

                  <el-checkbox label="aliwx">
                    支付宝/微信
                  </el-checkbox>

                  <el-input
                    :disabled="!isWA"
                    v-model="mixPayData.aliwx"
                    placeholder="请输入支付金额"
                    @blur="getMixRemain('aliwx')"
                  />

                </div>
                <div class="pay_code">

                  <el-input
                    :disabled="!isWA"
                    v-model="mixPayCode"
                    placeholder="请输入付款码"
                  />
                </div>
                <div class="pay_item">
                  <el-checkbox label="pos">
                    pos机
                  </el-checkbox>
                  <el-input
                    :disabled="!isPos"
                    v-model="mixPayData.pos"
                    placeholder="请输入支付金额"
                    @blur="getMixRemain('pos')"
                  />
                </div>
                <div class="pay_item">
                  <el-checkbox label="cash">
                    现金
                  </el-checkbox>
                  <el-input
                    :disabled="!isCash"
                    v-model="mixPayData.cash"
                    placeholder="请输入支付金额"
                    @blur="getMixRemain('cash')"
                  />
                </div>
                <div class="pay_item">
                  <el-checkbox
                    :disabled="isRecharge"
                    label="storedCard"
                  >
                    储值卡
                  </el-checkbox>

                  <el-input
                    :disabled="!isCard"
                    v-model="mixPayData.storedCard"
                    placeholder="请输入支付金额"
                    @blur="getMixRemain('storedCard')"
                  />

                </div>

              </div>
            </el-checkbox-group>

            <div v-if="isCard">
              <p class="tr_box"><span class="triangle" /></p>

              <el-form
                ref="mixCardData"
                :model="cardData"
                :rules="rules"
                label-width="82px"
                label-position="right"
              >
                <div
                  class="card_pay"
                  style="height:158px"
                >
                  <el-form-item
                    prop="tel"
                    label="手机号"
                  >
                    <el-input
                      v-model="cardData.tel"
                      class="member_tel"
                      placeholder="请输入会员手机号"
                    />
                    <el-button
                      v-repeatdely="1000"
                      type="primary"
                      size="mini"
                      class="search_btn"
                      @click="searchMember"
                    >
                      <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
                    </el-button>
                  </el-form-item>
                  <el-form-item
                    prop="cardNum"
                    label="储值卡号"
                  >

                    <el-select
                      v-model="cardData.cardNum"
                      placeholder="请选择储值卡号"
                      class="bill_select"
                    >
                      <el-option
                        v-for="item in cardsList"
                        :key="item.cardId"
                        :label="item.cardId"
                        :value="item.cardId"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label="储值卡余额"
                    prop="surplus"
                  >
                    <p class="form_title"><span>{{ cardData.surplus }}</span></p>
                  </el-form-item>

                </div>
              </el-form>

            </div>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button
                :disabled="loading"
                size="mini"
                plain
                @click="handleClose"
              >取消</el-button>
              <el-button
                v-repeatdely="1000"
                :disabled="loading"
                type="primary"
                size="mini"
                @click="settleMoney('mix')"
              ><i
                v-if="loading"
                class="el-icon-loading"
              />
              <span v-else>结算</span></el-button>
            </span>
          </el-dialog>

          <!-- 储值卡支付 -->
          <div v-if="currentType == '5'">
            <p class="tr_box"><span class="triangle" /></p>
            <div class="card_pay">

              <el-form
                ref="cardDatas"
                :model="cardData"
                :rules="rules"
                label-width="82px"
                label-position="right"
              >

                <el-form-item
                  prop="tel"
                  label="手机号"
                >

                  <el-input
                    v-model="cardData.tel"
                    class="member_tel"
                    placeholder="请输入会员手机号"
                  />
                  <el-button
                    v-repeatdely="1000"
                    type="primary"
                    size="mini"
                    class="search_btn"
                    @click="searchMember('card')"
                  >
                    <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
                  </el-button>
                </el-form-item>
                <el-form-item
                  prop="cardNum"
                  label="储值卡号"
                >

                  <el-select
                    v-model="cardData.cardNum"
                    placeholder="请选择储值卡号"
                    class="bill_select"
                  >
                    <el-option
                      v-for="item in cardsList"
                      :key="item.cardId"
                      :label="item.cardId"
                      :value="item.cardId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="储值卡余额"
                  prop="surplus"
                >
                  <p class="form_title"><span>{{ cardData.surplus }}</span></p>
                </el-form-item>

                <el-form-item
                  class="recharge"
                  label="实收金额"
                >
                  <el-input
                    v-model="cardData.amount"
                    placeholder="请输入实收金额"
                    size="mini"
                    clearable
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :disabled="loading"
          size="mini"
          plain
          @click="cancel"
        >取消</el-button>
        <el-button
          v-repeatdely="1000"
          v-show="currentType !== '4'"
          :disabled="loading"
          type="primary"
          size="mini"
          @click="settleMoney"
        >结算</el-button>
      </span>
    </el-dialog>
    <pay-success
      ref="payResult"
      :result-amount="payList"
      @toParent="getChildData"
    />
    <receipt-print
      ref="receipt"
      @toParent="getOrderList"
    />
  </div>
</template>
<script>
import { cardQueryByMobile, storedRecharge } from '@/api/checkstand/recharge'
// eslint-disable-next-line
import { payTrade, createOrder } from '@/api/checkstand/pointList'
import { getPurQueryList, getPurPrintQueryList, ticketPrint } from '@/api/checkstand/order'
import Cookies from 'js-cookie'
import { printReceiptData, printCancelTicketData } from '../../../../utils/print'
import { setTimeout } from 'timers'

export default {
  components: {
    PaySuccess: require('../dialog/paySuccessDialog.vue').default,
    ReceiptPrint: require('../dialog/receiptPrintDialog.vue').default
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function(el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }

  },
  props: {
    payTotal: {
      type: String,
      default() {
        return null
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        this.isSearch = false
        callback(new Error('手机号不能为空'))
      } else {
        const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/
        if (!reg.test(value)) {
          this.isSearch = false
          callback(new Error('手机号格式错误'))
        } else {
          this.isSearch = true
          callback()
        }
      }
    }
    return {
      isSearch: false,
      cardsList: [],
      isBalance: false,
      rules: { tel: [
        { validator: validatePass, trigger: 'blur' }
      ],

      cardNum: [
        { required: true, trigger: 'change', message: '选择储值卡号' }
      ]
      },
      checkboxGroup: [],
      isOff: false,
      isAliwx: false, // 微信支付宝付款

      reset: 0,
      saveMix: [],
      cardData: {
        tel: '',
        cardNum: '',
        sales: [],
        payCount: '',
        name: '',
        surplus: '',
        amount: ''
      },
      mixPayData: {
        aliwx: 0,
        storedCard: 0,
        pos: 0,
        cash: 0

      },
      mixPayCode: '',
      memberTel: '',
      cardDetail: '',
      mixPay: false,
      paySelectDialogVisible: false, // 弹窗显隐
      payTypList: [
        {
          id: '1',
          img: '//img.ishanshan.com/gimg/n/20181126/1b47dc47179dac5452e5c3c4ab54ed0c',
          text: '支付宝/微信支付',
          isdisabled: true
        }, {
          id: '2',
          img: '//img.ishanshan.com/gimg/n/20181126/b534e2d2abe4670f287c0bc06fd482df',
          text: 'pos机支付',
          isdisabled: false
        }, {
          id: '3',
          img: '//img.ishanshan.com/gimg/n/20181126/fc8668e6587b31de5366c56e0f7c2038',
          text: '现金支付',
          isdisabled: false
        },
        {
          id: '4',
          img: '//img.ishanshan.com/gimg/n/20190316/6bce7a3485d4e75032374e62ff214c32',
          text: '组合支付',
          isdisabled: false
        },
        {
          id: '5',
          img: '//img.ishanshan.com/gimg/n/20190316/417bbed84a6aea4cb1e597ba5c0abcb6',
          text: '储值卡支付',
          isdisabled: false
        }
      ],

      isRecharge: false, // 充值卡-----结算开关
      currentType: '1', // 当前选择类型
      payTypeAble: true, // 按钮样式切换
      isPaycodeShow: true, // 收款码输入框显示
      isMoneyShow: false, // 是否现金支付显示
      isCardShow: false, // 储值卡支付
      payCode: '', // 收款码
      payList: {
        amount: 0.00, // 实收金额
        remain_money: 0.00, // 找零
        tel: ''// 手机
      },
      saleId: '', // 销售Id
      goodsJson: '', // json格式的字符串
      loading: false, // loading加载
      memberId: '', // 会员Id存储
      orderPrintData: {}, // 订单小票打印数据
      cancelPrintData: {}, // 打印核销小票数据
      isTicket: '', // 是否有门票
      orderId: '', // 订单号
      cartList: [], // 购物车列表
      hasOTA: ''
    }
  },

  computed: {
    isCard: function() {
      return this.checkboxGroup.indexOf('storedCard') !== -1
    },
    isCash: function() {
      return this.checkboxGroup.indexOf('cash') !== -1
    },
    isPos: function() {
      return this.checkboxGroup.indexOf('pos') !== -1
    },
    isWA: function() {
      return this.checkboxGroup.indexOf('aliwx') !== -1
    }
  },

  methods: {
    // 混合支付关闭
    handleClose() {
      this.checkboxGroup = []
      this.mixPayData = {
        aliwx: 0,
        storedCard: 0,
        pos: 0,
        cash: 0
      }
      this.resetCardData()
      this.mixPayCode = ''
      this.mixPay = false
    },
    getMixLength(val) {
      setTimeout(() => {
        this.getMixRemain(val[val.length - 1])
      }, 500)
    },
    getMixRemain(val) {
      // eslint-disable-next-line

      if (this.checkboxGroup.length === 1) {
        if (parseFloat(this.mixPayData[this.checkboxGroup[0]]) <= parseFloat(this.payTotal)) {
          if (/^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/.test(parseFloat(this.mixPayData[this.checkboxGroup[0]]))) {
            for (const i in this.mixPayData) {
              if (i !== this.checkboxGroup[0]) {
                this.mixPayData[i] = parseFloat(parseFloat(this.payTotal) - parseFloat(this.mixPayData[this.checkboxGroup[0]])).toFixed(2)
              }
            }
          } else {
            this.$message.error('实收金额最多输入两位小数')
          }
        } else {
          this.$message.error('实收金额不能大于应收金额')
        }

        // eslint-disable-next-line
      } else if (this.checkboxGroup.length == 2) {
        var index = this.checkboxGroup.indexOf(val)
        var tmp = Object.assign([], this.checkboxGroup)

        tmp.splice(index, 1)
        this.mixPayData[tmp[0]] = parseFloat(parseFloat(this.payTotal) - parseFloat(this.mixPayData[val])).toFixed(2)

        // this.mixPayData[this.checkboxGroup[1]] = parseFloat(parseFloat(this.payTotal) - parseFloat(this.mixPayData[this.checkboxGroup[0]])).toFixed(2)
      }
    },
    // 支付方式
    payType(val) {
      switch (val) {
        case 'aliwx':
          return ''
        case 'pos':
          return '6'
        case 'cash':
          return '5'
        case 'storedCard':
          return '1'
      }
    },
    // 会员储值卡查询
    searchMember(val) {
      if (this.isSearch) {
        if (val === 'card') {
          this.cardData.amount = this.payTotal
        }
        const data = {
          mobile: this.cardData.tel
        }
        cardQueryByMobile(data).then(res => {
          if (res.errorCode === 9000) {
            if (!res.results || res.results.length === 0) {
              this.openRechargeCard = true
              this.$message.warning('当前账户未开通储值卡')
            } else {
              this.cardData.cardNum = res.results[0].cardId
              this.cardData.surplus = res.results[0].cashBalance
              this.cardsList = res.results
            }

            this.memberTel = data.mobile
            this.cardData.name = res.name
            this.memberId = res.custId
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      } else {
        this.$message.error('请正确输入')
      }
    },
    /* 计算零钱*/
    getRemain() {
      if (this.payList.amount) {
        this.payList.remain_money = parseFloat(parseFloat(this.payList.amount) - parseFloat(this.payTotal)).toFixed(2)
      } else {
        this.payList.remain_money = 0.00
      }
    },

    /* 弹窗显示*/
    show(arr, saleId, cartList) {
      if (cartList[0].isRecharge) {
        this.isRecharge = true
        this.payTypList.splice(4, 1)
      } else {
        this.isRecharge = false
      }
      if (cartList[0].otaGood == '9') {//eslint-disable-line
        sessionStorage.setItem('hasOTA', 1)
      } else {
        sessionStorage.setItem('hasOTA', 2)
      }
      if (this.payTotal == '0.00') { //eslint-disable-line
        this.isPaycodeShow = false
      } else {
        this.isPaycodeShow = true
      }
      this.isMoneyShow = false
      this.paySelectDialogVisible = true
      this.payCode = ''
      this.payList.amount = ''
      this.payList.remain_money = ''
      this.saleId = saleId
      this.goodsJson = JSON.stringify(arr)
      this.cartList = cartList
      if (this.payTotal == '0.00') { //eslint-disable-line
        this.currentType = '2'
      } else {
        this.currentType = '1'
      }
      if (sessionStorage.getItem('hasOTA')) {
        this.hasOTA = sessionStorage.getItem('hasOTA')
      }
    },
    /* 获得子组件数据*/
    getChildData(val) {
      this.paySelectDialogVisible = val
    },
    /* 触发某项展示内容*/
    payOnchange(item) {
      this.currentType = item.id
      this.payTypeAble = true
      if (this.currentType === '4') {
        this.mixPay = true
      }

      // 支付宝微信支付
      // if (this.currentType == '1') {//eslint-disable-line
      //   this.payCode = ''
      //   if (this.payTotal == '0.00') { //eslint-disable-line
      //     this.isPaycodeShow = false
      //   } else {
      //     this.isPaycodeShow = true
      //   }
      //   this.isMoneyShow = false
      //   // 现金支付
      // } else if (this.currentType == '3') {//eslint-disable-line
      //   this.isPaycodeShow = false
      //   this.isMoneyShow = true
      //   // pos机支付
      // } else if (this.currentType == '2') {//eslint-disable-line
      //   this.isPaycodeShow = false
      //   this.isMoneyShow = false
      //   // 储值卡支付
      // } else if (this.currentType == '5') {//eslint-disable-line
      //   this.isPaycodeShow = false
      //   this.isMoneyShow = false
      //   this.isCardShow = true
      // }
    },
    /* 结算支付*/
    createOrderFunc(params) {
      if (this.isRecharge) {
        params.storedCardId = this.cartList[0].storedCardId
        params.buyerId = this.cartList[0].buyerId
        this.loading = true
        storedRecharge(params).then(res => {
          if (res.errorCode === 9000) {
            this.paySelectDialogVisible = false
            this.$message.success(res.errorMessage)
            this.isTicket = res.flag
            this.handleClose()
            this.cartList.splice(0, this.cartList.length)
            this.$emit('toParent', '0.00', '')
            sessionStorage.clear()
            this.$refs.receipt.show()
            this.resetCardData()
            this.$emit('close')
          } else {
            this.$message.error(res.errorMessage)
          }
          this.loading = false
        })
      } else {
        if (this.currentType == '1' && this.hasOTA == '2') { //eslint-disable-line
          this.loading = true
          createOrder(params).then(res => {
            if (res.errorCode === 9000) {
              this.paySelectDialogVisible = false
              this.$message.success(res.errorMessage)
              this.isTicket = res.flag
              this.handleClose()
              this.cartList.splice(0, this.cartList.length)
              this.$emit('toParent', '0.00', '')
              sessionStorage.clear()
              this.$refs.receipt.show()
              this.$refs.mixCardData.resetFields()
            } else {
              this.$message.error(res.errorMessage)
            }
            this.loading = false
          })
        } else {
          this.loading = true
          createOrder(params).then(res => {
            if (res.errorCode === 9000) {
              if (this.currentType == '3') { //eslint-disable-line
                this.$refs.payResult.show(this.payTotal)
              }
              this.paySelectDialogVisible = false
              if (this.currentType != '3') { //eslint-disable-line
                this.$message.success(res.errorMessage)
                this.mixPayData = {
                  aliwx: 0,
                  storedCard: 0,
                  pos: 0,
                  cash: 0
                }
              }
              this.handleClose()
              this.isTicket = res.flag
              this.cartList.splice(0, this.cartList.length)
              this.$emit('toParent', '0.00', '')
              sessionStorage.clear()
              this.$refs.receipt.show()
            } else {
              this.$message.error(res.errorMessage)
            }
            this.loading = false
          })
        }
      }
    },
    /* 获取订单的列表以及打印*/
    getOrderList() {
      const data = {
        pageSize: 20,
        pageIndex: 0
      }
      getPurQueryList(data).then(res => {
        if (res.errorCode === 9000) {
          this.orderId = res.results[0].id
          if (res.results.length > 0) {
            const printData = {
              purchaseId: this.orderId
            }
            getPurPrintQueryList(printData).then(res => {
              if (res.errorCode === 9000) {
                this.orderPrintData = res
                this.cancelTime = res.createTime
                printReceiptData(this.orderPrintData)
                if (this.isTicket) {
                  const ticketData = {
                    orderId: this.orderId
                  }

                  ticketPrint(ticketData).then(res => {
                    if (res.errorCode === 9000) {
                      const ticketData = res
                      const status = Cookies.get('printType')
                      if (JSON.parse(status).verifySetup.syncPrint !== '0') {
                        printCancelTicketData(ticketData, this.cancelTime)
                      }
                    }
                  })
                }
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }
        }
      })
    },
    /* 结算*/
    settleMoney(val) {
      if (val === 'mix' && this.checkboxGroup.length !== 2) {
        this.$message.error('组合支付必须选择两种支付方式')
      } else {
        const userId = Cookies.get('userId')
        if (sessionStorage.getItem('memberId')) {
          this.memberId = sessionStorage.getItem('memberId')
        }
        var params = {
          cashierId: userId,
          saleId: this.saleId,
          buyerId: this.memberId,
          goodsJson: this.goodsJson,
          orderChannel: '1'
        }
        // 现金支付
        if (this.currentType == '3' && this.payList.amount) {//eslint-disable-line
          if (parseFloat(this.payList.amount) >= parseFloat(this.payTotal)) {
            if (/^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/.test(parseFloat(this.payList.amount))) {
              this.payList.remain_money = parseFloat(parseFloat(this.payList.amount) - parseFloat(this.payTotal)).toFixed(2)
              // const params = {
              //   payType: '5',
              //   orderChannel: '1',
              //   cashierId: userId,
              //   saleId: this.saleId,
              //   buyerId: this.memberId,
              //   goodsJson: this.goodsJson,
              //   orderPayAmount: this.payList.amount,
              //   orderChangeAmount: this.payList.remain_money || '0'
              // }
              params.payType = '5'

              params.orderPayAmount = this.payList.amount
              params.orderChangeAmount = this.payList.remain_money || '0'

              this.createOrderFunc(params)
            } else {
              this.$message.error('实收金额最多输入两位小数')
            }
          } else {
            this.$message.error('实收金额不能小于应收金额')
          }
          // 支付宝微信支付
        } else if (this.currentType == '1' && this.payCode) {//eslint-disable-line
          // const params = {
          //   authCode: this.payCode,
          //   orderChannel: '1',
          //   // cashierId: userId,
          //   // saleId: this.saleId,
          //   // buyerId: this.memberId,
          //   // goodsJson: this.goodsJson,
          //   orderPayAmount: this.payTotal
          // }
          params.authCode = this.payCode
          params.orderPayAmount = this.payTotal
          this.createOrderFunc(params)
          // pos机支付
        } else if (this.currentType == '2') {//eslint-disable-line
          // const params = {
          //   payType: '6',
          //   orderChannel: '1',
          //   cashierId: userId,
          //   saleId: this.saleId,
          //   buyerId: this.memberId,
          //   goodsJson: this.goodsJson,
          //   orderPayAmount: this.payTotal
          // }

          params.payType = '6'
          params.orderPayAmount = this.payTotal
          this.createOrderFunc(params)
          // 储值卡支付
        } else if (this.currentType == '5') {//eslint-disable-line

          params.storedCardId = this.cardData.cardNum
          params.payType = '1'
          params.orderPayAmount = this.payTotal

          this.$refs.cardDatas.validate((valid) => {
            if (valid) {
              if (Number(this.cardData.surplus.replace(/,/g, '')) < Number(this.payTotal)) {
                this.$message.warning('储值卡余额不足')
              } else {
                this.createOrderFunc(params)
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
          // 组合支付
        } else if (this.currentType == '4') {//eslint-disable-line
          params.payType = '7'
          params.orderPayAmount = this.payTotal
          // this.mixPayData[this.checkboxGroup[0]]
          var arr = []
          var checkArr = []
          this.checkboxGroup.forEach(v => {
            var data = {
              payType: this.payType(v),
              payAmount: this.mixPayData[v]
            }
            checkArr.push(v)
            // eslint-disable-next-line
            if (v === 'aliwx') {
              if (!this.mixPayCode) {
                this.$message.warning('请输入付款码')
                this.isAliwx = false
              } else {
                this.isAliwx = true
                params.authCode = this.mixPayCode
              }
            } else if (v === 'storedCard') {
              this.$refs.mixCardData.validate((valid) => {
                if (valid) {
                  data.storedCardId = this.cardData.cardNum
                  if (Number(this.cardData.surplus.replace(/,/g, '')) < Number(this.mixPayData['storedCard'])) {
                    this.$message.error('储值卡余额不足')
                  } else {
                    this.isOff = true
                  }
                } else {
                  this.isOff = false
                  console.log('error submit!!')
                  return false
                }
              })
            }
            arr.push(data)
          })
          params.hybridPayJson = JSON.stringify(arr)
          if (this.mixPayData[this.checkboxGroup[0]] !== '0.00' && this.mixPayData[this.checkboxGroup[1]] !== '0.00') {
            if (checkArr.indexOf('storedCard') !== -1 && !this.isOff) {
              setTimeout(() => {
                this.$message.warning('请正确输入')
              }, 1000)
            } else if (checkArr.indexOf('aliwx') !== -1 && !this.isAliwx) {
              this.$message.warning('请输入付款码')
            } else {
              this.createOrderFunc(params)
            }
          } else {
            this.$message.warning('请输入正确')
          }

          // OTA支付
        } else if (this.hasOTA == '1') {//eslint-disable-line
          // const params = {
          //   orderChannel: '9',
          //   // cashierId: userId,
          //   // saleId: this.saleId,
          //   // buyerId: this.memberId,
          //   // goodsJson: this.goodsJson,
          //   orderPayAmount: this.payTotal,
          //   orderChangeAmount: '0'
          // }

          params.orderChannel = '9'
          params.orderPayAmount = this.payTotal
          params.orderChangeAmount = '0'
          this.createOrderFunc(params)
        } else {
          this.$message.error('请输入完整')
        }
      }
    },

    resetCardData() {
      this.cardData = {
        tel: '',
        cardNum: '',
        sales: [],
        payCount: '',
        name: '',
        surplus: '',
        amount: ''
      }
    },
    /* 取消*/
    cancel() {
      this.resetCardData()
      this.paySelectDialogVisible = false
    }

  }
}
</script>
<style lang="scss" scoped>
.mix_pay /deep/ {
  .pay_content {
    .el-input--mini {
      width: 289px;
    }
  }
  .el-popover--plain {
    color: #fe9e0f !important;
  }
  .pay_item {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    line-height: 28px;
  }

  .el-checkbox__label {
    width: 100px;
  }
  .card_pay {
    background-color: #f4f6f8;
    width: 360px;
    height: 219px;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 11px;
  }
  .bill_select {
    width: 237px;
  }
  .member_tel {
    width: 182px;
    margin-right: 10px;
  }
  .tr_box {
    position: relative;
    height: 12px;
    overflow: hidden;
    margin-bottom: 0;
  }
  .triangle {
    border: solid 10px #f4f6f8;
    transition: 180;
    position: absolute;

    top: 7px;
    right: 43%;
    transform: rotate(45deg);
  }
  .pay_all_title {
    text-align: center;
    color: #333;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .pay_money {
    color: #333;
    font-size: 19px;
    line-height: 20px;
    font-weight: 600;
    text-align: center;
    span {
      font-size: 34px;
      font-weight: bold;
      margin-left: 11px;
    }
  }
  .pay_code {
    margin-left: 114px;
    .el-input--mini {
      width: 246px;
    }
  }
}
</style>
