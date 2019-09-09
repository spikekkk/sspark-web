<template>
  <div class="repeat_login">
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body= "false"
      title="提示"
      width="400px"
    >
      <div class="repeat_info" >
        <div>{{ warnMessage }},是否重新登录</div>
      </div>
      <div slot="footer" class="dialog-footer footer_button">
        <el-button size="mini" plain @click="cancleLogin()">取消</el-button>
        <el-button type="primary" size="mini" @click="sureLogin()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false, // 弹窗显示
      warnMessage: ''// 提示信息
    }
  },
  methods: {
    show(warnMessage) {
      this.dialogVisible = true
      this.warnMessage = warnMessage
    },
    /* 取消*/
    cancleLogin() {
      this.dialogVisible = false
    },
    /* 重新登录*/
    sureLogin() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        sessionStorage.clear()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .repeat_login /deep/{
    .v-modal{
     opacity: 0.7;
    }
    .el-dialog{
      border-radius: 5px;
    }
    .el-dialog__header{
       padding: 11px 20px;
       border-radius: 5px 5px 0 0;
       background: #2D3D4C;
       text-align: start;
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
    .el-dialog__body {
      color: #606266;
      font-size: 14px;
      text-align: start;
    }
    .el-dialog__footer{
      padding: 2px 20px 20px;
      .dialog-footer{
        .el-button--mini{
          border-radius: 5px;
        }
        .el-button--primary{
          border-color: #5D9CEC;
          background: #5D9CEC;
          padding: 7px 17px;
        }
        .el-button.is-plain{
          padding: 7px 17px;
        }
      }
    }
  }
</style>
