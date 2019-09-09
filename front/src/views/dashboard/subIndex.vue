<template>
  <div class="home_page">

    <div class="head_block">

      <p class="block_title">店铺概况</p>
      <div class="head_content">
        <div class="head_item first_color">
          <span class="money_num">￥{{ shopStats.monthTurnover }}</span>
          <span class="desc_title">本月营业额</span>
        </div>
        <div class="head_item second_color">
          <span class="money_num">￥{{ shopStats.dayTurnover }}</span>
          <span class="desc_title">今日营业额</span>
        </div>
        <div class="head_item third_color">
          <span class="money_num">{{ shopStats.monthAddCust }}</span>
          <span class="desc_title">本月新增会员</span>
        </div>
        <div class="head_item fourth_color">
          <span class="money_num">{{ shopStats.dayAddCust }}</span>
          <span class="desc_title">今日新增会员 </span>
        </div>
      </div>
      <div class="head_content">

        <div class="head_item first_color">
          <span class="money_num">￥{{ shopStats.monthCustConsume }}</span>
          <span class="desc_title">本月会员消费</span>
        </div>
        <div class="head_item second_color">
          <span class="money_num">￥{{ shopStats.monthGuestConsume }}</span>
          <span class="desc_title">本月散客消费</span>
        </div>
        <div class="head_item third_color">
          <span class="money_num">{{ shopStats.monthDealNum }}</span>
          <span class="desc_title">本月成交笔数</span>
        </div>
        <div class="head_item fourth_color">
          <span class="money_num">￥{{ shopStats.monthRefundMoney }}</span>
          <span class="desc_title">本月退款金额</span>
        </div>

      </div>

    </div>

    <div class="home_session">
      <div class="home_left_block">
        <div>
          <p class="block_title">经营统计图表</p>
          <span class="fr data_btn">
            <el-button
              :class="active===1 ? 'active_data':''"
              size="mini"
              round
              @click="changeMonth(1)"
            >本月</el-button>
            <el-button
              :class="active===0 ? 'active_data':''"
              size="mini"
              round
              @click="changeMonth(0)"
            >上月</el-button>
            <svg-icon
              icon-class="icon_gb_jgsz"
              class="jgsz"
            />
          </span>

        </div>

        <div>
          <p class="echart_head"><span class="icon_block" /><span class="echart_titile">{{ monthTitle }}营业额商品类别占比 </span></p>
          <PieChart
            v-loading="isStatView"
            :operation-data="pieData"
            :data-color="dataColor"
            :pie-style="firstPieStyle"
          />

          <p class="echart_head head_line"><span class="icon_block" /><span class="echart_titile">本月营业额走势 </span></p>
          <lineMarker
            v-loading="isMonthTrend"
            :xname="firstXname"
            :data-arrary="monthAmount"
          />

          <p class="echart_head head_line"><span class="icon_block" /><span class="echart_titile">本月营业额支付方式占比 </span></p>
          <PieChart
            v-loading="isPayWay"
            :operation-data="secondPieData"
            :data-color="data2Color"
            :pie-style="secondPieStyle"
            center-title="支付方式总额"
          />
          <div
            class="echart_head head_line"
            style="margin-bottom:10px"
          ><span class="icon_block" /><span class="echart_titile">每日各时段营业额走势 </span>
            <el-date-picker
              v-model="dateValue"
              class="fr date_picker"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              clearable
              @change="dateChange"
            />
          </div>

          <lineMarker
            v-loading="isHaveHourData"
            :xname="secondXname"
            :data-arrary="hourAmount"
            :class-name="lastChart"
            :id="lastId"
            element-loading-text="暂无数据"
            element-loading-spinner="el-icon-goblet-square"
            element-loading-background="#ffffff;"
          />
        </div>

      </div>
      <div class="home_right_block">

        <div class="right_items attention">
          <p class="block_title">关注事项</p>
          <div class="attention_item">

            <el-popover
              placement="top-start"
              width="410"
              trigger="hover"
              content="单独展示即将到使用有效期的会员卡(有效期前10天提醒)"
            >
              <el-button
                slot="reference"
                round
                size="mini"
                @click="goToDetail('goods')"
              >会员卡</el-button>

            </el-popover>

            <span class="attention_content">有{{ cardExpireNum }}件会员卡即将到达使用有效期</span>
          </div>
          <div class="attention_item">
            <el-popover
              placement="top-start"
              width="410"
              trigger="hover"
              content="单独展示即将到销售有效期的充值套餐(有效期前10天提醒)"
            >
              <el-button
                slot="reference"
                round
                size="mini"
                @click="goToDetail('comb')"
              >充值套餐</el-button>

            </el-popover>
            <span class="attention_content">有{{ storedExpireNum }}件充值套餐即将到达销售有效期</span>
          </div>

        </div>
        <div class="right_items img_block">
          <div
            class="img_content print_box"
            @click="openBlank('print')"
          />
          <p class="img_desc"> 打印小票设置方法 </p>
        </div>
        <div class="right_items img_block">
          <div
            class="img_content alipay_box"
            @click="openBlank('alipay')"
          />
          <p class="img_desc">开通微信支付宝扫码收款
          </p>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import PieChart from '@/components/Charts/PieChart'
