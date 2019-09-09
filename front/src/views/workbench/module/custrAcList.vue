<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      max-height="400"
      style="width: 100%;">
      <el-table-column label="账单号" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.acctBillId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime | parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通话状态" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.callStatus | callStatusColorFilter">{{ scope.row.callStatus | callStatusFilter(callStatusMap) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通话时长" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.callDurn }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchCustrAcList } from '@/api/workbench'
// eslint-disable-next-line
import { parseTime } from '@/utils'

export default {
  name: 'CustrAcList',
  filters: {
    callStatusFilter(status, map) {
      return map ? map[status] || status : status
    },
    callStatusColorFilter(status) {
      const c = {
        '0': {
          color: 'gray'
        },
        '1': {
          color: 'blur'
        },
        '2': {
          color: 'green'
        },
        '3': {
          color: 'red'
        }
      }
      return c[status] || {}
    }
  },
  props: {
    acctId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      dAcctId: this.acctId,
      callStatusMap: {},
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  watch: {
    acctId(n, o) {
      this.dAcctId = n
      if (n !== o) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCustrAcList(this.listQuery, this.dAcctId).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
        this.callStatusMap = res.extra ? res.extra['callStatusCn'] : {}
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
