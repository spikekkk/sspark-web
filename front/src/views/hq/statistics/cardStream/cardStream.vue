<template>

  <div>
    <rechargeDetali
      ref="recharge"
      :data-source="tableData"
      :is-card="isCard"
    />
  </div>
</template>

<script>
import rechargeDetali from '@/components/RechargeDetail/rechargeDetail'

import {
  businessStatExport,
  businessStat
} from '@/api/sub/statistics'
export default {
  components: {
    rechargeDetali
  },
  data() {
    return {
      tableData: [],
      isCard: true
    }
  },
  mounted() {
    this.$refs.recharge.onSearch('search') // 调用子组件搜索事件
  },
  methods: {
    getDate(val) {
      businessStat(val).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
        this.loading = false
      })
    },
    filesDownload(val) {
      if (val && val.length > 0) {
        if (val && val === '当前报表') {
          this.exportData.exportType = 9
        } else if (val && val === '周报表') {
          this.exportData.exportType = 1
        } else if (val && val === '月报表') {
          this.exportData.exportType = 2
        }

        businessStatExport(this.exportData).then(res => {
          const content = res
          const blob = new Blob([content])
          const fileName =
            '经营统计' +
            '--' +
            val +
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
