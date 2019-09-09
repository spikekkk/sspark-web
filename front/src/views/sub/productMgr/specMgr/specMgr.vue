<template>
  <div class="specification">
    <div class="add_new_btn">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="addNewSpecialGroup"
      >新建规格组</el-button>
    </div>
    <div class="specific_table">
      <el-table
        :data="tableData"
        style="width: 100%"
        fixed
        height="calc(100vh - 197px)"
      >
        <el-table-column
          prop="name"
          label="规格组"
          width="220px"
        >
          <template slot-scope="{row,$index}">
            <template v-if="!row.deletoff">
              <el-input
                v-if="row.canEdit"
                v-model="row.name"
                class="editinput"
              />
              <span v-if="!row.canEdit">{{ row.name }}</span>
            </template>
            <el-tag
              v-if="row.deletoff"
              :disable-transitions="false"
              type="info"
              closable
              @close="handleClose(row,$index)"
            >
              {{ row.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="options"
          label="规格值"
        >
          <template slot-scope="{row,$index}">
            <div
              v-if="!row.deletoff"
              style="display: -webkit-inline-box;"
            >
              <div
                v-for="item in row.options"
                :key="item.index"
                style="display: -webkit-inline-box;"
              >
                <span
                  v-if="!row.canEdit"
                  style="margin-right:10px"
                >{{ item.name }}</span>
                <el-input
                  v-if="row.canEdit"
                  v-model="item.name"
                  class="editinput"
                />
              </div>
            </div>
            <div
              v-if="row.deletoff"
              style="display: -webkit-inline-box;"
            >
              <el-tag
                v-for="item in row.options"
                :disable-transitions="false"
                :key="item.index"
                type="info"
                closable
                @close="handleClose(item,row,$index)"
              >{{ item.name }}</el-tag>
            </div>

            <el-button
              :class="{'class-a':row.canEdit || row.deletoff}"
              size="mini"
              circle
              type="primary"
              icon="el-icon-plus"
              @click="addNewSpecialValue($index, row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="426"
        >
          <template slot-scope="{row,$index}">
            <div class="operate_btn">
              <el-button
                v-repeatdely="2000"
                type="text"
                size="mini"
                @click="editFunc($index, row)"
              >{{ row.canEdit?'保存':'编辑' }}</el-button>
              <el-button
                v-repeatdely="2000"
                type="text"
                size="mini"
                @click="deleteSpec($index, row)"
              >{{ row.deletoff?'取消':'删除' }}</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="totalCount"
        layout="  prev, pager, next, sizes,jumper"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <div class="pay_select">
      <el-dialog
        :visible.sync="dialogGroupFormVisible"
        :modal-append-to-body="false"
        :before-close="groupCancel"
        title="新增规格组"
        width="400px"
        left
      >
        <el-form
          ref="form"
          :model="form"
          :rules="groupRule"
          label-width="90px"
        >
          <el-form-item
            label="规格组"
            prop="name"
          >
            <el-input
              v-model="form.name"
              clearable
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            class="cancel_btn"
            @click="groupCancel"
          >取消</el-button>
          <el-button
            v-repeatdely="2000"
            size="mini"
            type="primary"
            @click="groupSubmit('form')"
          >保存</el-button>
        </div>
      </el-dialog>

      <el-dialog
        :visible.sync="dialogValueFormVisible"
        :before-close="valueCancel"
        title="添加规格值"
        width="400px"
        left
      >
        <el-form
          ref="formValue"
          :model="formValue"
          :rules="valueRule"
          label-width="90px"
        >
          <el-form-item
            label="规格值"
            prop="specValue"
          >
            <el-input
              v-model="formValue.specValue"
              clearable
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            class="cancel_btn"
            @click="valueCancel"
          >取消</el-button>
          <el-button
            v-repeatdely="2000"
            type="primary"
            size="mini"
            @click="specValueSubmit('formValue')"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./specMgr.js">
</script>
<style lang="scss" scoped>
.specification {
  padding: 15px 10px 0;
  min-width: 1000px;
  height: 100%;
  margin: 0 10px 0 10px;
  background-color: #fff;

  .add_new_btn {
    text-align: start;

    .el-button--primary {
      border-color: #5d9cec;
      background: #5d9cec;
      border-radius: 5px;
    }
  }

  .specific_table /deep/ {
    padding: 20px 0 0;
    height: 100%;

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

    .editinput .el-input__inner {
      height: 28px !important;
      width: 172x;
    }

    .el-table_1_column_2 {
      border-left: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;

      .el-icon-plus {
        font-weight: 900;
      }
    }

    .el-button--mini.is-circle {
      padding: 2px 3px;
      // float: right;
      //  margin-right: 69px;
    }

    .class-a {
      padding: 2px;
      float: right;
      margin-right: 0px !important;
    }

    .cell .el-tag {
      margin-right: 10px;
    }

    .el-table td {
      font-size: 12px;
      color: #666;
      padding: 10px 0;
      font-weight: 400;
    }

    .operate_btn {
      .el-button.is-plain {
        border-color: #4887e6;
        color: #4887e6;
        border-radius: 5px;
      }
    }
  }
}

.pay_select /deep/ {
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
      padding: 30px 38px 0px 30px;
    }

    .dialog-footer {
      text-align: end;

      .el-button--primary {
        background: #5d9cec;
        border-color: #5d9cec;
      }
    }
  }

  .el-dialog__footer {
    padding: 8px 30px 30px 30px;

    .dialog-footer {
      .el-button--primary {
        background: #5d9cec;
        border-color: #5d9cec;
        border-radius: 5px;
        height: 27px;
        font-size: 16px;
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

      .el-button.el-button--medium {
        width: 160px;
      }

      .el-button--mini,
      .el-button--small {
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
}
</style>
