<template>
  <div class="manage_container">
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

          <el-form-item prop="cardNum">

            <el-input
              v-model="listQuery.cardNum"
              placeholder="储值卡号"
              clearable
            />

          </el-form-item>
          <el-form-item prop="tel">

            <el-input
              v-model="listQuery.tel"
              placeholder="手机号"
              clearable
            />

          </el-form-item>
          <el-button
            v-repeatdely="1000"
            type="primary"
            @click="onSearch('search')"
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

            <el-button
              v-repeatdely="2000"
              size="mini"
              type="primary"
              @click="filesDownload"
            >
              导出

            </el-button>
          </el-form-item>
        </el-form>
        <div>

          <el-button
            v-for=" (item,index) in btnData"
            :key="index"
            :class="isActive===index?'isChoice_btn':''"
            @click="setDate(item,index)"
          >{{ item }}</el-button>

          <el-date-picker
            v-show="showDate"
            ref="pick"
            v-model="date"
            style="margin-left:10px"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>

      <div
        v-loading.lock="loading"
        class=" table_style_edit"
        element-loading-text="拼命加载中"
      >
        <div style="margin-top: 20px;">
          <el-table
            :data="dataSource"
            stripe
            style="width: 100%"
          >
            <el-table-column label="储值卡号">
              <template slot-scope="scope">
                <span>{{ scope.row.cardId || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员姓名">
              <template slot-scope="scope">
                <span>{{ scope.row.customerName || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号">
              <template slot-scope="scope">
                <span>{{ scope.row.mobile || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="充值时间">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeTime || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="充值金额">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeAmount || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="赠送金额">
              <template slot-scope="scope">
                <span>{{ scope.row.donationAmount || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="赠送门票">
              <template slot-scope="scope">
                <span>{{ scope.row.giftName || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付方式">
              <template slot-scope="scope">
                <span>{{ scope.row.payType | dictFilter(dictInfo['pay_type'],scope.row.genderCn)|| "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="充值门店">
              <template slot-scope="scope">
                <span>{{ scope.row.shopName || "-" }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开卡门店">
              <template slot-scope="scope">
                <span>{{ scope.row.openShopName || "-" }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.cardCash || "-" }}</span>
              </template>
            </el-table-column> -->

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

<script>

import { mapGetters } from 'vuex'
function dictFilter(status, arr) {
  for (const item of arr || []) {
    if (String(item.value) === String(status)) {
      return item.label
    }
  }
  return status
}
export default {
  filters: {
    dictFilter(status, arr, cn) {
      if (cn) {
        return cn
      }
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    }
  },

  props: {
    dataSource: {
      type: Array,
      default: undefined
    },
    isCard: {
      type: Boolean,
      default: null
    }
  },

  data() {
    return {
      btnData: ['今日', '昨日', '本周', '本月', '自定义'],
      isActive: 0,
      bussinessList: [],
      date: [],
      tableData: [],
      loading: false,
      showDate: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      value4: '',
      listQuery: {
        date: [],
        cardNum: '',
        tel: ''
      },
      exportData: ''
    }
  },

  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },

  mounted() {
    this.$store
      .dispatch(
        'LoadDicts',
        'pay_type'
      )
      .then(() => {
        const arr = this.dictInfo['pay_type']

        if (this.dataSource && this.dataSource.length > 0) {
          this.dataSource = this.dataSource.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
  },
  methods: {

    setDate(val, index) {
      this.isActive = index
      var end = new Date()
      var start = new Date()
      // var days
      // switch (val) {
      //   case '今日':
      //     days = 0
      //     break
      //   case '昨日':
      //     days = 1
      //     break
      //   case '本周':
      //     days = 7
      //     break
      //   case '本月':
      //     days = 30
      //     break
      //   case '自定义':
      //     days = 0
      //     break
      // }
      if (val === '自定义') {
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
        this.date = [start, end]
        this.showDate = true
      } else {
        this.showDate = false
        this.date = []
      }

      this.onSearch('search')
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
    },

    /* 搜索*/
    onSearch(val) {
      const _this = this
      _this.pageIndex = 1
      // _this.getBusinessStat()
      let start
      let end

      var newDate = this.date.map(v => {
        return new Date(v).getFullYear() + '-' + (new Date(v).getMonth() + 1) + '-' + new Date(v).getDate()
      })

      if (newDate) {
        start = newDate[0]
        end = newDate[1]
      } else {
        start = ''
        end = ''
      }
      const params = {
        cardId: this.listQuery.cardNum,
        mobile: this.listQuery.tel,
        isExport: '0'

      }

      if (this.isActive === 0) {
        params.statType = '0'
      }
      if (this.isActive === 1) {
        params.statType = '-1'
      }
      if (this.isActive === 2) {
        params.statType = '1'
      }
      if (this.isActive === 3) {
        params.statType = '2'
      }

      if (this.isActive === 4) {
        params.startTime = start
        params.endTime = end
        params.statType = '9'
      }
      // 进行导出的数据
      this.exportData = params
      if (val === 'search') {
        this.$parent.getDate(params)
      }
    },

    filesDownload(val) {
      this.onSearch()
      this.exportData.isExport = '1'
      this.$parent.filesDownload(this.exportData)
    },

    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()

      this.pageIndex = 1
      this.isActive = 0
      this.date = [new Date(), new Date()]
      this.$parent.getDate()
    }
  }
}

</script>

<style lang="scss" scoped>
.manage_container {
  height: 100%;
  margin: 0 10px 0 10px;

  .isChoice_btn {
    background-color: #5d9cec;
    border-color: #5d9cec;
    color: #ffffff;
  }
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
      // margin-left: 7px;
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
    height: calc(100vh - 191px);
    padding: 10px 10px 0;
    background-color: #fff;

    .el-button--text {
      color: #5d9cec;
    }
    .el-table {
      overflow: auto;
      height: calc(100vh - 270px);
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
}
</style>

