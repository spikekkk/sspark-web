<template>
  <div class="stockManage">
    <div class="stockManage_search">
      <el-form
        ref="ruleForm"
        :inline="true"
        :model="formInline"
        class="form-inline"
      >
        <el-form-item prop="id">
          <el-input
            v-model="formInline.id"
            size="mini"
            clearable
            placeholder="商品名称/编码"
            @keyup.enter.native="onSubmit('ruleForm')"
          />
        </el-form-item>

        <el-form-item prop="type">
          <el-select
            v-model="formInline.type"
            clearable
            placeholder="分类"
            size="mini"
            @keyup.enter.native="onSubmit('ruleForm')"
          >
            <el-option
              v-for="item in classifyChannels"
              :key="item.index"
              :label="item.name"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            v-repeatdely="1000"
            type="primary"
            size="mini"
            @click="onSubmit('ruleForm')"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button>
          <el-button
            v-repeatdely="1000"
            class="refresh_btn_style"
            @click="refresh('ruleForm')"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="stockManage_table">
      <el-table
        :data="tableData"
        class="orderList"
        fixed
        height="calc(100vh - 191px)"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="名称/编码"
        >
          <template slot-scope="scope">
            <div>
              <div style="display:inline-block;vertical-align:middle;line-height:12px;text-align:center">
                <div style="color: #666; font-size:12px;font-weight:500;margin-bottom:4px">{{ scope.row.spuName }}</div>
                <div style="color:#999;font-size:10px;font-weight:500;">{{ scope.row.spuNo }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="分类"
        />
        <el-table-column label="规格">
          <template slot-scope="scope">
            <div
              v-if="scope.row.specList"
              class="spec_detail"
            >
              <el-popover
                placement="bottom"
                width="224"
                trigger="click"
              >
                <div
                  v-for="(item,index) of scope.row.specList"
                  :key="index"
                  style="text-align:left"
                >
                  <div>{{ item.specName }} , {{ item.skuName }},{{ item.stock }}</div>
                </div>
                <el-button
                  slot="reference"
                  type="text"
                  size="mini"
                >规格详情</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="stocks"
          label="库存数"
        />
        <el-table-column
          prop="operation"
          label="操作"
        >
          <template slot-scope="scope">
            <div class="update_btn">
              <el-button
                size="mini"
                type="text"
                @click="editStock(scope.row)"
              >修改库存</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="totalCount"
        layout="  prev, pager, next, sizes,jumper"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
    <div class="stockUpdate">
      <el-dialog
        :before-close="cancleUpdate"
        :visible.sync="stockUpdateDialogVisible"
        :modal-append-to-body="false"
        title="修改库存"
        width="400px"
        left
      >
        <el-table
          :data="stockUpdateData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            v-if="isSpecShow"
            label="规格组合"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.skuNames }}</span>
            </template>
          </el-table-column>

          <el-table-column
            v-if="!isSpecShow"
            label="规格组合"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="当前库存"
          />
          <el-table-column
            prop="goodsOut"
            label="出库"
          >
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.goodsOut"
                @blur="checkValue(scope.row.goodsOut)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsIn"
            label="入库"
          >
            <template slot-scope="scope">
              <el-input
                v-model.number="scope.row.goodsIn"
                @blur="checkValue(scope.row.goodsIn)"
              />
            </template>
          </el-table-column>
        </el-table>

        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            v-repeatdely="2000"
            size="mini"
            class="cancel_btn"
            @click="cancleUpdate"
          >取 消</el-button>
          <el-button
            v-repeatdely="2000"
            type="primary"
            size="mini"
            @click="updateStock(stockUpdateData)"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./stockMgr.js">
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.stockManage {
  height: 100%;
  margin: 10px;
  margin-top: 0;
  min-width: 1000px;

  .stockManage_search /deep/ {
    background: #fff;
    padding: 15px 0 0 11px;

    // margin-bottom: 10px;
    .el-form--inline .el-form-item {
      margin-right: 7px;
      margin-bottom: 14px !important;

      .el-form-item__content {
        line-height: 28px;

        .el-select .el-input {
          width: 94px;
        }

        .el-input--mini {
          width: 141px;
        }

        .el-button--primary {
          // width: 72px;
          font-size: 14px;
          padding: 5px 12px;
          background: #5d9cec;
          border-color: #5d9cec;
          border-radius: 5px;
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

        .el-button--primary.is-plain,
        .el-button--primary.is-plain:hover,
        .el-button--primary.is-plain:focus {
          background: #fff;
          border-color: #dddddd;
          color: #4887e6;
        }

        .el-button--primary.is-plain:active {
          background: #fff;
          border-color: #5d9cec;
          color: #5d9cec;
        }
      }
    }
  }

  .stockManage_table /deep/ {
    background: #fff;
    width: 100%;
    padding: 0px 10px 0;
    height: 100%;
    float: left;

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

    .update_btn {
      .el-button {
        // border-color: #4887E6;
        color: #5e9ced;
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        border-radius: 5px;
        padding: 3px 9px;
      }
    }

    .spec_detail {
      .el-button {
        // border-color: #4887E6;
        color: #5e9ced;
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        border-radius: 5px;
        padding: 3px 9px;
      }
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
      padding: 12px 0;
      font-weight: 400;
    }

    .el-table .cell {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      white-space: normal;
      word-break: break-all;
      line-height: 28px;
    }
  }

  .stockUpdate /deep/ {
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
        padding: 20px;
        max-height: 400px;
        overflow: auto;

        .update_content {
          .update_head {
            background: #eff2f6;
            font-size: 12px;
            color: #333;
            font-weight: 500;
            line-height: 28px;
            padding: 0 10px;

            .update_head_start {
              display: inline-block;
              // width: 120px;
              margin-right: 34px;
            }

            .update_head_end {
              display: inline-block;
              width: calc(100% - 178px);
            }
          }

          .update_content_list {
            .update_item {
              margin-top: 10px;

              .update_item_start {
                width: 148px;
                display: inline-block;

                .spec_and_currentNum {
                  width: 66px;
                  display: inline-block;
                  text-align: center;
                }
              }

              .update_item_end {
                display: inline-block;
                width: calc(100% - 152px);

                .el-input__inner {
                  padding: 0 13px;
                }
              }
            }
          }
        }
      }

      .el-dialog__footer {
        padding: 10px 20px 20px;
        text-align: end;

        .dialog-footer {
          .el-button {
            border-radius: 5px;
          }

          .el-button--primary {
            background: #5d9cec;
            border-color: #5d9cec;
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
        }
      }
    }
  }
}
</style>
