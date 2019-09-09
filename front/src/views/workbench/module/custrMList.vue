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
          <span>{{ scope.row.acctBillId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="催收类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type | dictFilter(dictInfo['urge_type']) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人员" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operatorCn }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyTime | parseTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<script>
import { fetchCustrMList } from '@/api/workbench'
// eslint-disable-next-line
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'CustrMList',
  filters: {
    dictFilter(status, arr) {
      for (const item of arr) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
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
  computed: {
    ...mapGetters([
      'dictInfo'
    ])
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
    this.$store.dispatch('LoadDicts', {
      keys: ['urge_type']
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchCustrMList(this.listQuery, this.dAcctId).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
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
