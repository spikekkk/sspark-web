import {
  queryHqShopList,
  addHqShop,
  getHqShop,
  updateHqShop,
  setHqShopStatus
} from '@/api/hq/shopMgr'
import area from '@/utils/area'
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
  components: {},
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
    },
    dictColorFilter(status, arr) {
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return { color: item.color }
        }
      }
      return {}
    }
  },
  data() {
    return {
      storeList: [],
      loading: false,
      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,
      listQuery: {
        storeName: ''
      },
      dialogFormVisible: false,
      titleNameChange: '',
      labelPosition: 'left',
      dialogStatus: 'create',
      editShopOwnwe: false,
      sfzFrontVisible: false,
      dialogVisible: false,
      addrlist: area,
      areaProp: {
        value: 'id',
        label: 'name'
      },
      rules: {
        name: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' }
        ],
        shopOwner: [
          { required: true, message: '门店负责人不能为空', trigger: 'blur' }
        ],
        addressArry: [
          { required: true, message: '门店地址不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '负责人手机号不能为空', trigger: 'blur' },
          {
            pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|166|198|199|(147))+\d{8})$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            message: '请上传封面图'
          }
        ],
        manageType: [
          { required: true, message: '经营类型不能为空', trigger: 'blur' }
        ],
        serviceTime: [
          { required: true, message: '营业时间不能为空', trigger: 'change' }
          // {
          //   pattern: /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])-([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/,
          //   message: '请输入正确的营业时间',
          //   trigger: 'blur'
          // }
        ],
        telephone: [
          {
            pattern: /^0\d{2,3}-?\d{7,8}$/,
            message: '请输入正确的座机号码',
            trigger: 'blur'
          }
        ]
      },
      storeAddData: {
        name: '',
        addressArry: [],
        province: '',
        city: '',
        district: '',
        street: '',
        address: '',
        shopOwner: '',
        mobile: '',
        manageType: '',
        shopArea: '',
        serviceTime: '',
        telephone: '',
        cover: ''
      },
      startTime: '',
      endTime: ''
    }
  },

  computed: {
    ...mapGetters(['dictInfo'])
  },
  created() {
    this.getStoreList()
    this.$store.dispatch('LoadDicts', 'manage_type,shop_status').then(() => {
      const arr = this.dictInfo['manage_type']
      if (this.list && this.list.length > 0) {
        this.list = this.list.map(item => {
          item.genderCn = dictFilter(item.gender, arr)
          return item
        })
      }
    })
  },
  mounted() {
    this.getStoreList()
  },
  methods: {
    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getStoreList()
    },
    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getStoreList()
    },
    /* 搜索*/
    onSearch() {
      const _this = this
      _this.pageIndex = 1
      _this.getStoreList()
    },

    /**
     * 搜索刷新
     */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.listQuery = {
        storeName: ''
      }
      this.pageIndex = 1
      this.getStoreList()
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.sucess) {
        this.storeAddData.cover = res.data.url
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

    /* 动态获取省份 */
    handleItemChange(val) {
      if (val && val.length > 0) {
        this.storeAddData.province = val[0]
        this.storeAddData.city = val[1]
        this.storeAddData.district = val[2]
      }
    },
    /* 获取门店管理列表 */
    getStoreList() {
      const params = {
        name: '' || this.listQuery.storeName
      }
      this.loading = true
      queryHqShopList(params).then(res => {
        if (res.errorCode === 9000) {
          this.storeList = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage || '列表信息查询失败')
        }
        this.loading = false
      })
    },
    /* 新增门店弹框 */
    addStoreFun() {
      this.dialogStatus = 'create'
      this.titleNameChange = '新增门店'
      this.editShopOwnwe = false
      this.dialogFormVisible = !this.dialogFormVisible

      this.storeAddData = {
        name: '',
        addressArry: [],
        address: '',
        shopOwner: '',
        mobile: '',
        manageType: '',
        shopArea: '',
        serviceTime: '',
        telephone: '',
        cover: ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    /* 确定新增门店 */
    sureAddStoreFun() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            name: this.storeAddData.name,
            province: this.storeAddData.addressArry[0],
            city: this.storeAddData.addressArry[1],
            district: this.storeAddData.addressArry[2],
            street: '',
            address: this.storeAddData.address,
            shopOwner: this.storeAddData.shopOwner,
            mobile: this.storeAddData.mobile,
            manageType: this.storeAddData.manageType,
            shopArea: this.storeAddData.shopArea,
            serviceTime: this.storeAddData.serviceTime.toString(),
            telephone: this.storeAddData.telephone,
            cover: this.storeAddData.cover
          }

          addHqShop(params).then(res => {
            if (res.errorCode === 9000) {
              this.dialogFormVisible = false
              this.getStoreList()
              this.$message({
                message: '门店添加成功',
                type: 'success',
                duration: 2000
              })
            } else {
              this.$message.error(res.errorMessage || '添加失败')
            }
          })
        }
      })
    },
    /* 查看详情弹框 */
    editStoreInfo(row) {
      this.dialogStatus = 'update'
      this.editShopOwnwe = true
      this.dialogFormVisible = !this.dialogFormVisible
      this.titleNameChange = '门店详情'
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].resetFields()
      // })

      const params = {
        id: row.id
      }

      getHqShop(params).then(res => {
        if (res.errorCode === 9000) {
          this.storeAddData = {
            id: row.id,
            name: res.name,
            addressArry: this.storeAddData.addressArry,
            province: res.province,
            city: res.city,
            district: res.district,
            street: res.street,
            address: res.address,
            shopOwner: res.shopOwner,
            mobile: res.mobile,
            manageType: res.manageType,
            shopArea: res.shopArea,
            serviceTime: res.serviceTime.split(','),
            telephone: res.telephone,
            cover: res.cover
          }

          const provinceId = res.provinceId
          const cityId = res.cityId
          const districtId = res.districtId

          this.storeAddData.addressArry = []
          this.storeAddData.addressArry.push(provinceId)
          this.storeAddData.addressArry.push(cityId)
          this.storeAddData.addressArry.push(districtId)
        }
      })
    },
    /* 确认编辑门店信息 */
    sureEditStore() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const params = {
            id: this.storeAddData.id,
            name: this.storeAddData.name,
            province: this.storeAddData.addressArry[0],
            city: this.storeAddData.addressArry[1],
            district: this.storeAddData.addressArry[2],
            street: '',
            address: this.storeAddData.address,
            shopOwner: this.storeAddData.shopOwner,
            mobile: this.storeAddData.mobile,
            manageType: this.storeAddData.manageType,
            shopArea: this.storeAddData.shopArea,
            serviceTime: this.storeAddData.serviceTime.toString(),
            telephone: this.storeAddData.telephone,
            cover: this.storeAddData.cover
          }
          updateHqShop(params).then(res => {
            if (res.errorCode === 9000) {
              this.dialogFormVisible = false
              this.getStoreList()
              this.$message({
                message: '更新成功',
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
    /* 取消关闭弹框 */
    cancleDialog() {
      this.$refs.dataForm.resetFields()
      this.dialogFormVisible = false
    },
    /* 启用或者禁用门店 */
    isStoreOpen(row, status) {
      const params = {
        id: row.id,
        status: status
      }
      setHqShopStatus(params).then(res => {
        if (res.errorCode === 9000) {
          this.getStoreList()
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(res.errorMessage || '失败')
        }
      })
    }
  }
}
