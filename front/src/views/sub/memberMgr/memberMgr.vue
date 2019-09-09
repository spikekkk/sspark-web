<template>
  <div>
    <div class="menberinfo">
      <div class="nav_search">
        <el-input
          v-model="memberName"
          clearable
          placeholder="会员姓名"
          class="filter-item"
          @keyup.enter.native="getList"
        />
        <el-input
          v-model.number="memberPhone"
          clearable
          placeholder="手机号"
          class="filter-item"
          @keyup.enter.native="getList"
        />

        <el-select
          v-model="childNum"
          clearable
          placeholder="选择有无孩子"
          class="filter-item"
          @keyup.enter.native="getList"
        >
          <el-option
            v-for="item in childlist"
            :key="item.index"
            :value="item.value "
            :label="item.label"
          />
        </el-select>
        <el-button
          v-repeatdely="1000"
          type="primary"
          class="search_btn_style"
          @click="getList"
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
        <div class="fr">
          <el-button
            class="yellow-btn"
            @click="handleImport('member')"
          >会员导入</el-button>
          <el-button
            type="primary"
            @click="handleImport('card')"
          >会员卡导入</el-button>

        </div>

      </div>

      <div class="main_content">
        <div
          v-loading.lock="loading"
          class="table_box_con"
          element-loading-text="拼命加载中"
        >
          <div class="table_style_edit">
            <el-table
              :data="list"
              :header-cell-style="{background:'rgba(239,242,246,1)'}"
              stripe
              style="width: 100%"
              height="calc(100vh - 209px)"
            >
              <el-table-column label="会员姓名">
                <template slot-scope="scope">
                  <span
                    style="color: rgb(72, 135, 230);cursor:pointer"
                    @click="showSideDialogWithRow(scope.row)"
                  >
                    {{ scope.row.name }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
              />
              <el-table-column
                prop="registerShop"
                label="注册门店"
              />
              <el-table-column label="性别">
                <template slot-scope="scope">
                  <span :style="scope.row.sex | dictColorFilter(dictInfo['sex'])">
                    {{ scope.row.sex |
                    dictFilter(dictInfo['sex'],scope.row.genderCn) || '-' }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="nickname"
                label="微信昵称"
              />
              <el-table-column label="头像">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.avatar"
                    style="width:30px;height:30px;border-radius:50%"
                  >
                </template>
              </el-table-column>
              <el-table-column label="所在省市">
                <template slot-scope="scope">
                  {{ scope.row.province }} {{ scope.row.city }} {{ scope.row.area }} {{
                  scope.row.street }}
                </template>
              </el-table-column>
              <el-table-column
                prop="addr"
                label="详细地址"
              />
              <el-table-column
                prop="registerTime"
                label="注册时间"
                width="145"
              />
              <el-table-column label="孩子信息">
                <template slot-scope="scope">
                  <span
                    v-for="item in scope.row.childrens"
                    :key="item.index"
                    style="width:32px;
                      height:12px;
                      font-size:12px;
                      font-family:PingFangSC-Regular;
                      font-weight:400;
                      color:rgba(72,135,230,1);
                      line-height:12px;
                      cursor:pointer"
                    @click="showChildInfo(scope.row)"
                  >{{ item.name }} ;</span>
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
        </div>
      </div>

      <div class="childInfo">
        <el-dialog
          :visible.sync="dialogVisible"
          title="孩子信息"
          width="30%"
        >
          <div
            v-for="o in childDatas"
            :key="o.index"
            class="text item"
          >
            <img
              :src="o.photo"
              class="childphoto"
              alt=""
            >
            <P>{{ o.name }}</P>

            <p>性别 : {{ o.sex | dictFilter(dictInfo['sex']) || '-' }}</p>
            <p>{{ '出生日期 : ' + o.birthday }}</p>

          </div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              v-repeatdely="2000"
              size="mini"
              @click="dialogVisible = false"
            >确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>

    <side-dialog :visible.sync="sideDialogShow">
      <div id="sidenav_icon">
        <img :src="temp.avatar">
        <span>{{ temp.name }}</span>
      </div>
      <div id="sideheader_info">
        <div class="first_line">
          <span class="title_tag">手机号：</span>
          <span class="uesInfo phonenum">{{ temp.mobile }}</span>
          <span class="title_tag">性别：</span>
          <span class="uesInfo">{{ temp.sex | dictFilter(dictInfo['sex']) || '-' }}</span>
        </div>
        <div class="second_line">
          <span class="title_tag">生日：</span>
          <span class="uesInfo birthday">{{ temp.birthday }}</span>
          <div>
            <span class="title_tag wxname">微信昵称：</span>
            <span class="uesInfo wechatname">{{ temp.nickname }}</span>
          </div>
        </div>
      </div>

      <template>
        <div class="tab_pans_box">
          <el-tabs
            v-model="activeName"
            class="tabs_pane_items"
            @tab-click="handleClick"
          >
            <el-tab-pane
              class="first_tab"
              label="会员卡"
              name="first"
            >
              <el-table
                :header-cell-style="{background:'rgba(239,242,246,1)'}"
                :data="card_list"
                header-align="center"
                class="table_style_edit"
                stripe
                height="calc(100vh - 365px)"
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  class-name="Card_name"
                  prop="cardName"
                  label="会员卡名称"
                />
                <el-table-column
                  align="center"
                  label="类型"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.cardType | dictFilter(dictInfo['card_type'],scope.row.genderCn) || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="remainTimes"
                  label="剩余次数"
                />
                <el-table-column
                  align="center"
                  prop="ticketName"
                  label="对应票种"
                />
                <el-table-column
                  align="center"
                  prop="convertTime"
                  label="兑票时间"
                />
                <el-table-column
                  align="center"
                  prop="validDate"
                  label="生效日期"
                />
                <el-table-column
                  align="center"
                  prop="invalidDate"
                  label="失效日期"
                />
                <el-table-column
                  align="center"
                  prop="giveTimes"
                  label="赠送次数"
                />
                <el-table-column
                  align="center"
                  prop="opertionName"
                  label="赠送员工"
                />
                <el-table-column
                  align="center"
                  width="110"
                  prop="transactShop"
                  label="办理门店"
                />
              </el-table>
              <!-- <div class="block"> -->
              <el-pagination
                :current-page="cardpageIndex"
                :page-size="cardpageSize"
                :page-sizes="[10, 20, 30, 40]"
                :total="cardtotalCount"
                layout="  prev, pager, next, sizes,jumper"
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
              />
              <!-- </div> -->
            </el-tab-pane>

            <el-tab-pane
              label="订单记录"
              name="second"
            >
              <el-table
                :header-cell-style="{background:'rgba(239,242,246,1)'}"
                :data="order_list"
                class="table_style_edit"
                stripe
                height="calc(100vh - 365px)"
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  prop="orderId"
                  label="订单编号"
                />
                <el-table-column
                  align="center"
                  prop="orderTime"
                  label="下单时间"
                />

                <el-table-column
                  align="center"
                  label="销售渠道"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderChannel | dictFilter(dictInfo['channel'],scope.row.genderCn) || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="cashier"
                  label="收银员"
                />
                <el-table-column
                  align="center"
                  prop="orderPayAmount"
                  label="实付金额"
                />
                <el-table-column
                  align="center"
                  prop="orderChangeAmount"
                  label="找零金额"
                />

                <el-table-column
                  align="center"
                  label="订单状态"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.orderStatus | dictFilter(dictInfo['order_status'],scope.row.genderCn) || '-' }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <div class="block"> -->
              <el-pagination
                :current-page="orderpageIndex"
                :page-size="orderpageSize"
                :page-sizes="[10, 20, 30, 40]"
                :total="ordertotalCount"
                layout="  prev, pager, next, sizes,jumper"
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
              />
              <!-- </div> -->
            </el-tab-pane>

            <el-tab-pane
              label="核销记录"
              name="third"
            >
              <el-table
                :header-cell-style="{background:'rgba(239,242,246,1)'}"
                :data="cancle_list"
                class="table_style_edit"
                stripe
                height="calc(100vh - 365px)"
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  prop="verifyTime"
                  label="核销时间"
                />
                <el-table-column
                  align="center"
                  prop="ticketName"
                  label="票种"
                />
                <el-table-column
                  align="center"
                  prop="ticketCode"
                  label="票码"
                />
                <el-table-column
                  align="center"
                  prop="cardName"
                  label="会员卡"
                />

                <el-table-column
                  align="center"
                  label="类型"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.cardType | dictFilter(dictInfo['card_type'],scope.row.genderCn) || '-' }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="shop"
                  label="所属门店"
                />
              </el-table>

              <el-pagination
                :current-page="canclepageIndex"
                :page-size="canclepageSize"
                :page-sizes="[10, 20, 30, 40]"
                :total="cancletotalCount"
                layout="prev, pager, next, sizes,jumper"
                @size-change="pageSizeChange"
                @current-change="pageCurrentChange"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
    </side-dialog>
    <importDialog ref="importCom" />
  </div>
