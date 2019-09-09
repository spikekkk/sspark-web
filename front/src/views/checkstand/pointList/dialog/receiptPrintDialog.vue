<template>
  <div class="receiptPrint">
    <el-dialog
      :visible.sync="receiptDialogVisible"
      :modal-apmeipend-to-body= "false"
      title="打印小票"
      width="400px"
    >
      <div class="receipt_content">是否打印小票</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" plain @click="cancel">取消</el-button>
        <el-button size="mini" type="primary" @click="printReceipt">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      receiptDialogVisible: false// 打印小票选择显示
    }
  },
  methods: {
    /* 弹窗显示*/
    show() {
      this.receiptDialogVisible = true
    },
    /* 打印小票*/
    printReceipt() {
      this.$emit('toParent')
      this.receiptDialogVisible = false
    },
    /* 取消*/
    cancel() {
      this.receiptDialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .receiptPrint /deep/{
   .v-modal{
     opacity: 0.7;
   }
   .el-dialog{
     border-radius: 5px;
     .el-dialog__header{
       padding: 16px 20px;
       border-radius: 5px 5px 0 0;
       background: #2D3D4C;
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
      //  padding: 0px 20px 130px;
      padding: 0;
      color: #333;
     }
     .el-dialog__footer{
       padding: 10px 20px 20px;
       .dialog-footer{
         .el-button--mini{
            border-radius: 5px;
         }
         .el-button--primary{
           background: #5D9CEC;
           border-color: #5D9CEC;
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
  }
</style>
