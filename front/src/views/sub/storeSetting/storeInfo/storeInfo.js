import {
  fetchStoreSetList,
  updateStoreFun,
  // citySelectChange,
  sendMessageCode,
  checkMessageCode,
  cashierOpenQr,
  cashierOpenSure,
  cashierEditSure
} from '@/api/sub/storeSetting'

import area from '@/utils/area'

export default {
  data() {
    return {
      isShow: true, // 控制loading
      count: '', // 获取短信倒计时
      storeList: {},
      loading: false,
      showStorePage: true,
      showEditPage: false,
      labelPosition: 'left',
      dialogVisible: false,
      sfzFrontVisible: false,
      rules: {
        shopArea: [
          {
            required: true,
            message: '门店面积不能为空',
            trigger: 'blur'
          }
        ],
        shopOwner: [
          {
            required: true,
            message: '门店负责人不能为空',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '门店名称不能为空',
            trigger: 'blur'
          }
        ]
        // serviceTime: [{ required: true, message: '营业时间不能为空' }],
        // cover: [{ required: true, message: '封面不能为空' }],
        /* telephone: [{ required: true, message: '门店联系方式不能为空' },
          { pattern:  /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/, message: '请输入正确的手机号码' }
        ] */
        /* mobile: [{ required: true, message: '负责人手机号不能为空' },
          { pattern:  /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/, message: '请输入正确的手机号码' }
        ] */
      },
      rulesMobile: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ]
      },
      storeTemplt: {},
      addrlist: area, // 省市区
      areaProp: {
        value: 'id',
        label: 'name'
      },
      provinceList: [], // 省列表
      cityList: [], // 市列表
      areaList: [], // 区列表
      province: '', // 省
      city: '', // 市
      area: '', // 区
      addressArry: [],
      dialogFormVisible: false,
      newMobile: {
        mobile: '',
        nowVerifyCode: ''
      },
      verifyCode: '',
      dialogFormCashier: false, // 是否开通收银宝弹框
      qrImgUrl: '',
      dialogStatus: 'create',
      isOpenEditTitle: '开通',
      isMchCode: false,
      cashierModel: {
        merchantCode: ''
      },
      rulesCashier: {
        merchantCode: [
          {
            required: true,
            message: '商户号不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getStoreList()
  },
  methods: {
    /* 获取门店信息 */
    getStoreList() {
      this.loading = true
      fetchStoreSetList().then(res => {
        if (res.errorCode === 9000) {
          this.storeList = res
          const reg = /^ *$/
          // res.mchCode = ""
          const macCode = reg.test(res.mchCode)
          if (macCode) {
            this.isMchCode = !this.isMchCode
          } else {
            this.isMchCode = false
          }
        } else {
          this.$message.error(res.errorMessage || '门店信息查询失败')
        }
        this.loading = false
      })
    },
    /* 编辑门店信息 */
    editStoreFun(row) {
      this.showStorePage = !this.showStorePage
      this.showEditPage = !this.showEditPage
      this.sfzFrontVisible = false
      this.storeTemplt = Object.assign({}, row)
      const provinceId = this.storeTemplt.provinceId
      const cityId = this.storeTemplt.cityId
      const districtId = this.storeTemplt.districtId
      this.addressArry = []
      this.addressArry.push(provinceId)
      this.addressArry.push(cityId)
      this.addressArry.push(districtId)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      // 获取所有的省市区
      // citySelectChange().then(res => {
      //   if (res.errorCode === 9000) {
      //     this.provinceList = res.province
      //     this.cityList = res.city
      //     this.areaList = res.area
      //     this.areaList && this.areaList.forEach((area) => {
      //       const matchCity = this.cityList.filter(city => city.id === area.parentId)[0]
      //       if (matchCity) {
      //         matchCity.children = matchCity.children || []
      //         matchCity.children.push({
      //           label: area.name,
      //           value: area.id
      //         })
      //       }
      //     })
      //     this.cityList && this.cityList.forEach((city) => {
      //       const matchProvince = this.provinceList.filter(province => province.id === city.parentId)[0]
      //       if (matchProvince) {
      //         matchProvince.children = matchProvince.children || []
      //         matchProvince.children.push({
      //           label: city.name,
      //           value: city.id,
      //           children: city.children
      //         })
      //       }
      //     })
      //     this.addrlist = this.provinceList && this.provinceList.map(province => ({
      //       label: province.name,
      //       value: province.id,
      //       children: province.children
      //     }))
      //   } else {
      //     this.$message.error(res.errorMessage || '获取省份列表出错')
      //   }
      // })
    },
    /* 确定编辑门店信息 */
    editStoreInfoFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            province: this.storeTemplt.provinceId,
            city: this.storeTemplt.cityId,
            district: this.storeTemplt.districtId,
            street: this.storeTemplt.street,
            address: this.storeTemplt.address,
            mobile: this.storeTemplt.mobile,
            shopArea: this.storeTemplt.shopArea,
            serviceTime: this.storeTemplt.serviceTime,
            telephone: this.storeTemplt.telephone,
            cover: this.storeTemplt.cover
          }
          updateStoreFun(params).then(res => {
            if (res.errorCode === 9000) {
              this.showEditPage = false
              this.showStorePage = true
              this.isMchCode = false
              this.getStoreList()
              this.$message({
                message: '门店更新成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '更新失败')
            }
          })
        }
      })
    },
    /* 取消编辑门店信息 */
    cancleEditShow() {
      this.showStorePage = !this.showStorePage
      this.showEditPage = !this.showEditPage
    },
    /* 上传图片成功 */
    handleAvatarSuccess(res, file) {
      if (res.state === 'sucess') {
        this.storeTemplt.cover = res.data.url
        this.sfzFrontVisible = true
      } else {
        this.sfzFrontVisible = false
      }
    },
    /* 上传图片 */
    handleRemove(file, fileList) {
      if (file.status === 'success') {
        this.storeTemplt.cover = ''
        this.sfzFrontVisible = false
      } else {
        const imageSize = file.size / 1024 / 1024 < 5 // 上传图片大小不超过5M
        if (!imageSize) {
          this.$message.error('上传图片大小不能超过 5MB!')
          this.sfzFrontVisible = false
        } else {
          if (file.state === 'uploading') {
            this.sfzFrontVisible = false
          } else {
            this.sfzFrontVisible = true
          }
        }
      }
    },
    handlePictureCardPreview(file) {
      this.storeTemplt.cover = file.url
      this.dialogVisible = true
    },
    /* 动态获取省份 */
    handleItemChange(val) {
      if (val && val.length > 0) {
        this.storeTemplt.province = val[0]
        this.storeTemplt.city = val[1]
        this.storeTemplt.district = val[2]
      }
    },
    /* 修改负责人手机号 */
    updateMobile() {
      this.dialogFormVisible = !this.dialogFormVisible
      this.newMobile = {
        mobile: '',
        nowVerifyCode: ''
      }
    },
    /* 取消修改手机号 */
    cancleUpdateMobile() {
      this.dialogFormVisible = false
    },
    /* 获取验证码 */
    getCodeFun() {
      this.$refs['dataForm2'].validate(valid => {
        if (valid) {
          const sendParams = {
            msgCode: 'SMS_152283583',
            receiveMobile: this.newMobile.mobile
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
      })
    },
    /* 校验验证码确定修改 */
    checkMessageCodeBtn() {
      this.$refs['dataForm2'].validate(valid => {
        if (valid) {
          const params = {
            nowVerifyCode: this.newMobile.nowVerifyCode,
            mobile: this.newMobile.mobile
          }
          checkMessageCode(params).then(res => {
            if (res.errorCode === 9000) {
              this.dialogFormVisible = false
              this.storeTemplt.mobile = this.newMobile.mobile
            } else {
              this.$message.error(res.errorMessage || '修改手机号失败')
            }
          })
        }
      })
    },
    /* 开通收银宝弹框 */
    openCashier() {
      this.dialogStatus = 'create'
      this.isOpenEditTitle = '开通'
      this.dialogFormCashier = !this.dialogFormCashier
      this.cashierModel = {}
      cashierOpenQr().then(res => {
        if (res.errorCode === 9000) {
          this.qrImgUrl = res.qrImg
        } else {
          this.$message.error(res.errorMessage || '获取二维码失败')
        }
      })
    },
    /* 编辑收银宝弹框 */
    editCashier(row) {
      this.dialogStatus = 'update'
      this.isOpenEditTitle = '修改'
      this.dialogFormCashier = !this.dialogFormCashier
      this.cashierModel = {
        merchantCode: row.mchCode,
        id: row.mchId
      }
      cashierOpenQr().then(res => {
        if (res.errorCode === 9000) {
          this.qrImgUrl = res.qrImg
        } else {
          this.$message.error(res.errorMessage || '获取二维码失败')
        }
      })
    },
    /* 取消关闭开通收银宝弹框 */
    cancleOpenCashier() {
      this.dialogFormCashier = false
    },
    /* 确认开通保存收银宝 */
    sureOpenCashier() {
      const params = {
        merchantCode: this.cashierModel.merchantCode
      }
      cashierOpenSure(params).then(res => {
        if (res.errorCode === 9000) {
          this.dialogFormCashier = false
          this.getStoreList()
          this.$message({
            message: '开通收银宝成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '开通收银宝失败')
        }
      })
    },
    /* 确认编辑开通收银宝 */
    sureEditCashier() {
      const params = {
        mchCode: this.cashierModel.merchantCode,
        id: this.cashierModel.id
      }
      cashierEditSure(params).then(res => {
        if (res.errorCode === 9000) {
          this.dialogFormCashier = false
          this.$message({
            message: '修改商户号成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '修改商户号失败')
        }
      })
    }
  }
}
