<template>
  <div class="app-container" @click.self="closePopInfo">
    <div class="filter-container" @click="closePopInfo">
      <el-input v-model="listQuery.queryParams.custrName" placeholder="客户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <custr-info :visible.sync="custrInfoShow" :params="custrInfoParams" />
  </div>
</template>

<script>
import { fetchListOdues } from '@/api/workbench'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import CustrInfo from './module/custrInfo'

export default {
  name: 'CustrTable',
  directives: {
    waves
  },
  components: {
    CustrInfo
  },
  filters: {
    moneyFilter(v) {
      return formatMoney(v)
    },
    flowNodeFilter(v) {
      const c = {
        1: '自动催收',
        2: '人工催收',
        3: '客户经理催收'
      }
      return c[v] || v
    },
    unameFilter(v, m) {
      return m[v]
    }
  },
  data() {
    return {
      tableKey: 'custr',
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        queryParams: {
          custrName: undefined
        }
      },
      custrInfoShow: false,
      custrInfoParams: {},
      unameMap: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchListOdues(this.listQuery).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
        this.unameMap = res.extra ? res.extra['unameMap'] || {} : {}
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
    openPopInfo(row) {
      this.custrInfoShow = true
      this.custrInfoParams = {
        custrId: row.custrId,
        acctId: row.id
      }
    },
    closePopInfo() {
      this.custrInfoShow = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    height:calc(100vh - 84px);
  }
</style>
