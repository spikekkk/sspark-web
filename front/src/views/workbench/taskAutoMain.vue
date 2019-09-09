<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.queryParams.name" placeholder="任务名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="任务名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creator | dictFilter(dictUsers) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.startTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行状态" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.opStatus | opStatusColorFilter">{{ scope.row.opStatus | dictFilter(dictInfo['op_status']) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看</el-button>
          <el-button v-if="scope.row.opStatus === '0'" type="danger" size="mini" @click="handleStartTask(scope.row)">启动</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :visible.sync="dialogTableVisible" title="拨打明细">
      <el-table
        v-loading="inner.listLoading"
        :data="inner.list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="客户姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="客户关系" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.relp | dictFilter(dictInfo['custr_relp']) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center">
          <template slot-scope="scope">
            <span >{{ scope.row.startTime | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" >
          <template slot-scope="scope">
            <span>{{ scope.row.endTime | timeFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="拨打状态" align="center">
          <template slot-scope="scope">
            <span :style="scope.row.subCallStatus | subCallStatusColorFilter">{{ scope.row.subCallStatus | dictFilter(dictInfo['sub_call_status']) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination v-show="inner.total>0" :current-page="inner.listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="inner.listQuery.limit" :total="inner.total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleInnerSizeChange" @current-change="handleInnerCurrentChange"/>
      </div>

    </el-dialog>

  </div>
</template>

<script>

import { fetchTaskAutoMain, fetchTaskAutoDetail, startTask } from '@/api/workbench'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
let websocket
export default {
  name: 'TaskAutoMain',
  directives: {
    waves
  },
  components: {
  },
  filters: {
    timeFormat(v) {
      if (v) {
        return parseTime(v)
      } else {
        return ''
      }
    },
    moneyFilter(v) {
      return formatMoney(v)
    },
    dictFilter(status, arr) {
      for (const item of arr) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    },
    opStatusColorFilter(status) {
      const c = {
        '0': {
          color: 'gray'
        },
        '1': {
          color: 'blue'
        },
        '2': {
          color: 'green'
        },
        '3': {
          color: 'red'
        }
      }
      return c[status] || {}
    },
    subCallStatusColorFilter(status) {
      const c = {
        '0': {
          color: 'gray'
        },
        '1': {
          color: 'blue'
        },
        '2': {
          color: 'red'
        },
        '3': {
          color: 'red'
        },
        '4': {
          color: 'green'
        }
      }
      return c[status] || {}
    }
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        queryParams: {
          name: undefined
        }
      },
      dialogTableVisible: false,
      inner: {
        list: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictInfo',
      'dictUsers'
    ])
  },
  created() {
    this.getList()
    this.$store.dispatch('LoadDicts', {
      keys: ['op_status', 'custr_relp', 'sub_call_status']
    })
    this.$store.dispatch('LoadUsers')

    if ('WebSocket' in window) {
      const p = window.location.protocol
      let ws = 'ws:'
      const host = window.location.host
      // host = 'localhost:9191'
      if (p === 'https:') {
        ws = 'wss:'
      }
      websocket = new WebSocket(`${ws}//${host}//cardcall/ws/autocall`)
      websocket.onmessage = (event) => {
        const json = JSON.parse(event.data)
        const taskComplete = json.taskComplete || false
        const taskId = json.taskId
        const recId = json.recId
        // const type = json.type
        // const detailId = json.detailId
        const subCallStatus = json.subCallStatus
        const custName = json.custName
        const relpName = json.relpName
        // const relpType = json.relpType
        const phone = json.phone
        const startTime = json.startTime
        const endTime = json.endTime
        this.$notify({
          title: '提示',
          message: `拨打客户:${custName}的联系人:${relpName}的电话:${phone},状态:${subCallStatus}`,
          type: 'success',
          duration: 2000
        })
        if (taskComplete) {
          const row = this.list.find(e => String(e.id) === String(taskId))
          if (row) {
            const index = this.list.indexOf(row)
            row.opStatus = '2'
            this.list.splice(index, 1, row)
          }
        }
        const innerRow = this.inner.list.find(e => String(e.id) === String(recId))
        if (innerRow) {
          const index = this.inner.list.indexOf(innerRow)
          innerRow.subCallStatus = subCallStatus
          innerRow.startTime = startTime
          innerRow.endTime = endTime
          this.inner.list.splice(index, 1, innerRow)
        }
      }
    } else {
      alert('Not support websocket')
    }
  },
  destroyed() {
    websocket.close()
    websocket = null
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchTaskAutoMain(this.listQuery).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDetail(row) {
      this.dialogTableVisible = true
      this.inner.listLoading = true
      fetchTaskAutoDetail(this.inner.listQuery, row.id).then(res => {
        this.inner.list = res.results
        this.inner.total = res.data.resultCount
        this.inner.listLoading = false
      })
    },
    handleInnerSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleInnerCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleStartTask(row) {
      this.$notify({
        title: '成功',
        message: '启动成功',
        type: 'success',
        duration: 2000
      })
      startTask(row.id).then(res => {
        const index = this.list.indexOf(row)
        row.opStatus = '1'
        this.list.splice(index, 1, row)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    height:calc(100vh - 84px);
  }
</style>
