<template>
  <div>

    <el-table
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="tradeNo"
        label="交易单号"
      />
      <el-table-column
        prop="subject"
        label="描述"
      />
      <el-table-column
        prop="amount"
        label="发生金额"
      />
      <el-table-column
        prop="balance"
        label="账号金额"
      />

      <el-table-column
        prop="trxType"
        label="类型"
      />
      <el-table-column
        prop="createTime"
        label="提交时间"
      />
    </el-table>
  </div>
</template>

<script>
import { queryPayHistoryAccountList } from '@/api/sub/payAccount'

export default {

  data() {
    return {
      tableData: [],
      tableHeight: 'calc(100vh - 259px)'

    }
  },
  mounted() {
    this.queryPayHistoryAccountLists()
  },
  methods: {
    queryPayHistoryAccountLists() {
      queryPayHistoryAccountList().then(res => {
        if (res.errorCode === 9000) {
          console.log('res--->', res)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    }
  }
}
</script>
