<template>
  <div>
    <el-dialog
      :visible.sync="isOpen"
      :before-close="closeDialog"
      title="提现须知"
      width="407px"
    >

      <div v-if="isNotice">

        <h3 style="text-align: center; color: red;margin-bottom:30px">提现仅支持如下银行，请确保已有相应银行账户！</h3>
        <p>

          招商银行、工商银行、建设银行、浦发银行、农业银行、民生银行、兴业银行、平安银行、交通银行、中信银行、光大银行、华夏银行、中国银行、广发银行、北京银行、宁波银行、邮政储蓄银行

        </p>
      </div>
      <div
        v-else
        class="widthdrew"
        style="text-align: left;"
      >
        <p>1、闪闪提供支付代收服务，用户通过线上微信支付金额直接进入闪闪微信支付的代收账号中。</p>
        <p>2、用户成功支付订单时，微信会收取占交易金额一定比例的手续费。此手续费由微信官方统一扣费。</p>
        <p>3、提现手续费统一为交易额的2％；（2019年1月1日～2019年5月31日活动期间提现手续费统一为交易额的1%）。</p>
        <p>4、申请提现请在营销模板的支付中心进行操作，每周四会统一审核各机构提交的提现申请。</p>
        <p>5、单次提现最高不超过5万。</p>
        <p>6、到账时间：审核通过后2天左右到账，若遇到法定节假日顺延。</p>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          v-show="isNotice"
          class="cancel_btn"
          @click="closeDialog()"
        >没有</el-button>

        <el-button
          type="primary"
          @click="confirm()"
        >{{ isNotice?'我有上述银行':"确定" }}</el-button>

      </span>

    </el-dialog>
  </div>
</template>
<script>
export default {

  data() {
    return {
      isOpen: false,
      isNotice: false
    }
  },
  methods: {
    openDialog(val) {
      this.isOpen = true

      if (val == 'bank') { //eslint-disable-line
        this.isNotice = true
      } else {
        this.isNotice = false
      }
    },
    closeDialog() {
      this.isNotice = false
      this.isOpen = false
    },

    confirm() {
      if (this.isNotice) {
        this.$parent.handleWithdrawals()
      }

      this.closeDialog()
    }

  }

}
</script>
<style lang="scss" scoped>
.widthdrew {
  line-height: 24px;
}
</style>
