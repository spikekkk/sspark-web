<template>
  <div class="sure_refund">
    <el-dialog
      :visible.sync="isSureRefundVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      title="商品列表"
      width="400px"
      @close="close"
    >
      <div class="production_list">
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
        >
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column
            :selectable="checkboxUse"
            type="selection"
            width="27"
          /> -->
          <el-table-column
            label="商品名称"
            prop="goodsName"
          />
          <el-table-column
            prop="specName"
            label="规格"
            width="88"
          />
          <el-table-column
            prop="goodsQuantity"
            label="数量"
            width="48"
          />
          <el-table-column
            prop="goodsPrice"
            label="单价"
            width="108"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.detailStatus == 2">
                <span>￥{{ scope.row.goodsPrice }}</span>
                <span style="color:#999;float:right">已退款</span>
              </div>
              <span v-else>￥{{ scope.row.goodsPrice }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          plain
          class="cancel_btn"
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="sureRefund"
        >确定退款</el-button>
      </span>
    </el-dialog>
    <sure-refund
      ref="refund"
      @toParent="getChildData"
      @toTableData="getParentTable"
    />
  </div>
</template>
<script>
export default {
  components: {
    SureRefund: require('./sureRefundDialog.vue').default
  },
  data() {
    return {
      isSureRefundVisible: false,
      tableData: [],
      orderStatus: '', // 订单状态
      currentCheckArray: [], // 当前选择的id的数组
      orderId: '', // 订单id
      getTable: []// 获取订单表格的数据
    }
  },
  methods: {
    /* 弹窗显示*/
    show(data, rowData, table) {
      this.isSureRefundVisible = true
      this.tableData = data
      this.getTable = table
      this.orderStatus = rowData.orderStatus || this.getTable[0].orderStatus
      this.orderId = rowData.id || this.getTable[0].id
      for (const item of data) {
        if (this.currentCheckArray.indexOf(item.id) == -1) {//eslint-disable-line
          this.currentCheckArray.push(item.id)
        }
      }
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    },
    /* 获得子组件的消息*/
    getChildData(val) {
      this.currentCheckArray = val
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    },
    /* 获取父组件的表格数据*/
    getParentTable() {
      this.$emit('toParent')
      this.isSureRefundVisible = false
    },
    /* 确定退款*/
    sureRefund() {
      const detailIds = this.currentCheckArray.join(',')
      if (this.orderStatus == '4' && !detailIds) {//eslint-disable-line
        this.$message.error('已退款的账单无法退款')
      } else if (detailIds) {
        if (this.orderStatus == '1' || this.orderStatus == '8') {//eslint-disable-line
          this.$refs.refund.show(detailIds, this.orderId)

        } else if (this.orderStatus == '3') {//eslint-disable-line
          this.$message.error('订单目前不支持多次退款')
        } else {
          this.$message.error('待支付的账单不能退款')
        }
      } else {
        this.$message.error('请选择需要退款的商品')
      }
    },
    /* 取消*/
    cancel() {
      this.isSureRefundVisible = false
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    },
    /* 关闭*/
    close() {
      this.$nextTick(() => {
        this.$refs.multipleTable.clearSelection()
      })
    }
    /* 选择某个商品*/
    // handleSelectionChange(val) {
    //   if (val) {
    //     for (const item of val) {
    //       if (this.currentCheckArray.indexOf(item.id) == -1) {//eslint-disable-line
    //         this.currentCheckArray.push(item.id)
    //       }
    //     }
    //   } else {
    //     this.currentCheckArray = []
    //   }
    // }
    /* 某个勾选不可用*/
    // checkboxUse(row, index) {
    //   if (row.detailStatus == 2) {//eslint-disable-line
    //     return 0
    //   } else {
    //     return 1
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
.sure_refund /deep/ {
  .v-modal {
    opacity: 0.7;
  }
  .el-dialog {
    border-radius: 5px;
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
    .el-dialog__body {
      padding: 20px 16px 39px;
      max-height: 294px;
      overflow: scroll;
      .production_list /deep/ {
        .el-table::before {
          background-color: transparent;
        }
        .el-table td,
        .el-table th.is-leaf {
          // text-align: center;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        .el-table th:nth-child(3) {
          text-align: center;
        }
        .el-table th:nth-child(4) {
          text-align: center;
        }
        .el-table th:nth-child(1) {
          border-right: 0;
        }
        .el-table th {
          background: #eff2f6;
          font-size: 12px;
          color: #333;
          line-height: 28px;
          padding: 0;
          font-weight: 500;
        }
        .el-table__body .el-table__row:nth-child(2n) td {
          background: #f9fafc;
        }
        .el-table td:nth-child(3) {
          text-align: center;
          color: #666;
        }
        .el-table td:nth-child(4) {
          text-align: center;
          color: #666;
        }
        .el-table td:nth-child(1) {
          border-right: 0;
        }
        .el-table td:nth-child(2) {
          color: #666;
        }
        .el-table td {
          font-size: 12px;
          color: #333;
          padding: 2px 0;
          font-weight: 400;
          height: 28px;
        }
        .el-checkbox__input.is-disabled .el-checkbox__inner {
          border-color: #ddd !important;
          background: #f2f2f2;
        }
        .el-checkbox__inner:hover {
          border-color: #5d9cec;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #5d9cec;
          border-color: #5d9cec;
        }
      }
    }
    .el-dialog__footer {
      padding: 10px 20px 20px;
      .dialog-footer {
        .el-button--mini {
          border-radius: 5px;
          padding: 7px 17px;
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
}
</style>
