<template>
  <div>
    <div class="commodity_container">
      <el-tabs
        v-model="activeTabs"
        type="border-card"
        @tab-click="handleClick(activeTabs)"
      >
        <el-tab-pane
          label="门票"
          name="1"
        />
        <el-tab-pane
          label="会员卡"
          name="2"
        />
        <el-tab-pane
          label="零售商品"
          name="3"
        />
      </el-tabs>
    </div>

    <div class="retail_container">
      <div class="filter_container">
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
            <el-form-item prop="modifyTime">
              <el-date-picker
                v-model="listQuery.modifyTime"
                :default-time="['00:00:00', '23:59:59']"
                size="mini"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
                @change="onSearch"
              />
            </el-form-item>
            <el-form-item
              v-if="activeTabs==3"
              style="margin-left: -7px !important;"
              prop="goodsCate"
            >
              <el-select
                v-model="listQuery.goodsCate"
                size="mini"
                style="margin-left:7px"
                clearable
                placeholder="零售商品分类"
              >
                <el-option
                  v-for="item in goodsCate"
                  :key="item.index"
                  :label="item.name"
                  :value="item.categoryId"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="activeTabs==2"
              style="margin-left: -7px !important;"
              prop="cardType"
            >
              <el-select
                v-model="listQuery.cardType"
                size="mini"
                style="margin-left:7px"
                clearable
                placeholder="会员卡类型"
              >
                <el-option
                  v-for="item in dictInfo['card_type']"
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
                size="mini"
                @click="onSearch"
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
            </el-form-item>
            <el-form-item style="float:right;">
              <el-date-picker
                v-model="value4"
                :editable="false"
                style="padding-right: 7px;"
                type="month"
                placeholder="选择导出数据的月份"
                format="yyyy-MM"
                value-format="yyyy-MM"
              />

              <el-button
                v-repeatdely="2000"
                size="mini"
                type="primary"
                @click="filesDownload"
              >
                导出

              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--
        <div class="income_detail">

          <div class="cash_money_head">
            <span>支付宝收款：<span>{{ aliNum }}</span></span>
            <span>微信收款：<span>{{ wxNum }}</span></span>
            <span>现金收款：<span>{{ cashNum }}</span></span>
            <span>POS机收款：<span>{{ posNum }}</span></span>
            <span style="margin-right:0">OTA：<span>{{ otaNum }}</span></span>
            <div>{{ countName }}总收入：<span>{{ countNum }}</span></div>
          </div>
        </div> -->

        <div
          v-loading.lock="loading"
          class="table_box_con table_style_edit"
          element-loading-text="拼命加载中"
        >
          <div class="table_style_edit">
            <el-table
              :data="ticketsList"
              stripe
              style="width: 100%"
              @sort-change="sortChange"
            >
              <el-table-column
                key="1"
                label="商品名称"
                prop="goodsName"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsName || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="activeTabNum=='3'"
                key="2"
                label="商品分类"
              >
                <template
                  slot-scope="scope"
                  prop="goodsTypeName"
                >
                  <span>{{ scope.row.goodsTypeName || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="activeTabNum=='3'"
                key="3"
                label="规格"
                prop="skuNames"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.skuNames || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                key="4"
                label="原价"
                prop="oriPrice"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.oriPrice || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                key="5"
                label="售价"
                prop="goodsPrice"
              >

                <template slot-scope="scope">
                  <span>{{ scope.row.goodsPrice || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                key="6"
                label="销量"
                prop="sale_num"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.saleNum || "-" }}</span>
                </template>
              </el-table-column>

              <el-table-column
                key="7"
                label="销售额"
                prop="income"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.income || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="activeTabNum=='2'"
                key="8"
                label="兑换次数"
                prop="exchangeNum"
                sortable="custom"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.exchangeNum || "-" }}</span>
                </template>
              </el-table-column>
            </el-table>
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
    </div>
  </div>
</template>

<script src='./commodity.js'></script>

<style lang="scss" scoped>
.commodity_container /deep/ {
  margin: 0 10px 0 10px;
  box-sizing: border-box;

  .el-tabs--border-card {
    border: 0;
    box-shadow: none;
    background: none;
  }

  .el-tabs--border-card > .el-tabs__header {
    background: #eff2f6;
  }

  .el-tabs__nav-scroll {
    overflow: hidden;
    background: #eff2f6;
    border: 0;
  }

  .el-tabs__item {
    width: 100px;
    height: 38px;
    border-radius: 5px 5px 0px 0px;
    color: #666;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    background: linear-gradient(
      360deg,
      rgba(211, 217, 225, 1) 0%,
      rgba(222, 227, 234, 1) 100%
    );
    margin-right: 3px;
    border: 0;
    text-align: center;
  }

  .el-tabs__header {
    margin: 0 0;
  }

  .is-active {
    color: #333;
    background-color: #fff !important;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
  }

  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: #fff !important;
    color: #333;
  }

  .el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:not(.is-disabled):hover {
    color: #333;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
  }

  .role_box_style {
    height: calc(100vh - 120px);
    background: #fff;
    padding-bottom: 20px;
    box-sizing: border-box;
  }
}

.income_detail {
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
}
.cash_money_head {
  background: #f5f7fa;
  line-height: 16px;
  // margin: 0 36px 20px 10px;
  color: #666;

  padding: 20px;
  box-sizing: border-box;
  height: 79px;
}
.cash_money_head > span {
  margin-right: 60px;
  margin-bottom: 15px;
  display: inline-block;
}
.cash_money_head > div > span {
  font-weight: 900;
}
.cash_money_head > span > span {
  font-weight: 900;
}

.retail_container {
  padding: 0 10px;
  width: 100%;
  height: 100%;

  .search_box /deep/ {
    height: 58px;
    padding: 10px;
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
      margin-left: 1px;

      padding: 6px 12px;
      height: 28px;
    }

    .el-form-item {
      margin-right: 6px;
      margin-top: 3px;
    }

    .el-form-item__content {
      line-height: 32px;
    }

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 5px !important;
    }
  }

  .table_style_edit /deep/ {
    height: calc(100vh - 195px);
    padding: 10px 10px 0;
    background-color: #fff;

    .el-button--text {
      color: #5d9cec;
    }

    .el-table {
      // padding: 0 6px 0 20px;
      overflow: auto;
      height: calc(100vh - 255px);
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
  }
}
</style>
