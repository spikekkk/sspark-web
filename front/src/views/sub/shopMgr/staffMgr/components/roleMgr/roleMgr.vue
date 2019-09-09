<template>
  <div class="roleWrapper">
    <div style="position: relative;">
      <div class="role_left_box">
        <div
          slot="header"
          class="left_box_header"
        >
          <span>角色名称</span>
          <span>人数</span>
          <span>操作</span>
        </div>
        <div style="height: 500px;overflow: auto;">
          <ul>
            <li
              v-for="(item,index) in roleList"
              :key="index"
              :class="{'active':rowName == item.name}"
              class="left_box_li"
              @click="showRoleMenus(item)"
            >
              <span>{{ item.name }}</span>
              <span>{{ item.personNum }}</span>
              <span
                v-if="item.admin == true"
                class="operaBtn"
              >
                <span
                  v-repeatdely="2000"
                  @click="copyRoleBtn(item)"
                >复制</span>
              </span>
              <span
                v-else
                class="operaBtn"
              >
                <span @click="editRoleName(item)">编辑</span>
                <span @click="deleteRoleNameBtn(item)">删除</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <el-button
        size="mini"
        class="add_role_btn"
        type="primary"
        @click="addRoleFun"
      >新增</el-button>
    </div>
    <div style="position: relative;">
      <div class="role_right_box">
        <div class="role_left_box">
          <div
            slot="header"
            class="left_box_header"
          >
            <span>权限范围</span>
          </div>
          <div class="right_box_tree">
            <el-tree
              ref="tree"
              :data="roleMenuList"
              :props="defaultProps"
              default-expand-all
              show-checkbox
              node-key="id"
            />
          </div>
        </div>
      </div>
      <el-button
        v-repeatdely="2000"
        size="mini"
        class="add_role_btn"
        type="primary"
        @click="bindRoleMenus"
      >保存</el-button>
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="showAddRoleName"
        :title="titleNameChange"
      >
        <el-form
          ref="dataForm"
          :model="addFormData"
          :rules="rules"
          label-width="90px"
        >
          <el-form-item
            label="角色名称"
            prop="name"
          >
            <el-input
              v-model="addFormData.name"
              size="mini"
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
            plain
            @click="cancleAddRole"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            v-if="dialogStatus == 'create'"
            size="mini"
            type="primary"
            @click="addRoleSureFun"
          >确定</el-button>
          <el-button
            v-repeatdely="2000"
            v-else
            size="mini"
            type="primary"
            @click="editRoleSureFun"
          >修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./roleMgr.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.roleWrapper /deep/ {
  // height:calc(100vh - 84px);
  background-color: #fff;
  padding: 30px 10px;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  overflow-y: auto;
  .el-form-item.is-success .el-input__inner,
  .el-form-item.is-success .el-input__inner:focus,
  .el-form-item.is-success .el-textarea__inner,
  .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #5d9cec;
  }
  .el-form-item--medium .el-form-item__content,
  .el-form-item--medium .el-form-item__label {
    line-height: 28px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }
}
.role_left_box /deep/ {
  width: 350px;
  height: 550px;
  border: 1px solid #ddd;
  border-radius: 5px;
  .operaBtn {
    color: #5d9cec;
  }
  .right_box_tree {
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 10px;
    height: 490px;
    overflow: auto;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #c8e2f8;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }
}
.role_right_box {
  width: 350px;
  margin-left: 30px;
}
.left_box_header {
  background: #ddd;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  color: #666;
  padding: 0 20px;
  box-sizing: border-box;
}
.left_box_header span:nth-child(1) {
  width: 150px;
  display: inline-block;
}
.left_box_header span:nth-child(2) {
  display: inline-block;
  width: 90px;
}
.left_box_header span:nth-child(3) {
  display: inline-block;
  width: 110px;
  text-align: right;
}
ul {
  padding: 0;
  margin: 0;
  color: #666;
}
.left_box_li {
  list-style: none;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 5px;
  box-sizing: border-box;
}
.left_box_li:hover {
  background: #f1fbff;
}
.left_box_li > span:nth-child(1) {
  width: 150px;
  display: inline-block;
  font-size: 14px;
}
.left_box_li > span:nth-child(2) {
  width: 95px;
  display: inline-block;
}
.operaBtn {
  color: #27aedf;
  font-size: 12px;
  width: 110px;
  display: inline-block;
  text-align: right;
}
.operaBtn span:nth-child(2) {
  margin-left: 10px;
}
.add_role_btn {
  position: absolute;
  right: 0;
  margin-top: 30px;
}
span {
  cursor: pointer;
}

.el-button--primary {
  color: #fff;
  background-color: #5d9cec;
  border-color: #5d9cec;
}
.dialog_style_edit /deep/ {
  .el-dialog {
    width: 400px;
    border-radius: 5px;
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
  .el-button--mini {
    color: #fff;
    background-color: #5d9cec !important;
    border-radius: 5px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 18px 0;
  }
  .box-card {
    width: 294px;
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
.active {
  background: #f1fbff;
}
</style>
