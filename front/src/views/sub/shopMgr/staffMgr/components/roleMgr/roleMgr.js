import {
  fetchRoleList,
  createAddRole,
  fetchRoleMenuList,
  updateRoleName,
  deleteRoleName,
  saveRoleMenus,
  copyRoleList
} from '@/api/sub/shopMgr'

import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      roleList: [],
      roleMenuList: [],
      defaultProps: {
        label: 'name',
        children: 'menus'
      },
      checkedIds: [],
      rowName: '',
      menuIds: [],
      addFormData: {
        name: '',
        sortOrder: ''
      },
      showAddRoleName: false,
      dialogStatus: 'create',
      titleNameChange: '新增角色名称',
      rules: {
        name: [{ required: true, message: '角色名称不能为空' }]
      },
      menusCheckedId: []
    }
  },

  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },

  created() {
    this.$store.dispatch('LoadDicts', 'user_system_type')
    this.getRoleList()
    this.getRoleMenuList()
  },
  methods: {
    /* 获取角色列表 */
    getRoleList() {
      const params = {
        name: ''
      }
      this.loading = true
      fetchRoleList(params).then(res => {
        if (res.errorCode === 9000) {
          this.roleList = res.results
        } else {
          this.$message.error('列表查询出错了' || res.errorMessage)
        }
        this.loading = false
      })
    },
    /* 获取权限菜单列表 */
    getRoleMenuList() {
      fetchRoleMenuList().then(res => {
        if (res.errorCode === 9000) {
          // this.roleMenuList = res.results
          const temp = Object.assign([], res.results)
          // const treeData = [
          //   { name: '门店菜单', menus: [] },
          //   { name: '收银台菜单', menus: [] }
          // ]
          var treeId = []
          this.dictInfo['user_system_type'].forEach((item, i) => {
            const data = {
              name: item.label,
              menus: [],
              id: item.value
            }
            treeId.push(data)
          })

          temp.forEach((v, i) => {
            treeId.forEach((a, ii) => {
              if (v.systemType === a.id) {
                treeId[ii].menus.push(v)
              }
            })
          })

          treeId.forEach((el, index) => {
            // eslint-disable-next-line
            if (el.menus.length == 0) {
              treeId.splice(index, 1)
            }
            delete treeId[index]['id']
          })

          this.roleMenuList = treeId
        } else {
          this.$message.error('列表查询出错了' || res.errorMessage)
        }
      })
    },
    /* 查看角色详情 */
    showRoleMenus(row) {
      this.$refs.tree.setCheckedKeys([])
      this.id = row.id
      this.rowName = row.name
      this.menuIds = row.menuIds
      if (this.menuIds.length > 0) {
        this.checkedIds = this.menuIds
        var me = this
        this.checkedIds.forEach(element => {
          me.$refs.tree.setChecked(element, true, false)
        })
      }
    },
    /* 新增角色 */
    addRoleFun() {
      this.addFormData = {
        name: '',
        sortOrder: ''
      }
      this.showAddRoleName = !this.showAddRoleName
      this.titleNameChange = '新增角色名称'
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /* 取消新增 */
    cancleAddRole() {
      this.showAddRoleName = false
    },
    /* 确定添加角色 */
    addRoleSureFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createAddRole(this.addFormData).then(res => {
            if (res.errorCode === 9000) {
              this.showAddRoleName = false
              this.getRoleList()
            } else {
              this.$message.error(res.errorMessage || '添加失败')
            }
          })
        }
      })
    },
    /* 复制角色 */
    copyRoleBtn(item) {
      const params = {
        id: item.id
      }
      copyRoleList(params).then(res => {
        if (res.errorCode === 9000) {
          this.getRoleList()
        } else {
          this.$message.error(res.errorMessage || '复制角色出错啦')
        }
      })
    },
    /* 编辑角色 */
    editRoleName(row) {
      this.dialogStatus = 'updtate'
      this.titleNameChange = '编辑角色名称'
      this.showAddRoleName = !this.showAddRoleName
      this.addFormData = {
        id: row.id,
        name: row.name,
        sortOrder: ''
      }
    },
    /* 确定编辑角色 */
    editRoleSureFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateRoleName(this.addFormData).then(res => {
            if (res.errorCode === 9000) {
              this.showAddRoleName = false
              this.getRoleList()
              this.$message({
                message: '角色名称更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '角色名称更新失败')
            }
          })
        }
      })
    },
    /* 删除角色名称 */
    deleteRoleNameBtn(item) {
      const params = {
        ids: item.id
      }
      deleteRoleName(params).then(res => {
        if (res.errorCode === 9000) {
          this.getRoleList()
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '删除成功')
        }
      })
    },
    /* 保存菜单权限 */
    bindRoleMenus() {
      const menuArray = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
      // let menusObj = {}

      this.menusCheckedId = []

      const newTreeId = menuArray.filter(item => item)

      newTreeId.forEach((i, index) => {
        let menusObj = {}

        menusObj = {
          menuId: i
        }

        this.menusCheckedId.push(menusObj)
      })
      const params = {
        roleId: this.id,
        menus: JSON.stringify(this.menusCheckedId)
      }
      saveRoleMenus(params).then(res => {
        if (res.errorCode === 9000) {
          this.getRoleList()
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.errorMessage || '保存失败')
        }
      })
    }
  }
}