</template>
<script src="./memberMgr.js">
</script>
<style lang="scss">
.menberinfo {
  .nav_search {
    margin: 0px 10px 10px 10px;
    height: 58px;
    background: rgba(255, 255, 255, 1);
    padding: 15px 10px;

    .filter-item {
      width: 140px !important;
      margin-right: 7px;

      .el-input__inner {
        height: 28px !important;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        border: 1px solid #dddddd;
      }
    }

    .el-input__suffix {
      .el-input__suffix-inner {
        position: absolute;
        right: 0px;
        top: -3px;
      }
    }
  }

  .main_content {
    height: calc(100vh - 156px);
    margin: 10px 10px 0;
    background: rgba(255, 255, 255, 1);
  }

  .childInfo {
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
      color: #fff;
      background-color: #5d9cec !important;
      border-radius: 5px;
    }

    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
      .childphoto {
        position: absolute;
        right: 30px;
        width: 100px;
        height: 100px;
      }
    }

    .box-card {
      width: 294px;
    }
  }
}

.side-dialog {
  width: 900px !important;
  height: calc(100vh - 68px) !important;

  #sidenav_icon {
    display: flex;
    align-items: center;
    padding: 20px 0;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 20px;
    }

    span {
      // width: 32px;
      height: 16px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
    }
  }

  #sideheader_info {
    .first_line {
      padding-left: 122px;
      padding-bottom: 14px;

      .phonenum {
        padding-right: 329px;
      }
    }

    .second_line {
      padding-left: 136px;
      padding-bottom: 36px;

      .wxname {
        position: absolute;
        right: 256px;
        top: 114px;
      }

      .wechatname {
        position: absolute;
        left: 644px;
        top: 114px;
      }
    }

    .title_tag {
      width: 70px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 14px;
    }

    .uesInfo {
      width: 79px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 14px;
    }
  }

  .tab_pans_box {
    border-top: 1px solid #dddddd;

    .tabs_pane_items {
      .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        /* height: 2px; */
        background-color: #e4e7ed;
        z-index: 1;
      }

      .el-table thead {
        color: #333333 !important;
        font-weight: 500 !important;
        width: 56px;
        height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        line-height: 14px;
        padding: 17px 0px !important;

        tr {
          height: 50px;
          background-color: #fff;
        }
      }

      .el-table__body {
        .el-table__row {
          .Card_name {
            .cell {
              height: 12px;
              font-size: 12px;
              font-family: PingFangSC-Medium;
              font-weight: 500;
              color: rgba(93, 156, 236, 1) !important;
              line-height: 12px;
            }
          }
        }
      }

      .table_style_edit {
        // height: calc(100vh - 345px);

        .el-table--medium th {
          padding: 17px 0px !important;
        }
      }

      .el-table--scrollable-y .el-table__body-wrapper {
        overflow-y: auto !important;
      }
    }
  }

  .tab_pans_box /deep/ {
    .el-tabs__nav-wrap {
      padding-left: 42px;
    }

    .el-tabs__header {
      /* padding: 0px 0px 0px 0px; */
      position: relative;
      margin: 4px 0 25px;
    }
  }
}

.table_style_edit {
  padding: 10px;

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
    max-height: calc(100vh - 200px);

    .cell {
      line-height: 18px !important;
    }
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
    color: #333333 !important;
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

  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-y: auto;
  }

  .el-table td {
    font-size: 12px;
    color: #666;
    padding: 5px 0;
    font-weight: 400;
  }
}
</style>
