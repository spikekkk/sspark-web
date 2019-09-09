import {
  fetchCategoryMgrList,
  updateCategory,
  deleteCategory,
  createCategory
} from '@/api/sub/productMgr'

export default {
  data() {
    return {
      list: null,
      tableData: [
        {
          name: '',
          sortOrder: 50
        }
      ],
      // 分页数
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,

      titleNameChange: '新增分类',

      dialogStatus: 'create',
      dialogFormVisible: false
    }
  },
  mounted() {
    this.getList()
  },

  methods: {
    getList() {
      const queryParams = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1
      }

      fetchCategoryMgrList(queryParams).then(res => {
        if (res.errorCode === 9000) {
          this.list = res.categorys
          //    this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    cancleAddShow() {
      this.dialogFormVisible = false
      this.resettableDatas()
    },

    resettableDatas() {
      this.tableData = {
        name: '',
        sortOrder: ''
      }
    },
    // 新增
    addCategoryInfo() {
      this.resettableDatas()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addCategorySubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          const adddata = {
            name: this.tableData.name,
            // parentId:this.tableData.parentId,
            sortOrder: this.tableData.sortOrder
          }

          createCategory(adddata).then(res => {
            if (res.errorCode === 9000) {
              this.resettableDatas()
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      })
    },

    editCategory(row) {
      this.dialogStatus = 'update'
      this.tableData = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.titleNameChange = '编辑分类'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 编辑
    editCategoryInfo() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.tableData)
          const editdatas = {
            categoryId: tempData.categoryId,
            parentId: tempData.parentId,
            name: tempData.name,
            sortOrder: tempData.sortOrder
          }
          updateCategory(editdatas).then(res => {
            if (res.errorCode === 9000) {
              this.dialogFormVisible = false
              this.resettableDatas()
              this.$message({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      })
    },
    // 删除操作
    deleteCategoryInfo(row) {
      const data = {
        categoryId: row.categoryId
      }
      deleteCategory(data).then(res => {
        if (res.errorCode === 9000) {
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 分页大小选中
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    // 当前页触发
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    }
  }
}
