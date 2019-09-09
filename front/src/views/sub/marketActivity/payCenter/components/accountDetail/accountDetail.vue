<template>
  <div class="account_detail">

    <div class="detail_header">

      <div>

        <span class="header_title">
          账户余额：
        </span><span class="account_remain">{{ total }}</span><span>元</span>
        <span style="margin-left: 10px;">
          可用余额：
        </span><span class="account_remain">{{ remain }}</span><span style="margin-right:10px">元</span>

        <el-button
          type="primary"
          @click="turnInHq"
        >
          上缴
        </el-button>
        <el-button
          type="primary"
          @click="openRemind"
        >
          提现
        </el-button>
        <el-button
          class="cancel_btn"
          @click="withdrawRemind"
        >
          提现须知
        </el-button>
      </div>
    </div>

    <el-dialog
      :visible.sync="isDialog"
      :title="dialogTitle"
      max-width="400px"
      @close="closeDialog('accountData')"
    >

      <!-- 上缴 ----start-->
      <div v-if="isTurnIn">

        <el-form
          ref="accountData"
          :model="accountData"
          :rules="turnRules"
          label-position="right"
          label-width="82px"
        >
          <el-form-item
            label="总部名称:"
            prop="orgName"
          >

            {{ accountData.orgName }}

          </el-form-item>
          <el-form-item
            label="金额:"
            prop="money"
            class="money_input"
          >
            <el-input
              v-model="accountData.money"
              placeholder="请输入金额"
            />
            <el-button
              type="text"
              @click="turnInto"
            >全部转进</el-button>

          </el-form-item>

          <el-form-item
            label="安全认证："
            prop="tel"
          >
            <el-input
              v-model="mixAccountPhone"
              disabled
            />

          </el-form-item>

          <el-form-item
            label="验证码:"
            prop="code"
          >
            <el-input
              v-model="accountData.code"
              style="width:104px;margin-right: 9px;"
              placeholder="请输入验证码"
            />
            <el-button
              :disabled="isDisable"
              type="primary"
              @click="getCodeFun()"
            >
              <span v-show="isShow">

                获取验证码
              </span>

              <span v-show="!isShow"><i class="el-icon-loading" />{{ count }}s后重新获取</span>

            </el-button>

          </el-form-item>

        </el-form>
      </div>
      <!-- 上缴 ----end-->
      <!-- 提现 ---start-->

      <div v-if="!isTurnIn">
        <!-- 未设置银行卡 ---start-->
        <div
          v-if="!isHaveCard"
          style="height: 50px;text-align: center;"
        >没有设置银行卡</div>

        <!-- 未设置银行卡 ---end-->
        <!-- 已有银行卡 ----start-->
        <div v-if="isHaveCard">

          <el-form
            ref="withdrawData"
            :model="withdrawData"
            :rules="rules"
            label-position="right"
            label-width="124px"
          >
            <el-form-item
              label="提现方式:"
              prop="paymentKey"
            >

              <el-button
                type="text"
                @click="choiceAccount"
              >选择账户</el-button>

              <!-- <el-select
                  v-model="withdrawData.paymentKey"
                  placeholder="请选择提现方式"
                  clearable
                >
                  <el-option
                    label="银行卡"
                    value="bank"
                  /> -->
              <!-- <el-option
                    label="支付宝"
                    value="beijing"
                  /> -->
              <!-- </el-select> -->
              <!-- <p style="color:#6666">提现方式暂只支持银行卡</p> -->
            </el-form-item>
            <!-- <el-form-item
                v-if="withdrawData.paymentKey=='alipay'"
                label="名称:"
                prop="money"
              >
                <el-input
                  v-model="withdrawData.money"
                  placeholder="请输入金额"
                />

              </el-form-item> -->
            <el-form-item
              label="户名:"
              prop="accountName"
            >
              <el-input
                v-model="withdrawData.accountName"
                disabled
              />

            </el-form-item>
            <!-- <el-form-item
                v-if="withdrawData.paymentKey=='alipay'"
                label="账号名称:"
                prop="accountName"
              >
                <el-input
                  v-model="withdrawData.accountName"
                  disabled
                />

              </el-form-item> -->

            <el-form-item
              label="账号/卡号："
              prop="acctNo"
            >
              <el-input
                v-model="withdrawData.acctNo"
                disabled
              />

            </el-form-item>
            <!-- <el-form-item
              label="开户行："
              prop="ourBank"
            >
              <el-input
                v-model="withdrawData.ourBank"
                disabled
              />

            </el-form-item> -->

            <el-form-item
              label="提现金额："
              prop="amount"
            >
              <el-input
                v-model="withdrawData.amount"
                placeholder="请输入提现金额(提现范围200-50000)"
              />

            </el-form-item>

            <el-form-item label="实际到账：">

              <span>

                {{ withdrawData.amount?withdrawData.amount*0.99.toFixed(2):0 }}
              </span>
              <p style="font-size:12px;color:#ddd">将收取 1% 的提现手续费</p>

            </el-form-item>
            <el-form-item
              label="安全认证手机号："
              prop="tel"
            >
              <el-input
                v-model="mixWithdrawPhone"
                disabled
              />

            </el-form-item>
            <el-form-item
              label="验证码:"
              prop="vCode"
            >
              <el-input
                v-model="withdrawData.vCode"
                style="width:104px;margin-right: 9px;"
                placeholder="请输入验证码"
              />
              <el-button
                :disabled="isDisable"
                type="primary"
                @click="getCodeFun()"
              >
                <span v-show="isShow">
                  获取验证码
                </span>

                <span v-show="!isShow"><i class="el-icon-loading" />{{ count }}s后重新获取</span>

              </el-button>

            </el-form-item>

          </el-form>

        </div>

        <!-- 已有银行卡 ----end-->

      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel_btn"
          @click="closeDialog('accountData')"
        >取消</el-button>
        <!-- 上缴确认 -->
        <el-button
          type="primary"
          @click="submitForm('accountData')"
        >确定</el-button>

        <el-button
          v-if="!isHaveCard"
          type="primary"
          @click="setBlankCard()"
        >马上去设置</el-button>

      </span>

    </el-dialog>

    <el-tabs
      v-model="activeTabsName"
      tab-position="left"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="账户流水"
        name="first"
      >
        <accountState />
      </el-tab-pane>
      <el-tab-pane
        label="支付明细"
        name="second"
      />
      <el-tab-pane
        label="退款明细"
        name="third"
      />
      <payRefundDetail
        v-show="!bothDetail"
        ref="paidRefund"
      />
      <el-tab-pane
        label="提现记录"
        name="fourth"
      >
        <withdrawDetail ref="withdrawals" />
      </el-tab-pane>
    </el-tabs>

    <!-- 选择银行账号 -->
    <el-dialog
      :visible.sync="showAccount"
      title="选择账户"
      @close="closeAccountDetailTable()"
    >

      <el-table
        ref="multipleTable"
        :data="tableData"
        class="account_table_detail"
        border
        align="center"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          label="选择"
          width="50"
          align="center"
        >
          <template slot-scope="scope">
            <el-radio
              :label="scope.$index"
              v-model="choiceAccountItem"
              @change.native="handleSelectionChange(scope.$index,scope.row)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>

        <el-table-column label="支付方式">
          <template slot-scope="scope">
            <span>{{ scope.row.paymentKey==='bank'?'银行':'-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="acctNo"
          label="账号/卡号"
          width="180"
        />
        <el-table-column
          prop="rate"
          label="费率"
        />
        <el-table-column
          prop="name"
          label="备注"
        />
      </el-table>
    </el-dialog>
    <!-- 提现须知 -->
    <widthdrewWarn ref="warnDialog" />
  </div>
</template>
<script>
// import { mapState, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import { queryPayAccountMsg, queryPaymentAccountList, queryPayTelBankMsg, addSett, turnIn, setSecurtyMobile, genVerifyCodeM, querySecurtyMobile, getHqOrgan } from '@/api/sub/payAccount'//eslint-disable-line
import accountState from './components/accountState'
import payRefundDetail from './components/payRefundDetail'
import withdrawDetail from './components/withdrawDetail'
import widthdrewWarn from './components/dialog/widthdrewWarn'
export default {
  components: {
    accountState,
    payRefundDetail,
    withdrawDetail,
    widthdrewWarn
  },

  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入提现金额'))
      } else if (value < 200 || value > 50000) {
        return callback(new Error('请输入提现金额(提现范围200-50000)'))
      } else {
        callback()
      }
    }
    return {
      tenantId: Cookies.get('tenantId'),
      orgId: Cookies.get('currentShopId'),
      activeTabsName: 'first',
      isDialog: false,
      dialogTitle: '上缴至总部',

      showAccount: false,
      count: '',

      isShow: true, // 验证码
      isTurnIn: true, // 上缴开关
      // bothDetail: false, // 提现开关
      total: '',
      remain: '',
      isHaveCard: true, // 是否设置银行卡

      tabLabel: null,
      accountData: {
        orgName: '',
        tel: '',
        code: '',
        money: ''

      },
      choiceAccountItem: '',
      withdrawData: {
        paymentKey: 'bank',
        accountName: '',
        acctNo: '',
        amount: 0,
        tel: '',
        vCode: '',
        ourBank: ''

      },
      tableData: [],
      multipleSelection: [],
      rules: {

        paymentKey: [
          { required: true, message: '请选中提现方式名称', trigger: 'change' }
        ],
        accountName: [
          { required: true, message: '请输入户名名称', trigger: 'blur' }
        ],
        acctNo: [
          { required: true, message: '请输入账号/卡号', trigger: 'blur' }
        ],
        ourBank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' }
        ],
        amount: { validator: checkNum, trigger: 'blur' },

        mPayAccount: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入费率', trigger: 'blur' }
        ],
        vCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }, {
          pattern: /^\d{4}$/, message: '请输入正确的验证码', trigger: 'blur'
        }]
      },
      turnRules: {

        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, {
          pattern: /^\d{4}$/, message: '请输入正确的验证码', trigger: 'blur'
        }]
      }
    }
  },

  computed: {
    // ...mapState('changeThirdMain', [
    //   'tabsName'
    // ]),
    isDisable: function() {
      if (this.count > 0) {
        return true
      }
    },
    bothDetail: function() {
      const tabArr = ['first', 'fourth']
      return tabArr.indexOf(this.activeTabsName) !== -1
    },
    mixAccountPhone: function() {
      return this.mixTel(this.accountData.tel)
    },
    mixWithdrawPhone: function() {
      return this.mixTel(this.withdrawData.tel)
    }
  },
  mounted() {
    this.getPayAccount()
  },

  methods: {
    // ...mapActions('changeThirdMain', [
    //   'changeTabs'
    // ]),
    mixTel(val) {
      return val.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    },
    handleSelectionChange(index, val) {
      this.multipleSelection = val
      this.withdrawData = Object.assign({}, val)
      setTimeout(() => {
        this.closeAccountDetailTable()
      }, 500)
    },

    // 选择账户
    choiceAccount() {
      this.showAccount = true
      this.multipleSelection = []
      this.queryCard()
    },
    // 关闭账户选择界面
    closeAccountDetailTable() {
      this.showAccount = false
      this.choiceAccountItem = ''
    },
    // 全部转进
    turnInto() {
      this.accountData.money = this.remain
    },
    // 获取账户信息
    getPayAccount() {
      const data = {
        tenantId: this.tenantId,
        orgId: this.orgId
      }
      queryPayAccountMsg(data).then(res => {
        if (res.errorCode === 9000) {
          this.total = res.results.balance
          this.remain = this.total - res.results.unbalance
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 获取验证码
    getCodeFun() {
      const data = {}
      if (this.dialogTitle === '上缴到总部') {
        data.mobile = this.accountData.tel
      } else if (this.dialogTitle === '提现申请') {
        data.mobile = this.withdrawData.tel
      }
      genVerifyCodeM(data).then(res => {
        if (res.errorCode === 9000) {
          this.$message.success('获取验证码成功')
        } else {
          this.$message.error(res.errorMessage)
        }
      })

      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isShow = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.isShow = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    // 上缴总部
    turnInHq() {
      this.isDialog = true
      this.dialogTitle = '上缴到总部'
      getHqOrgan().then(res => {
        if (res.errorCode === 9000) {
          this.accountData.orgName = res.data.orgName
          querySecurtyMobile().then(res => {
            if (res.errorCode === 9000) {
              this.accountData.tel = res.results.tel
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 提现
    handleWithdrawals() {
      this.isDialog = true

      this.dialogTitle = '提现申请'
      // 上缴关闭
      this.isTurnIn = false
      this.queryCard()
    },
    // 查询账户信息
    queryCard() {
      queryPayTelBankMsg().then(res => {
        if (res.errorCode === 9000) {
          if (res.data.results.length === 0) {
            this.isHaveCard = false
          } else {
            this.isHaveCard = true

            if (this.dialogTitle === '提现申请') {
              const arr = []
              res.data.results.forEach((v, i) => {
                if (v.paymentKey === 'bank') {
                  arr.push(v)
                }
              })
              this.tableData = Object.assign([], arr)
            }
          }
        } else {
          this.isHaveCard = false
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 提现须知
    withdrawRemind() {
      this.$refs.warnDialog.openDialog()
    },
    // 提现银行提示
    openRemind() {
      this.$refs.warnDialog.openDialog('bank')
    },

    submitForm(formName) {
      var _this = this

      if (this.dialogTitle === '上缴到总部') {
        formName = 'accountData'
      } else if (this.dialogTitle === '提现申请') {
        formName = 'withdrawData'
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'accountData') {
            const data = {
              // behavior: 1,
              // step: 0,

              amount: this.accountData.money,
              tel: this.accountData.tel,
              vcode: this.accountData.code
            }
            turnIn(data).then(res => {
              if (res.errorCode === 9000) {
                this.$message.success(res.errorMessage)
                _this.isShow = true
                clearInterval(_this.timer)
                _this.timer = null
                _this.count = null
                this.closeDialog(formName)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          } else if (formName === 'withdrawData') {
            const data = {
              amount: this.withdrawData.amount,
              tel: this.withdrawData.tel,
              vcode: this.withdrawData.vCode,
              paymentKey: 'bank',
              id: this.withdrawData.id

            }
            addSett(data).then(res => {
              if (res.errorCode === 9000) {
                _this.isShow = true
                clearInterval(_this.timer)
                _this.timer = null
                _this.count = null
                this.$message.success(res.errorMessage)
                this.closeDialog(formName)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog(formName) {
      this.isDialog = false

      if (!this.isTurnIn && this.isHaveCard) {
        this.$refs.withdrawData.resetFields()
      } else if (this.isTurnIn) {
        this.$refs[formName].resetFields()
      }

      this.$nextTick(() => {
        this.isTurnIn = true
        this.isHaveCard = true
      })
    },

    setBlankCard() {
      this.changeTabs('payRec')
    },

    handleClick(tab) {
      // if (tab.label === '提现记录' || tab.label === '账户流水') {
      //   this.bothDetail = true
      // } else {
      //   this.bothDetail = false
      // }

      this.tabLabel = tab.name

      if (tab.label === '提现记录') {
        this.$refs.withdrawals.getTableList(tab.label)
      } else {
        this.$refs.paidRefund.changeTabName(tab.label)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.account_detail /deep/ {
  .el-tabs__content {
    padding-right: 0 !important;
  }
  .el-tabs__item.is-active {
    color: #409eff;
    background-color: aliceblue;
  }
}
.account_table_detail {
  margin-bottom: 20px;
}
.money_input {
  .el-input {
    width: 120px;
  }
}
.el-button.is-disabled {
  width: 130px !important;
}
.el-tabs--left {
  height: calc(100vh - 227px) !important;
}

.detail_header {
  font-size: 14px;
  line-height: 60px;
  text-indent: 18px;
  overflow: hidden;
  width: 100%;
  height: 60px;
  background: #f8f8fb;
  border-radius: 5px;
  margin-bottom: 20px;
}

.account_remain {
  font-size: 22px;
  color: #666;
  font-weight: 700;
}

.dialog-footer {
  display: block;
  height: 50px;
  line-height: 50px;
  text-align: -webkit-center;
}
</style>
