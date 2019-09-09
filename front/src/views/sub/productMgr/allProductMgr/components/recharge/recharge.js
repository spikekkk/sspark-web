import {
  storedPkgCreate, // 创建充值
  storedPkgUpdate, // 编辑门票
  storedPkgQuery, // 查询当前门票详情
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
      value6: '',
      startDatePicker: this.beginDate(),
      optionsChannels: null,
      // 表单消息
      ruleForm: {
        donationAmount: '', // 赠送金额
        name: '', // 门票名称
        price: '', // 售价
        rechargeAmount: '', // 充值金额
        ticketId: '', // 赠送门票
        saleStatus: '1', // 是否上架
        date: [] // 销售有效期
      },

      // 规则
      rules: {
        name: [
          {
            required: true,
            message: '请输入套餐名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 56,
            message: '长度在 3 到 56 个字符',
            trigger: 'blur'
          }
        ],
        rechargeAmount: [
          {
            required: true,
            message: '请输入充值金额',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '价格必须为数字'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '金额不允许小于零'
          }
        ],
        donationAmount: [
          {
            required: true,
            message: '请输入赠送金额',
            trigger: 'blur'
          },
          {
            type: 'number',
            message: '金额必须为数字'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '金额不允许小于零'
          }
        ],
        date: [
          {
            required: true,
            message: '请选择销售有效期',
            trigger: 'change'
          }
        ],

        saleStatus: [
          {
            required: true,
            message: '请选中上下架状态'
          }
        ]
        // ticketId: [
        //   {
        //     required: true,
        //     message: '请选择赠送门票',
        //     trigger: 'change'
        //   }
        // ]
      }
    }
  },
  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },
  // 获取商品页面传来的数据
  mounted() {
    this.getTicketInShop()
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
    beginDate() {
      return {
        disabledDate(time) {
          return time.getTime() <= Date.now() - 8.64e7 // 开始时间不选时，结束时间最大值小于等于当天
        }
      }
    },

    sendDate() {
      const queryData = {
        spuId: this.$parent.editDatas.id
      }
      this.getTicketInShop()
      storedPkgQuery(queryData).then(res => {
        if (res.errorCode === 9000) {
          this.$nextTick(() => {
            this.ruleForm.name = res.name
            this.ruleForm.rechargeAmount = res.rechargeAmount
            this.ruleForm.donationAmount = res.donationAmount
            if (res.gifts) {
              this.ruleForm.ticketId = res.gifts[0].giftId
            } else {
              this.ruleForm.ticketId = ''
            }
            this.ruleForm.spuId = res.spuId
            this.ruleForm.date = Object.assign([], [res.startTime, res.endTime])
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

    // 发送给父组件
    request() {
      this.$emit('closeDialog', false)
      this.$emit('clearCheckbox', [])
      this.$emit('refresh')
      this.optionsChannels = null
    },

    // 表单提交
    submitForm() {
      var that = this
      this.$refs['ruleForms'].validate(valid => {
        if (valid) {
          const data = {
            name: this.ruleForm.name,
            rechargeAmount: this.ruleForm.rechargeAmount,
            donationAmount: this.ruleForm.donationAmount,
            startTime: this.ruleForm.date[0],
            endTime: this.ruleForm.date[1],
            saleStatus: this.ruleForm.saleStatus
          }

          if (this.ruleForm.ticketId) {
            data.gifts = [{ giftId: this.ruleForm.ticketId, giftQuantity: '1' }]
          }
          // eslint-disable-next-line
          if (this.dialogTitles == '充值套餐') {
            storedPkgCreate(data).then(res => {
              if (res.errorCode === 9000) {
                this.$message.success(res.errorMessage)
                that.resetForm()
              } else {
                this.$message.error(res.errorMessage)
              }
            })
            // eslint-disable-next-line
          } else if (this.dialogTitles == '编辑套餐') {
            data.spuId = this.ruleForm.spuId
            storedPkgUpdate(data).then(res => {
              if (res.errorCode === 9000) {
                this.$message({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })

                that.resetForm()
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
    resetForm() {
      this.$refs.ruleForms.resetFields()
      this.request()
    }
  }
}
