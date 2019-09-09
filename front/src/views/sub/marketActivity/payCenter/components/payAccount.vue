<template>
  <div class="pay_rec">

    <div style="height: 44px;">

      <el-button
        type="primary fr"
        @click="openDialog('add')"
      >新增收付款账号</el-button>

      <span v-if="!hasMobile"><span style="color: #D0021B;">您还未设置安全认证手机号！此号码极其重要，将保障账号、资金等安全 </span>
        <el-button
          type="text"
          @click="changeMobile('set')"
        >立即设置</el-button>

      </span>
      <span v-else-if="hasMobile">安全认证手机号：{{ mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') }}
        <el-button
          type="text"
          @click="changeMobile('change')"
      >改绑</el-button></span>
    </div>

    <el-table
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="paymentKeyName"
        label="支付方式"
      />
      <el-table-column
        prop="acctNo"
        label="账号/卡号"
      />
      <el-table-column
        prop="rate"
        label="费率"
      />
      <el-table-column
        prop="name"
        label="备注"
      />
      <el-table-column
        prop="rate"
        label="费率"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button
              type="text"
              @click="editPayway(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              @click="deletePayWay(scope.row)"
            >
              删除
            </el-button>

          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="totalCount"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      class="current_page"
      layout="prev, pager, next, sizes,jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
    />
    <el-dialog
      :visible.sync="isDialog"
      :title="dialogTitle"
      :close-on-click-modal="false"
      @close="cancel('payRecData')"
    >

      <!-- 新增支付方式 -->
      <el-form
        v-if="addNewPayway"
        ref="payRecData"
        :model="payRecData"
        :rules="rules"
        label-position="right"
        label-width="106px"
      >
        <el-form-item
          label="支付方式:"
          prop="paymentkey"
        >
          <el-select
            v-model="payRecData.paymentkey"
            :disabled="isShowSafe === 'edit'"
            placeholder="请选择支付方式"
            clearable
          >
            <el-option
              label="银行卡"
              value="bank"
            />
            <el-option
              label="支付宝"
              value="alipay"
            />
            <el-option
              label="微信"
              value="weixin"
            />

          </el-select>

        </el-form-item>

        <el-form-item
          v-if="payRecData.paymentkey=='bank'"
          label="账号名称："
          prop="accountName"
        >
          <el-input
            :disabled="isShowSafe === 'edit'"
            v-model="payRecData.accountName"
            placeholder="请输入账号名称"
          />

        </el-form-item>
        <el-form-item
          label="账号/卡号："
          prop="acctNo"
        >
          <el-input
            :disabled="isShowSafe === 'edit'"
            v-model="payRecData.acctNo"
            placeholder="请输入账号/卡号"
          />

        </el-form-item>
        <!-- <el-form-item
          v-if="payRecData.paymentkey=='bank'"
          label="开户行："
          prop="ourBank"
        >
          <el-input
            :disabled="isShowSafe === 'edit'"
            v-model="payRecData.ourBank"
            placeholder="请输入开户行"
          />

        </el-form-item> -->
        <el-form-item
          v-if="payRecData.paymentkey=='alipay'"
          label="账号名称："
          prop="mPayAccount"
        >
          <el-input
            v-model="payRecData.mPayAccount"
            placeholder="请输入支付宝账号名称"
          />

        </el-form-item>
        <el-form-item
          label="费率："
          prop="rate"
        >
          <el-input
            v-model="payRecData.rate"
            placeholder="费率范围[0,100),可精确到小数点后3位"
          >

            <template slot="append">%</template>
          </el-input>
          <div style="font-size:12px;color:#999999">此费率用于合同订单中计算实际到账金额</div>
        </el-form-item>
        <el-form-item
          label="备注："
          prop="name"
        >

          <el-input
            v-model="payRecData.name"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="请输入备注支付方式名称"
          />

        </el-form-item>
      </el-form>
      <!-- 新增支付方式bottom按钮 -->
      <span
        v-if="addNewPayway"
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel_btn"
          @click="cancel('payRecData')"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm('payRecData')"
        >确 定</el-button>

      </span>
      <!-- 手机号验证码获取 -->
      <div
        v-if="isChangeMessage"
        class="checkMessage"
      >
        <el-steps
          v-if="hasMobile"
          :active="active"
          align-center
          finish-status="success"
        >
          <el-step title="验证" />
          <el-step title="新信息" />
          <el-step title="改绑成功" />
        </el-steps>
        <el-form
          v-if="isForm"
          ref="mobilePhone"
          :rules="phoneRules"
          :model="mobilePhone"
          label-position="right"
          label-width="94px"
          style="margin: 50px 0 16px 0;"
        >
          <el-form-item
            :label="formLabel"
            prop="phone"
            class="phone_form"
          >
            <el-input
              v-model="mobilePhone.phone"
              :disabled="!isInput"
            />

          </el-form-item>

          <el-form-item
            label="验证码:"
            prop="code"
          >
            <el-input
              v-model="mobilePhone.code"
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
          <el-form-item style="text-align: end;">

            <el-button
              type="primary"
              @click="nextStep"
            >
              {{ hasMobile?'下一步':'提交' }}
            </el-button>

          </el-form-item>

        </el-form>
        <transition name="el-zoom-in-center">
          <div
            v-show="!isForm"
            style="line-height: 120px;text-align: center;font-size: 24px;"
          >
            绑定成功
          </div>
        </transition>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchStoreSetList, sendMessageCode } from '@/api/sub/storeSetting'
import { queryPaymentAccountList, getPaymentAccount, updatePaymentAccount, setSecurtyMobile, genVerifyCodeM, querySecurtyMobile, queryPayTelBankMsg, addPaymentAccount, deletePaymentAccount, updateStatus } from '@/api/sub/payAccount' //eslint-disable-line
import Cookies from 'js-cookie'
export default {

  data() {
    return {
      tenantId: Cookies.get('tenantId'),
      orgId: Cookies.get('currentShopId'),
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      isShowSafe: '',
      dialogTitle: '',
      isDialog: false,
      isAccount: false,
      mobile: '',
      hasMobile: true,
      isChangeMessage: false,
      isShow: true, // 验证码
      count: '',

      mobilePhone: {
        phone: '',
        code: ''
      },
      active: 0,
      payRecData: {
        name: '',
        acctNo: '',
        rate: '',
        accountName: '',
        paymentkey: '',

        ourBank: '',
        mPayAccount: ''

      },
      phoneRules: {
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,

            message: '手机号格式错误', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }, {
          pattern: /^\d{4}$/, message: '请输入正确的验证码', trigger: 'bule'
        }]
      },
      rules: {
        // name: [
        //   { required: true, message: '请输入备注方式名称', trigger: 'blur' }
        // ],
        paymentkey: [
          { required: true, message: '请选中支付方式名称', trigger: 'change' }
        ],
        accountName: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        acctNo: [
          { required: true, message: '请输入账号/卡号', trigger: 'blur' },

          { pattern: /^\d+$/, message: '请输入数字' }
        ],
        // ourBank: [
        //   { required: true, message: '请输入开户银行', trigger: 'blur' }
        // ],
        mPayAccount: [
          { required: true, message: '请输入账号名称', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请输入费率', trigger: 'blur' },
          {
            pattern: /^(\d|[1-9]\d)(\.\d{1,3})?$/,
            message: '请输入正确的费率'
          }
        ]
      },
      // deleteConfirm: false,

      listQuery: {
        show: true // 是否显示
      },
      tableHeight: 'calc(100vh - 239px)',
      tableData: [],
      multipleSelection: [],
      isDelete: true

    }
  },
  computed: {
    addNewPayway: function() {
      return this.isShowSafe === 'add' || this.isShowSafe === 'edit'
    },

    isDisable: function() {
      if (this.count > 0) {
        return true
      }
    },
    isInput: function() {
      if (this.active > 0 || !this.hasMobile) {
        return true
      }
    },
    isForm: function() {
      if (this.active === 2) {
        return false
      } else {
        return true
      }
    },

    formLabel: function() {
      if (this.hasMobile && this.active === 0) {
        return '原手机：'
      } else {
        return '新手机：'
      }
    }

  },
  watch: {
    active(newValue, oldValue) {
      if (newValue == '1') {//eslint-disable-line
        this.mobilePhone.phone = ''
      }
      if (newValue == '2') {//eslint-disable-line
        setTimeout(() => {
          this.cancel()
          this.queryPhone()
        }, 500)
      }
    }
  },
  mounted() {
    this.queryPhone()
    this.queryAccountList()
  },
  methods: {
    queryAccountList() {
      const data = {
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize,
        tenantId: this.tenantId
      }
      queryPaymentAccountList(data).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
          this.totalCount = res.data.resultCount
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.queryAccountList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.queryAccountList()
    },
    // 查询是否绑定手机号
    queryPhone() {
      const data = {
        tenantId: this.tenantId,
        orgId: this.orgId
      }
      querySecurtyMobile(data).then(res => {
        if (res.errorCode === 9000) {
          if (res.results.tel) {
            this.mobile = res.results.tel
            this.hasMobile = true
          }
        } else {
          this.hasMobile = false
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 获取验证码
    getCodeFun() {
      const sendParams = {
        msgCode: 'SMS_152283583',
        receiveMobile: this.mobilePhone.phone
      }

      sendMessageCode(sendParams).then(res => {
        if (res.errorCode === 9000) {
          this.$message({
            message: '发送验证码成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '发送短信验证码失败')
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
    // 下一步
    nextStep() {
      var _this = this
      if (this.mobilePhone.code) {
        const data = {
          behavior: 1,
          step: this.active,
          tel: this.mobilePhone.phone,
          vcode: this.mobilePhone.code,
          tenantId: this.tenantId,
          orgId: this.orgId
        }
        // 没有手机号
        if (!this.hasMobile) {
          data.behavior = 0
        }
        setSecurtyMobile(data).then(res => {
          if (res.errorCode === 9000) {
            _this.isShow = true
            clearInterval(_this.timer)
            _this.timer = null
            _this.count = null
            this.$refs.mobilePhone.resetFields()
            if (this.hasMobile) {
              this.active++
            } else {
              this.queryPhone()
              this.cancel()
            }
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      } else {
        this.$message.warning('请输入验证码')
      }
    },
    // 改绑手机号
    changeMobile(val) {
      this.openDialog(val)
      this.isChangeMessage = true
      if (val === 'change') {
        this.mobilePhone.phone = this.mobile
      } else {
        fetchStoreSetList().then(res => {
          if (res.errorCode === 9000) {
            this.mobilePhone.phone = res.mobile
          } else {
            this.$message.error(res.errorMessage)
          }
        })
      }
    },

    // 打开弹窗
    openDialog(val) {
      this.isDialog = true

      switch (val) {
        case 'add':
          this.dialogTitle = '新增收付款账号'
          break
        case 'change':
          this.dialogTitle = '修改安全手机号'
          break
        case 'set':
          this.dialogTitle = '设置安全手机号'
          break
        case 'edit':
          this.dialogTitle = '修改收付款账号'
          break
      }

      this.isShowSafe = val
    },

    // 删除支付方式
    deletePayWay(val) {
      const data = {
        ids: val.id,
        tenantId: this.tenantId,
        orgId: this.orgId
      }
      deletePaymentAccount(data).then(res => {
        if (res.errorCode === 9000) {
          this.queryAccountList()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 编辑支付方式
    editPayway(val) {
      this.openDialog('edit')
      const data = {
        id: val.id,
        tenantId: this.tenantId,
        orgId: this.orgId
      }
      getPaymentAccount(data).then(res => {
        if (res.errorCode === 9000) {
          this.$nextTick(() => {
            this.payRecData = res.results
            this.payRecData.rate = res.results.rate * 100
          })
        } else {
          this.$message.error(res.data.errorMessage)
        }
      })
    },

    // 关闭窗口
    cancel() {
      this.isDialog = false
      this.isChangeMessage = false
      this.active = 0

      if (this.addNewPayway) {
        this.$refs.payRecData.resetFields()
      }
    },

    // 确认提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const tmp = Object.assign({}, this.payRecData)
          this.payRecData.tenantId = this.tenantId
          this.payRecData.orgId = this.orgId
          if (tmp.rate) {
            this.payRecData.rate = (tmp.rate / 100).toFixed(3)
          } else {
            this.payRecData.rate = 0
          }
          const func = this.isShowSafe === 'edit' ? updatePaymentAccount : addPaymentAccount
          func(this.payRecData).then(res => {
            if (res.errorCode === 9000) {
              this.queryAccountList()
              this.cancel(formName)
            } else {
              this.$message.error(res.data.errorMessage)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button.is-disabled {
  width: auto;
}

.pay_rec /deep/ {
  .el-dialog {
    width: 500px !important;
  }
  padding: 10px;
}

.safe_phone {
  margin: 50px;
  line-height: 50px;

  .el-input--mini {
    width: 200px;
    margin-right: 20px;
  }
}

.phone_form /deep/ {
  .el-form-item__label {
    padding-right: 4px;
  }
}

.checkMessage {
  padding-bottom: 20px;
}
</style>
