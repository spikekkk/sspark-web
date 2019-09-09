<template>
  <div class="cashStatic_container">

    <div class="cashList_wrap">
      <div class="filter_container">
        <div class="search_box">
          <el-date-picker
            v-model="modifyTime"
            size="mini"
            type="datetimerange"
            value-format="yyyy-MM-dd-HH-mm-ss"
            range-separator="~"
            start-placeholder="支付开始日期"
            end-placeholder="支付结束日期"
          />
          <el-input
            v-model="cashier"
            placeholder="员工姓名"
            size="mini"
            style="width: 140px;margin: 0 10px;"
            class="filter-item"
            clearable
          />
          <el-select
            v-model="pay_type"
            placeholder="支付方式"
            size="mini"
            style="width:140px;margin: 0 10px 0 0;"
            clearable
          >
            <el-option
              v-for="item in payArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div style="display:inline-block;vertical-align:bottom">
            <el-button
              v-repeatdely="1000"
              class="filter-item"
              size="mini"
              type="primary"
              @click="handleFilter"
            >
              <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
            </el-button>
            <el-button
              v-repeatdely="1000"
              class="filter-item prue_btn_color"
              size="mini"
              type="primary"
              plain
              @click="handleCancel"
            >
              <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
            </el-button>
          </div>
        </div>
        <div class="table_box_con">
          <div class="cash_money_head">
            <div style="display: flex; justify-content: space-between;height: 48px;">

              <span class="title">支付宝：<span class="content">{{ aliNum }}</span></span>
              <span class="title">微信：<span class="content">{{ wxNum }}</span></span>
              <span class="title">现金：<span class="content">{{ cashNum }}</span></span>
              <span class="title">POS机：<span class="content">{{ posNum }}</span></span>
              <span class="title">OTA：<span class="content">{{ otaNum }}</span></span>
              <span class="title "><span class="yellow_title">储值卡:<span class="content">{{ cardNum }}</span></span> </span>
              <span class="title "><span class="yellow_title">退款:<span class="content">{{ refund }}</span></span> </span>
            </div>

            <div style="padding-bottom: 14px;">总收入：<span>{{ countNum }}</span><span style="font-size: 12px;font-weight: 500;color: #fe9e0f;"> (不包含储值卡、退款)</span></div>
          </div>
          <div
            v-loading.lock="loading"
            class="table_style_edit"
            element-loading-text="拼命加载中"
          >
            <div style="height:calc(100vh - 330px);padding:0px 30px 0 10px">
              <el-table
                :data="cashierList"
                height="calc(100vh - 330px)"
                style="width: 100%;"
                fit
              >
                <el-table-column
                  label="下单时间"
                  width="140px;"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="支付时间"
                  width="140px;"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.payTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="订单号"
                  width="150px;"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="购买人">
                  <template slot-scope="scope">
                    <span>{{ scope.row.buyerName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="应收金额">
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderAmount }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="实收金额">
                  <template slot-scope="scope">
                    <span>{{ scope.row.payAmount }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="支付方式">
                  <template slot-scope="scope">
                    <span :style="scope.row.payType | dictColorFilter(dictInfo['pay_type'])">{{ scope.row.payType | dictFilter(dictInfo['pay_type']) || '--' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="订单状态">
                  <template slot-scope="scope">
                    <span :style="scope.row.orderStatus | dictColorFilter(dictInfo['order_status'])">{{ scope.row.orderStatus | dictFilter(dictInfo['order_status']) || '--' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="退款时间"
                  width="140px;"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.refundTime || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="收银员">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cashierName }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="销售员">
                  <template slot-scope="scope">
                    <span>{{ scope.row.saleName }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
        </div>
      </div>
    </div>

  </div>
</template>
<script src='./cashier.js'></script>
<style lang="scss" scoped>
.cashStatic_container {
  min-width: 1060px;
}
.search_box /deep/ {
  background: #fff;
  height: 58px;
  margin-bottom: 10px;
  padding-top: 15px;
  box-sizing: border-box;
  padding-left: 10px;
  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }
  .el-button--mini,
  .el-button--small {
    border-radius: 5px;
    padding: 5px 12px;
    height: 28px;
  }
  .el-button + .el-button {
    margin-left: 5px;
  }
  .el-button--primary.is-plain,
  .el-button--primary.is-plain:hover,
  .el-button--primary.is-plain:focus {
    background: #fff;
    border-color: #dddddd;
  }
  .el-button--primary.is-plain:active {
    background: #fff;
    border-color: #5d9cec;
    color: #5d9cec;
  }
}
.table_box_con {
  width: 100%;
  background: #fff;
  height: calc(100vh - 156px);
  padding-top: 20px;
  box-sizing: border-box;
}

.title {
  font-weight: 400 !important;
}
.yellow_title {
  color: #fe9e0f;
}

.content {
  font-weight: 900 !important;
}
.cash_money_head {
  background: #f5f7fa;
  line-height: 16px;
  margin: 0 36px 20px 10px;
  color: #666;
  padding: 15px 20px 0;
  box-sizing: border-box;
  // height: 79px;
}
.cash_money_head > span {
  margin-right: 10px;
  margin-bottom: 15px;
  display: inline-block;
}
.cash_money_head > div > span {
  font-weight: 900;
}
.cash_money_head > span > span {
  font-weight: 900;
}
.prue_btn_color {
  color: #5d9cec;
  border-color: #5d9cec;
}
.table_style_edit /deep/ {
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
  .el-table {
    // padding: 0 6px 0 20px;
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
</style>