import lineMarker from '@/components/Charts/lineMarker'
// import PointChart from '@/components/Charts/PointChart'
// eslint-disable-next-line
import { queryExpireGoods, queryDayTrendChart, queryMonthPayBusiness, queryMonthTrendChart, querybusinessStatView, queryShopSurveyStat } from '@/api/sub/homePage'
export default {
  components: {
    PieChart,
    lineMarker
    // PointChart
  },
  data() {
    var date = new Date()
    var month = date.getMonth() + 1

    return {
      isPayWay: true,
      isStatView: true,

      cardExpireNum: '',
      storedExpireNum: '',
      isMonthTrend: true,
      isHaveHourData: true,
      firstXname: '日期',
      secondXname: '小时',
      dateValue: '',
      nowMonth: month,
      active: 1,
      lastChart: 'lastChart',
      lastId: 'lastId',
      monthAmount: [],
      hourAmount: [],
      pieData: [
        { value: 335, name: '门票' },
        { value: 310, name: '零售商品' },
        { value: 234, name: '充值套餐' },
        { value: 135, name: '会员卡' }
      ],
      secondPieData: [],
      dataColor: ['#8175C6', '#A3E128',
        '#5D9CEC', '#FBB323'
      ],
      data2Color: ['#8175C6', '#A3E128',
        '#5D9CEC', '#FBB323', '#01aaef', '#09bb07'
      ],
      firstPieStyle: {

        normal: {
          show: false,
          position: 'center'
        },
        silent: false,
        radius: ['50%', '70%']

      },

      secondPieStyle: {
        normal: {
          show: false,
          position: 'center'
        },
        silent: false,
        radius: ['50%', '70%']

        // normal: {
        //   position: 'inner',
        //   formatter: '{b}',
        //   textStyle: {
        //     color: '#fff',
        //     fontWeight: 'bold',
        //     fontSize: 12
        //   }
        // },
        // silent: true,
        // radius: ['40%', '90%']

      },
      shopStats: ''

    }
  },
  computed: {
    monthTitle: function() {
      if (this.active === 1) {
        return '本月'
      } else {
        return '上月'
      }
    }

  },
  mounted() {
    this.queryShopSurveyStats()
    this.querybusinessStatView(1)
    this.queryMonthTrendChart()
    this.queryMonthPayBusiness()
    this.queryDayTrendChart(this.formatDate())
    this.queryExpireGoods()
  },
  methods: {
    openBlank(val) {
      if (val === 'print') {
        window.open('https://mp.weixin.qq.com/s/FGaUdWhYWj7UiotGCNKm5Q')
      } else {
        window.open('https://www.ishanshan.com/thinknode/checkstand/h5/checkstandH5/index/StepThreePage?appId=1060717408233938945#/StepThreePage?_k=f2ullw', '_blank', 'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no')
      }
    },
    formatDate() {
      var y = new Date().getFullYear()
      var m = new Date().getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = new Date().getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '-' + m + '-' + d
    },
    goToDetail(value) {
      if (value !== 'goods') {
        this.$router.push({ name: 'AllProducts' })
      } else {
        this.$router.push({ name: 'Membermgr' })
      }
    },

    /* 查询店铺概况*/
    queryShopSurveyStats() {
      queryShopSurveyStat().then(res => {
        if (res.errorCode === 9000) {
          this.shopStats = res
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 查询商品过期概况*/
    queryExpireGoods() {
      queryExpireGoods().then(res => {
        if (res.errorCode === 9000) {
          this.cardExpireNum = res.cardExpireNum
          this.storedExpireNum = res.storedExpireNum
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    changeMonth(val) {
      this.active = val
      this.querybusinessStatView(val)
    },

    /* 查询经营统计*/
    querybusinessStatView(val) {
      const data = {
        monthType: val
      }
      querybusinessStatView(data).then(res => {
        if (res.errorCode === 9000) {
          const newData = [
            { value: Number(res.ticketAmount), name: '门票' },
            { value: Number(res.goodsAmount), name: '零售商品' },
            { value: Number(res.storedAmount), name: '充值套餐' },
            { value: Number(res.custCardAmount), name: '会员卡' }
          ]
          this.pieData = newData
          this.isStatView = false
        } else {
          this.isStatView = true
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 查询月营业额走势*/
    queryMonthTrendChart() {
      queryMonthTrendChart().then(res => {
        if (res.errorCode === 9000) {
          this.monthAmount = res.monthAmount
          this.isMonthTrend = false
        } else {
          this.isMonthTrend = true
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 查询月支付方式占比*/
    queryMonthPayBusiness() {
      queryMonthPayBusiness().then(res => {
        if (res.errorCode === 9000) {
          const newData = [
            { value: Number(res.otaAmount), name: 'OTA' },
            { value: Number(res.posAmount), name: 'POS' },
            { value: Number(res.balanceAmount), name: '储值卡' },
            { value: Number(res.cashAmount), name: '现金' },
            { value: Number(res.aliPayAmount), name: '支付宝' },
            { value: Number(res.wxAmount), name: '微信' }
          ]

          this.secondPieData = newData
          this.isPayWay = false
        } else {
          this.isPayWay = true
          this.$message.error(res.errorMessage)
        }
      })
    },

    dateChange() {
      this.queryDayTrendChart(this.dateValue)
    },
    /* 查询日营业额走势*/
    queryDayTrendChart(val) {
      this.dateValue = val
      const data = {
        date: val
      }
      queryDayTrendChart(data).then(res => {
        if (res.errorCode === 9000) {
          if (res.hourAmounts.length > 0) {
            this.isHaveHourData = false
            this.hourAmount = res.hourAmounts
          } else {
            this.isHaveHourData = true
          }
        } else {
          this.isHaveHourData = true
          this.$message.error(res.errorMessage)
        }
      })
    }
  }

}
</script>
<style lang="scss" scope>
@mixin border-radius {
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
@mixin vertical-align {
  vertical-align: middle;
}
@mixin background-color {
  -webkit-background-color: #ffffff;
  background-color: #ffffff;
}
.first_color {
  background-color: rgb(231, 240, 252);
}
.second_color {
  background-color: rgb(236, 235, 247);
}

.third_color {
  background-color: rgb(255, 244, 222);
  // background-color: #fbb323;
}

.fourth_color {
  background-color: rgb(241, 251, 223);
}

.money_num {
  font-weight: bold;
  color: #333333;
  line-height: 26px;
  font-size: 26px;
}

.desc_title {
  color: #666666;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
}

.home_page {
  margin: 10px;
  overflow: auto;
  height: calc(100vh - 99px);
}
.head_content {
  display: flex;
  justify-content: space-around;
}
.head_block {
  @include background-color;
  @include border-radius;
}
.head_item {
  margin: 10px;
  // opacity: 0.15;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70px;
  // background-color: antiquewhite;
  @include border-radius;
  justify-content: center;
  min-width: 260px;
  flex: 1;
}

.block_title {
  display: inline-block;
  padding-left: 10px;
  color: #333333;
  font-weight: 500;
}
.home_session {
  overflow: hidden;
  margin-top: 10px;
  display: flex;

  justify-content: space-between;
}

.home_left_block {
  @include background-color;
  width: 70%;
  @include border-radius;
}

.home_right_block {
  width: 29%;
}

.right_items {
  @include background-color;
  @include border-radius;
  height: 198px;
  margin-bottom: 10px;
  overflow: hidden;
  .el-button.is-round {
    padding: 2px 15px;
  }
}

.attention_item {
  line-height: 20px;
  padding-bottom: 14px;
  padding-left: 20px;
}

.attention_content {
  color: #666666;
  font-size: 14px;
  padding-left: 8px;
}

.img_block {
  display: flex;

  flex-direction: column;
  justify-content: space-between;
}

.img_content {
  cursor: pointer;
  height: 158px;
  background-color: red;
}

.img_desc {
  color: #666666;
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
}

.print_box {
  cursor: pointer;
  background-image: url("https://img.ishanshan.com/gimg/n/20190523/dc028585ecd4c3b4e5ca827ca60c684e");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.alipay_box {
  cursor: pointer;
  background-image: url("https://img.ishanshan.com/gimg/n/20190523/809adff07ffa83c3aef8c6702fb89f66");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
// @media screen and(max-width:1329px) {
//   .head_block {
//     min-width: 1179px !important;
//   }
//   .head_item {
//     min-width: 260px !important;
//   }
// }

// @media screen and (min-width: 1329px) {
//   .head_item {
//     min-width: 408px !important;
//   }
//   .head_block {
//     min-width: calc(100vw - 178px) !important;
//   }
// }

.el-button.is-round {
  border-color: #5d9cec !important;

  color: #5d9cec;
  &:hover,
  &:focus {
    background-color: #fff !important;
  }
}

.jgsz {
  color: #bbbbbb;
  margin: 0 10px;
}

.data_btn {
  margin: 10px;
  .active_data {
    background-color: #5d9cec;
    color: #ffffff !important;
    &:hover,
    &:focus {
      background-color: #5d9cec !important;
    }
  }
}

.icon_block {
  display: inline-block;
  width: 6px;
  height: 14px;
  background: rgba(93, 156, 236, 1);
  border-radius: 2px;
  @include vertical-align;
  margin-right: 5px;
}

.echart_titile {
  color: #666666;
  font-size: 16px;
  @include vertical-align;
}
.date_picker {
  margin-right: 80px;
}
.echart_head {
  padding-left: 10px;
}

.line_cover {
  margin-top: 26px;
  /* margin: 20px; */
  width: 100%;
  height: 300px;
}

.head_line {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #dddddd;
}
</style>
