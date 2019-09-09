import {
  queryHqDepartment,
  createAddDept,
  updateAddDept,
  updateAddDeptBtn
} from '@/api/hq/shopMgr'

export default {
  filters: {},
  data() {
    return {
      labelPosition: 'left',
      showAddPage: false,
      currentPage4: 4,
      deptList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      listQuery: {
        name: ''
      },
      deptTemplt: {
        name: '',
        // parentName:'',
        sortOrder: ''
      },
      dialogStatus: 'create',
      rules: {
        name: [
          {
            required: true,
            message: '部门名称不能为空'
          }
        ]
      },
      titleNameChange: '新增部门'
    }
  },

  computed: {},
  created() {
    this.getDeptList()
  },
  methods: {
    /* 部门列表 */
    getDeptList() {
      const params = {
        name: '' || this.listQuery.name
        // pageSize: this.pageSize,
        // pageIndex: this.pageIndex - 1
      }
      this.loading = true
      queryHqDepartment(params).then(res => {
        if (res.errorCode === 9000) {
          this.deptList = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error('列表查询出错了' || res.errorMessage)
        }
        this.loading = false
      })
    },
    /* 搜索 */
    handleFilter() {
      const _this = this
      _this.pageIndex = 1
      _this.getDeptList()
    },
    /* 刷新 */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.listQuery = {
        name: ''
      }
      this.pageIndex = 1
      this.getDeptList()
    },
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getDeptList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getDeptList()
    },
    /* 新增部门弹框 */
    addDeptFun() {
      this.dialogStatus = 'create'
      this.titleNameChange = '新增部门'
      this.showAddPage = true
      this.deptTemplt = {
        name: '',
        parentId: '',
        sortOrder: ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /* 取消关闭弹框 */
    cancleAddShow() {
      this.showAddPage = false
    },
    /* 确定新增部门按钮 */
    addDeptSureFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createAddDept(this.deptTemplt).then(res => {
            if (res.errorCode === 9000) {
              this.showAddPage = false
              this.getDeptList()
              this.$message({
                message: '部门添加成功',
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
    /* 编辑部门弹框 */
    editDeptFun(id) {
      this.dialogStatus = 'updtate'
      this.showAddPage = true
      this.titleNameChange = '编辑部门'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      const params = {
        id: id
      }
      updateAddDept(params).then(res => {
        if (res.errorCode === 9000) {
          this.deptTemplt = {
            id: id,
            name: res.name,

            sortOrder: ''
          }
        } else {
          this.$message.error(res.errorMessage || '查询部门信息失败')
        }
      })
    },
    /* 确定编辑部门信息 */
    editDeptInfo() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateAddDeptBtn(this.deptTemplt).then(res => {
            if (res.errorCode === 9000) {
              this.showAddPage = false
              this.getDeptList()
              this.$message({
                message: '部门更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '编辑部门信息失败')
            }
          })
        }
      })
    }
  }
}
