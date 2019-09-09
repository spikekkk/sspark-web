<template>
  <div class="sure_refund_dialog">
    <el-dialog
      :visible.sync="isSureRefundVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :title="退款确认"
      width="400px"
      @close="cancel"
    >
      <div class="sure_vali">
        <div class="vali_tel">
          门店负责人手机号：{{ mobile }}
        </div>
        <div class="getValicode">
          <el-input
            v-model="valicode"
            placeholder="请输入验证码"
            style="width:270px;margin-right:10px;"
          />
          <el-button
            v-if="isShow"
            type="primary"
            size="mini"
            @click="getCodeFun"
          >获取验证码</el-button>
          <el-button
            v-if="!isShow"
            size="mini"
            disabled
          >{{ count }}s后重新获取</el-button>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          plain
          class="cancel_btn"
          @click="cancel"
        >取消</el-button>
        <el-button
          v-repeatdely="2000"
          type="primary"
          size="mini"
          @click="sureRefund"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { refund, refundConfirm } from '@/api/checkstand/order'
import {

  sendMessageCode,
  checkMessageCode
} from '@/api/sub/storeSetting'
export default {
  data() {
    return {
      isSureRefundVisible: false, // 弹窗是否显示
      valicode: '', // 验证码

      detailIds: '', // 所勾选的商品
      orderId: '', // 订单编号
      mobile: '', // 负责人手机号码
      count: '', // 短信倒计时
      isShow: true // 验证码显示内容
    }
  },
  methods: {
    show(val, orderId) {
      this.getMobile()
      this.isSureRefundVisible = true
      this.orderId = orderId
      this.detailIds = val
    },
    /* 取消*/
    cancel() {
      this.isSureRefundVisible = false
      this.$emit('toParent', [])
      this.valicode = ''
    },
    /* 获取门店负责人手机号*/
    getMobile() {
      refundConfirm().then(res => {
        if (res.errorCode === 9000) {
          this.mobile = res.mobile
        } else {
          this.$message.error(res.errorMessage || '获取失败')
        }
      })
    },
    /* 获取验证码 */
    getCodeFun() {
      if (this.mobile) {
        const sendParams = {
          msgCode: 'SMS_152283583',
          receiveMobile: this.mobile

        }

        sendMessageCode(sendParams).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              message: '发送验证码成功',
              type: 'success',
              duration: 2000
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
          } else {
            this.$message.error(res.errorMessage || '发送短信验证码失败')
          }
        })
      } else {
        this.$message.error('请输入正确的手机号')
      }
    },
    /* 校验验证码--确定修改 */
    sureRefund() {
      const params = {

        nowVerifyCode: this.valicode,
        mobile: this.mobile
      }
      checkMessageCode(params).then(res => {
        if (res.errorCode === 9000) {
          const params = {
            purchaseId: this.orderId,
            detailId: this.detailIds
          }
          refund(params).then(res => {
            if (res.errorCode === 9000) {
              this.$message.success(res.errorMessage)
              this.isSureRefundVisible = false
              this.$emit('toTableData')
            } else {
              this.$message.error(res.errorMessage)
            }
            this.valicode = ''
            this.isShow = true
            this.$emit('toParent', [])
          })
        } else {
          this.$message.error(res.errorMessage || '验证码校验失败')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sure_refund_dialog /deep/ {
  .v-modal {
    opacity: 0.7;
  }
  .el-dialog {
    border-radius: 5px;
    .el-dialog__header {
      padding: 16px 20px;
      border-radius: 5px 5px 0 0;
      background: #2d3d4c;
      .el-dialog__title {
        font-size: 16px;
        line-height: 14px;
        color: #fff;
      }
      .el-dialog__headerbtn {
        top: 16px;
        .el-dialog__close {
          color: #fff;
        }
      }
    }
    .el-dialog__body {
      .sure_vali {
        .getValicode {
          margin-top: 30px;
          display: flex;
          .el-button.is-disabled,
          .el-button.is-disabled:focus,
          .el-button.is-disabled:hover {
            background: #ccc;
            border-color: #ccc;
            color: #fff;
          }
        }
      }
    }
    .el-dialog__footer {
      padding: 10px 20px 20px;
      .dialog-footer {
        .el-button--mini {
          border-radius: 5px;
          padding: 7px 17px;
        }
        .el-button--primary {
          background: #5d9cec;
          border-color: #5d9cec;
        }
        .el-button--primary:focus,
        .el-button--primary:hover {
          background: #5d9cec;
          border-color: #5d9cec;
        }
        .el-button--primary.is-active,
        .el-button--primary:active {
          background: #3a8ee6;
          border-color: #3a8ee6;
        }
      }
    }
  }
}
</style>
