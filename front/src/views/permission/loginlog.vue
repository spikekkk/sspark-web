<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.queryParams.uname" placeholder="工号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
      <el-table-column label="工号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录IP" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.loginIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录时间" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginTime | timeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次登录IP" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.lastLoginIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="登录状态" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.loginStatus | loginStatusColorFilter">{{ scope.row.loginStatus | dictFilter(dictInfo['login_status']) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

  </div>
</template>

<script>
import { fetchUserLoginList } from '@/api/permission'
import waves from '@/directive/waves' // 水波纹指令
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  directives: {
    waves
  },
  components: {
  },
  filters: {
    timeFormat(v) {
      return parseTime(v)
    },
    dictFilter(status, arr) {
      for (const item of arr) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    },
    loginStatusColorFilter(status) {
      const c = {
        '0': {
          color: 'gray'
        },
        '1': {
          color: 'green'
        }
      }
      return c[status] || {}
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        queryParams: {
          uname: undefined
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'dictInfo'
    ])
  },
  created() {
    this.getList()
    this.$store.dispatch('LoadDicts', {
      keys: ['login_status']
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserLoginList(this.listQuery).then(res => {
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    height:calc(100vh - 84px);
  }
</style>
