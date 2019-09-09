<template>

  <div class="login-container">
    <div style="position: absolute; left:70px; top: 70px;">
      <img
        src="https://img.ishanshan.com/gimg/n/20181208/ffbe178da72fee6af0ef3c46f9983c07"
        alt="">
    </div>
    <div class="login_content">
      <div class="logo_img">
        <img src="//img.ishanshan.com/gimg/n/20181210/0a17165b6c32aa4d6f752cb6b23b8501">
      </div>
      <div class="login_name">乐客云</div>
      <div
        v-show=" !editPasswordDialog"
        v-if="!openForgetPassword">
        <div class="login_way">
          <div
            v-if="istabLineShow"
            class="select_line_1" />
          <div
            v-if="!istabLineShow"
            class="select_line_2" />
          <div
            :class="{'selected':tab === 1}"
            class="account_login"
            style="margin-right:46px;"
            @click="chartOneHandle(1)">账号密码登录</div>
          <div
            :class="{'selected':tab === 2}"
            class="message_login"
            @click="chartOneHandle(2)">短信验证登录</div>
        </div>
        <!-- 账号登陆start -->
        <el-form
          v-show="istabLineShow"
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :placeholder="$t('login.username')"
              name="username"
              type="text"
              auto-complete="on">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/041388ff824571aea706fa2ceb93b7c1">
                </span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :type="passwordType"
              v-model="loginForm.password"
              :placeholder="$t('login.password')"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLogin">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/f034b19f801e7844c65ebe217dde462a">
                </span>
              </template>
            </el-input>
            <span
              class="show-pwd"
              @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
        </el-form>
        <!-- 账号登陆---end -->

        <!-- 手机验证登陆---start -->
        <el-form
          v-show="!istabLineShow"
          ref="loginForm2"
          :model="loginForm"
          :rules="loginPhoneRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :placeholder="$t('login.username')"
              name="username"
              type="text"
              auto-complete="on">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/c16a614c2c5ce85c38c41decc6434d3e">
                </span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item
            prop="password"
            class="get_code_style">
            <el-input
              v-model="loginForm.password"
              placeholder="验证码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="handleLoginPhone" />
            <el-button
              v-show="isShow"
              plain
              @click="getCodeFun(loginForm.username)">获取验证码</el-button>
            <el-button
              v-show="!isShow"
              style="padding: 10px; width: 112px;margin-left: 10px;"><span>{{ count }}</span>s后重新获取</el-button>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLoginPhone">{{ $t('login.logIn') }}</el-button>
        </el-form>
        <!-- 手机验证登陆end -->
        <span
          style="float:right;color: #999;
    font-size: 14px;cursor:pointer"
          @click="forgetPassword">忘记密码</span>
      </div>
      <!-- <transition name="el-zoom-in-center"> -->

      <!-- 忘记密码手机号验证-start -->
      <div v-if="openForgetPassword">
        <el-form
          ref="loginForm2"
          :model="loginForm"
          :rules="loginPhoneRules"
          class="login-form"
          auto-complete="on"
          label-position="left">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入手机号"
              name="username"
              type="text"
              auto-complete="on">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/c16a614c2c5ce85c38c41decc6434d3e">
                </span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item
            prop="password"
            class="get_code_style">
            <el-input
              v-model="loginForm.password"
              placeholder="验证码"
              name="password"
              auto-complete="on"
              @keyup.enter.native="resetPasswordNext(loginForm)" />
            <el-button
              v-show="isShow"
              plain
              @click="getCodeFun(loginForm.username)">获取验证码</el-button>
            <el-button
              v-show="!isShow"
              style="padding: 10px; width: 112px;margin-left: 10px;"><span>{{ count }}</span>s后重新获取</el-button>
          </el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="resetPasswordNext(loginForm)">下一步</el-button>
        </el-form>
        <span
          style="float:left;color: #999;
    font-size: 14px;cursor:pointer"
          @click="returnLogin">返回登录</span>
      </div>

      <!-- 忘记密码 end-->

      <!-- </transition> -->

      <!-- 密码修改激活 start-->
      <div v-if="editPasswordDialog">
        <el-form
          ref="editLoginData"
          :model="editLoginForm"
          :rules="resetPasswordRules"
          class="login-form"
          auto-complete="on"
          label-position="left">

          <el-form-item prop="newPassword">
            <el-input
              :type="passwordType"
              v-model="editLoginForm.newPassword"
              placeholder="请输入新密码"
              name="newPassword"
              auto-complete="on">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/f034b19f801e7844c65ebe217dde462a">
                </span>
              </template>
            </el-input>
            <span
              class="show-pwd"
              @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              :type="passwordType"
              v-model="editLoginForm.confirmPassword"
              placeholder="请再次输入密码"
              name="confirmPassword"
              auto-complete="on"
              @keyup.enter.native="activeUser(editLoginForm)">
              <template slot="prepend">
                <span class="svg-container">
                  <img src="//img.ishanshan.com/gimg/n/20181127/f034b19f801e7844c65ebe217dde462a">
                </span>
              </template>
            </el-input>
            <span
              class="show-pwd"
              @click="showPwd">
              <svg-icon icon-class="eye" />
            </span>
          </el-form-item>

          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="activeUser(editLoginForm)">{{ editPasswordBtn?'修改密码':'激活账号' }}</el-button>

        </el-form>
      </div>
      <!-- 密码修改激活 end-->
    </div>

  </div>

