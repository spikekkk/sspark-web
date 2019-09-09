<template>
  <div class="data_detail">
    <div class="data_detail_heard">

      <h3>数据详情</h3>
    </div>
    <div class="block_title"><span class="icon_title" /><span>砍价榜 </span></div>

    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="nickName"
        label="昵称"
      />
      <el-table-column
        prop="haggleTimes"
        label="砍价次数"
        align="center"
      />
      <el-table-column
        prop="price"
        width="120px"
        label="当前价格（元）"
        align="center"
      />
      <el-table-column label="报名门店">
        <template slot-scope="scope">
          {{ JSON.parse(scope.row.gameBaseForm)[0].data }}
        </template>
      </el-table-column>
      <el-table-column label="宝宝姓名">
        <template slot-scope="scope">
          {{ JSON.parse(scope.row.gameBaseForm)[1].data }}
        </template>
      </el-table-column>
      <el-table-column label="宝宝生日">
        <template slot-scope="scope">
          {{ JSON.parse(scope.row.gameBaseForm)[2].data }}
        </template>
      </el-table-column>
      <el-table-column
        label="支付状态"
        align="center"
      >
        <template slot-scope="scope">
          <span style="color:#5D9CEC">
            {{ payStatus( scope.row.payStatus) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.payStatus=='1'"
            type="text"
            @click="handleRefund(scope.row)"
          >
            退款
          </el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :total="totalCount"
      layout="  prev, pager, next, sizes,jumper"
      @size-change="sizeChange"
      @current-change="currentChange"
    /> -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      title="是否退款"
      width="300"
    >
      <span style="line-height:16px">支付的金额将原路返还，且退款之后用户无法再次支付，是否确认退款？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          class="cancel_btn"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="handlePayRefund()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { payRefund, queryRankInfo } from '@/api/sub/marketActivity'
import SideDialog from '@/components/SideDialog'

export default {
  components: {
    SideDialog
  },
  props: {
    tableData: {
      default: null,
      type: Array
    },
    gameData: {
      default: null,
      type: Object
    }
  },

  data() {
    return {
      dialogVisible: false,
      sideDialogShow: false,
      saveRow: '',
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      loading: true

    }
  },
  watch: {
    tableData(val, old) {
      if (val) {
        this.loading = false
      }
    }
  },

  methods: {
    handleRefund(val) {
      this.saveRow = val
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    payStatus(val) {
      switch (val) {
        case '0':
          return '未支付'

        case '1':
          return '已支付'

        case '2':
          return '已退款'

        default:
          return null
      }
    },
    handlePayRefund() {
      const data = {
        tenantId: this.saveRow.tenantId,
        orgId: this.saveRow.orgId,
        orderId: this.saveRow.orderId,
        gameBaseId: this.gameData.dataId,
        gameCode: this.gameData.gameCode
      }
      payRefund(data).then(res => {
        if (res.errorCode === 9000) {
          this.handleClose()
          this.queryRankInfos()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    queryRankInfos() {
      const data = {
        gameBaseId: this.gameData.dataId,
        orgIds: this.gameData.orgId,
        pageIndex: this.pageIndex - 1,
        pageSize: this.pageSize
      }
      queryRankInfo(data).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    }
    // /* 分页条数触发*/
    // sizeChange(val) {
    //   this.pageSize = val
    //   this.queryRankInfos()
    // },

    // /* 当前页的触发*/
    // currentChange(val) {
    //   this.pageIndex = val
    //   this.queryRankInfos()
    // }

  }
}
</script>
<style lang="scss" scoped>
.data_detail /deep/ {
  .el-table {
    height: calc(100vh - 187px) !important;
  }
}

.data_detail_heard {
  text-align: center;
}

.block_title {
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  font-size: 18px;
  margin-bottom: 18px;
  .icon_title {
    height: 18px;
    width: 6px;
    display: -webkit-inline-box;
    background-color: #5d9cec;
    border-radius: 5px;
    margin-right: 4px;
  }
}
</style>
