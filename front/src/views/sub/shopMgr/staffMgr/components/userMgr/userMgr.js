import {
  fetchShopMgrList,
  createShopUser,
  updateShopUser,
  deleteShopUser,
  updateShopUserBtn
} from '@/api/sub/shopMgr'
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'

function dictFilter(status, arr) {
  for (const item of arr || []) {
    if (String(item.value) === String(status)) {
      return item.label
    }
  }
  return status
}

export default {
  components: {},
  filters: {
    dictFilter(status, arr, cn) {
      if (cn) {
        return cn
      }
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    },
    dictColorFilter(status, arr) {
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return {
            color: item.color
          }
        }
      }
      return {}
    }
  },
  data() {
    return {
      list: null,
      loading: false,
      listQuery: {
        mobile: ''
      },
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      dialogFormVisible: false,
      labelPosition: 'left',
      addUserFromData: {
        name: '',
        avatar: '',
        mobile: '',
        sex: '',
        age: '',
        email: '',
        companyEmail: '',
        position: '',
        hiredDate: '',
        department: '',
        jobNumber: '',
        remark: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '员工姓名不能为空',
            trigger: 'blur'
          }
        ],
        position: [
          {
            required: true,
            message: '职位不能为空',
            trigger: 'blur'
          }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        age: [
          {
            message: '请输入正确的年龄',
            pattern: /^1?\d?\d$/gi
          }
        ],
        hiredDate: [
          {
            required: true,
            message: '入职时间不能为空',
            trigger: 'blur'
          }
        ],
        department: [
          {
            required: true,
            message: '部门不能为空',
            trigger: 'blur'
          }
        ]
      },
      dialogStatus: 'create',
      currentPage4: 4,
      titleNameChange: '新增人员',
      disabled: Cookies.get('username'),
      currentShopId: Cookies.get('currentShopId'),
      tenantId: Cookies.get('tenantId'),
      changeRoleId: '',
      changeDeptId: ''
    }
  },

  computed: {
    ...mapGetters(['dictInfo', 'dictRoles', 'dictDepts'])
  },
  created() {
    this.getList()
    this.$store.dispatch('LoadDicts', 'sex').then(() => {
      const arr = this.dictInfo['sex']
      if (this.list && this.list.length > 0) {
        this.list = this.list.map(item => {
          item.genderCn = dictFilter(item.gender, arr)
          return item
        })
      }
    })
    this.$store.dispatch('FetchRoleList', {})
    this.$store.dispatch('FetchDeptList', {
      name: ''
    })
  },

  methods: {
    /* 获取员工列表数据 */
    getList() {
      this.loading = true
      const params = {
        mobile: '' || this.listQuery.mobile,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1
      }
      fetchShopMgrList(params).then(res => {
        if (res.errorCode === 9000) {
          this.list = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '列表查询出错了')
        }
        this.loading = false
      })
    },
    /* 改变角色 */
    changeRole(val) {
      this.changeRoleId = val
    },
    /* 改变部门 */
    changeDept(val) {
      this.changeDeptId = val
    },
    /* 搜索事件 */
    handleFilter() {
      const _this = this
      _this.pageIndex = 1
      _this.getList()
    },
    /* 刷新 */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.listQuery = {
        mobile: ''
      }
      this.pageIndex = 1
      this.getList()
    },
    cancleAddShow() {
      this.dialogFormVisible = false
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    /* 新增人员按钮事件 */
    addUserFun() {
      this.dialogStatus = 'create'
      this.titleNameChange = '新增人员'
      this.dialogFormVisible = true
      this.addUserFromData = {}
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 新增人员确定按钮事件
    addUserSureFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            name: this.addUserFromData.name || '',
            sex: this.addUserFromData.sex || '',
            age: this.addUserFromData.age || '',
            hiredDate: this.addUserFromData.hiredDate || '',
            position: this.addUserFromData.position || '',
            mobile: this.addUserFromData.mobile || '',
            email: this.addUserFromData.email || '',
            department: this.addUserFromData.department || ''
          }
          createShopUser(params).then(res => {
            if (res.errorCode === 9000) {
              this.getList()
              this.dialogFormVisible = false
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '添加失败')
            }
          })
        }
      })
    },
    // 编辑人员按钮事件
    editUser(id) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.titleNameChange = '编辑人员'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      const params = {
        id: id,
        currentShopId: this.currentShopId,
        tenantId: this.tenantId
      }
      updateShopUser(params).then(res => {
        if (res.errorCode === 9000) {
          // eslint-disable-next-line
          if (res.age == '0') {
            res.age = ''
          }
          this.addUserFromData = {
            id: id,
            name: res.name,
            avatar: '',
            mobile: res.mobile,
            sex: res.sex,
            age: res.age,
            email: res.email,
            companyEmail: '',
            position: res.position,
            hiredDate: res.hiredDate,
            department: res.department,
            jobNumber: '',
            remark: '',
            roleId: res.roleId,
            deptId: res.deptId
          }
        } else {
          this.$message.error(res.errorMessage || '编辑信息失败')
        }
      })
    },
    // 确定编辑人员按钮事件
    editUserInfo(forName) {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            id: this.addUserFromData.id,
            name: this.addUserFromData.name,
            avatar: '',
            mobile: this.addUserFromData.mobile,
            sex: this.addUserFromData.sex,
            age: this.addUserFromData.age,
            email: this.addUserFromData.email,
            companyEmail: '',
            position: this.changeRoleId || this.addUserFromData.roleId,
            hiredDate: this.addUserFromData.hiredDate,
            department: this.changeDeptId || this.addUserFromData.deptId,
            jobNumber: '',
            remark: ''
          }
          updateShopUserBtn(params).then(res => {
            if (res.errorCode === 9000) {
              this.dialogFormVisible = false
              this.getList()
              this.$message({
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '更新失败')
            }
          })
        }
      })
    },
    // 删除人员事件
    deleteUserInfo(id) {
      const params = {
        ids: id
      }
      deleteShopUser(params).then(res => {
        if (res.errorCode === 9000) {
          this.getList()
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '删除失败')
        }
      })
    }
  }
}
