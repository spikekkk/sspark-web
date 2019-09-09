import {
  fetchPersonList,
  updatePersonFun
} from '@/api/sub/storeSetting'
// import Cookies from 'js-cookie'

export default {
  data() {
    return {
      personList: {},
      loading: false,
      editUserName: false,
      labelPosition: 'left',
      rules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        },
        {
          pattern: /^([\x00-\xff]){6,16}$/g,
          message: '请输入6-16位字母数字下划线特殊字符的组合'
        }
        ]
      },
      personTmplet: {
        name: ''
      }
    }
  },
  created() {
    this.getPersonList()
  },
  methods: {
    /* 获取登陆用户人信息 */
    getPersonList() {
      const params = {
        name: '',
        mobile: ''
      }
      this.loading = true
      fetchPersonList(params).then(res => {
        if (res.errorCode === 9000) {
          this.personList = res
        } else {
          this.$message.error(res.errorMessage || '获取用户信息失败')
        }
        this.loading = false
      })
    },
    /* 修改用户名 */
    updateNameFun(row) {
      this.editUserName = !this.editUserName
      this.personTmplet = Object.assign({}, row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /* 取消修改用户名弹框 */
    cancleUpdateName() {
      this.editUserName = false
    },
    /* 确定修改用户名 */
    updatePerInfoFun() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const params = {
            loginName: this.personTmplet.name
          }
          updatePersonFun(params).then(res => {
            if (res.errorCode === 9000) {
              this.editUserName = false
              this.getPersonList()
              // Cookies.remove('username')
              // Cookies.set('username', this.personTmplet.name)
              this.$message({
                message: '用户名修改成功',
                type: 'success',
                duration: 2000
              })
              location.reload()
            } else {
              this.$message.error(res.errorMessage || '修改用户名失败')
            }
          })
        }
      })
    }
  }
}
