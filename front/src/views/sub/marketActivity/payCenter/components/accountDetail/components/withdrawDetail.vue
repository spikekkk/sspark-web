<template>
  <div class="wageSet">

    <el-table
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="mchId"
        label="编号"
      />
      <el-table-column
        prop="settAmount"
        label="提现金额"
      />
      <el-table-column
        prop="remitAmount"
        label="实际到账"
      />
      <el-table-column
        prop="settFee"
        label="手续费"
      />
      <el-table-column
        prop="mchName"
        label="户名"
      />

      <el-table-column
        prop="payeeAccount"
        label="账号"
      />
      <el-table-column
        prop="remitWay"
        label="开户行"
      />
      <el-table-column
        prop="operator"
        label="操作人"
      />
      <el-table-column
        prop="createTime"
        label="提交时间"
      />
      <el-table-column
        prop="settStatus"
        label="状态"
      />
    </el-table>

  </div>
</template>

<script>

import { queryPaySetRecordList } from '@/api/sub/payAccount'

export default {

  data() {
    return {
      tableData: [],
      tableHeight: 'calc(100vh - 259px)'
    }
  },

  methods: {
    getTableList() {
      queryPaySetRecordList().then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.result
          console.log('res--->', res)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    }

  }
}
</script>
