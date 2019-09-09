import {
  fetchSpecMgrList,
  createSpec,
  deleteSpec,
  createSpecOptions, // 规格值选项
  deleteSpecsOptions,
  editSpecOptions
} from '@/api/sub/productMgr'

export default {
  data() {
    return {
      form: {
        name: '' // 规格组
      },
      formValue: {
        specValue: '' // 规格值
      },
      groupRule: {
        name: [
          {
            required: true,
            message: '请填写规格组',
            trigger: 'blur'
          }
        ]
      },
      valueRule: {
        specValue: [
          {
            required: true,
            message: '请填写规格值',
            trigger: 'blur'
          }
        ]
      },
      pageIndex: 1, // 当前页
      pageSize: 20, // 当前页显示条数
      totalCount: 0, // 总条数
      tableData: [], // 表格数据
      dialogGroupFormVisible: false, // 新增规格组弹窗显示
      dialogValueFormVisible: false, // 新增规格值弹窗显示
      id: '' // 获取当前行的id
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const querydatas = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1
      }
      fetchSpecMgrList(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.specs
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    /**
     * 编辑tables
     */
    editFunc(index, row) {
      var _this = this
      const tmp = Object.assign({}, row)
      tmp.canEdit = !tmp.canEdit
      this.tableData.splice(index, 1, tmp)
      if (!tmp.canEdit) {
        const optionitems = []
        tmp.options.forEach(element => {
          const data = {
            optionId: element.optionId,
            optionName: element.name
          }
          optionitems.push(data)
        })

        // 修改的规格组信息
        const specitems = {
          specId: tmp.specId,
          specName: tmp.name,
          options: optionitems
        }

        editSpecOptions(specitems).then(res => {
          if (res.errorCode === 9000) {
            _this.$message({
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
        tmp.canEdit = false
      } else {
        tmp.canEdit = true
      }
    },

    /**
     * 新增规格组
     */
    addNewSpecialGroup() {
      this.dialogGroupFormVisible = true
      this.form.name = ''
    },
    /**
     * 规格组创建
     */
    groupSubmit(formValue) {
      this.$refs[formValue].validate(valid => {
        if (valid) {
          this.dialogGroupFormVisible = false
          const tmp = Object.assign({}, this.form)
          const createdatas = {
            specName: tmp.name
          }
          createSpec(createdatas).then(res => {
            if (res.errorCode === 9000) {
              //   this.tableData.push(this.form)
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
        } else {
          return false
        }
      })
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
    /**
     * 规格组取消
     */
    groupCancel(formValue) {
      this.dialogGroupFormVisible = false
      this.$refs.form.resetFields()
    },
    /**
     * 新增规格值按钮
     */
    addNewSpecialValue($index, row) {
      this.dialogValueFormVisible = true
      this.formValue.specValue = ''
      this.id = row.specId
    },
    /**
     * 规格值-----新增
     */
    specValueSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogValueFormVisible = false
          this.dialogGroupFormVisible = false
          const tmp = Object.assign({}, this.formValue)

          const createdatas = {
            optionName: tmp.specValue,
            specId: this.id
          }
          createSpecOptions(createdatas).then(res => {
            if (res.errorCode === 9000) {
              // this.tableData.push(this.formValue)
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
        } else {
          return false
        }
      })
    },
    /**
     * 规格值取消
     */
    valueCancel() {
      this.dialogValueFormVisible = false
      this.$refs.formValue.resetFields()
      this.id = ''
    },

    handleClose(item, row, index) {
      const tmp = Object.assign({}, row)
      if (item.optionId) {
        // 修改的规则值信息
        const optionsitems = {
          optionId: item.optionId,
          specId: row.specId,
          optionName: item.name
        }
        deleteSpecsOptions(optionsitems).then(res => {
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
            tmp.deletoff = true
          }
        })
      }

      if (item.specId) {
        const deleteid = {
          specId: item.specId
        }

        deleteSpec(deleteid).then(res => {
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
            tmp.deletoff = true
          }
        })
      }
    },
    // 规格组&&值----删除
    deleteSpec(index, row) {
      const tmp = Object.assign({}, row)
      tmp.deletoff = !tmp.deletoff
      this.tableData.splice(index, 1, tmp)
    }
  }
}
