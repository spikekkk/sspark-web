<template>
  <div class="navbar">
    <NavScroll ref="navScroll" />
    <div
      v-show="systemName == '总部系统'"
      class="logo_img"
    >
      <!-- <img src="//img.ishanshan.com/gimg/n/20181107/87c13073954a4a62c9af26b34ba24784" > -->
      <i class="el-icon-aa-headzongbu sub_systrem_icon" />
      <div class="logo_img_name">{{ systemName || '总部系统' }}</div>
    </div>

    <div
      v-show="systemName == '门店系统'"
      class="logo_img"
    >
      <!-- <img src="//img.ishanshan.com/gimg/n/20181107/87c13073954a4a62c9af26b34ba24784" > -->
      <i class="el-icon-aa-headmendian sub_systrem_icon" />
      <div class="logo_img_name">{{ systemName || '门店系统' }}</div>
    </div>

    <div
      v-if="currentSystemId =='1'"
      class="shopName"
    >{{ hqShopName || '总部门店名称' }}</div>

    <div
      v-if="currentSystemId!='1'"
      class="shopName"
    >{{ currentShopName || '门店名称' }}</div>
    <div
      v-if="currentSystemId!=='1'"
      class="changeShop"
      @click="queryShopFunc"
    >
      <img src="https://img.ishanshan.com/gimg/n/20181129/fbc2f6894663e7608902012292941d56">
      <span>切换门店</span>

    </div>

    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->

    <!-- <breadcrumb class="breadcrumb-container"/> -->
    <div class="header_right">
      <div class="logout_btn">
        <!-- <el-button type="primary" size="mini" @click="logout">退出登录</el-button> -->
      </div>
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
                @click="logout"
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
            <!-- <img :src="avatar" class="user-avatar"> -->
            <img src="//img.ishanshan.com/gimg/n/20181107/9c884b12c118dcffaddcc4328ab8b3ac">
            <span class="systemName">{{ systemName || '总部系统' }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              <span style="display:block;" @click="updatePassFun">修改密码</span>
            </el-dropdown-item>
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
      <!-- <div class="userNum">
        <img src="//img.ishanshan.com/gimg/n/20181107/ff021b2f28fedf3f5e8e8ab87fc27820" >
        <div class="personNum">当前入场人数：<span>{{ personNum }}</span></div>
      </div> -->
      <!-- <div class="lookShop">
        <img src="//img.ishanshan.com/gimg/n/20181122/5f6349c36800b945e943a86e9a786b2b" >
        <div class="personNum" @click= "queryShopFunc">查看门店</div>
      </div> -->
    </div>

    <div class="dialog_style_edit">
      <el-dialog
        :visible.sync="editPassword"
        title="修改密码"
        style="width: 100%"
      >
        <el-form
          ref="ruleForm"
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

    <look-shop ref="shopQuery" />
    <repeat-login ref="repeatLogin" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
// 删除放大效果--布局大小--文字选择--主题切换
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import LangSelect from '@/components/LangSelect'
// import ThemePicker from '@/components/ThemePicker'
import Cookies from 'js-cookie'
import { updatePassword } from '@/api/sub/storeSetting'
import { dayVerifyStat } from '@/api/checkstand/pointList'
import SocketIO from 'socket.io-client'

import NavScroll from '../../../components/NavScroll/NavScroll'

export default {
  components: {
    // Breadcrumb,
    Hamburger,
    ErrorLog,
    LookShop: require('../dialog/lookShopDialog.vue').default,
    RepeatLogin: require('../dialog/repeatLoginDialog.vue').default,
    NavScroll

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
          this.$refs.ruleForm.validateField('checkPsw')
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
      editPassword: false,
      labelPosition: 'left',
      rules: {
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
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
      currentShopId: '',
      currentShopName: '',
      userName: '', // 登录人姓名
      personNum: '256', // 当前入场人数
      appTypeCookie: '',
      systemName: '',
      systemList: [],
      io: null,
      currentSystemId: '', // 当前系统所处系统
      hqShopName: '', // 总部门店名称
      websock: null,
      scrollOff: true// 先关闭
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
    /* 获取cookie */
    getCookie() {
      this.userName = Cookies.get('username')
      this.currentSystemId = Cookies.get('currentSystem')
      this.hqShopName = Cookies.get('hqShopName')
      const currentShopId = Cookies.get('currentShopId')
      const systemTypes = Cookies.get('systemTypes')
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
    /* 修改密码弹框 */
    updatePassFun() {
      this.editPassword = !this.editPassword
      this.ruleForm = {}
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    /* 取消修改密码弹框 */
    canclePassword() {
      this.editPassword = false
    },
    /* 确定修改密码 */
    updatePasswordFun() {
      this.$refs['ruleForm'].validate(valid => {
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
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    /* 退出登陆 */
    logout() {
      this.$store.dispatch('LogOut').then(res => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
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
          this.$message.error('菜单为空，没有权限')
        })
      // }
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
    },
    // 打开
    websocketopen() {
      console.log('连接成功')
    },
    // 数据接收
    websocketonmessage(e) {
      // console.info('e.data===>', e, typeof e)
      const obj = JSON.parse(e)
      const userId = Cookies.get('userId')
      if (obj.notifyType == 'ForcedLogoutNotify' && obj.userId == userId) {//eslint-disable-line
        this.$refs.repeatLogin.show(obj.warningMessage)
      } else if (obj.notifyType == 'DayVerifyStatNotify') {//eslint-disable-line
        this.personNum = obj.verifyCount || 0
      } else if (obj.notifyType == 'SystemNotify') {//eslint-disable-line
        this.$refs.navScroll.changeTitle(obj)
      }
    },
    // 关闭
    websocketclose() {
      console.log('WebSocket关闭')
    },
    // 失败
    websocketerror() {
      console.log('WebSocket连接失败')
    },
    /* 切换到门店系统 */
    /* toSub() {
      const currentSystem = Cookies.get('currentSystem')
      if (currentSystem !== '2') {
        Cookies.set('currentSystem', '2')
        this.$store.dispatch('ChangeUserInfo').then(() => {
          this.$store.dispatch('delAllViews').then(() => {
            this.$router.push({ path: '/', replace: true, query: { noGoBack: true }})
            location.reload()
          })
        }).catch(() => {
          this.loading = false
          this.$message.error('菜单为空，没有权限')
        })
      }
    }, */
    /* 去收银台系统 */
    /* toCashier() {
      const currentSystem = Cookies.get('currentSystem')
      if (currentSystem !== '3') {
        Cookies.set('currentSystem', '3')
        this.$store.dispatch('ChangeUserInfo').then(() => {
          this.$store.dispatch('delAllViews').then(() => {
            this.$router.push({ path: '/', replace: true, query: { noGoBack: true }})
            location.reload()
          })
        }).catch(() => {
          this.loading = false
          this.$message.error('菜单为空，没有权限')
        })
      }
    }, */
    /* 查看门店*/
    queryShopFunc() {
      const shopInfos = Cookies.get('shopInfos')
      const shopInfosObj = JSON.parse(shopInfos)
      if (shopInfosObj && shopInfosObj.length > 0) {
        this.$refs.shopQuery.show()
      } else {
        this.$message.error('暂无门店切换')
      }
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
    .el-form--label-left .el-form-item__label {
        text-align: right;
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
        .sub_systrem_icon {
            color: #fff;
            font-size: 18px;
        }
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
    .lookShop {
        // margin-right: 30px;
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

    .scrollTitle {
        display: flex;
        position: absolute;
        left: 150px;
        cursor: pointer;
        width: calc(100vw - 170px);
        .el-icon-close {
            color: white;
            cursor: pointer;
            line-height: 28px;
        }
    }
    .header_right {
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
        .logout_btn /deep/ {
            float: right;
            margin-left: 40px;
            .el-button--primary {
                background: #5d9cec;
                border-color: #5d9cec;
            }
            .el-button--mini {
                padding: 7px 16px;
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
            margin: 0 37px 0 37px;
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
    .userNum {
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
}
.dialog_style_edit /deep/ {
    .el-dialog {
        width: 400px;
        border-radius: 5px;
    }
    .el-dialog__body {
        padding-bottom: 10px;
        box-sizing: border-box;
        padding: 20px;
    }
    .el-dialog__footer {
        padding: 0 10px 20px;
    }
    .el-dialog__header {
        padding: 6px 20px;
        border-radius: 5px 5px 0 0;
        background: #2d3d4c;
        text-align: left;
        height: 50px;
        .el-dialog__title {
            font-size: 16px;
            line-height: 38px;
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
</style>

