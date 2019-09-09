<template>
  <div class="personInfoWrapper">

    <div class="person_title_head">
      <p>账号安全</p>
    </div>
    <div
      v-loading.lock="loading"
      class="table_box_con table_style_edit"
      element-loading-text="拼命加载中"
    >
      <div>
        <div class="person_name_box">
          <span>登录名称：</span>
          <span>{{ personList.name || '-' }}</span>
          <el-button
            type="text"
            @click="updateNameFun(personList)"
          ><i class="el-icon-edit edit_icon_text" />修改</el-button>
        </div>
        <div class="person_name_box">
          <span>手机帐号：</span>
          <span>{{ personList.mobile || '-' }}</span>
          <!-- <el-button size="mini" type="primary">修改密码</el-button> -->
        </div>
      </div>
    </div>
    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="editUserName"
        title="修改用户名"
      >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="personTmplet"
          :label-position="labelPosition"
          label-width="90px"
        >
          <el-form-item
            label="登录名："
            prop="name"
          >
            <el-input
              v-model="personTmplet.name"
              placeholder="输入6-16位字母数字下划线特殊字符的组合"
              clearable
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            class="cancel_btn"
            size="mini"
            @click="cancleUpdateName"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            size="mini"
            type="primary"
            @click="updatePerInfoFun"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script src="./personInfo.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.personInfoWrapper /deep/ {
  height: calc(100vh - 84px);
  margin: 0 10px 0 10px;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  padding-left: 30px;
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #5d9cec;
  }
}
.person_title_head p {
  font-size: 14px;
  color: #333;
  letter-spacing: 1px;
  margin-bottom: 35px;
}
.person_name_box /deep/ {
  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }
  .el-button--mini,
  .el-button--small {
    border-radius: 5px;
  }
}
.person_name_box span:nth-child(1) {
  font-size: 13px;
  color: #999;
  letter-spacing: 1px;
  line-height: 40px;
  margin-right: 30px;
  width: 72px;
  display: inline-block;
}
.person_name_box span:nth-child(2) {
  font-size: 13px;
  color: #333;
  letter-spacing: 1px;
  line-height: 40px;
  width: 180px;
  display: inline-block;
}
.dialog_style_edit /deep/ {
  .el-dialog {
    width: 400px;
    border-radius: 5px;
  }
  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }
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
  .el-dialog__title {
    font-size: 14px;
  }
  .el-dialog__title {
    color: #fff;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .cancel_btn {
    color: #606266;
    border: 1px solid #dcdfe6;
    background-color: #fff !important;
  }
  .cancel_btn:hover {
    color: #5d9cec;
    border: 1px solid #5d9cec;
  }
}
</style>
