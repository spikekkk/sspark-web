<template>
  <div class="navbar">
    <div class="logo_img">
      <!-- <img src="//img.ishanshan.com/gimg/n/20181107/87c13073954a4a62c9af26b34ba24784"> -->
      <i class="el-icon-aa-headshouyint sub_systrem_icon" />
      <div class="logo_img_name">{{ systemName || '收银台' }}</div>
    </div>
    <div class="shopName">{{ currentShopName || '门店名称' }}</div>
    <div
      class="changeShop"
      @click="queryShopFunc"
    >
      <img src="https://img.ishanshan.com/gimg/n/20181129/fbc2f6894663e7608902012292941d56">
      <span>切换</span>
    </div>
    <NavScroll
      ref="navScroll"
      class="navscroll"
    />

    <div class="header_right">
      <div class="right-menu">
        <el-dropdown trigger="click">
          <div class="userName">
            <img src="//img.ishanshan.com/gimg/n/20181107/01503b1450b4431049832bd4d48f563e">
            <span> {{ userName || '-' }} </span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span
                style="display:block;"
                @click="updatePassFun"
              >修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span
                style="display:block;"
                @click="loginOutFun"
              >{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="right-menu">
        <template v-if="device!=='mobile'">
          <error-log class="errLog-container right-menu-item" />
        </template>
        <el-dropdown
          class="avatar-container right-menu-item"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <img src="//img.ishanshan.com/gimg/n/20181107/9c884b12c118dcffaddcc4328ab8b3ac">
            <span class="systemName">{{ systemName || '收银台' }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <router-link to="/">
              <el-dropdown-item>
                {{ $t('navbar.dashboard') }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
            </el-dropdown-item> -->
            <el-dropdown-item
              v-for="(item,sysId) in systemList"
              :key="sysId"
              divided
            >
              <span
                style="display:block;"
                @click="changeSystemType(item.id)"
              >{{ item.name }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="userNum">
        <img src="//img.ishanshan.com/gimg/n/20181107/ff021b2f28fedf3f5e8e8ab87fc27820">
        <div class="personNum">当前入场人数：
          <span v-if="!flag">{{ personNum }}</span>
          <span
            v-if="flag"
            style="color:red"
          >连接失败</span>
        </div>
      </div>

      <div class="logout_btn m_btn">
        <el-button
          v-repeatdely="2000"
          type="primary"
          @click="registerFun"
        >会员注册</el-button>
      </div>
      <div class="logout_btn ">
        <el-button
          type="primary"
          size="mini"
          @click="openRecharge"
        >会员充值</el-button>
      </div>
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="connectModal"
        :modal-append-to-body="false"
        class="el_dialog_box"
        title="交接班"
        width="400px"
      >
        <div class="cashierTitle">{{ cashierName || '无' }} {{ cashierMobile || '无' }}</div>
        <div class="dialog_table_box">
          <p class="dialog_table_title">支付明细</p>
          <el-table
            :data="tableData"
            :cell-style="cellStyle"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="type"
              label="支付方式"
            />
            <el-table-column
              prop="num"
              label="支付笔数"
            />
            <el-table-column
              prop="amount"
              label="支付金额"
            >
              <template slot-scope="scope">
                <div>￥{{ scope.row.amount }}</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="dialog_time_box">
          <p class="dialog_time_start">
            <span>开始时间</span>
            <span class="dialog_time_text">{{ connectList.shiftStat.startTime || '无' }}</span>
          </p>
          <p class="dialog_time_end">
            <span>结束时间</span>
            <span class="dialog_time_text">{{ connectList.shiftStat.endTime || '无' }}</span>
          </p>
        </div>
        <div class="dialog_form_box dialog_form_box2">
          <el-form
            ref="ruleForm"
            :model="form"
            :label-position="labelPosition"
            label-width="70px"
          >
            <el-form-item label="备用金">
              <el-input
                v-model="form.fund"
                size="mini"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="现金总额"
              style="margin-bottom:0;"
            >
              <el-input
                v-model="form.cash"
                size="mini"
                clearable
              />
            </el-form-item>
          </el-form>
        </div>
        <div>
          <p class="dialog_bottom_text">
            <span>退款数量： {{ connectList.shiftStat.refundCount || '0' }}笔</span>
            <span>退款金额：￥{{ connectList.shiftStat.refundAmount || '0' }}</span>
          </p>
          <p class="dialog_bottom_text">
            <span>订单数量： {{ connectList.shiftStat.orderCount || '0' }}笔</span>
            <span>订单金额：￥{{ connectList.shiftStat.orderAmount || '0' }}</span>
          </p>
          <p class="dialog_bottom_money">
            <span>今日收款总额：</span>
            <span>￥</span>
            <span class="income_money_text">{{ connectList.shiftStat.totalAmount || '0' }}</span>
          </p>
        </div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="cancel"
          >取消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="printReceipt"
          >交接班并退出</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="dialog_style_edit2">
      <el-dialog
        :visible.sync="editPassword"
        title="修改密码"
        style="width: 100%"
      >
        <el-form
          ref="ruleForm2"
          :model="ruleForm"
          :rules="rules"
          :label-position="labelPosition"
        >
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="输入当前密码"
              size="mini"
              type="password"
              clearable
            />
          </el-form-item>
          <el-form-item prop="newPsw">
            <el-input
              v-model="ruleForm.newPsw"
              placeholder="输入新密码"
              size="mini"
              type="password"
              clearable
            />
          </el-form-item>
          <el-form-item prop="checkPsw">
            <el-input
              v-model="ruleForm.checkPsw"
              placeholder="确认新密码"
              size="mini"
              type="password"
              clearable
            />
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer footer_button"
        >
          <el-button
            size="mini"
            class="cancel_btn"
            @click="canclePassword"
          >取 消</el-button>
          <el-button
            :plain="true"
            size="mini"
            type="primary"
            @click="updatePasswordFun"
          >确定</el-button>
        </div>
      </el-dialog>
    </div>

    <register-form ref="register" />
    <look-shop ref="shopQuery" />
    <repeat-login ref="repeatLogin" />
    <Recharge ref="recharge" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
// 删除放大效果--布局大小--文字选择--主题切换
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'

import {
  fetchConnectClass,
  connectInfoSub,
  connectPrint
} from '@/api/checkstand/connect'
import { printDutyShiftData } from '../../../../utils/print'
import { updatePassword, getPrintSetup } from '@/api/sub/storeSetting'
import { dayVerifyStat } from '@/api/checkstand/pointList'
import SocketIO from 'socket.io-client'

// import NavScroll from '@/layout/components/Navbar.vue'

import NavScroll from '../../../../components/NavScroll/NavScroll'
// import rechargeDetailVue from '../../../../components/RechargeDetail/rechargeDetail.vue'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,

    NavScroll,

    RegisterForm: require('../dialog/registerDialog.vue').default,
    LookShop: require('../dialog/lookShopDialog.vue').default,
    RepeatLogin: require('../dialog/repeatLoginDialog.vue').default,
    Recharge: require('../dialog/rechargeDialog.vue').default
    // Screenfull,
    // SizeSelect,
    // LangSelect,
    // ThemePicker
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPsw !== '') {
          this.$refs.ruleForm2.validateField('checkPsw')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPsw) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      currentShopId: '',
      currentShopName: '',
      userName: '', // 收银员姓名
      systemName: '',
      systemList: [],
      personNum: '0', // 当前入场人数
      labelPosition: 'left',
      connectList: { shiftStat: { startTime: null, endTime: null }},
      connectModal: false, // 交接班弹窗
      cashierName: Cookies.get('username'),
      cashierMobile: Cookies.get('mobile'),
      shiftId: '', // 打印需要
      printData: {}, // 打印数据
      editPassword: false,
      rules: {
        password: [{ required: true, message: '原密码不能为空' }],
        newPsw: [
          {
            required: true,
            message: '新密码不能为空',
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        checkPsw: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      ruleForm: {
        password: '',
        newPsw: '',
        checkPsw: ''
      },
      tableData: [
        // {
        //   type: '现金',
        //   num: '0',
        //   amount: '0.0'
        // },
        // {
        //   type: '微信/支付宝',
        //   num: '0',
        //   amount: '0.0'
        // },
        // {
        //   type: 'POS机',
        //   num: '0',
        //   amount: '0.0'
        // },
        // {
        //   type: 'OTA',
        //   num: '0',
        //   amount: '0.0'
        // }
      ],
      form: {
        fund: '', // 备用金
        cash: '' // 现金总额
      },
      flag: false,
      websock: null,
      printType: ''// 打印类型
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar', 'device'])
  },
  created() {
    this.getCookie()
    this.initWebpack()
  },
  mounted() {
    this.getCookie()
    this.getPrintSetting()
  },
  beforeDestroy() {
    if (this.websock) {
      // const userId = Cookies.get("userId");
      // console.log("===========", userId);
      // this.websock.emit("leave", userId);
      this.websock.close()
      // setTimeout(() => {
      //   this.websock.close();
      // }, 500);
    }
  },

  methods: {

    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 5) { // 指定列号
        return 'background:#f9fafc'
      } else {
        return ''
      }
    },

    getCookie() {
      this.userName = Cookies.get('username')
      const currentShopId = Cookies.get('currentShopId')
      const systemTypes = Cookies.get('systemTypes')
      console.log('systemTypes------', systemTypes)
      const shopInfos = Cookies.get('shopInfos')
      const systemObj = JSON.parse(systemTypes)
      this.systemList = systemObj
      const data = {
        name: '小程序系统',
        id: '5656'
      }
      this.systemList.push(data)
      systemObj.map((item, index) => {
        if (item.id === Cookies.get('currentSystem')) {
          //eslint-disable-line
          this.systemName = item.name
        }
      })
      const shopInfosObj = JSON.parse(shopInfos)
      if (shopInfosObj && shopInfosObj.length > 0) {
        shopInfosObj.map((shops, index) => {
          if (shops.id === currentShopId) {
            //eslint-disable-line
            this.currentShopName = shops.name
            Cookies.set('currentShopName', this.currentShopName)
            return
          }
        })
      } else {
        this.currentShopName = Cookies.get('currentShopName')
      }
    },
    /**
     * 获取打印设置
     */
    getPrintSetting() {
      getPrintSetup({}).then(res => {
        if (res.errorCode === 9000) {
          this.printType = res.printSetup
          Cookies.set('printType', this.printType)
        } else {
          this.$message.error(res.errorMessage || '查询出错')
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        sessionStorage.clear()
      })
    },
    /* 退出登录*/
    loginOutFun() {
      fetchConnectClass().then(res => {
        if (res.errorCode === 9000) {
          this.connectModal = !this.connectModal
          this.connectList = res

          this.tableData = [
            {
              type: '储值卡',
              num: this.connectList.shiftStat.balanceCount || '0',
              amount: this.connectList.shiftStat.balanceAmount || '0'
            },
            {
              type: '现金',
              num: this.connectList.shiftStat.cashCount || '0',
              amount: this.connectList.shiftStat.cashAmount || '0'
            },
            {
              type: '支付宝',
              num: this.connectList.shiftStat.aliCount || '0',
              amount: this.connectList.shiftStat.aliAmount || '0'
            },
            {
              type: '微信',
              num: this.connectList.shiftStat.wxCount || '0',
              amount: this.connectList.shiftStat.wxAmount || '0'
            },
            {
              type: 'POS机',
              num: this.connectList.shiftStat.posCount || '0',
              amount: this.connectList.shiftStat.posAmount || '0'
            },
            {
              type: 'OTA',
              num: this.connectList.shiftStat.otaCount || '0',
              amount: this.connectList.shiftStat.otaAmount || '0'
            },

            {
              type: '总支付笔数(不含储值卡,退款)',
              num: this.connectList.shiftStat.totalCount || '0',
              amount: this.connectList.shiftStat.totalAmount || '0'
            }
          ]
          this.form.fund = ''
          this.form.cash = ''
        } else if (res.errorCode === 2100) {
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // In order to re-instantiate the vue-router object to avoid bugs
            sessionStorage.clear()
          })
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    /* 注册*/
    registerFun() {
      this.$refs.register.show()
    },
    /* 会员充值 */
    openRecharge() {
      this.$refs.recharge.show()
    },
    /* 查看门店*/
    queryShopFunc() {
      const shopInfos = Cookies.get('shopInfos')
      const shopInfosObj = JSON.parse(shopInfos)

      if (shopInfosObj && shopInfosObj.length > 0) {
        this.$refs.shopQuery.show()
      } else {
        this.$message.error('暂无门店切换')
      }
    },
    /* 切换系统 */
    changeSystemType(sysId) {
      if (sysId === '5656') {
        return window.open('https://saas.ishanshan.com/zsbprom/mini/login')
      }
      // const currentSystem = Cookies.get('currentSystem')
      // if (currentSystem !== '1') {
      Cookies.set('currentSystem', sysId)
      this.$store
        .dispatch('ChangeUserInfo')
        .then(() => {
          this.$store.dispatch('delAllViews').then(() => {
            this.$router.push({
              path: '/',
              replace: true,
              query: { noGoBack: true }
            })
            location.reload()
            sessionStorage.clear()
          })
        })
        .catch(() => {
          this.loading = false
          // this.$message.error('菜单为空，没有权限')
        })
      // }
    },
    /* 取消*/
    cancel() {
      this.connectModal = false
    },
    /* 打印并退出*/
    printReceipt() {
      if (this.form.fund && this.form.cash) {
        const params = {
          cashAmount: this.connectList.shiftStat.cashAmount.replace(/,/g, ''),
          cashCount: this.connectList.shiftStat.cashCount,
          wxAmount: this.connectList.shiftStat.wxAmount.replace(/,/g, ''),
          wxCount: this.connectList.shiftStat.wxCount,
          aliAmount: this.connectList.shiftStat.aliAmount.replace(/,/g, ''),
          aliCount: this.connectList.shiftStat.aliCount,

          posAmount: this.connectList.shiftStat.posAmount.replace(/,/g, ''),
          posCount: this.connectList.shiftStat.posCount,

          startTime: this.connectList.shiftStat.startTime,
          endTime: this.connectList.shiftStat.endTime,

          totalCashAmount: this.form.cash,
          spareAmount: this.form.fund,

          orderCount: this.connectList.shiftStat.orderCount,
          orderAmount: this.connectList.shiftStat.orderAmount.replace(/,/g, ''),

          balanceCount: this.connectList.shiftStat.balanceCount,
          balanceAmount: this.connectList.shiftStat.balanceAmount.replace(/,/g, ''),

          totalAmount: this.connectList.shiftStat.totalAmount.replace(/,/g, ''),
          totalCount: this.connectList.shiftStat.totalCount,
          otaAmount: this.connectList.shiftStat.otaAmount.replace(/,/g, ''),
          otaCount: this.connectList.shiftStat.otaCount,
          refundAmount: this.connectList.shiftStat.refundAmount.replace(/,/g, ''),
          refundCount: this.connectList.shiftStat.refundCount

        }

        connectInfoSub(params).then(res => {
          if (res.errorCode === 9000) {
            this.shiftId = res.shiftId
            if (this.shiftId) {
              const params = {
                shiftId: this.shiftId
              }
              connectPrint(params).then(res => {
                if (res.errorCode === 9000) {
                  this.printData = res

                  this.logout()
                  printDutyShiftData(this.printData)
                } else {
                  this.$message.error(res.errorMessage)
                }
              })
            }
          }
        })
      } else {
        this.$message.error('请输入备用金和现金总额')
      }
    },
    /* 修改密码弹框 */
    updatePassFun() {
      this.editPassword = !this.editPassword
      this.ruleForm = {}
      this.$nextTick(() => {
        this.$refs['ruleForm2'].clearValidate()
      })
    },
    /* 取消修改密码弹框 */
    canclePassword() {
      this.editPassword = false
    },
    /* 确定修改密码 */
    updatePasswordFun() {
      this.$refs['ruleForm2'].validate(valid => {
        if (valid) {
          const newPsw = this.ruleForm.newPsw
          // const conPwd = this.ruleForm.conPwd
          if (newPsw && newPsw.length < 6) {
            this.$message.error('密码长度至少为6位')
          } else {
            const params = {
              oldPwd: this.ruleForm.password,
              newPwd: this.ruleForm.newPsw,
              conPwd: this.ruleForm.checkPsw
            }
            updatePassword(params).then(res => {
              if (res.errorCode === 9000) {
                this.editPassword = !this.editPassword
                this.$message({
                  message: '修改密码成功',
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(res.errorMessage || '修改密码失败')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    /* 当日入场人数*/
    currentNumQuery() {
      dayVerifyStat().then(res => {
        if (res.errorCode === 9000) {
          this.personNum = res.verifyCount
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    // 初始化websocket
    initWebpack() {
      // const userId = Cookies.get("userId");
      // const current_token = Cookies.get("Admin-Token");
      const wsurl = process.env.WS_SERVER
      // console.log('=========', wsurl)

      this.websock = SocketIO(wsurl, {
        query: {
          shopId: Cookies.get('currentShopId')
        },
        transports: ['websocket', 'polling']
      })
      this.websock.on('connect', this.websocketopen.bind(this))
      this.websock.on('disconnect', this.websocketclose.bind(this))
      this.websock.on('message', this.websocketonmessage.bind(this))
      this.websock.on('connect_error', this.websocketerror.bind(this))

      // const token = 'Bearer ' + current_token
      // const wsuri = 'ws://192.168.1.56:8988/eden-server/websocket/' + userId + '?Authorization=' + token
      // this.websock = new WebSocket(wsuri)// 这里面的this都指向vue
      // this.websock.onopen = this.websocketopen
      // this.websock.onmessage = this.websocketonmessage
      // this.websock.onclose = this.websocketclose
      // this.websock.onerror = this.websocketerror
    },
    // 打开
    websocketopen() {
      // console.log('连接成功')
      this.flag = false
      this.currentNumQuery()
    },
    // 数据接收
    websocketonmessage(e) {
      const obj = JSON.parse(e)
      const userId = Cookies.get('userId')
      if (obj.notifyType == 'ForcedLogoutNotify' && obj.userId == userId) {//eslint-disable-line
        this.$refs.repeatLogin.show(obj.warningMessage)

      } else if (obj.notifyType == 'DayVerifyStatNotify') {//eslint-disable-line
        this.personNum = obj.verifyCount || 0
      } else if (obj.notifyType == 'SystemNotify') {//eslint-disable-line

        this.$refs.navScroll.changeTitle(obj)
      }

      this.flag = false
    },
    // 关闭
    websocketclose() {
      console.log('WebSocket关闭')
      this.flag = true
    },
    // 失败
    websocketerror() {
      console.log('WebSocket连接失败')
      this.flag = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dropdown-menu {
    text-align: center;
}
.el-dropdown-menu__item--divided:first-child {
    border-top: none;
}
.navbar /deep/ {
    height: 28px;
    line-height: 28px;
    border-radius: 0px !important;
    font-size: 14px;
    .el-form-item.is-success .el-input__inner,
    .el-form-item.is-success .el-input__inner:focus,
    .el-form-item.is-success .el-textarea__inner,
    .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #5d9cec;
    }
    .el-form-item--medium .el-form-item__content,
    .el-form-item--medium .el-form-item__label {
        line-height: 28px;
    }
    .el-form-item {
        margin-bottom: 20px;
    }
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container {
        float: left;
    }
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    .logo_img {
        width: 130px;
        height: 28px;
        border-radius: 5px;
        background: RGBA(216, 216, 216, 0.1);
        float: left;
        .logo_img_name {
            font-size: 18px;
            font-weight: 800;
            color: #fff;
            margin-left: 5px;
            line-height: 25px;
            display: inline-block;
        }
        img {
            vertical-align: sub;
        }
        .sub_systrem_icon {
            color: #fff;
            font-size: 18px;
        }
    }
    .shopName {
        color: #fff;
        font-weight: 400;
        float: left;
        line-height: 28px;
        margin-left: 20px;
    }
    .changeShop {
        float: left;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        line-height: 26px;
        margin-left: 10px;
        cursor: pointer;
        img,
        span {
            vertical-align: middle;
        }
    }

    .scroll_box {
        position: absolute;
        top: 64px;
        left: 150px;
        width: 88%;
        z-index: 50;
    }

    .header_right {
        .right-menu {
            float: right;
            height: 100%;
            &:focus {
                outline: none;
            }
            .right-menu-item {
                display: inline-block;
                margin: 0 8px;
            }
            .screenfull {
                height: 20px;
            }
            .international {
                vertical-align: top;
            }
            .theme-switch {
                vertical-align: 15px;
            }
            .avatar-container {
                margin: 0 37px 0 40px;
                .avatar-wrapper {
                    cursor: pointer;
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }
                    img {
                        vertical-align: middle;
                    }
                    .systemName {
                        color: #a8b5bc;
                        vertical-align: middle;
                    }
                    .el-icon-caret-bottom {
                        font-size: 12px;
                        color: #a8b5bc;
                    }
                }
            }
        }
        .lookShop {
            // margin-right: 40px;
            cursor: pointer;
        }
        .userNum,
        .lookShop {
            float: right;
            color: #a8b5bc;
            span {
                color: #fff;
            }
            .personNum {
                vertical-align: middle;
                display: inline-block;
            }
            img {
                vertical-align: middle;
            }
        }
        .userName {
            float: right;
            color: #a8b5bc;
            cursor: pointer;
            img {
                vertical-align: middle;
            }
            span {
                vertical-align: middle;
            }
        }
        .m_btn {
            margin-left: 13px;
            margin-right: 40px;
            .el-button--primary {
                background-color: #fe9e0f !important;
                border-color: #fe9e0f !important;
            }
        }
        .logout_btn {
            float: right;

            /deep/ .el-button--primary {
                background: #5d9cec;
                border-color: #5d9cec;
            }
            .el-button--mini {
                padding: 4px 16px;
                border-radius: 5px;
            }
            .el-button--primary:focus,
            .el-button--primary:hover {
                background: #5d9cec;
                border-color: #5d9cec;
            }
            .el-button--primary.is-active,
            .el-button--primary:active {
                background: #3a8ee6;
                border-color: #3a8ee6;
            }
        }
    }
    .el_dialog_box {
        font-size: 12px;
        color: #333;
        line-height: 22px !important;
        .cashierTitle {
            text-align: center;
            font-weight: 800;
            font-size: 14px;
            color: #333;
            line-height: 20px;
            margin-bottom: 20px;
        }
        .dialog_table_box /deep/ {
            border-bottom: 1px dashed #ddd;
            padding-bottom: 20px;
            box-sizing: border-box;
            .dialog_table_title {
                font-size: 12px;
                color: #333;
                line-height: 17px;
                margin: 20px 0 10px;
                text-align: start;
            }
            .el-table td,
            .el-table th.is-leaf {
                text-align: center;
            }
            .el-table th {
                background: #eff2f6;
                font-size: 12px;
                color: #333;
                line-height: 27px;
                padding: 0;
                font-weight: 500;
            }
            .el-table td {
                font-size: 12px;
                color: #666;
                padding: 10px 0;
                font-weight: 400;
                padding: 0;
                height: 28px;
            }
            .el-table__body .el-table__row:nth-child(2n) td {
                background: #f9fafc;
            }
        }
        .dialog_time_box {
            border-bottom: 1px dashed #ddd;
            .dialog_time_start,
            .dialog_time_end {
                margin: 20px 0 10px;
                font-size: 12px;
                line-height: 17px;
                text-align: start;
                span {
                    color: #333;
                    font-weight: 500;
                }
                .dialog_time_text {
                    color: #999;
                    margin-left: 15px;
                    font-weight: 500;
                }
            }
            .dialog_time_end {
                margin: 0 0 20px 0;
            }
        }
        .dialog_form_box2 {
            text-align: left;
            margin: 20px 0;
            padding-bottom: 20px;
            border-bottom: 1px dashed #ddd;
        }
        .dialog_form_box /deep/ {
            .el-form-item.el-form-item--medium {
                margin-bottom: 16px;
                .el-form-item__content,
                .el-form-item__label {
                    line-height: 28px;
                    font-size: 12px;
                    color: #333;
                    font-weight: 500;
                }
            }
        }
        .dialog_bottom_text {
            display: flex;
            justify-content: space-between;
            margin: 0 0 20px 0;
            line-height: 20px;
            color: #333;
            font-weight: 500;
        }
        .income_money_text {
            color: #f04343;
            font-weight: 800;
            font-size: 20px;
        }
        .dialog_bottom_money {
            margin-bottom: 0;
            text-align: start;
            color: #333;
            font-weight: 500;
            font-size: 14px;
            span:nth-child(2) {
                font-weight: 800;
                color: #f04343;
            }
        }
    }
    .dialog_style_edit /deep/ {
        .v-modal {
            opacity: 0.7;
        }
        .el-dialog {
            border-radius: 5px;
            .el-dialog__header {
                background: #2d3d4c;
                border-radius: 5px 5px 0px 0px;
                padding: 18px 20px;
                line-height: 14px;
                text-align: start;
                .el-dialog__title {
                    color: #fff;
                    font-size: 16px;
                    line-height: 14px;
                }
                .el-dialog__headerbtn {
                    top: 17px;
                    .el-dialog__close {
                        color: #fff;
                    }
                }
            }
            .el-dialog__body {
                padding: 20px 20px 30px;
            }
            .el-dialog__footer {
                padding: 10px 20px 20px;
                .dialog-footer {
                    .el-button--mini {
                        border-radius: 5px;
                    }
                    .el-button--primary,
                    .el-button--medium {
                        background: #5d9cec;
                        border-color: #5d9cec;
                        font-weight: 500;
                    }
                    .el-button--primary:focus,
                    .el-button--primary:hover {
                        background: #5d9cec;
                        border-color: #5d9cec;
                    }
                    .el-button--primary.is-active,
                    .el-button--primary:active {
                        background: #3a8ee6;
                        border-color: #3a8ee6;
                    }
                }
            }
        }
    }
    .dialog_style_edit2 /deep/ {
        .el-dialog {
            width: 400px;
            border-radius: 5px 5px 0 0;
        }
        .el-dialog__body {
            padding-bottom: 10px;
            box-sizing: border-box;
        }
        .el-dialog__header {
            padding: 11px 20px;
            border-radius: 5px 5px 0 0;
            background: #2d3d4c;
            text-align: left;
            .el-dialog__title {
                font-size: 16px;
                line-height: 14px;
                color: #fff;
            }
            .el-dialog__headerbtn {
                top: 16px;

                .el-dialog__close {
                    color: #fff;
                }
            }
        }
        .el-button--mini {
            color: #fff;
            background-color: #5d9cec !important;
            border-radius: 5px;
        }
        .text {
            font-size: 14px;
        }
        .item {
            padding: 18px 0;
        }
        .box-card {
            width: 294px;
        }
        .cancel_btn {
            color: #606266;
            border: 1px solid #dcdfe6;
            background-color: #fff !important;
        }
        .cancel_btn:hover {
            color: #5d9cec;
            border: 1px solid #5d9cec;
        }
    }
}
</style>
