<template>
  <div class="ordermgr">
    <el-form
      ref="listQuery"
      :model="listQuery"
    >
      <div class="header_search">
        <el-form-item prop="purchaseId">
          <el-input
            v-model="listQuery.purchaseId"
            clearable
            placeholder="订单编号"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item prop="orderStatus">
          <el-select
            v-model="listQuery.orderStatus"
            class="slelct-order-item"
            clearable
            placeholder="订单状态"
            @keyup.enter.native="handleFilter"
          >
            <el-option
              v-for="item in dictInfo.order_status"
              :key="item.index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="nameTel">
          <el-input
            v-model="listQuery.nameTel"
            clearable
            placeholder="手机号/会员名"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item prop="orderChannel">
          <el-select
            v-model="listQuery.orderChannel"
            clearable
            class="slelct-item"
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

        <el-form-item prop="dataTimes">
          <div class="block">
            <el-date-picker
              v-model="listQuery.dataTimes"
              :default-time="['00:00:00', '23:59:59']"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="daterange"
              start-placeholder="下单时间"
              end-placeholder="结束时间"
              @change="handleFilter"
            />
          </div>
        </el-form-item>

        <el-form-item prop="cashierId">
          <el-select
            v-model="listQuery.cashierId"
            clearable
            placeholder="员工"
            @keyup.enter.native="handleFilter"
          >
            <el-option
              v-for="item in employeeDatas"
              :key="item.index"
              :value="item.id "
              :label="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
      </div>
    </el-form>
    <div class="order_items">
      <div
        v-loading.lock="loading"
        class="table_box_con"
        element-loading-text="拼命加载中"
      >
        <div class="table_style_edit">
          <el-table
            :data="orderList"
            stripe
            style="width:100%"
            height="calc(100vh - 211px)"
          >
            <el-table-column
              prop="id"
              label="订单编号"
              show-overflow-tooltip
            />
            <el-table-column
              label="商品"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <!-- <el-tooltip placement="top">
                <div slot="content">-->
                <span
                  v-for="item in scope.row.goodsName"
                  :key="item.index"
                >{{ item }};</span>
                <!-- {{ scope.row.goodsName[0] }} -->
                <!-- </div>
                </el-tooltip>-->
              </template>
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="应收金额"
            />
            <el-table-column
              prop="orderPayAmount"
              label="实付金额"
            />
            <el-table-column
              prop="payType"
              label="支付方式"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.payType | dictFilter(dictInfo['pay_type'],scope.row.genderCn) || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              label="订单状态"
            >
              <template slot-scope="scope">
                <!-- <span v-if=" scope.row.orderStatus==0">待支付</span>
              <span v-if=" scope.row.orderStatus==1">已支付</span>
                <span v-if=" scope.row.orderStatus==2">退款申请</span>-->
                <span>{{ scope.row.orderStatus | dictFilter(dictInfo['order_status'],scope.row.genderCn) || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderChannel"
              label="销售渠道"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderChannel | dictFilter(dictInfo['channel'],scope.row.genderCn) || '-' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="cashierName"
              label="收银员"
            />
            <el-table-column
              prop="saleName"
              label="销售"
            />
            <el-table-column
              prop="shopName"
              label="所属门店"
            />
            <el-table-column
              prop="orderTime"
              label="下单时间"
            />
            <el-table-column
              prop="payTime"
              label="支付时间"
            />
            <el-table-column
              prop="refundTime"
              label="退款时间"
            />
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
      </div>
    </div>
  </div>
</template>
<script src="./orderMgr.js">
</script>
<style lang="scss">
.ordermgr {
  height: calc(100vh - 78px);
  margin: 0 10px 0 10px;

  box-sizing: border-box;

  .header_search {
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    background-color: white;

    padding: 11px;

    .el-form-item {
      margin-bottom: 0px;
    }

    .filter-item {
      /deep/.el-input {
        width: 140px;

        .el-input__inner {
          height: 28px;
        }
      }
    }

    .el-input__suffix {
      right: 5px;
      top: 0px;
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }

    .block {
      margin-right: 10px;

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 231px;
        height: 28px;
        padding: 0px 10px;
      }
    }

    .el-input {
      width: 140px;
      margin-right: 10px;
    }

    .el-input--medium .el-input__inner {
      height: 28px;
      line-height: 36px;
      width: 140px;
    }

    .employee {
      margin-left: 10px;
    }

    .refresh_btn_style {
      margin-left: 8px !important;
    }

    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px 12px;
      margin-left: 1px;
    }

    .el-button--primary.is-plain {
      color: #666666;
      background: #ffffff;
      border-color: #dddddd;
    }
  }

  .order_items {
    background-color: white;

    margin-top: 10px;
  }

  .table_style_edit {
    padding: 20px 10px 0 10px;
    background: #fff;
  }

  .table_style_edit /deep/ {
    padding: 20px 36px 0 10px;
    background: #fff;

    .el-table {
      // padding: 0 6px 0 20px;

      // max-height: calc(100vh - 200px);
      overflow: hidden !important;
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
}
</style>
