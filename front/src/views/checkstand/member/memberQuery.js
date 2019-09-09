import {
  fetchPhoneUserList,
  createUser,
  updateUser,
  fetchIdUserList,
  writeoffUser,
  presentTicket,
  userCeaseCustomerCard,
  userOpenCustomerCard,
  recallExchange
} from '@/api/checkstand/userquery'
import { getCancelPrintQueryList } from '@/api/checkstand/order'

import { sendMessageCode, checkMessageCode } from '@/api/sub/storeSetting'

import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { printCancelData } from '../../../utils/print'

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
  data() {
    return {
      placehoder: '请输入',
      ticketDialog: false,
      ticketDialogTitle: '',
      switchCustomerCard: '',
      phoneDialog: false,
      dialogVisible: false,
      phoneNum: '',
      confirmPresentTickets: false,
      storeCardData: '',

      userNav: {
        sex: '',
        mobile: '',
        childs: [
          {
            name: '',
            sex: '',
            birthday: ''
          }
        ]
      },

      userDatas: '', // user信息

      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 56,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],

        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ]
      },
      // 编辑手机信息
      editPhone: '',
      phoneCode: '',
      oldCode: '',

      dialogStatus: 'create',
      titleNameChange: '会员注册',

      surPlusTimes: '', // 剩余次数
      exchange: 0, // 兑票
      present: 0, // 赠票
      turnoff: false, // 开关兑票

      exchangeNum: 1,
      maxnum: 10, // 会员卡兑换最大次数
      maxPresentTimes: '', // 赠票最大次数

      cardId: '',

      cardType: '',
      verifyId: '', // 核销记录ids
      confirmEdit: true, // 确认修改手机
      // showIcon: false
      childList: [], // 孩子信息列表,
      phoneVerificationVal: false,
      count: '', // 短信倒计时
      isShow: true,
      valicode: '',
      timesNum: 1,
      verifyTimes: 1,
      itemCardId: ''
    }
  },
  created() {
    this.$store
      .dispatch(
        'LoadDicts',
        'card_type,sex,customer_card_status,customer_card_give_status'
      )
      .then(() => {
        const arr = this.dictInfo['card_type']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
  },
  watch: {
    exchange(val) {
      // alert(123)
    }
  },
  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },
  methods: {
    handleInputNumChange(e, max) {
      if (e.target.value > parseInt(max)) {
        this.$alert('超出数值范围', '', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    getList(val) {
      const data = {
        mobile: val
      }

      fetchPhoneUserList(data).then(res => {
        if (res.errorCode === 9000) {
          this.userDatas = res
          this.childList = res.children
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    handleFilter() {
      // 查询
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/

      if (this.phoneNum && reg.test(this.phoneNum)) {
        this.getList(this.phoneNum)
      } else {
        this.$message({
          title: '警告',
          message: '手机号码输入错误',
          type: 'warning',
          duration: 2000
        })
      }
    },

    resetTableDatas() {
      // 重置
      this.$refs.dataForm.resetFields()
      this.userNav.childs = [
        {
          name: '',
          sex: '',
          birthday: ''
        }
      ]
      this.cardId = ''
      this.confirmEdit = true
    },

    // 编辑----请求会员详细数据
    editUser(row) {
      this.dialogStatus = 'update'
      this.dialogVisible = true
      this.titleNameChange = '编辑会员'

      const data = {
        id: row.custId
      }
      this.cardId = row.custId
      fetchIdUserList(data).then(res => {
        if (res.errorCode === 9000) {
          this.userNav = res
          if (!res.childs) {
            var key = 'childs'
            var value = []
            this.userNav[key] = value
          }
        } else {
          this.$message.error(res.errorMessage)
        }
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    // 注册
    RegUser() {
      this.dialogStatus = 'create'
      this.dialogVisible = true
      this.titleNameChange = '会员注册'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // 添加
    addChild() {
      const tempData = {
        name: '',
        sex: '',
        birthday: ''
      }
      this.userNav.childs.push(tempData)
    },

    // 删除baby信息
    deletBaby(row) {
      const index = this.userNav.childs.indexOf(row)
      this.userNav.childs.splice(index, 1)
    },
    // 注册会员信息
    Register() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign([], this.userNav.childs)
          const data = {
            id: this.cardId,
            name: this.userNav.name,
            mobile: this.userNav.mobile,
            sex: this.userNav.sex
          }

          if (tempData.length > 0 && tempData[0].name) {
            const key = 'childs'
            const value = JSON.stringify(tempData)
            data[key] = value
          }
          createUser(data).then(res => {
            if (res.errorCode === 9000) {
              this.dialogVisible = false
              this.resetTableDatas()
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      })
    },
    // 编辑详细会员消息
    editMemberInfo() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign([], this.userNav.childs)
          const data = {
            id: this.cardId,
            name: this.userNav.name,
            mobile: this.userNav.mobile,
            sex: this.userNav.sex
          }
          if (tempData.length > 0 && tempData[0].name) {
            const key = 'childs'
            const value = JSON.stringify(tempData)
            data[key] = value
          } else {
            data.childs = ''
          }

          updateUser(data).then(res => {
            if (res.errorCode === 9000) {
              this.dialogVisible = false
              this.phoneNum = this.userNav.mobile

              this.getList(this.userNav.mobile)
              this.$message({
                title: '成功',
                message: '编辑成功',
                type: 'success',
                duration: 2000
              })

              this.resetTableDatas()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      })
    },

    /* 取消修改手机号 */
    cancleUpdateMobile() {
      // this.confirmEdit = true
      this.phoneDialog = false
      this.editPhone = ''
      this.phoneCode = ''
      this.oldCode = ''
    },

    /* 获取验证码 */
    getCodeFun(val) {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/
      // eslint-disable-next-line
      if (val.length == 0 || !reg.test(val)) {
        this.$message.error('请输入正确的手机号码！！！')
      } else if (val !== this.phoneNum) {
        this.$message.error('当前号码与原有号码不匹配！！！')
      } else {
        if (this.editPhone) {
          const sendParams = {
            msgCode: 'SMS_152283583',
            receiveMobile: this.editPhone
          }

          sendMessageCode(sendParams).then(res => {
            if (res.errorCode === 9000) {
              this.$message({
                message: '发送验证码成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '发送短信验证码失败')
            }
          })
        } else {
          this.$message.error('请输入正确的手机号')
        }
      }
    },
    /* 校验验证码--确定修改 */
    checkMessageCodeBtn() {
      const params = {
        // oriVerifyCode: this.oldCode,
        nowVerifyCode: this.phoneCode,
        mobile: this.editPhone
      }

      checkMessageCode(params).then(res => {
        if (res.errorCode === 9000) {
          this.userNav.mobile = this.editPhone
          this.confirmEdit = false
          this.cancleUpdateMobile()
        } else {
          this.$message.error(res.errorMessage || '修改手机号失败')
        }
      })
    },

    // 取消添加宝宝
    cancleAddShow() {
      this.dialogVisible = false
      this.resetTableDatas()
    },

    // 点击编辑手机号
    handleIconClick() {
      this.phoneDialog = true
    },

    // 进行兑换票
    openExchangeDialog(row) {
      // this.exchange = 0
      const tmp = Object.assign({}, row)
      // eslint-disable-next-line
      if (tmp.remainTimes == 0) {
        this.$message({
          message: '兑换次数为零，无法兑换！！！',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.cardId = tmp.cardId
        this.surPlusTimes = tmp.remainTimes
        this.cardType = tmp.cardType
        // eslint-disable-next-line
        if (this.cardType == 2) {
          this.$message({
            message: '时段卡一次仅能兑换一次',
            type: 'warning',
            duration: 2000
          })
          this.exchange = 1
        }
        // eslint-disable-next-line
        if (this.surPlusTimes == 1) {
          this.turnoff = true
        }
        if (this.surPlusTimes < this.maxnum) {
          this.maxnum = this.surPlusTimes
        }

        setTimeout(() => {
          this.ticketDialog = true
          this.ticketDialogTitle = '兑换'
        }, 500)
      }
    },

    ticketExchange() {
      // 兑换票数
      // eslint-disable-next-line
      if (this.cardType == 2) {
        var data = {
          cardId: this.cardId,
          timesNum: 1
        }
        // eslint-disable-next-line
      } else if (this.cardType == 1) {
        data = {
          cardId: this.cardId,
          timesNum: this.exchange
        }
      }

      writeoffUser(data).then(res => {
        if (res.errorCode === 9000) {
          this.confirmPresentTickets = false
          this.$message({
            title: '成功',
            message: '兑换成功',
            type: 'success',
            duration: 2000
          })
          if (res.verifyIds && res.verifyIds.length > 0) {
            this.verifyId = res.verifyIds.join(',')
            const tenantId = Cookies.get('tenantId')
            const currentShopId = Cookies.get('currentShopId')
            const params = {
              verifyIds: this.verifyId,
              tenantId: tenantId,
              shopId: currentShopId
            }
            getCancelPrintQueryList(params).then(res => {
              if (res.errorCode === 9000) {
                printCancelData(res)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }
          this.getList(this.userDatas.mobile)
          this.ticketExchangeCancle()
        } else {
          this.$message({
            title: '失败',
            message: '兑换失败',
            type: 'warning',
            duration: 400
          })
        }
      })
    },
    cancelRedemptionDialogShowMotion(val) {
      this.ticketDialog = true
      this.ticketDialogTitle = '撤销兑换'

      this.itemCardId = val.cardId
      this.verifyTimes = val.verifyTimes
    },
    cancelRedemptionMotion(val) {
      this.phoneVerificationVal = true
      // exchange  再打开验证手机弹窗
    },
    showConfirmPresentTickets() {
      this.confirmPresentTickets = true
    },
    confirmPresentTicketsCancle() {
      this.confirmPresentTickets = false
    },
    closePhoneVerificationDialog() {
      this.phoneVerificationVal = false
    },
    /* 获取验证码 */
    getPhoneCaptcha() {
      console.log(this.userDatas.mobile)
      if (this.userDatas.mobile) {
        const sendParams = {
          msgCode: 'SMS_152283583',
          receiveMobile: this.userDatas.mobile
        }

        sendMessageCode(sendParams).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              message: '发送验证码成功',
              type: 'success',
              duration: 2000
            })
            const TIME_COUNT = 60
            if (!this.timer) {
              this.count = TIME_COUNT
              this.isShow = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.isShow = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          } else {
            this.$message.error(res.errorMessage || '发送短信验证码失败')
          }
        })
      } else {
        this.$message.error('请输入正确的手机号')
      }
    },
    /* 校验验证码--确定撤回兑换 */
    sureCancelExchange() {
      const params = {
        nowVerifyCode: this.valicode,
        mobile: this.userDatas.mobile
      }

      checkMessageCode(params).then(res => {
        if (res.errorCode === 9000) {
          const params = {
            cardId: this.itemCardId,
            timesNum: this.timesNum
          }
          recallExchange(params).then(res => {
            if (res.errorCode === 9000) {
              this.$message({
                message: '撤销成功',
                type: 'success',
                duration: 2000
              })
              this.getList(this.userDatas.mobile)
              this.ticketExchangeCancle()
            } else {
              this.$message.error(res.errorMessage)
            }
            this.timesNum = 1
            this.valicode = ''
            this.isShow = true
            this.phoneVerificationVal = false
          })
        } else {
          this.$message.error(res.errorMessage || '验证码校验失败')
        }
      })
    },
    // 取消兑换
    ticketExchangeCancle() {
      this.ticketDialog = false
      this.ticketDialogTitle = ''
      this.cardId = ''
      this.exchange = 0
      this.present = 0
      this.surPlusTimes = ''
      this.maxnum = 10
      this.turnoff = false
      this.maxPresentTimes = 1
      this.switchCustomerCard = ''
    },

    // 赠票
    openPresentDialog(row) {
      this.ticketDialog = true
      this.ticketDialogTitle = '赠票'

      const tmp = Object.assign({}, row)

      this.cardId = tmp.cardId

      this.surPlusTimes = parseInt(tmp.maxGiveTimes)

      this.maxPresentTimes = parseInt(tmp.maxGiveTimes)
    },
    // 赠送票数
    presentTickets() {
      const data = {
        cardId: this.cardId,
        times: this.present
      }
      presentTicket(data).then(res => {
        if (res.errorCode === 9000) {
          this.$message({
            title: '成功',
            message: '兑换成功',
            type: 'success',
            duration: 2000
          })

          if (res.verifyIds && res.verifyIds.length > 0) {
            this.verifyId = res.verifyIds
            const tenantId = Cookies.get('tenantId')
            const currentShopId = Cookies.get('currentShopId')
            const params = {
              verifyIds: this.verifyId,
              tenantId: tenantId,
              shopId: currentShopId
            }
            getCancelPrintQueryList(params).then(res => {
              if (res.errorCode === 9000) {
                printCancelData(res)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          }

          this.getList(this.userDatas.mobile)
          this.ticketExchangeCancle()
        } else {
          this.$message({
            title: '失败',
            message: '兑换失败',
            type: 'warning',
            duration: 400
          })
        }
      })
    },

    openSwitchCard(val) {
      this.ticketDialog = true
      this.storeCardData = Object.assign({}, val)
      this.ticketDialogTitle = '开停卡'
      // eslint-disable-next-line
      if (val.status == '1') {
        this.switchCustomerCard = '停卡'
      } else {
        this.switchCustomerCard = '开卡'
      }
    },

    // 开停卡
    switchCard() {
      const data = {
        id: this.storeCardData.cardId
      }
      // eslint-disable-next-line
      if (this.storeCardData.status == '1') {
        userCeaseCustomerCard(data).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '停卡成功',
              type: 'success',
              duration: 2000
            })

            this.ticketExchangeCancle()
            this.getList(this.userDatas.mobile)
          } else {
            this.$message({
              title: '失败',
              message: res.errorMessage || '停卡失败',
              type: 'warning',
              duration: 400
            })
          }
        })
      } else {
        userOpenCustomerCard(data).then(res => {
          if (res.errorCode === 9000) {
            this.$message({
              title: '成功',
              message: '开卡成功',
              type: 'success',
              duration: 2000
            })

            this.ticketExchangeCancle()
            this.getList(this.userDatas.mobile)
          } else {
            this.$message({
              title: '失败',
              message: '开卡失败',
              type: 'warning',
              duration: 400
            })
          }
        })
      }
    }
  }
}
