<template>
  <div class="deptWrapper">
    <div class="role_table_container">
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
            v-model="listQuery.name"
            size="mini"
            placeholder="部门名称"
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
            class="filter-item new_add_dept prue_btn_color"
            size="small"
            icon="el-icon-plus"
            @click="addDeptFun"
          >新增部门</el-button>
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
              :data="deptList"
              stripe
              style="width: 100%;"
              height="100%"
            >
              <el-table-column label="部门">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="上级部门">
                <template slot-scope="scope">
                  <span>{{ scope.row.parentName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="部门人数">
                <template slot-scope="scope">
                  <span>{{ scope.row.count }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="editDeptFun(scope.row.id)"
                  >编辑</el-button>
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
        :visible.sync="showAddPage"
        :title="titleNameChange"
      >
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="deptTemplt"
          :label-position="labelPosition"
          label-width="90px"
        >
          <el-form-item
            label="部门"
            prop="name"
          >
            <el-input
              v-model="deptTemplt.name"
              size="mini"
              clearable
            />
          </el-form-item>
          <!-- <el-form-item label="上级部门" prop="parentName">
            <el-input v-model="deptTemplt.parentName" disabled/>
          </el-form-item>-->
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            v-repeatdely="2000"
            class="cancel_btn"
            size="mini"
            @click="cancleAddShow"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            v-if="dialogStatus == 'create'"
            size="mini"
            type="primary"
            @click="addDeptSureFun"
          >确定</el-button>
          <el-button
            v-repeatdely="2000"
            v-else
            size="mini"
            type="primary"
            @click="editDeptInfo"
          >修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./deptMgr.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.deptWrapper /deep/ {
  // height:calc(100vh - 150px);
  box-sizing: border-box;

  .role_table_container {
    width: 100%;
    height: 100%;
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
}

.new_add_dept {
  position: absolute;
  right: 10px;
  top: 13px;
  width: 92px;
  padding-left: 8px;
}

.footer_button {
}

.prue_btn_color {
  color: #5d9cec;
  border-color: #5d9cec;
}

.search_box /deep/ {
  height: 58px;
  padding: 12px;
  background-color: #fff;
  line-height: 0;

  .el-form .form-inline {
    line-height: 28px;
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
    color: #ffffff;
    padding: 6px 12px;
    background-color: #5d9cec;
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
  padding: 10px;
  background-color: #fff;
  padding-bottom: 0;

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

  .el-table {
    // padding: 0 6px 0 20px;
    overflow: auto;
    max-height: calc(100vh - 200px);
  }

  .el-button--text {
    color: #5d9cec;
  }

  .el-table::before {
    background-color: transparent;
  }

  .el-table__header-wrapper {
    // width: calc(100% - 18px);
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

  .el-table__body {
    // margin-left: -6px;
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
}

.dialog_style_edit /deep/ {
  .el-dialog {
    width: 400px;
    border-radius: 5px;
  }

  .el-dialog__body {
    padding-bottom: 10px;
    box-sizing: border-box;
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
</style>
