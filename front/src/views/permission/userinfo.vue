<template>
  <div class="createPost-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="createPost-main-container">
      <el-form-item label="工号" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="岗位" prop="duty">
        <el-input v-model="form.duty" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="form.gender" label="1">男</el-radio>
        <el-radio v-model="form.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getBaseinfo, modifyUser } from '@/api/permission'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      form: {
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
        duty: ''
      },
      rules: {
        name: [{ required: true, message: '工号不能为空' }],
        nickname: [{ required: true, message: '姓名不能为空' }],
        age: [{ message: '请输入正确的年龄', pattern: /^1?\d?\d$/gi }],
        email: [{ type: 'email', message: '必须为邮件格式' }]
      }
    }
  },
  computed: {
    ...mapGetters(['dictInfo'])
  },
  created() {
    this.loadUserinfo()
    this.$store.dispatch('LoadDicts', {
      keys: ['user_status']
    })
  },
  methods: {
    loadUserinfo() {
      getBaseinfo().then(res => {
        this.form = res.data
      })
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          modifyUser(tempData).then(() => {
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
    onReset() {
      this.loadUserinfo()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
}
</style>
