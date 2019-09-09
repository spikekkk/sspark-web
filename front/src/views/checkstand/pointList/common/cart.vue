<template>
  <div class="ticket_right">
    <div class="ticket_member">
      <div class="ticket_member_header">
        <div class="ticket_member_nav" />
        <span>会员</span>
      </div>
      <div class="member_search">
        <el-input
          v-model="mobile"
          placeholder="请输入手机号查询会员"
          size="mini"
          clearable
        />
        <el-button
          v-repeatdely="1000"
          type="primary"
          size="mini"
          @click="mobileQuery"
        >查询</el-button>
      </div>
      <div class="memberId">
        <span v-if="memberTel">会员ID：{{ memberTel }}</span>
      </div>
    </div>
    <div class="member_cart">
      <div class="ticket_member_header">
        <div class="ticket_member_nav" />
        <span>购物车</span>
      </div>
      <div class="clear_btn">
        <el-popover
          v-model="isDelete"
          placement="top"
          width="200"
          popper-class="myPopover"
          trigger="click"
        >
          <div>
            <div style="color:#666;font-size:12px;line-height:12px;margin:7px 21px 19px 13px;text-align:left;">确定要清空购物车么？</div>
            <div style="float:right;">
              <el-button
                size="mini"
                plain
                @click="isDelete = false;"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="clearCart"
              >确定</el-button>
            </div>
          </div>
          <el-button
            slot="reference"
            type="primary"
            size="mini"
            @click="isDelete = true;"
          >清空</el-button>
        </el-popover>
      </div>
      <div class="cartList">
        <div
          v-for="(item,index) in cartList"
          :key="index"
          class="cart_item"
        >
          <div class="cart_item_content">
            <div class="cart_item_name">{{ item.name }}</div>
            <div style="text-align:end">
              <div
                v-if="item.spec"
                class="cart_item_size"
              >
                <div class="cart_item_size_color">
                  <span>{{ item.spec }}</span>
                </div>
              </div>
              <div
                v-if="item.otaGood == '9'"
                class="ota_img"
              >OTA</div>
              <div style="display:inline-block">
                <div class="cart_item_price">￥<span>{{ item.price }}</span></div>
                <el-input-number
                  v-model="item.nums"
                  :min="0"
                  :max="999"
                  size="mini"
                  @change="changeNumber(item.nums,index)"
                />
              </div>
            </div>
          </div>
          <div
            v-if="item.gift"
            class="cart_item_spec"
          >
            <div class="cart_item_spec_front">赠</div>
            <div class="cart_item_spec_num">{{ item.gift }}</div>
          </div>
        </div>
      </div>
      <div class="sale_input">
        <el-select
          v-model="saleId"
          placeholder="输入销售员姓名（可不填）"
          size="mini"
          clearable
          style="width:187px"
          @change="saleChange"
        >
          <el-option
            v-for="item in saleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="total_money">
        合计：<span class="money_icon">￥</span><span class="money_num">{{ total }}</span>
      </div>
      <div class="bill_btn">
        <el-button
          type="primary"
          @click="settleFunc"
        >结算</el-button>
        <!-- <el-button type='info' disabled>结算</el-button> -->
      </div>
    </div>
    <pay-select
      ref="pay"
      :pay-total="total"
      @toParent="getChildData"
    />
  </div>
</template>
<script src='./cart.js'></script>

