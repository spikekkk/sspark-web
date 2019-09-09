<template>
  <div class="app-container" @click.self="closePopInfo">
    <div class="filter-container" @click="closePopInfo">
      <el-input v-model="listQuery.queryParams.custrName" placeholder="客户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="filter-container" @click="closePopInfo">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-phone" @click="transToAutoEx">退回智能催收</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-phone" @click="transToManuEx">退回人工催收</el-button>
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

    <el-dialog :title="form.custrName" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :rules="rules" :model="form" label-position="left" label-width="100px" style="width: 375px; margin-left:25px;">
        <el-form-item label="催收方式" prop="type">
          <el-select v-model="form.type" clearable placeholder="催收方式" style="width:100%;">
            <el-option
              v-for="item in dictInfo['urge_type']"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchMgrCustrsSelf, transToAuto, transToManu, appendMDetail } from '@/api/workbench'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import CustrInfo from './module/custrInfo'
import { mapGetters } from 'vuex'

export default {
  name: 'CustrManuMgr',
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
      custrInfoShow: false,
      custrInfoParams: {},
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        acctId: null,
        custrName: '',
        type: null,
        remark: ''
      },
      rules: {
        type: [{ required: true, message: '不能为空' }]
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
      keys: ['urge_type']
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMgrCustrsSelf(this.listQuery).then(res => {
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
    transToManuEx() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '至少选择一条记录！',
          type: 'error'
        })
        return
      } else {
        this.$confirm('确定要退回到人工催收?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = this.multipleSelection.map(e => e.id)
          transToManu(data).then(res => {
            this.getList()
          })
        })
      }
    },
    handleWork(row) {
      this.form.custrName = row.custrName
      this.form.acctId = row.id
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          appendMDetail(tempData).then(res => {
            this.dialogFormVisible = false
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
        }
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
