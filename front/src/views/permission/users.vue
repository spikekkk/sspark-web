<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.queryParams.uname" placeholder="工号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.queryParams.nickname" placeholder="用户姓名" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.queryParams.roleId" clearable placeholder="用户角色" class="filter-item">
        <el-option
          v-for="item in roleArr"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-select v-model="listQuery.queryParams.deptId" clearable placeholder="所属部门" class="filter-item">
        <el-option
          v-for="item in deptArr"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增</el-button>
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
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <span class="link-type">{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.deptId | deptFilter(deptArr) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色" align="right" >
        <template slot-scope="scope">
          <span>{{ scope.row.roleId | roleFilter(roleArr) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="岗位" align="right">
        <template slot-scope="scope">
          <span>{{ scope.row.duty }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span :style="scope.row.userStatus | userStatusColorFilter">{{ scope.row.userStatus | userStatusFilter(uStatusMap) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="工号" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="temp.nickname"/>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select v-model="temp.deptId" clearable placeholder="所属部门" >
            <el-option
              v-for="item in deptArr"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="temp.roleId" clearable placeholder="用户角色">
            <el-option
              v-for="item in roleArr"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="duty">
          <el-input v-model="temp.duty"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="temp.gender" label="1">男</el-radio>
          <el-radio v-model="temp.gender" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="temp.age"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="状态" prop="userStatus">
          <el-radio v-for="item in dictInfo['user_status']" v-model="temp.userStatus" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">新增</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createUser, updateUser, deleteUser, fetchUserList } from '@/api/user'
import waves from '@/directive/waves' // 水波纹指令
import { formatMoney } from '@/utils'
import { mapGetters } from 'vuex'

function objToArr(obj) {
  const arr = []
  for (const k in obj) {
    arr.push({ value: k, label: obj[k] })
  }
  return arr
}

function cnByArr(en, arr) {
  for (const item of arr) {
    if (String(item.value) === String(en)) {
      return item.label
    }
  }
  return en
}

export default {
  name: 'UserList',
  directives: {
    waves
  },
  components: {
  },
  filters: {
    moneyFilter(v) {
      return formatMoney(v)
    },
    userStatusFilter(status, map) {
      return map ? map[status] || status : status
    },
    userStatusColorFilter(status) {
      const c = {
        '0': {
          color: 'red'
        },
        '1': {
          color: 'green'
        }
      }
      return c[status] || {}
    },
    deptFilter(deptId, deptArr) {
      return cnByArr(deptId, deptArr)
    },
    roleFilter(roleId, roleArr) {
      return cnByArr(roleId, roleArr)
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
          custrName: undefined
        }
      },
      custrInfoShow: false,
      custrInfoParams: {},
      roleArr: [],
      deptArr: [],
      uStatusMap: {},
      temp: {
        id: undefined,
        name: '',
        nickname: '',
        gender: '1',
        age: 0,
        phone: '',
        deptId: undefined,
        roleId: undefined,
        email: '',
        headimg: '',
        duty: '',
        userStatus: ''
      },
      rules: {
        name: [{ required: true, message: '工号不能为空' }],
        nickname: [{ required: true, message: '姓名不能为空' }],
        deptId: [{ required: true, message: '部门不能为空' }],
        roleId: [{ required: true, message: '角色不能为空' }],
        age: [{ message: '请输入正确的年龄', pattern: /^1?\d?\d$/gi }],
        email: [{ type: 'email', message: '必须为邮件格式' }]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
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
      keys: ['user_status']
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(res => {
        this.list = res.results
        this.total = res.data.resultCount
        const extra = res.extra || {}
        const roleMap = extra['roleMap'] || {}
        const deptMap = extra['deptMap'] || {}
        this.roleArr = objToArr(roleMap)
        this.deptArr = objToArr(deptMap)
        this.uStatusMap = extra['uStatusMap'] || {}
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
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        nickname: '',
        gender: '1',
        age: 0,
        phone: '',
        deptId: undefined,
        roleId: undefined,
        email: '',
        headimg: '',
        duty: '',
        userStatus: '1'
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.roleId = String(row.roleId)
      this.temp.deptId = String(row.deptId)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteUser(row.id).then(() => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
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