</template>

<script>
// eslint-disable-next-line
//import { isvalidUsername } from '@/utils/validate'
// 语言选择
// import LangSelect from '@/components/LangSelect'
// 社交登陆
// import SocialSign from './socialsignin'
import {

  sendMessageCode

} from '@/api/sub/storeSetting'

import {
  activationPerson,
  resetPassword
} from '@/api/login'

export default {
  name: 'Login',
  // components: {  },
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!isvalidUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    /* const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    } */
    return {
      // getCode: true,
      isShow: true, // 控制loading

      openForgetPassword: false,
      editPasswordBtn: false, // 切换激活与密码修改
      editPasswordDialog: false, // open密码修改
      count: '', // 获取短信倒计时
      loginForm: {
        username: '',
        password: '',
        authType: '1'
      },
      userId: '',

      editLoginForm: {
        confirmPassword: '',
        newPassword: ''
      },

      loginRules: {
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loginPhoneRules: {
        username: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        password: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },

      resetPasswordRules: {
        newPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^(?=.*[0-9].*)(?=.*[a-z].*|(?=.*[A-Z].*)).{6,8}$/, message: '新密码必须是6-8位数字及字母组成', trigger: 'blur' }
        ],

        confirmPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^(?=.*[0-9].*)(?=.*[a-z].*|(?=.*[A-Z].*)).{6,8}$/, message: '新密码必须是6-8位数字及字母组成', trigger: 'blur' }
        ]

      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      istabLineShow: true,
      verifyCode: '',
      tab: 1
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }

  },

  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },

  destroyed() {
    window.removeEventListener('popstate', this.goBack, false)
  },

  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },

  // destroyed() {
  //   // window.removeEventListener('hashchange', this.afterQRScan)
  // },
  methods: {

    goBack() {
      // this.$router.replace({ path: '/' });

      history.go(0)
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    /* 账号登陆 */
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            authType: '2'
          }
          this.$store.dispatch('LoginByUsername', params).then(res => {
            this.loading = false
            this.editPasswordDialog = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(res => {
            if (res.errorCode === 2307) {
              this.editPasswordDialog = true
              this.editPasswordBtn = false
              this.userId = res.userId
            }
            // console.log('登陆失败的index', res.errorMessage)
            // this.$message.error(res.errorMessage)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 获取验证码 */
    getCodeFun(val) {
      // this.$refs.loginForm2.validate((valid) => {
      //   console.log("valid =====> ",valid)
      //   if (valid) {
      var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/

      if (!val || !reg.test(val)) {
        this.$message.error('请输入正确的手机号码！！！')
      } else if (val && reg.test(val)) {
        const sendParams = {
          msgCode: 'SMS_152283583',
          receiveMobile: this.loginForm.username
          // param: JSON.stringify(verifyCode)
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
      }
    },
    /* 手机号登陆 */
    handleLoginPhone() {
      this.$refs.loginForm2.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            authType: '1'
          }
          this.$store.dispatch('LoginByUsername', params).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            // this.$message.error('菜单为空，没有权限')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    chartOneHandle(index) {
      this.loginForm = {}
      this.tab = index
      if (index === 1) {
        this.istabLineShow = true
        this.$nextTick(() => {
          this.$refs['loginForm'].clearValidate()
        })
      } else if (index === 2) {
        // this.getCode = true
        this.istabLineShow = false
        this.$nextTick(() => {
          this.$refs['loginForm2'].clearValidate()
        })
      }
    },

    activeUser(val) {
      this.$refs['editLoginData'].validate(valid => {
        if (valid) {
          if (val.newPassword !== val.confirmPassword) {
            this.$message.error('再次输入新密码有误！')
          } else {
            if (this.editPasswordBtn) {
              const datas = {
                mobile: this.loginForm.username,
                newPwd: this.editLoginForm.newPassword,
                conPwd: this.editLoginForm.confirmPassword
              }

              resetPassword(datas).then(res => {
                if (res.errorCode === 9000) {
                  this.$message({
                    message: '密码修改成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$nextTick(() => {
                    this.editPasswordDialog = false
                  })

                  this.$refs['editLoginData'].clearValidate()
                  this.istabLineShow = true

                  this.$nextTick(() => {
                    this.loginForm = {
                      username: '',
                      password: '',
                      authType: '1'
                    }
                    // this.$refs['loginForm'].resetFields()
                  })
                } else {
                  this.$message({
                    message: res.errorMessage || '密码修改失败',
                    type: 'error',
                    duration: 2000
                  })
                }
              })
            } else {
              const data = {
                id: this.userId,
                newPassword: this.editLoginForm.newPassword,
                confirmPassword: this.editLoginForm.confirmPassword
              }

              activationPerson(data).then(res => {
                if (res.errorCode === 9000) {
                  this.$message({
                    message: '账号激活成功',
                    type: 'success',
                    duration: 2000
                  })
                  this.$nextTick(() => {
                    this.editPasswordDialog = false
                  })
                  this.$refs['editLoginData'].clearValidate()
                  this.istabLineShow = true
                  this.$nextTick(() => {
                    this.loginForm = {
                      username: '',
                      password: '',
                      authType: '1'
                    }
                  })
                } else {
                  this.$message.error(res.errorMessage)
                  // this.$message({
                  //   message: res.errorMessage || '账号激活失败',
                  //   type: 'error',
                  //   duration: 2000
                  // })
                }
              })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 忘记密码
    forgetPassword() {
      this.$refs.loginForm.resetFields()
      this.$refs['loginForm2'].resetFields()
      this.$nextTick(() => {
        this.openForgetPassword = true
      })
    },

    resetPasswordNext(val) {
      this.$refs.loginForm2.validate(valid => {
        if (valid) {
          this.openForgetPassword = false
          this.editPasswordDialog = true
          this.editPasswordBtn = true // 修改密码
          this.$nextTick(() => {
            this.$refs['editLoginData'].clearValidate()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    returnLogin() {
      this.$refs['loginForm2'].resetFields()
      this.$nextTick(() => {
        this.openForgetPassword = false
      })
    },

    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #f1f1f1;
$light_gray: #333;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      // color: #999;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    // display: inline-block;
    // height: 47px;
    // width: 85%;
    input {
      background: #f4f4f4;
      border: 0px;
      -webkit-appearance: none;
      // border-radius: 0px;
      border-radius: 0 10px 10px 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      border-left: 1px solid #ddd !important;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    // border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    // .btnActive{
    //   color: #CCCCCC !important;
    //   border-color: #CCCCCC !important;
    // }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  background: url("//img.ishanshan.com/gimg/n/20181124/5e411c2ec7372b4d557a1e1baa334d43")
    0% 0% / cover no-repeat;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  background-size: 100% 100% !important;
  .login_content {
    background: #fff;
    width: 380px;
    height: 500px;
    box-shadow: 0px 2px 24px 7px rgba(68, 68, 68, 0.25);
    border-radius: 8px;
    padding: 30px 55px 32px;
    .logo_img {
      text-align: center;
    }
    .login_name {
      color: #333;
      font-size: 24px;
      font-weight: 800;
      line-height: 33px;
      margin: 15px auto 25px;
      text-align: center;
    }
    .login_way {
      padding-bottom: 10px;
      border-bottom: 1px solid #f1f1f1;
      height: 30px;
      margin-bottom: 24px;
      padding: 0 25px;
      position: relative;
      .account_login,
      .message_login {
        font-size: 14px;
        color: #999;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
      }
      .select_line_1 {
        background: #5d9cec;
        height: 4px;
        width: 60px;
        position: absolute;
        bottom: 0;
        left: 36px;
        border-radius: 2px;
      }
      .select_line_2 {
        background: #5d9cec;
        height: 4px;
        width: 60px;
        position: absolute;
        bottom: 0;
        right: 36px;
        border-radius: 2px;
      }
      .selected {
        color: #333;
        font-weight: 600;
      }
    }
  }
  .login-form /deep/ {
    // position: absolute;
    // left: 0;
    // right: 0;
    width: 520px;
    max-width: 100%;
    // padding: 23px 55px 0;
    align-self: center;
    margin: auto;
    .el-input-group__prepend {
      background: #eee;
      border-radius: 10px 0 0 10px;
      padding: 0 2px;
      border: 0;
    }
    .el-button--primary {
      border-radius: 10px;
      height: 40px;
      font-size: 16px;
    }
    /*修改input中的placeholder*/
    .el-input__inner::-webkit-input-placeholder {
      color: #999;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 2px 5px 6px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .get_code_style /deep/ {
    .el-input {
      width: 142px;
      // margin-right: 10px;
    }
    .login-container,
    .el-input input {
      border-radius: 10px;
      border-left: none !important;
    }
    .el-button {
      color: #5d9cec;
      border-color: #5d9cec;
      border-radius: 10px;
      height: 40px;
      margin-left: 10px;
    }
    .el-button:focus,
    .el-button:hover {
      background-color: #fff;
    }
  }
}
</style>

