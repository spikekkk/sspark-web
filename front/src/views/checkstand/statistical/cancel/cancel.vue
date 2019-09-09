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
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
          <div style="display:inline-block;vertical-align:bottom">
            <el-button
              v-repeatdely="1000"
              class="filter-item"
              size="mini"
              type="primary"
              style="margin-left:10px;"
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
        <div
          v-loading.lock="loading"
          class="table_box_con table_style_edit"
          element-loading-text="拼命加载中"
        >
          <div style="height:calc(100vh - 199px);padding:20px 36px 0 10px;">
            <el-table
              :data="cancelList"
              fit
              height="calc(100vh - 219px)"
              style="width: 100%"
            >
              <el-table-column
                label="核销时间"
                width="180px;"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.verifyTime }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="票种"
                width="180px;"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.ticketName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="票码">
                <template slot-scope="scope">
                  <span>{{ scope.row.ticketId }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会员">
                <template slot-scope="scope">
                  <span>{{ scope.row.custName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会员手机号">
                <template slot-scope="scope">
                  <span>{{ scope.row.custTel }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会员卡">
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="会员卡号"
                width="180px;"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.goodsId }}</span>
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
</template>
<script src='./cancel.js'></script>
<style lang="scss" scoped>
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
  .el-button + .el-button {
    margin-left: 5px;
  }
}
.table_box_con {
  width: 100%;
  background: #fff;
  height: calc(100vh - 159px);
  // padding: 20px;
  box-sizing: border-box;
}
.cash_money_head {
  height: 48px;
  background: #f5f7fa;
  line-height: 48px;
  margin-bottom: 10px;
  color: #666;
  padding-left: 20px;
  box-sizing: border-box;
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

