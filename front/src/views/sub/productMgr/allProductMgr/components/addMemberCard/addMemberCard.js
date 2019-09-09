import {
  queryCard, // 二次查询
  updateCard, // 编辑
  createCard, // 新增
  queryTicketInShop // 获取当前门票类型
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
    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      // select---销售渠道条件框
      optionsChannels: null,
      // dialog打开关闭
      dialogTableVisible: false,
      dialogFormVisible: true,
      dialogTitles: '',
      // 表单消息
      ruleForm: {
        name: '', // 名称
        ticketId: '', // 票种
        cardType: '', // 会员卡类型
        intervalCardType: null, // 时段卡选项
        times: '', // 次数卡选项
        cover: '', // 图片
        cardGiveType: 0, // 是否增票
        giveTimes: null, // 赠送次数
        oriPrice: '', // 原价
        price: '', // 售价
        channels: [], // 销售渠道

        validPeriod: '', // 有效天数
        saleStatus: '1', // 是否上架

        useNotice: '', // 使用须知
        buyNotice: '', // 购买须知
        refundNotice: '' // 退款须知
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
        intervalCardType: [
          {
            required: true,
            message: '请输入自定义天数'
          }
        ],
        ticketId: [
          {
            required: true,
            message: '请选择票种'
          }
        ],
        cardGiveType: [
          {
            required: true,
            message: '请选择是否增票'
          }
        ],
        cover: [
          {
            required: true,
            message: '请上传封面图'
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

        validPeriod: [
          {
            required: true,
            message: '请输入有效天数',
            trigger: 'change'
          },

          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '有效期不允许小于零'
          },

          {
            type: 'number',
            message: '必须为数字'
          }
        ],
        giveTimes: [
          {
            required: true,
            message: '请输入赠送次数',
            trigger: 'change'
          },

          {
            pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '赠送次数不允许小于零'
          },

          {
            type: 'number',
            message: '必须为数字'
          }
        ],
        cardType: [
          {
            required: true,

            message: '请选择类型',

            trigger: 'change'
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

  beforeUpdate() {
    this.dialogTitles = this.$parent.addDialogTitle
  },

  // 获取商品页面传来的数据
  mounted() {
    this.getTicketInShop()
    this.$store
      .dispatch(
        'LoadDicts',
        'channel,card_type,interval_card_type,card_give_type,goods_spu_status'
      )
      .then(() => {
        const arr = this.dictInfo['channel']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
  },

  // 获取商品页面传来的数据
  methods: {
    // 获取页面传来的信息
    sendDate() {
      const querydata = {
        spuId: this.$parent.editDatas.id
      }

      queryCard(querydata).then(res => {
        if (res.errorCode === 9000) {
          this.$nextTick(() => {
            this.ruleForm = res
            this.ruleForm.channels = res.channels.split(',')
            this.ruleForm.saleStatus = res.saleStatus.toString()
          })
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 获取当前门票类型
    getTicketInShop() {
      queryTicketInShop().then(res => {
        this.optionsChannels = res.tickets
      })
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

    request() {
      this.$emit('closeDialog', false)
      this.$emit('clearCheckbox', [])
      this.$emit('refresh')
      this.optionsChannels = null
    },

    addCard() {
      this.$emit('addCard', this.tableData)
    },

    handleClose() {
      this.restForm('ruleForm')
    },
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTitles === '新增会员卡') {
            const tmp = Object.assign(this.ruleForm.channels.toString())
            this.ruleForm.channels = tmp
            // this.ruleForm.channels = this.ruleForm.channels.toString()
            createCard(this.ruleForm).then(res => {
              if (res.errorCode === 9000) {
                this.$message({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })

                this.restForm(formName)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          } else if (this.dialogTitles === '编辑会员卡') {
            const tmp = Object.assign(this.ruleForm.channels.toString())
            this.ruleForm.channels = tmp
            updateCard(this.ruleForm).then(res => {
              if (res.errorCode === 9000) {
                this.$message({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })

                this.restForm(formName)
              } else {
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
    restForm(refname) {
      this.$refs[refname].resetFields()
      this.request()
    }
  }
}