<style lang="scss" scoped>
.ticket_right {
  height: 100%;
  width: 372px;
  background: #f4f6f8;
  display: inline-block;
  padding: 30px 30px 70px;
  .ticket_member {
    .ticket_member_header {
      margin-bottom: 20px;
      display: inline-block;
      span {
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        color: #333;
      }
      .ticket_member_nav {
        width: 8px;
        height: 14px;
        background: #5d9cec;
        border-radius: 3px;
        margin-right: 10px;
        float: left;
        margin-top: 2px;
      }
    }
    .member_search /deep/ {
      margin-bottom: 10px;
      .el-input.el-input--mini {
        width: 228px;
        // margin-right: 25px;
      }
      .el-button--primary {
        background: #5d9cec;
        border-color: #5d9cec;
        float: right;
      }
      .el-button--mini {
        padding: 7px 16px;
        border-radius: 5px;
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
    .memberId {
      color: #888;
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
      height: 20px;
    }
  }
  .member_cart {
    margin-top: 50px;
    .clear_btn {
      float: right;
      .el-button--primary {
        border-radius: 5px;
      }
      a {
        font-size: 12px;
        color: #5d9cec;
        text-decoration: underline;
      }
    }
    .ticket_member_header {
      margin-bottom: 20px;
      display: inline-block;
      line-height: 28px;
      span {
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        color: #333;
      }
      .ticket_member_nav {
        width: 8px;
        height: 14px;
        background: #5d9cec;
        border-radius: 3px;
        margin-right: 10px;
        float: left;
        margin-top: 7px;
      }
    }
    .cartList {
      overflow-x: hidden;
      overflow-y: scroll;
      width: 329px;
      margin-bottom: 20px;
      max-height: calc(100vh - 551px);
      .cart_item:last-child {
        margin-bottom: 0;
      }
      .cart_item {
        background: #fff;
        box-shadow: 0px 0px 6px 0px rgba(213, 215, 231, 0.1);
        border-radius: 5px;
        width: 312px;
        padding: 18px 20px;
        height: auto;
        margin-bottom: 10px;
        .cart_item_content /deep/ {
          .cart_item_name {
            color: #666;
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 10px;
            display: -webkit-box;
            max-height: 40px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            padding-top: 2px;
          }
          .ota_img {
            width: 37px;
            height: 16px;
            background: #8960e0;
            border-radius: 2px;
            color: #fff;
            text-align: center;
            font-size: 10px;
            padding: 2px 0;
            line-height: 12px;
            margin-top: 2px;
            float: left;
          }
          .cart_item_price {
            font-size: 12px;
            line-height: 12px;
            color: #333;
            font-weight: 400;
            text-align: end;
            display: inline-block;
            span {
              font-size: 14px;
              line-height: 20px;
              font-weight: bold;
            }
          }
          .el-input-number.el-input-number--mini {
            // float: right;
            width: 85px;
            line-height: 20px;
            margin-left: 20px;
            .el-input-number__decrease,
            .el-input-number__increase {
              width: 20px;
              height: 18px;
            }
            .el-input-number__decrease.is-disabled,
            .el-input-number__increase.is-disabled {
              color: #fff;
              background: #ddd;
            }
            .el-input-number__decrease {
              background: #ddd;
              color: #fff;
              border: 0;
              border-radius: 2px;
            }
            .el-input-number__increase {
              background: #4887e6;
              color: #fff;
              border: 0;
              border-radius: 2px;
            }
            .el-input--mini .el-input__inner {
              height: 20px;
              line-height: 20px;
              background: #f8f8f8;
              border: 0;
              border-radius: 2px;
              padding-left: 30px;
              padding-right: 30px;
            }
          }
        }
        .cart_item_spec {
          border-radius: 2px;
          height: 16px;
          font-size: 10px;
          color: #f59322;
          margin-top: 10px;
          .cart_item_spec_front {
            width: 21px;
            background: RGBA(245, 166, 35, 0.2);
            border: 1px solid #f5a623;
            float: left;
            text-align: center;
            line-height: 10px;
            padding: 2px 0;
          }
          .cart_item_spec_num {
            width: 69px;
            border: 1px solid #f5a623;
            border-left: 0;
            display: inline-block;
            text-align: center;
            line-height: 10px;
            padding: 2px 0;
          }
        }
        .cart_item_size {
          background: #f4f6f8;
          box-shadow: 0px 0px 6px 0px rgba(213, 215, 231, 0.1);
          border-radius: 5px;
          padding: 2px 7px;
          margin-top: 3px;
          // display: inline-block;
          float: left;
          margin-bottom: 10px;
          .cart_item_size_color {
            font-size: 10px;
            line-height: 12px;
            color: RGBA(153, 153, 153, 1);
          }
        }
      }
    }
    .sale_input {
      margin-bottom: 20px;
      .el-input--mini {
        width: 171px;
      }
    }
    .total_money {
      margin-bottom: 32px;
      font-size: 14px;
      line-height: 20px;
      color: #333;
      font-weight: 500;
      .money_icon {
        font-size: 12px;
        line-height: 12px;
        color: #f04343;
      }
      .money_num {
        font-size: 22px;
        line-height: 20px;
        color: #f04343;
        font-weight: bold;
      }
    }
    .bill_btn {
      margin-bottom: 70px;
      .el-button.el-button--primary,
      .el-button--info {
        width: 100%;
        height: 40px;
        font-size: 16px;
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
    }
  }
}
.myPopover {
  .el-button--mini {
    border-radius: 4px;
    padding: 3px 9px;
  }
  .el-button.is-plain:active {
    border-color: #5d9cec;
    color: #5d9cec;
  }
}
/*滚动条样式*/
.cartList::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.cartList::-webkit-scrollbar-thumb {
  /*滚动条里面小方块样式*/
  border-radius: 5px;
  background: #c8e2f8;
}
.cartList::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  border-radius: 0;
  background: #f4f6f8;
}
</style>
