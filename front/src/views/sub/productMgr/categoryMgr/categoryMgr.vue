<template>
  <div class="classList-container">
    <div class="search_box">
      <el-button
        v-repeatdely="2000"
        type="primary"
        class="new_add_user prue_btn_color"
        icon="el-icon-plus"
        size="mini"
        @click="addCategoryInfo()"
      >新增</el-button>
    </div>

    <div class="table_style_edit">
      <el-table
        :data="list"
        stripe
        height="calc(100vh - 201px)"
        style="width: 100%"
      >
        <el-table-column
          prop="sortOrder"
          label="排序"
        />
        <el-table-column
          prop="name"
          label="分类"
        />
        <el-table-column
          label="操作"
          class="footer_button"
        >
          <template slot-scope="scope">
            <div class="class_eidt_btn">
              <el-button
                v-repeatdely="2000"
                type="text"
                size="mini"
                @click="editCategory(scope.row)"
              >编辑</el-button>
              <el-button
                v-repeatdely="2000"
                type="text"
                class="delete_edit_btn"
                size="mini"
                @click="deleteCategoryInfo(scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="totalCount"
        layout="prev,pager, next, sizes,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="dialogFormVisible"
        :title="titleNameChange"
        style="width: 100%"
      >
        <el-form
          ref="dataForm"
          :model="tableData"
          label-width="90px"
          style="margin:0 50px"
        >
          <el-form-item
            label="分类名称"
            required
          >
            <el-input
              v-model="tableData.name"
              clearable
            />
          </el-form-item>
          <el-form-item label="排序">
            <el-input
              v-model="tableData.sortOrder"
              clearable
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            size="mini"
            class="cancel_btn"
            @click="cancleAddShow"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            v-if="dialogStatus=='create'"
            size="mini"
            type="primary"
            @click="addCategorySubmit"
          >确定</el-button>
          <el-button
            v-repeatdely="2000"
            v-else
            type="primary"
            size="mini"
            @click="editCategoryInfo"
          >修改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./categoryMgr.js">
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.classList-container {
  background-color: #fff;
  height: calc(100vh - 78px);
  margin: 0 10px 0 10px;
  // margin-top: 10px;
  box-sizing: border-box;

  .new_add_user {
    margin: 14px 0 10px 11px;
    color: #fff !important;
    background: #5d9cec !important;
  }

  .class_eidt_btn[data-v-44fddb12] .el-button--primary {
    border-radius: 5px;
  }

  .prue_btn_color {
    color: #5d9cec;
    border-color: #5d9cec;
  }

  .search_box /deep/ {
    text-align: end;
    padding: 10px;
    height: 60px;

    .el-button--primary {
      background-color: #fff;
      border-color: #5d9cec;
    }

    .el-button--mini,
    .el-button--small {
      border-radius: 5px;
    }
  }

  .class_eidt_btn /deep/ {
    .el-button--primary {
      border-color: #5d9cec;
      color: #5d9cec;
      background: #fff;
    }
  }

  .table_style_edit /deep/ {
    padding: 10px;

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
      margin-left: -6px;
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

    .el-dialog__title {
      font-size: 14px;
    }

    .el-dialog__title {
      color: #fff;
    }

    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }

    .footer_button {
      text-align: end;

      .el-button--primary {
        background: #5d9cec;
        border-color: #5d9cec;
      }
    }
  }
}
</style>
