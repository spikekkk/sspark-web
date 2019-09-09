<template>
  <div class="shopList-container">
    <div class="filter-container">
      <div
        class="search_box"
        style="margin-bottom: 10px;"
      >
        <el-form
          ref="listQuery"
          :inline="true"
          :model="listQuery"
          class="form-inline"
        >
          <el-input
            v-model="listQuery.mobile"
            size="mini"
            placeholder="输入姓名/手机号"
            style="width: 200px;"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
          <el-button
            v-repeatdely="1000"
            type="primary"
            size="mini"
            @click="handleFilter"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button>
          <el-button
            v-repeatdely="1000"
            class="refresh_btn_style"
            @click="refresh('listQuery')"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
          </el-button>
          <el-button
            class="filter-item new_add_user prue_btn_color"
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="addUserFun"
          >新增人员</el-button>
        </el-form>
      </div>
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div class="table_style_edit">
          <div style="height:calc(100% - 60px)">
            <el-table
              :data="list"
              stripe
              style="width: 100%"
              height="100%"
            >
              <el-table-column label="姓名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="登录名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.loginName || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别">
                <template slot-scope="scope">
                  <span :style="scope.row.sex | dictColorFilter(dictInfo['sex'])">{{ scope.row.sex | dictFilter(dictInfo['sex'],scope.row.genderCn) || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="手机号">
                <template slot-scope="scope">
                  <span>{{ scope.row.mobile || '-' }}</span>
                </template>

              </el-table-column>
              <el-table-column label="职位">
                <template slot-scope="scope">
                  <span>{{ scope.row.position | dictFilter(dictRoles) || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属部门">
                <template slot-scope="scope">
                  <span>{{ scope.row.department | dictFilter(dictDepts) || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="所属门店">
                <template slot-scope="scope">
                  <span>{{ scope.row.shopName || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入职时间">
                <template slot-scope="scope">
                  <span>{{ scope.row.hiredDate || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="邮箱"
                width="180px"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.email || '-' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="180px"
              >
                <template slot-scope="scope">
                  <el-button
                    :disabled="!scope.row.hqUser"
                    :class="{ active: !scope.row.hqUser}"
                    type="text"
                    @click="editUser(scope.row.id)"
                  >编辑</el-button>
                  <el-button
                    v-if="scope.row.name == disabled"
                    type="text"
                    style="color:#c0c4cc"
                    disabled
                  >删除</el-button>
                  <el-button
                    v-else
                    :disabled="!scope.row.hqUser"
                    :class="{ active: !scope.row.hqUser}"
                    type="text"
                    @click="deleteUserInfo(scope.row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        </div>
      </div>
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="dialogFormVisible"
        :title="titleNameChange"
        style="width: 100%"
      >
        <el-form
          ref="dataForm"
          :model="addUserFromData"
          :rules="rules"
          :label-position="labelPosition"
          label-width="90px"
        >
          <el-form-item
            label="姓名"
            prop="name"
          >
            <el-input
              v-model="addUserFromData.name"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="性别"
            prop="sex"
          >
            <el-select
              v-model="addUserFromData.sex"
              size="mini"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in dictInfo['sex']"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="年龄"
            prop="age"
          >
            <el-input
              v-model="addUserFromData.age"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="入职时间"
            prop="hiredDate"
          >
            <el-date-picker
              v-model="addUserFromData.hiredDate"
              size="mini"
              type="date"
              placeholder="选择日期"
              style="width: 100%"
              value-format="yyyy-MM-dd hh:mm:ss"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="职位"
            prop="position"
          >
            <el-select
              v-model="addUserFromData.position"
              size="mini"
              style="width: 100%"
              clearable
              @change="changeRole"
            >
              <el-option
                v-for="item in dictRoles"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="mobile"
          >
            <el-input
              v-model="addUserFromData.mobile"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="addUserFromData.email"
              size="mini"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="部门"
            prop="department"
          >
            <el-select
              v-model="addUserFromData.department"
              size="mini"
              style="width: 100%"
              clearable
              @change="changeDept"
            >
              <el-option
                v-for="item in dictDepts"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            class="cancel_btn"
            size="mini"
            @click="cancleAddShow"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            v-if="dialogStatus=='create'"
            size="mini"
            type="primary"
            @click="addUserSureFun"
          >确定</el-button>
          <el-button
            v-repeatdely="2000"
            v-else
            size="mini"
            type="primary"
            @click="editUserInfo('addUserFromData')"
          >修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./userMgr.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.shopList-container /deep/ {
  box-sizing: border-box;

  .filter-container {
    width: 100%;
    // height: 100%;
    position: relative;
  }

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

  .el-form--label-left .el-form-item__label {
    text-align: right;
  }
}

.new_add_user {
  position: absolute;
  right: 10px;
  top: 13px;
  width: 92px;
  padding-left: 8px;
}

.prue_btn_color {
  // color: #5D9CEC;
  border-color: #5d9cec;
}

.search_box /deep/ {
  height: 58px;
  padding: 12px;
  background-color: #fff;

  .el-form .form-inline {
    height: 28px;
  }

  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }

  .el-button--mini,
  .el-button--small {
    border-radius: 5px;
    margin-left: 7px;
    padding: 6px 12px;
    height: 28px;
  }

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 5px !important;
  }
}

.table_style_edit /deep/ {
  height: calc(100vh - 186px);
  padding: 10px 10px 0;
  background-color: #fff;

  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px;
    /*高宽分别对应横竖滚动条的尺寸*/
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

  .el-button--text {
    color: #5d9cec;
  }

  .el-table {
    // padding: 0 6px 0 20px;
    overflow: auto;
    max-height: calc(100vh - 200px);
  }

  .el-table::before {
    background-color: transparent;
  }

  .el-table td,
  .el-table th.is-leaf {
    text-align: center;
    border-bottom: 0;
  }

  .el-table th {
    background: #eff2f6;
    font-size: 14px;
    color: #333;
    line-height: 50px;
    padding: 0;
    font-weight: 500;
  }

  .el-table__body .el-table__row:nth-child(2n) td {
    background: #f9fafc;
  }

  .el-table td {
    font-size: 12px;
    color: #666;
    padding: 10px 0;
    font-weight: 400;
  }

  .active {
    color: #c0c4cc;
  }
}

.dialog_style_edit /deep/ {
  .el-dialog {
    width: 500px;
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
    color: #56c0f5;
    border: 1px solid #5d9cec;
  }
}
</style>

