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

import {
  rechargeFlow,
  rechargeFlowExcle
} from '@/api/checkstand/cashier'
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
          const content = res
          const blob = new Blob([content])
          const fileName =
            '充值流水' +
            '--' +

            new Date().toLocaleString() +
            '.xlsx'
          if ('download' in document.createElement('a')) {
            // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          this.$message({
            message: '导出成功！',
            type: 'success'
          })
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
