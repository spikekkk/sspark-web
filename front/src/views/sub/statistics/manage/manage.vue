<template>
  <div class="manage_container">
    <div class="filter_container">
      <div
        class="search_box"
        style="margin-bottom: 10px;"
      >
        <div class="nav_tab">
          <el-button
            :type="changeValue === 'pay' ? 'primary' : 'info'"
            @click="changeStatistics('pay')"
          >
            收款方式统计
            <el-tooltip
              class="item"
              effect="dark"
              content="不含储值卡消费"
              placement="top"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </el-button>
          <el-button
            :type="changeValue === 'goods' ? 'primary' : 'info'"
            @click="changeStatistics('goods')"
          >
            商品票务统计
            <el-tooltip
              class="item"
              effect="dark"
              content="包含储值卡消费"
              placement="top"
            >
              <i class="el-icon-question" />
            </el-tooltip>
          </el-button>
        </div>

        <el-form
          ref="listQuery"
          :inline="true"
          :model="listQuery"
          class="form-inline"
        >
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
          />
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

          <el-form-item style="float:right;">
            <el-dropdown
              v-repeatdely="2000"
              size="mini"
              split-button
              type="primary"
              divided
              trigger="click"
              @click="filesDownload('当前报表')"
              @command="filesDownload"
            >
              导出
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="周报表">周报表</el-dropdown-item>
                <el-dropdown-item command="月报表">月报表</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div style="display: flex;justify-content: space-around;">
          <div class="today_modal_box">
            <div class="today_num_text">{{ money || "-" }}</div>
            <div class="today_title_text">累计总金额</div>
          </div>
          <div class="today_modal_box">
            <div class="today_num_text">{{ orderNum || "-" }}</div>
            <div class="today_title_text">累计总笔数</div>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <el-table
            :data="bussinessList"
            stripe
            style="width: 100%"
          >
            <el-table-column
              key="1"
              label="日期"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.statsDate || "-" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              key="2"
              label="订单总量"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderNum || "-" }}</span>
              </template>
            </el-table-column>

            <el-table-column
              v-if="changeValue === 'pay'"
              key="3"
              label="微信收款"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.wx || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'pay'"
              key="4"
              label="支付宝收款"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.ali || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'pay'"
              key="5"
              label="现金收款"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cash || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'pay'"
              key="6"
              label="POS收款"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.pos || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'pay'"
              key="7"
              label="OTA收款"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.other || "-" }}</span>
              </template>
            </el-table-column>

            <!-- <div v-if="changeValue=== 'goods'"> -->
            <el-table-column
              v-if="changeValue === 'goods'"
              key="8"
              label="商品收入"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.goodsCash || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'goods'"
              key="9"
              label="门票收入"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.ticketCash || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'goods'"
              key="10"
              label="会员卡收入"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cardCash || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'goods'"
              key="11"
              label="储值卡充值收入"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.storedCash || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'goods'"
              key="12"
              label="收款总额"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.money || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="changeValue === 'pay'"
              key="13"
              label="收款总额"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cashs || "-" }}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column label="门店">
              <template slot-scope="scope">
                <span>{{ scope.row.statDate || "-" }}</span>
              </template>
            </el-table-column>-->
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
</template>

<script src='./manage.js'></script>

<style lang="scss" scoped>
.manage_container {
  height: 100%;
  margin: 0 10px 0 10px;
  .search_box /deep/ {
    // height: 58px;
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
  .today_modal_box {
    width: 290px;
    height: 80px;
    background: #f5f7fa;
    border-radius: 5px;
    text-align: center;
    margin-right: 11px;
    padding: 15px 0;
    box-sizing: border-box;
    .today_num_text {
      font-size: 22px;
      color: #5d9cec;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .today_title_text {
      color: #666;
      font-size: 14px;
    }
  }
  .table_style_edit /deep/ {
    height: calc(100vh - 231px);
    padding: 10px 10px 0;
    background-color: #fff;

    .el-button--text {
      color: #5d9cec;
    }
    .el-table {
      overflow: auto;
      height: calc(100vh - 393px);
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

  .nav_tab {
    padding: 10px 0 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .el-button {
      position: relative;
      height: 38px;
    }

    .el-icon-question {
      position: absolute;
      top: 0;
    }
  }
}
</style>

