<template>
  <div class="product_container">
    <div
      v-if="!openAddGoods"
      class="product_box"
    >
      <div>
        <div class="header_select">
          <el-input
            v-model="multipleSearch"
            placeholder="商品名称\编码"
            size="mini"
            style="width: 158px;"
            @keyup.enter.native="handleFilter"
          />
          <el-button
            class="new_add_user prue_btn_color"
            icon="el-icon-plus"
            size="small"
            @click="addProduct"
          >新增</el-button>
        </div>
        <div class="main_session">
          <el-form
            ref="listQuery"
            :model="listQuery"
          >
            <div class="search_box_style">
              <!-- 多条件搜索模块 -->
              <el-form-item prop="sepcNo">
                <el-select
                  v-model="listQuery.sepcNo"
                  size="mini"
                  width="80px"
                  clearable
                  placeholder="商品类别"
                  @keyup.enter.native="handleFilter"
                  @change="choiceSpecs(listQuery.sepcNo)"
                >
                  <el-option
                    v-for="item in dictInfo.goods_category"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="showGoodsCate"
                prop="goodsCate"
              >
                <el-select
                  v-model="listQuery.goodsCate"
                  style="margin-left:11px;"
                  size="mini"
                  clearable
                  placeholder="零售分类"
                  @keyup.enter.native="handleFilter"
                >
                  <el-option
                    v-for="item in goodsCate"
                    :key="item.index"
                    :label="item.name"
                    :value="item.categoryId"
                  />
                </el-select>
              </el-form-item>

              <el-form-item prop="status">
                <el-select
                  v-model="listQuery.status"
                  style="margin: 0 11px;"
                  size="mini"
                  clearable
                  placeholder="状态"
                  @keyup.enter.native="handleFilter"
                >
                  <el-option
                    v-for="item in dictInfo.goods_spu_status"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item prop="chananl">
                <el-select
                  v-model="listQuery.chananl"
                  size="mini"
                  style="width: 120px;"
                  clearable
                  placeholder="销售渠道"
                  @keyup.enter.native="handleFilter"
                >
                  <el-option
                    v-for="item in dictInfo.channel"
                    :key="item.index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-repeatdely="1000"
                  type="primary"
                  class="search_btn_style"
                  size="mini"
                  @click="handleFilter"
                >
                  <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
                </el-button>
                <el-button
                  v-repeatdely="1000"
                  class="refresh_btn_style"
                  @click="searchRefresh"
                >
                  <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
                </el-button>
              </el-form-item>
            </div>
          </el-form>
          <div
            v-loading.lock="loading"
            class="table_box_con"
            element-loading-text="拼命加载中"
          >
            <div class="table_style_edit">
              <el-table
                :data="list"
                :rules="rules"
                tooltip-effect="dark"
                height="calc(100vh - 267px)"
                style="width: 100%"
                highlight-current-row
              >
                <el-table-column
                  type="selection"
                  width="40"
                />

                <el-table-column
                  label="名称/类型"
                  align="left"
                  width="128px"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div class="type_edit_name">
                      <div class="type_edit_right_text">
                        <span class="product_name">{{ scope.row.spuName }}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="spuNo"
                  label="编码"
                  show-overflow-tooltip
                />
                <el-table-column
                  prop="type"
                  label="类别"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.type | dictFilter(dictInfo['goods_category'],scope.row.genderCn) || '-' }}</span>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="category"
                  label="分类"
                  show-overflow-tooltip
                />

                <el-table-column
                  label="售价"
                  align="center"
                  prop="price"
                >
                  <template slot-scope="scope">
                    <span v-if="!scope.row.edit">{{ scope.row.price }}</span>
                    <el-input
                      v-else-if="scope.row.edit"
                      v-model.number="scope.row.price"
                      size="small"
                      placeholder="请输入价格"
                      @blur="checkValue(scope.row.price)"
                    />
                  </template>
                </el-table-column>

                <el-table-column
                  prop="stock"
                  label="库存"
                  show-overflow-tooltip
                />
                <el-table-column
                  label="销售渠道"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.saleChannel | dictFilter(dictInfo['goods_spu_status'],scope.row.genderCn) || '-'
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="状态"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>
                      {{ scope.row.spuStatus |
                      dictFilter(dictInfo['goods_spu_status'],scope.row.genderCn) || '-' }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="上下架"
                  width="114"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <!-- <el-select
                      v-model="scope.row.spuStatus"
                      placeholder="请选择"
                      @change="handleUpDown(scope.$index, scope.row)"
                    >
                      <el-option
                        v-for="item in dictInfo.goods_spu_status"
                        :key="item.index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select> -->
                    <el-switch
                      v-model="scope.row.spuStatus"
                      active-color="#5d9cec"
                      inactive-color="#DDDDDD"
                      active-value="1"
                      inactive-value="2"
                      @change="handleUpDown(scope.$index, scope.row)"
                    />
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="200"
                >
                  <template slot-scope="scope">
                    <div>
                      <el-button
                        type="text"
                        @click="handlePrice(scope.$index, scope.row)"
                      >
                        {{
                        scope.row.edit ? '保存' : '改价' }}
                      </el-button>
                      <el-button
                        type="text"
                        size="mini"
                        style="margin-right:10px"
                        @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button>

                      <el-popover
                        v-model="scope.row.delete"
                        placement="top"
                        width="160"
                      >
                        <p>确定删除当前商品？</p>
                        <div style="text-align: center; margin: 0">
                          <el-button
                            class="cancel_btn"
                            size="mini"
                            @click="scope.row.delete = false"
                          >取消</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="deleteProductItem(scope.row)"
                          >确定</el-button>
                        </div>
                        <el-button
                          slot="reference"
                          type="text"
                          size="mini"
                          @click="deleProductDialog(scope.$index,scope.row)"
                        >删除</el-button>
                      </el-popover>
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 新增商品确认 start-->
      <div class="dialog_style_edit">
        <el-dialog
          :visible.sync="addProductDialog"
          title="选择商品类别"
        >
          <el-radio-group
            v-model="checkedItems"
            :max="1"
            class="choice_items"
          >
            <el-radio
              v-for="items in choiceItems"
              :label="items"
              :key="items.index"
            >{{ items }}</el-radio>
          </el-radio-group>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              class="cancle_btn cancel_btn"
              size="mini"
              @click="handleCancle"
            >取 消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleRouterPush"
            >确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 新增商品确认end -->
      <!-- 改价dialog-start -->
      <div class="dialog_style_edit">
        <el-dialog
          :visible.sync="dialogChangPrice"
          :before-close="cancleEditPrice"
          title="改价"
        >
          <el-table
            :data="priceData"
            stripe
            style="width: 100%"
          >
            <div v-if="showSku">
              <el-table-column
                prop="skuNames"
                label="规格"
              />
            </div>

            <el-table-column
              prop="price"
              label="当前售价"
            />
            <el-table-column
              prop="newprice"
              label="改价"
            >
              <template slot-scope="scope">
                <el-input
                  v-model.number="scope.row.newprice"
                  clearable
                  @keyup.native="checkValue(scope.row.newprice)"
                />
              </template>
            </el-table-column>
          </el-table>

          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              class="cancle_btn"
              size="mini"
              @click="cancleEditPrice"
            >取 消</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="changePrice(priceData)"
            >确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 改价dialog-end-->
    </div>

    <div>
      <addMembershipCard
        ref="addCards"
        :open="openAddMemberShipCard"
        @refresh="getList"
        @clearCheckbox="checkedItems=$event"
        @closeDialog="openAddMemberShipCard=$event"
      />

      <add-Goods
        ref="addGoods"
        :open="openAddGoods"
        @refresh="getList"
        @clearCheckbox="checkedItems=$event"
        @closeDialog="openAddGoods=$event"
      />
      <addTickets
        ref="addT"
        :opendialog="openAddTickets"
        @refresh="getList"
        @clearCheckbox="checkedItems=$event"
        @closeDialog="openAddTickets=$event"
      />

      <recharge
        ref="recharge"
        :opendialog="openRecharge"
        @refresh="getList"
        @clearCheckbox="checkedItems=$event"
        @closeDialog="openRecharge=$event"
      />
    </div>
  </div>
</template>

<script src="./productMgr.js">
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.product_container /deep/ {
  height: calc(100vh - 87px);
  margin: 0 10px;

  box-sizing: border-box;

  .choice_items {
    margin-bottom: 20px;
  }
  .el-input--medium .el-input__icon {
    line-height: 28px;
  }

  .product_box {
    width: 100%;
    height: 100%;
    position: relative;

    .header_select {
      background-color: #fff;
      height: 58px;
      padding: 14px;
      margin-bottom: 10px;

      .el-button--small,
      .el-button--small.is-round {
        padding: 6px 12px;
        height: 28px;
      }
    }
  }

  .new_add_user {
    position: absolute;
    right: 10px;
    color: #fff;
    background: #5d9cec !important;

    span {
      color: #fff;
    }
  }

  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }

  .el-checkbox + .el-checkbox {
    margin-left: 20px;
  }

  .el-button--mini,
  .el-button--small {
    border-radius: 5px;
  }

  .type_edit_name {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    // margin-left: 20px;
  }

  .el-tag--medium {
    height: 17px;
    line-height: 17px;
    // width: 36px;
  }

  .el-tag {
    padding: 0;
  }

  .type_edit_right_text {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    text-align: left;
    .product_name {
      max-height: 44px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      white-space: pre-wrap;
      font-size: 12px;
      color: rgb(102, 102, 102);
      font-weight: 900;
      width: 109px;
    }
  }

  .dialog_style_edit /deep/ {
    .el-dialog {
      border-radius: 5px;
      width: 400px;
    }

    .el-dialog__body {
      color: #606266;
      font-size: 14px;
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
      // background-color: #5d9cec !important;
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
    .el-radio + .el-radio {
      margin-left: 15px;
    }
  }

  .main_session {
    background-color: #fff;

    /deep/.search_box_style {
      display: -webkit-inline-box;
      height: 68px;
      padding: 20px 10px;

      .el-select {
        width: 100px;
      }

      .el-button--mini,
      .el-button--mini.is-round {
        padding: 5px 12px;
      }

      .prue_btn_color {
        color: #fff;
        border-color: #5d9cec;
      }

      // .el-button {
      //   margin-left: 10px;
      // }
    }

    .table_style_edit {
      padding: 0 10px 10px !important;
    }
  }

  .table_style_edit /deep/ {
    padding: 10px !important;

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
      // max-height: calc(100vh - 200px);
    }

    .el-table::before {
      background-color: transparent;
    }

    .el-table__header-wrapper {
      // width: calc(100% - 18px);
      .el-table-column--selection {
        .cell {
          padding-left: 14px !important;
        }
      }
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
  }
}
</style>
