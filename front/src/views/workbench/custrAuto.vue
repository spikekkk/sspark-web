<template>
  <div class="app-container" @click.self="closePopInfo">
    <div class="filter-container" @click="closePopInfo">
      <el-input v-model="listQuery.queryParams.custrName" placeholder="客户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <div class="filter-container" @click="closePopInfo">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-circle-plus-outline" @click="createAutoTask">新增智能任务</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-phone" @click="transToManuEx">转成人工催收</el-button>
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
          <span>{{ scope.row.acTimes }}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <custr-info :visible.sync="custrInfoShow" :params="custrInfoParams" />

    <el-dialog :visible.sync="uDialogFormVisible" title="智能任务">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            align="right"/>
        </el-form-item>
        <el-form-item label="任务描述" prop="remark">
          <el-input v-model="form.remark" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchAutoCallCustrs, transToManu, createTask } from '@/api/workbench'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import CustrInfo from './module/custrInfo'

export default {
  name: 'CustrAuto',
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
        name: '',
        startTime: null,
        remark: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空!' }],
        startTime: [{ required: true, message: '不能为空!' }]
      },
      custrInfoShow: false,
      custrInfoParams: {},
      multipleSelection: [],
      uDialogFormVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchAutoCallCustrs(this.listQuery).then(res => {
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
    createAutoTask() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: '至少选择一条记录！',
          type: 'error'
        })
        return
      }
      this.uDialogFormVisible = true
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
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          tempData['acctIds'] = this.multipleSelection.map(e => e.id)
          createTask(tempData).then(() => {
            this.$message({
              showClose: true,
              message: '创建成功',
              type: 'success'
            })
            this.uDialogFormVisible = false
            this.$router.push({ path: '/workbanch/wbDueAutoTask' })
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
