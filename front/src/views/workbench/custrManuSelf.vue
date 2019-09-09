<template>
  <div class="app-container" @click.self="closePopInfo">
    <div class="filter-container" @click="closePopInfo">
      <el-input v-model="listQuery.queryParams.custrName" placeholder="客户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="filter-container" @click="closePopInfo">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-phone" @click="exportToManu">转给他人</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-phone" @click="transToAutoEx">退回智能催收</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column label="客户号" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.custrId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" min-width="100px">
        <template slot-scope="scope">
          <span class="link-type" @click.stop="openPopInfo(scope.row)">{{ scope.row.custrName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.acctNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡号" width="150px" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.cardNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本期账单" align="right" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.lastBalAmount | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逾期金额" align="right" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.lastOdueAmount | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="逾期金额" align="right" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.lastPayment | moneyFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电催次数" align="right" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.mcTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleWork(scope.row)">催收</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <custr-info :visible.sync="custrInfoShow" :params="custrInfoParams" />

    <el-dialog :visible.sync="uDialogFormVisible" title="请选择用户" width="30%">
      <el-form ref="form" :model="form" :rules="rules" >
        <el-form-item label="用户" label-width="80px" prop="transUser">
          <el-select v-model="form.transUser" clearable placeholder="请选择用户" style="width:80%">
            <el-option v-for="item in dictUsers" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantCustr">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchManuCallCustrsSelf, grantToManu, grantToMgr, transToAuto } from '@/api/workbench'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import CustrInfo from './module/custrInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'CustrManuSelf',
  directives: {
    waves
  },
  components: {
    CustrInfo
  },
  filters: {
    moneyFilter(v) {
      return formatMoney(v)
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
      form: {
        transUser: null
      },
      rules: {
        transUser: [{ required: true, message: '不能为空' }]
      },
      transType: 1,
      uDialogFormVisible: false,
      custrInfoShow: false,
      custrInfoParams: {},
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['dictUsers'])
  },
  created() {
    this.getList()
    this.$store.dispatch('LoadUsers')
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchManuCallCustrsSelf(this.listQuery).then(res => {
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
    openPopInfo(row) {
      this.custrInfoShow = true
      this.custrInfoParams = {
        custrId: row.custrId,
        acctId: row.id
      }
    },
    closePopInfo() {
      this.custrInfoShow = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    exportToManu() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '至少选择一条记录！',
          type: 'error'
        })
        return
      } else {
        this.$confirm('确定要转给他人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.transUser = null
          this.transType = 1
          this.uDialogFormVisible = true
        })
      }
    },
    grantCustr() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const data = {
            operator: this.form.transUser,
            acctIds: this.multipleSelection.map(e => e.id)
          }
          let fn
          if (this.transType === 1) {
            fn = grantToManu
          } else {
            fn = grantToMgr
          }
          fn(data).then((res) => {
            this.uDialogFormVisible = false
            this.getList()
          })
        }
      })
    },
    transToAutoEx() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '至少选择一条记录！',
          type: 'error'
        })
        return
      } else {
        this.$confirm('确定要退回到智能催收?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = this.multipleSelection.map(e => e.id)
          transToAuto(data).then(res => {
            this.getList()
          })
        })
      }
    },
    handleWork() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-container {
    height:calc(100vh - 84px);
  }
</style>
