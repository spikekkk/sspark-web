<template>
  <div class="member_container">
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
        </el-form>
      </div>
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div style="display: flex;justify-content: space-around;">
          <div class="today_modal_box">
            <div class="today_num_text">{{ custTodayData.newCustNum }}</div>
            <div class="today_title_text">今日新增会员</div>
          </div>
          <div class="today_modal_box">
            <div class="today_num_text">￥{{ custTodayData.costMoney }}</div>
            <div class="today_title_text">今日会员消费</div>
          </div>
          <div class="today_modal_box">
            <div class="today_num_text">￥{{ custTodayData.custPrice }}</div>
            <div class="today_title_text">今日客单价</div>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <el-table
            :data="custStatList"
            stripe
            height=" calc(100vh - 308px);"
            style="width: 100%"
          >
            <el-table-column label="日期">
              <template slot-scope="scope">
                <span>{{ scope.row.statDate || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="新增会员数">
              <template slot-scope="scope">
                <span>{{ scope.row.newCustNum || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员消费金额">
              <template slot-scope="scope">
                <span>{{ scope.row.costMoney || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员消费笔数">
              <template slot-scope="scope">
                <span>{{ scope.row.costNum || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="客单价">
              <template slot-scope="scope">
                <span>{{ scope.row.custPrice || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="门店">
              <template slot-scope="scope">
                <span>{{ scope.row.shopName || "-" }}</span>
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
</template>

<script src='./member.js'></script>

<style lang="scss" scoped>
.member_container {
  height: 100%;
  margin: 0 10px 0 10px;
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
    height: calc(100vh - 158px);
    padding: 10px 10px 0;
    background-color: #fff;

    .el-button--text {
      color: #5d9cec;
    }
    .el-table {
      // padding: 0 6px 0 20px;
      overflow: auto;
      height: calc(100vh - 308px);
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

