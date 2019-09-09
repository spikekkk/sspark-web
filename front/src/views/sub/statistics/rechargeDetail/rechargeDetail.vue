<template>

  <div>
    <rechargeDetali
      ref="recharge"
      :data-source="tableData"
    />
  </div>
</template>

<script>
import rechargeDetali from '@/components/RechargeDetail/rechargeDetail'
import { exportFile } from '@/utils/exportFile'
import {
  rechargeFlow,
  rechargeFlowExcle
} from '@/api/sub/statistics'
export default {
  components: {
    rechargeDetali
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.$refs.recharge.onSearch('search') // 调用子组件搜索事件
  },
  methods: {
    getDate(val) {
      rechargeFlow(val).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
        this.loading = false
      })
    },

    filesDownload(val) {
      if (val) {
        rechargeFlowExcle(val).then(res => {
          exportFile(res, '', '充值流水')
        })
      } else {
        this.$message({
          message: '请先选中月份',
          type: 'warning'
        })
      }
    }
  }

}
</script>
