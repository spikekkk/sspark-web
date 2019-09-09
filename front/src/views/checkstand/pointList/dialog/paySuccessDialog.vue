<template>
  <div class="pay_result">
    <el-dialog
      :visible.sync="payResultDialogVisible"
      :modal-append-to-body= "false"
      title="支付成功"
      width="400px"
    >
      <div class="result_all">
        <div class="result_title">
          <div class="result_title_img">
            <img src="//img.ishanshan.com/gimg/n/20181114/7a0f87cdf41f51bcb6fbb2cb8607e63a">
          </div>
          <div class="result_title_text">支付成功</div>
        </div>
        <div class="result_content">
          <div class="result_item">应收金额: ￥{{ payTotal }}</div>
          <div class="result_item">实收金额: ￥{{ resultAmount.amount }}</div>
          <div>找零: ￥{{ resultAmount.remain_money || '0' }} </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="sureFunc">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    resultAmount: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      payResultDialogVisible: false, // 弹窗显示
      payTotal: ''// 应收金额
    }
  },
  methods: {
    /* 弹窗显示*/
    show(payTotal) {
      this.payResultDialogVisible = true
      this.payTotal = payTotal
    },
    /* 确定*/
    sureFunc() {
      this.payResultDialogVisible = false
      this.$emit('toParent', false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .pay_result /deep/{
   .v-modal{
     opacity: 0.7;
   }
   .el-dialog{
     border-radius: 5px;
     .el-dialog__header{
       padding: 16px 20px;
       border-radius: 5px 5px 0 0;
       background: #5D9CEC;
       display: none;
       .el-dialog__title{
         font-size: 16px;
         line-height: 14px;
         color: #fff;
       }
       .el-dialog__headerbtn{
         top: 16px;
          .el-dialog__close{
           color: #fff;
         }
       }
     }
     .el-dialog__body{
       padding: 40px 20px 0px 40px !important;
        .result_all{
          font-size: 12px;
          color: #666;
          line-height: 12px;
          font-weight: 400;
          .result_title{
            margin-bottom: 15px;
            .result_title_img{
              height: 24px;
              margin-right: 16px;
              float: left;
            }
            .result_title_text{
              font-size: 14px;
              color: #666;
              font-weight: 500;
              line-height: 24px;
              display: inline-block;
            }
          }
          .result_content{
            padding-left: 40px;
            .result_item{
              margin-bottom: 10px;
            }
          }
        }
       }
     }
     .el-dialog__footer{
       padding: 0px 20px 20px 0px !important;
       .dialog-footer{
         .el-button--primary{
           background: #5D9CEC;
           border-color: #5D9CEC;
           border-radius: 5px;
         }
         .el-button--primary:focus, .el-button--primary:hover{
          background: #5D9CEC;
          border-color: #5D9CEC;
        }
        .el-button--primary.is-active, .el-button--primary:active{
          background: #3a8ee6;
          border-color: #3a8ee6;
        }
       }
     }
   }

</style>
