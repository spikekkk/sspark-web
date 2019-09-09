import {
  createTicket, // 创建门票
  updateTicket, // 编辑门票
  queryTicket // 查询当前门票详情
} from '@/api/sub/productMgr'

import { mapGetters } from 'vuex'

function dictFilter(status, arr) {
  for (const item of arr || []) {
    if (String(item.value) === String(status)) {
      return item.label
    }
  }
  return status
}

export default {
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
    }
  },
  props: {
    opendialog: {
      type: Boolean,
      required: true
    }

    // editdatas: { type: Array, required: true }
  },

  data() {
    return {
      // dialog打开关闭
      dialogTitles: '',
      // 表单消息
      ruleForm: {
        name: '', // 门票名称
        price: '', // 售价
        oriPrice: '', // 原价
        channels: [], // 销售渠道
        sortOrder: '', // 排序值
        saleStatus: '1', // 是否上架
        validPeriod: '', // 购买之后有效天数
        buyNotice: '', // 购买须知
        useNotice: '', // 使用须知
        refundNotice: '', // 退款须知
        childNum: '', // 儿童
        adultNum: '', // 成人
        cover: '' // 上传呢照片
      },

      // 规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入门票名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 56,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        oriPrice: [
          {
            required: true,
            message: '请输入原价'
          },
          {
            type: 'number',
            message: '价格必须为数字'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '价格不允许小于零'
          }
        ],
        price: [
          {
            required: true,
            message: '请输入售卖价格'
          },
          {
            type: 'number',
            message: '价格必须为数字'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '价格不允许小于零'
          }
        ],
        cover: [
          {
            required: true,
            message: '请上传封面图'
          }
        ],
        validPeriod: [
          {
            required: true,
            message: '请输入有效天数',
            trigger: 'change'
          },
          {
            type: 'number',
            message: '必须为数字'
          },
          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '有效天数不允许小于零'
          }
        ],

        saleStatus: [
          {
            required: true,
            message: '请选中上下架状态'
          }
        ],
        channels: [
          {
            required: true,
            message: '请选择售卖渠道',
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },
  // 获取商品页面传来的数据
  mounted() {
    this.$store.dispatch('LoadDicts', 'goods_spu_status,channel').then(() => {
      const arr = this.dictInfo['goods_spu_status']
      if (this.list && this.list.length > 0) {
        this.list = this.list.map(item => {
          item.genderCn = dictFilter(item.gender, arr)
          return item
        })
      }
    })
  },

  beforeUpdate() {
    this.dialogTitles = this.$parent.addDialogTitle
  },

  methods: {
    sendDate() {
      const queryData = {
        spuId: this.$parent.editDatas.id
      }

      queryTicket(queryData).then(res => {
        if (res.errorCode === 9000) {
          this.ruleForm = res
          this.ruleForm.channels = res.channels.split(',')
          this.ruleForm.saleStatus = res.saleStatus.toString()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 选择ota
    choiceOta(val) {
      if (val.includes('9')) {
        this.ruleForm.channels = ['9']
      }
    },

    // 发送给父组件
    request() {
      this.$emit('closeDialog', false)
      this.$emit('clearCheckbox', [])
      this.$emit('refresh')
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.sucess) {
        this.ruleForm.cover = res.data.url
        this.$refs.upload.clearValidate()
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 表单提交
    submitForm() {
      this.$refs['ruleForms'].validate(valid => {
        if (valid) {
          if (this.dialogTitles === '新增门票') {
            // eslint-disable-next-line
            if (this.ruleForm.adultNum == 0 && this.ruleForm.childNum == 0) {
              this.$message({
                title: '警告',
                message: '使用人数不得为零！',
                type: 'warning',
                duration: 1000
              })
            } else {
              const tmp = Object.assign(this.ruleForm.channels.toString())
              this.ruleForm.channels = tmp

              createTicket(this.ruleForm).then(res => {
                if (res.errorCode === 9000) {
                  this.$message({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                  })

                  this.resetForm()
                } else {
                  this.ruleForm.channels = []
                  this.$message.error(res.errorMessage)
                }
              })
            }
          } else if (this.dialogTitles === '编辑门票') {
            const tmp = Object.assign(this.ruleForm.channels.toString())
            this.ruleForm.channels = tmp
            updateTicket(this.ruleForm).then(res => {
              if (res.errorCode === 9000) {
                this.$message({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })

                this.resetForm()
              } else {
                this.ruleForm.channels = []
                this.$message.error(res.errorMessage)
              }
            })
          }
        } else {
          this.$message.error('提交错误！！！')
          return false
        }
      })
    },

    // 表单取消
    resetForm() {
      this.$refs.ruleForms.resetFields()

      this.request()
    }
  }
}
