<template>
  <div class="handsWrapper">
    <div class="hands_table_container">
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
            type="daterange"
            value-format="yyyy-MM-dd"
            size="mini"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @keyup.enter.native="handleFilter"
          />
          <el-input
            v-model="listQuery.userName"
            placeholder="收银员"
            size="mini"
            style="width: 200px;"
            class="filter-item"
            clearable
            @keyup.enter.native="handleFilter"
          />
          <el-button
            v-repeatdely="1000"
            type="primary"
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
        </el-form>
      </div>
      <div
        v-loading.lock="loading"
        class="table_box_con table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div class="table_style_edit">
          <div>
            <el-table
              :data="handsList"
              stripe
              style="width: 100%; margin-top: 10px;"
              height="calc(100vh - 230px)"
            >
              <el-table-column label="日期">
                <template slot-scope="scope">
                  <span>{{ scope.row.createTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="收银员">
                <template slot-scope="scope">
                  <span>{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="上线时间"
                width="160px"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.loginTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="下线时间"
                width="160px"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.shiftTime }}</span>
                </template>
              </el-table-column>
              <el-table-column label="备用金">
                <template slot-scope="scope">
                  <span>{{ scope.row.spareAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="现金总额">
                <template slot-scope="scope">
                  <span>{{ scope.row.cashTotalAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="现金收入">
                <template slot-scope="scope">
                  <span>{{ scope.row.cashAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="支付宝/微信">
                <template slot-scope="scope">
                  <span>{{ scope.row.payAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="POS机">
                <template slot-scope="scope">
                  <span>{{ scope.row.posAmount }}</span>
                </template>
              </el-table-column>
              <el-table-column label="收款总额">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalAmount }}</span>
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
  </div>
</template>

<script src="./handsMgr.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
.handsWrapper /deep/ {
  height: calc(100vh - 85px);
  margin: 0 10px 0 10px;
  // padding-top: 10px;
  box-sizing: border-box;
  .hands_table_container {
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
.prue_btn_color {
  color: #5d9cec;
  border-color: #5d9cec;
}
.search_box /deep/ {
  padding: 15px 10px;
  background-color: white;
  box-sizing: border-box;
  .el-button--primary {
    background-color: #5d9cec;
    border-color: #5d9cec;
  }
  .el-button--mini,
  .el-button--small {
    border-radius: 5px;
    margin-left: 6px;
    padding: 5px 12px;
  }

  .el-range-editor--mini.el-input__inner {
    margin-right: 7px;
  }
}
.table_style_edit /deep/ {
  height: calc(100vh - 150px);
  padding: 10px;
  background-color: #fff;
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
    overflow: auto;
    max-height: calc(100vh - 200px);
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
