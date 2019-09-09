<template>
  <div class="createPost-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="100px"
      class="createPost-main-container">
      <el-form-item
        label="乐园名称"
        prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item
        label="简介"
        prop="info">
        <el-input
          v-model="form.info"
          type="textarea" />
      </el-form-item>
      <el-form-item
        label="地址"
        prop="ssq">
        <el-cascader
          :options="ssqOptions"
          :props="props"
          v-model="form.ssq"
          style="width:100%;" />
      </el-form-item>
      <el-form-item
        label="具体地址"
        prop="addr">
        <el-input v-model="form.addr" />
      </el-form-item>
      <el-form-item
        label="营业时间"
        prop="busihours">
        <el-input v-model="form.busihours" />
      </el-form-item>
      <el-form-item
        label="联系方式"
        prop="contact">
        <el-input v-model="form.contact" />
      </el-form-item>
      <el-form-item
        label="配套设施"
        prop="facility">
        <el-input v-model="form.facility" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit">修改</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { loadOrg, modifyOrg } from '@/api/syscfg'
import { loadArea, loadAreaAll } from '@/api/sys'
import { mapGetters } from 'vuex'

function updateOpt(opts, pids, idx, children) {
  const pid = pids[idx]
  const opt = opts.find(item => {
    return item.id === pid
  })
  if (idx === pids.length - 1) {
    opt.children = children
  } else {
    updateOpt(opt.children, pids, idx + 1, children)
  }
}

export default {
  data() {
    return {
      form: {
        id: undefined,
        name: '',
        info: '',
        ssq: [],
        addr: '',
        busihours: '',
        contact: '',
        facility: ''
      },
      ssqOptions: [],
      props: {
        value: 'id',
        label: 'name'
      },
      rules: {
        name: [{ required: true, message: '名称不能为空' }]
      }
    }
  },
  computed: {
    ...mapGetters(['dictInfo'])
  },
  created() {
    this.loadOrginfo()
    loadAreaAll().then(res => {
      this.ssqOptions = res.results
    })
    // this.loadRootArea()
  },
  methods: {
    loadOrginfo() {
      loadOrg().then(res => {
        this.form = res.data
      })
    },
    loadRootArea() {
      loadArea('1').then(res => {
        this.ssqOptions = res.results
      })
    },
    handleItemChange(val) {
      val = val.filter(e => !!e)
      const pid = val[val.length - 1]
      loadArea(pid).then(res => {
        updateOpt(this.ssqOptions, val, 0, res.results)
      })
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.form)
          modifyOrg(tempData).then(() => {
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
      this.loadOrginfo()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;
  }
}
</style>
