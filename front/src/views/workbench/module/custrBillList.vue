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
      <el-table-column label="账单号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.occurDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单月数" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.monthNbr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单金额" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.balAmount | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逾期金额" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.odueAmount | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="还款金额" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.payment | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逾期标志" align="center">
        <template slot-scope="scope">
          <span><span :style="scope.row.odueFlag | odueFlagColorFilter">{{ scope.row.odueFlag | odueFlagFilter(odueFlagMap) }}</span></span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchCustrBillList } from '@/api/workbench'
// eslint-disable-next-line
import { parseTime,formatMoney } from '@/utils'

export default {
  name: 'CustrBillList',
  filters: {
    odueFlagFilter(status, map) {
      return map ? map[status] || status : status
    },
    odueFlagColorFilter(status) {
      const c = {
        '0': {
          color: 'green'
        },
        '1': {
          color: 'red'
        }
      }
      return c[status] || {}
    },
    moneyFilter(v) {
      return formatMoney(v)
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
      odueFlagMap: {},
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
      fetchCustrBillList(this.listQuery, this.dAcctId).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
        this.odueFlagMap = res.extra ? res.extra['odueFlagCn'] : {}
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
