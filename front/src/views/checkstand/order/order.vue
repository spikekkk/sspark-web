<template>
  <div class="order">
    <div class="order_search">
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="form-inline"
      >
        <el-form-item prop="modifyTime">
          <el-date-picker
            v-model="formInline.modifyTime"
            type="datetimerange"
            size="mini"
            value-format="yyyy-MM-dd-HH-mm-ss"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item prop="status">
          <el-select
            v-model="formInline.status"
            placeholder="订单状态"
            size="mini"
            clearable
          >
            <el-option
              label="待支付"
              value="0"
            />
            <el-option
              label="已完成"
              value="8"
            />
            <el-option
              label="已退款"
              value="4"
            />
            <el-option
              label="部分退款"
              value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="id">
          <el-input
            v-model="formInline.id"
            size="mini"
            placeholder="订单编号"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            v-repeatdely="1000"
            type="primary"
            size="mini"
            @click.prevent="onSubmit()"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/77ed55e16b08f3a7b9d986e75a2c1d7c">
          </el-button>
          <el-button
            v-repeatdely="1000"
            class="refresh_btn_style"
            @click="refresh('formInline')"
          >
            <img src="//img.ishanshan.com/gimg/n/20181114/4967edad7d0d83947070c9a404a3b216">
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="order_table_detail">
      <div
        v-loading.lock="loading"
        class="order_table"
        element-loading-text="拼命加载中"
      >
        <div style="height:calc(100% - 41px);padding: 0 30px 0 10px;">
          <el-table
            :data="tableData"
            class="orderList"
            fit
            height="100%"
            highlight-current-row
            style="width: 100%"
            @row-click="rowClick"
          >
            <el-table-column
              prop="id"
              label="订单号"
            >
              <template slot-scope="scope">
                <div style="color:#5D9CEC;font-weight:500">{{ scope.row.id }}</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderTime"
              label="下单时间"
            />
            <el-table-column
              prop="payType"
              label="支付方式"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.payType | dictFilter(dictInfo['pay_type']) || '--' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderStatus"
              label="订单状态"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.orderStatus | dictFilter(dictInfo['order_status']) || '--' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="订单金额"
            />
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
      <div class="order_detail">
        <div class="order_detail_show">
          <div class="order_detail_header">
            <div class="order_detail_nav" />
            <span>订单详情</span>
          </div>
          <div class="order_detail_content">
            <div class="order_detail_item">订单号：<span>{{ orderId }}</span></div>
            <div class="order_detail_item">下单时间：<span>{{ orderTime }}</span></div>
            <div class="order_detail_item">会员名：<span>{{ orderDetail.buyerName }}</span></div>
            <div class="order_detail_item">收银员：<span>{{ orderDetail.cashierName }}</span></div>
            <div class="order_detail_item">销售：<span>{{ orderDetail.saleName }}</span></div>
            <div class="order_detail_item">支付方式：<span>{{ orderDetail.payType | dictFilter(dictInfo['pay_type']) || '--' }}</span>
              <span
                v-for="(i,index) in mixPayType"
                :key="index"
            >({{ i.type }}:{{ i.num }})</span></div>
            <div class="order_detail_item">会员手机号：<span>{{ orderDetail.buyerPhone }}</span></div>
            <div
              v-if="!orderDetail.disperseCust"
              class="order_detail_item"
            >充值余额：<span>{{ orderDetail.rechargeBalance }}</span></div>
            <div
              v-if="!orderDetail.disperseCust"
              class="order_detail_item"
            >赠送余额：<span>{{ orderDetail.donationBalance }}</span></div>
          </div>
        </div>
        <div class="goods_list_show">
          <div class="goods_list_header">
            <div class="goods_list_nav" />
            <span>商品列表</span>
            <!-- <div v-if="!isSureRefund" class="refund" style="margin-right:0;" @click="refundToSure">退款</div>
            <div v-if="isSureRefund" class="refund" style="margin-right:0;" @click="cancelRefund">取消</div>
            <div v-if="isSureRefund" class="refund" @click="sureRefund">确定退款</div> -->
          </div>
          <div class="goods_list_all">
            <div class="goods_list_content">
              <div
                v-for="(item,index) in cartList"
                :key="index"
                @click="mutiCheckFunc(item)"
              >
                <div class="goods_list_single">
                  <!-- <div v-if="isSureRefund" style="width:16px;height:44px;float:left;padding:14px 0;margin-right:15px">
                    <div :class="item.detailStatus=='2' ? 'circle_disable':'circle'">
                      <i :class="currentCheckArray.indexOf(item.id) !==-1 && item.detailStatus!='2' ?'el-icon-check': ''"/>
                    </div>
                  </div> -->
                  <div :class="item.detailStatus=='2' ? 'goods_list_disabled':'goods_list_item'">
                    <div class="item_goods_num">
                      <div class="goods_name">
                        {{ item.goodsName }}
                        <span v-if="item.detailStatus =='2'">已退款</span>
                      </div>
                      <div class="goods_num">×{{ item.goodsQuantity }}</div>
                    </div>
                    <div class="item_spec_price">
                      <div
                        v-if="item.specName"
                        class="goods_spec"
                      >{{ item.specName }}</div>
                      <!-- <div class="gift_icon">
                        <div class="gift_icon_front">赠</div>
                        <div class="gift_icon_num">亲子票5张</div>
                      </div> -->
                      <div
                        v-if="!item.specName"
                        class="goods_desc_none"
                      >--</div>
                      <div class="goods_price">￥{{ item.goodsPrice }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="goods_total">
                <div class="goods_total_text">订单总额:</div>
                <div class="goods_total_money">￥{{ totalPrice }}</div>
              </div>
            </div>
          </div>
          <div class="print_btn">
            <el-button
              v-repeatdely="2000"
              type="primary"
              plain
              @click="refundToSure"
            >退款</el-button>
            <el-button
              v-repeatdely="2000"
              type="primary"
              @click="printReceipt"
            >打印小票</el-button>
          </div>
        </div>
      </div>
    </div>
    <refund-product
      ref="sureRefund"
      @toParent="getData"
    />
  </div>
</template>

<script src='./order.js'></script>

<style lang="scss" scoped>
.order {
  .order_search /deep/ {
    background: #fff;
    padding: 15px 0 0 10px;
    margin-bottom: 10px;
    .el-form--inline .el-form-item {
      margin-right: 5px !important;
      margin-bottom: 14px !important;
      .el-form-item__content {
        line-height: 28px;
        .el-range-editor--mini.el-input__inner {
          width: 350px;
          .el-range-separator {
            width: 10%;
          }
        }
        .el-select .el-input {
          width: 140px;
        }
        .el-input--mini {
          width: 141px;
        }
        .el-button--mini {
          padding: 5px 12px;
          border-radius: 5px;
          height: 28px;
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
    }
  }
  .order_table_detail {
    height: calc(100vh - 159px);
    .order_table /deep/ {
      background: #fff;
      width: calc(100% - 382px);
      padding: 20px 0 0;
      height: 100%;
      float: left;
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
      .el-table__body tr.current-row > td {
        background: #e0f1ff !important;
      }
      .el-table {
        // padding: 0 30px 0 10px;
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
    .order_detail {
      background: #f4f6f8;
      width: 382px;
      display: inline-block;
      height: 100%;
      padding: 20px 30px 70px;
      .order_detail_show {
        .order_detail_header {
          margin-bottom: 20px;
          .order_detail_nav {
            width: 8px;
            height: 14px;
            background: #5d9cec;
            border-radius: 3px;
            margin-right: 10px;
            float: left;
            margin-top: 2px;
          }
          span {
            font-size: 16px;
            line-height: 16px;
            font-weight: 500;
            color: #333;
          }
        }
        .order_detail_content {
          .order_detail_item {
            margin-bottom: 10px;
            font-size: 12px;
            color: #666;
            font-weight: 500;
            line-height: 12px;
            span {
              color: #000;
            }
          }
        }
      }
      .goods_list_show {
        margin-top: 50px;
        .goods_list_header {
          margin-bottom: 20px;
          .goods_list_nav {
            width: 8px;
            height: 14px;
            background: #5d9cec;
            border-radius: 3px;
            margin-right: 10px;
            float: left;
            margin-top: 2px;
          }
          span {
            font-size: 16px;
            line-height: 16px;
            font-weight: 500;
            color: #333;
          }
          .refund {
            font-size: 12px;
            line-height: 18px;
            text-decoration: underline;
            color: #4887e6;
            font-weight: 500;
            float: right;
            margin-right: 26px;
            cursor: pointer;
          }
        }
        .goods_list_all {
          max-height: calc(100vh - 589px);
          overflow-y: scroll;
          width: 340px;
          .goods_list_content {
            background: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 6px 0px rgba(213, 215, 231, 0.1);
            padding: 25px 26px 20px 20px;
            width: 322px;
            .goods_list_single {
              .circle {
                border: 1px solid #ddd;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                float: left;
                cursor: pointer;
                padding: 3px;
                position: relative;
                i {
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  background: #5d9cec;
                  border-radius: 50%;
                  color: #fff;
                }
              }
              .circle_dot {
                width: 16px;
                height: 16px;
                border: 1px solid #5d9cec;
                border-radius: 50%;
                background: #5d9cec;
                color: #fff;
              }
              .circle_disable {
                border: 1px solid #ddd;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                float: left;
                background: #f2f2f2;
              }
              .goods_list_disabled {
                color: #999 !important;
              }
              .goods_list_item,
              .goods_list_disabled {
                border-bottom: 1px solid #eee;
                padding-bottom: 22px;
                color: #333;
                margin-bottom: 20px;
                .item_goods_num {
                  margin-bottom: 10px;
                  line-height: 14px;
                  .goods_name {
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 500;
                    display: -webkit-inline-box;
                    -webkit-line-clamp: 2;
                    width: 80%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-box-orient: vertical;
                    span {
                      font-size: 10px;
                      margin-left: 7px;
                    }
                  }
                  .goods_num {
                    font-size: 12px;
                    line-height: 15px;
                    font-weight: 800;
                    float: right;
                  }
                }
                .item_spec_price {
                  line-height: 12px;
                  height: 16px;
                  .goods_spec {
                    font-size: 12px;
                    line-height: 12px;
                    font-weight: 500;
                    display: inline-block;
                    width: 70%;
                  }
                  .goods_price {
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 800;
                    float: right;
                  }
                  .gift_icon {
                    border-radius: 2px;
                    height: 16px;
                    font-size: 10px;
                    color: #f59322;
                    display: inline-block;
                    .gift_icon_front {
                      width: 21px;
                      background: RGBA(245, 166, 35, 0.2);
                      border: 1px solid #f5a623;
                      float: left;
                      text-align: center;
                      line-height: 10px;
                      padding: 2px 0;
                    }
                    .gift_icon_num {
                      width: 69px;
                      border: 1px solid #f5a623;
                      border-left: 0;
                      display: inline-block;
                      text-align: center;
                      line-height: 10px;
                      padding: 2px 0;
                    }
                  }
                  .goods_desc_none {
                    color: #888;
                    font-size: 12px;
                    line-height: 16px;
                    font-weight: 500;
                    display: inline-block;
                  }
                }
              }
            }
            .goods_total {
              margin-top: 6px;
              font-size: 14px;
              line-height: 14px;
              .goods_total_text {
                color: #333;
                font-weight: 500;
                display: inline-block;
              }
              .goods_total_money {
                font-weight: 800;
                color: #f04343;
                float: right;
              }
            }
          }
        }
        .print_btn {
          margin-top: 30px;
          .el-button--primary.is-plain {
            background: #fff;
            border-color: #5d9cec;
            width: 100px;
            margin: 0 5px;
            height: 40px;
            display: inline-block;
            color: #5d9cec;
            font-size: 16px;
          }
          .el-button--primary.is-plain:focus,
          .el-button--primary.is-plain:hover {
            background: #fff !important;
            border-color: #5d9cec !important;
            width: 100px;
            margin: 0 5px;
            height: 40px;
            color: #5d9cec;
          }
          .el-button--primary {
            background: #5d9cec;
            border-color: #5d9cec;
            width: 202px;
            margin: 0 5px;
            height: 40px;
            float: left;
            font-size: 16px;
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
/*滚动条样式*/
.goods_list_all::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}
.goods_list_all::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  background: #c8e2f8;
}
.goods_list_all::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  border-radius: 0;
  background: #f4f6f8;
}
</style>

