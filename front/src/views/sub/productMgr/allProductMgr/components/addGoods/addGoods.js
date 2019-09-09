import {
  queryGoods, // 二次查询零售
  createGoods, // 创建商品
  updateGoods, // 商品更新
  createCategory, // 创建分类
  fetchCategoryMgrList, // 分类查询
  fetchSpecMgrList, // 查询所有商品规格
  createSpecOptions, // 创建规格值
  createSpec // 创建规格组
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
      isActive: true, // 动态绑定btn——class
      classifyChannels: [], // select---分类
      form: {
        name: '' // 规格组名称
      },
      formValue: {
        specValue: '' // 规格值名称
      },

      id: '', // 获取当前编辑行的规格值id
      formClassify: {
        // 新增分类
        name: '',
        sortOrder: ''
      },
      dialogGroupFormVisible: false, // 规格组添加
      // dialog打开关闭
      rulesdialogVisible: false, // 规格组选择

      dialogFormVisible: true, // 提交分类

      classifyDialogVisible: false, // 分类新增弹窗

      dialogValueFormVisible: false, // 新增规格值弹窗显示

      dialogTitles: '', // 页面标题

      choice: true, // 全选&已选
      editorAdd: false, // 新增？编辑

      checkedSpecs: [], // 选中的规格值

      editableTabsValue: '', // 选中的tabs----value

      editableTabs: [], // tabs规格数据tabs渲染

      skuDatas: [], // 当前选中数据

      offTabs: false, // 规格组控制开关

      skusItems: [], // 获取点击各个规格值；生成数组对象--已选展示

      specGroups: [], // 规格值选择存储
      specGroupsId: [], // 规格值id储存
      arrIdLength: '', // 当前已选规格组值限制
      editArrIdLength: '', // 编辑时已选规格组值限制
      editSpecDatas: '', // 编辑的规格组specs数据

      copyResSkus: [],
      spliceIndex: [], // 进行剪切的新数据index
      originalIndex: [], // 进行剪切的原数据index
      saveValue: [],
      finalData: {
        // 最终保存的规格数据
        skus: []
      },

      // 表单消息

      ruleForm: {
        name: '', // 名称
        price: '', // 售价--无规格商品必填
        oriPrice: '', // 原价--无规格商品必填
        channels: [], // 销售渠道
        sortOrder: '', // 排序值
        saleStatus: '1', // 是否上架

        buyNotice: '', // 购买须知
        useNotice: '', // 使用须知
        refundNotice: '', // 退款须知
        categoryId: '', // 商品分类id

        cover: '', // 上传呢照片
        spuNo: '', // 商品spu编码
        barcode: '', // spu条形码
        existSpec: 0, // 是否启用商品规格--默认不启用
        skus: []
      },

      rules: {
        name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 56,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        cover: [
          {
            required: true,
            message: '请上传商品图片'
          }
        ],
        categoryId: [
          {
            required: true,
            trigger: 'change',
            message: '请选择商品分类'
          }
        ],
        oriPrice: [
          {
            required: true,
            message: '请输入原价'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,

            message: '价格不允许小于零'
          }
        ],

        goodsNo: [
          {
            required: true,
            trigger: 'change',
            message: '请输入商品编码'
          }
        ],

        spuNo: [
          {
            required: true,
            message: '请输入商品编码'
          }
        ],

        existSpec: [
          {
            required: true,
            message: '请选择商品规格'
          }
        ],

        price: [
          {
            required: true,
            message: '请输入售卖价格'
          },
          {
            pattern: /^(?!(0[0-9]{1,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            message: '价格不允许小于零'
          }
        ],
        channels: [
          {
            required: true,
            message: '请选择售卖渠道',
            trigger: 'change'
          }
        ],

        saleStatus: [
          {
            required: true,
            message: '选中上下架状态'
          }
        ]
      },

      Spec: {
        name: [
          {
            required: true,
            message: '请输入规格组',
            trigger: 'blur'
          }
        ],
        specValue: [
          {
            required: true,
            message: '请输入规格值',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  computed: {
    // 获取缓存的字典数据
    ...mapGetters(['dictInfo'])
  },

  created() {
    this.keyupEnter()
    this.$store
      .dispatch('LoadDicts', 'goods_spu_status,channel,exist_spec')
      .then(() => {
        const arr = this.dictInfo['goods_spu_status']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
    this.querySpecs()
  },

  mounted() {
    this.queryCategory()
  },

  updated() {
    this.dialogTitles = this.$parent.addDialogTitle
  },

  methods: {
    keyupEnter() {
      document.onkeydown = e => {
        const body = document.getElementsByTagName('body')[0]
        if (
          e.keyCode === 13 &&
          e.target.baseURI.match(/allProducts/) &&
          e.target === body
        ) {
          if (this.classifyDialogVisible) {
            // 调用分类
            this.submitClassify()
          }

          if (this.rulesdialogVisible) {
            // 选中规格添加
            this.submitSpec()
          }
          if (this.dialogGroupFormVisible) {
            // 添加规格组
            this.groupSubmit('form')
          }
          if (this.dialogValueFormVisible) {
            // 添加规格值
            this.specValueSubmit('formValue')
          }

          if (this.dialogTitles && this.ruleForm.saleStatus) {
            // 提交
            this.submitForm('ruleForm')
          }
        }
      }
    },

    // 查询商品分类
    queryCategory() {
      this.$refs.ruleForm.clearValidate()
      fetchCategoryMgrList().then(res => {
        if (res.errorCode === 9000) {
          this.classifyChannels = res.categorys
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 查询全部规格信息
    querySpecs() {
      fetchSpecMgrList().then(res => {
        if (res.errorCode === 9000) {
          this.editableTabs = res.specs
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate()
          })
          setTimeout(() => {
            if (this.dialogTitles === '编辑商品') {
              if (this.copyResSkus.length > 0) {
                this.aheadGetSpec()
              }
            }
          }, 500)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    /**
     * 规格组取消
     */
    groupCancel(formValue) {
      this.dialogGroupFormVisible = false
      this.$refs[formValue].resetFields()
    },
    // 规格组新增
    groupSubmit(formValue) {
      this.$refs[formValue].validate(valid => {
        if (valid) {
          this.dialogGroupFormVisible = false

          const tmp = Object.assign({}, this.form)
          const createdatas = {
            specName: tmp.name
          }
          createSpec(createdatas).then(res => {
            if (res.errorCode === 9000) {
              //   this.tableData.push(this.form)
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.querySpecs()
              this.groupCancel(formValue)
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        } else {
          return false
        }
      })
    },

    // 新增规格组打开
    openAddRulesDia() {
      this.dialogGroupFormVisible = true
    },
    // 新增规格值打开
    addSpecItems(item) {
      this.id = item.specId
      this.dialogValueFormVisible = true
    },

    // 新增规格值取消
    specValueCancel(formName) {
      this.dialogValueFormVisible = false
      this.$refs[formName].resetFields()
      this.id = ''
    },
    // 新增规格值提交
    specValueSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const tmp = Object.assign({}, this.formValue)
          const createdatas = {
            optionName: tmp.specValue,
            specId: this.id
          }

          createSpecOptions(createdatas).then(res => {
            if (res.errorCode === 9000) {
              // this.tableData.push(this.formValue)
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.querySpecs()
              this.specValueCancel(formName)
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        } else {
          return false
        }
      })
    },

    // 新增分类
    addClassify() {
      this.classifyDialogVisible = true
      this.$nextTick(() => {
        this.$refs['formClassify'].clearValidate()
      })
    },
    // 提交分类
    submitClassify() {
      this.$refs['formClassify'].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          const adddata = {
            name: this.formClassify.name,
            sortOrder: this.formClassify.sortOrder
          }
          createCategory(adddata).then(res => {
            if (res.errorCode === 9000) {
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.CancleClassify()
              this.queryCategory()
            } else {
              this.$message.error(res.errorMessage)
            }
          })
        }
      })
    },

    // 取消分类
    CancleClassify() {
      this.classifyDialogVisible = false
      this.$refs.formClassify.resetFields()
      this.formClassify.label = ''
    },

    // 是否启用规格
    selectSpec(event) {
      // console.log(this.ruleForm.skus)
      //   console.log('当前选中----的启用de 规格ruleForm.existSpec', event)
    },

    getDetailSpec() {
      var specIDarr = [] // 规格组id
      var optionIdarr = [] // 规格值id
      this.editSpecDatas.forEach((v, index) => {
        v.specs.forEach((v, i) => {
          specIDarr.push(v.specId)
          optionIdarr.push(v.optionId)
        })
      })

      // 过滤规格组id-----展示现有规格组--值信息
      var newTabs = this.editableTabs.filter(item =>
        specIDarr.includes(item.specId)
      )

      this.editableTabs = Object.assign([], newTabs) // 显示 已选择的现有选项组

      this.checkedSpecs = this.arrayObject(optionIdarr) // 已经选择的现有格值

      var arrOptions = []

      this.editableTabs.forEach(v => arrOptions.push(v.options))
      var arr2 = arrOptions.reduce((a, b) => {
        return a.concat(b)
      })

      // 将现有checked值传入
      var arr2result = arr2.filter(item =>
        this.checkedSpecs.includes(item.optionId)
      )

      var tmp = Object.assign([], this.editableTabs)

      tmp.forEach((item, ii) => {
        item.options.forEach((v, index) => {
          arr2result.forEach((a, i) => {
            // eslint-disable-next-line
            if (a.optionId == v.optionId) {
              var data = {
                data: item.name,
                dataID: item.specId,
                items: v.name,
                id: v.optionId
              }
              this.skuDatas.push(data)
            }
          })
        })
      })
    },

    aheadGetSpec() {
      this.editSpecDatas = Object.assign([], this.copyResSkus)

      this.getDetailSpec()
      this.allReadyChoice()
      this.editArrIdLength = this.arrIdLength // 将当前初始规格存储
      setTimeout(() => {
        this.skuDatas = []
      }, 10)
    },
    // 启用---添加/修改---规则组值
    choiceSpec(val) {
      this.rulesdialogVisible = true

      if (this.dialogTitles === '编辑商品') {
        this.editorAdd = true
        this.finalData.skus = []
        // eslint-disable-next-line
        if (val.length == 0) {
          this.editSpecDatas = Object.assign([], this.copyResSkus)
        } else if (val.length > 0) {
          this.editSpecDatas = Object.assign([], val)
        }

        this.getDetailSpec()
      } else if (this.dialogTitles === '新增商品') {
        this.querySpecs()
        this.ruleForm.skus = []
      }
    },

    // tab切换的状态
    tabClick(event) {
      var result = this.skuDatas.filter(item =>
        this.checkedSpecs.includes(item.id)
      )

      var allArr = []
      for (var i = 0; i < result.length; i++) {
        var flag = true
        for (var j = 0; j < allArr.length; j++) {
          // eslint-disable-next-line
          if (result[i].data == allArr[j].data) {
            flag = false
          }
        }
        if (flag) {
          allArr.push(result[i])
        }
      }

      // 最都可选控制
      // eslint-disable-next-line
      if (allArr.length == 4) {
        this.$message.error('最多可选择3个规格组！！！')
      }
    },
    // 全选--已选切换
    allChoice() {
      this.isActive = !this.isActive
      this.choice = true
    },
    // 已选中
    selected() {
      this.allReadyChoice()
      // eslint-disable-next-line
      if (this.arrIdLength == 0) {
        this.$message.error('每个规格组必选一个规格值')
      } else {
        if (this.dialogTitles === '新增商品') {
          if (this.arrIdLength > 3) {
            this.$message.error('最多可选三组规格组！！！')
          } else {
            this.choice = false
            this.isActive = false
          }
        } else if (this.dialogTitles === '编辑商品') {
          if (this.arrIdLength !== this.editArrIdLength) {
            this.$message.error('已有规格组必选一个规格值')
          } else {
            this.choice = false
            this.isActive = false
          }
        }
      }
    },

    // 已选规格
    allReadyChoice() {
      var newSku = this.skuDatas.filter(item =>
        this.checkedSpecs.includes(item.id)
      )

      var newrr = this.arrayObject(newSku, 'id')

      this.skusItems = this.dataDeal(newrr) // 生成已选---数据展示

      var arr = []
      var arrID = []
      this.skusItems.forEach((v, i) => {
        arr.push([])
        arrID.push([])
        v.listInfo.forEach(a => {
          arr[i].push(a.items)
          const data = {
            specId: a.dataId,
            optionId: a.itemsId
          }
          arrID[i].push(data)
        })
      })

      this.arrIdLength = arrID.length

      // 已选数组----拼接

      this.specGroups = this.connectArray(arr)

      this.specGroupsId = this.connectArray(arrID)
    },

    // 拼接数组
    connectArray(arr) {
      var sarrid = [[]]
      for (var i = 0; i < arr.length; i++) {
        var tarrid = []
        for (var j = 0; j < sarrid.length; j++) {
          for (var k = 0; k < arr[i].length; k++) {
            tarrid.push(sarrid[j].concat(arr[i][k]))
          }
        }
        sarrid = tarrid
      }
      return sarrid
    },

    // 数组--对象合并去重
    dataDeal(result) {
      var listArr = []
      result.forEach((el, index) => {
        for (var i = 0; i < listArr.length; i++) {
          // 对比相同的字段key，相同放入对应的数组
          // eslint-disable-next-line
          if (listArr[i].data == el.data) {
            listArr[i].listInfo.push({
              dataId: el.dataID,
              items: el.items,
              itemsId: el.id
            })
            return
          }
        }
        // 第一次对比没有参照，放入参照
        listArr.push({
          data: el.data,
          listInfo: [
            {
              dataId: el.dataID,
              items: el.items,
              itemsId: el.id
            }
          ]
        })
      })
      return listArr
    },
    // 数组&对象去重
    arrayObject(arr, type) {
      var newArr = []
      var tArr = []
      // eslint-disable-next-line
      if (arr.length == 0) {
        return arr
      } else {
        if (type) {
          for (var i = 0; i < arr.length; i++) {
            if (!tArr[arr[i][type]]) {
              newArr.push(arr[i])
              tArr[arr[i][type]] = true
            }
          }
          return newArr
        } else {
          for (var j = 0; j < arr.length; j++) {
            if (!tArr[arr[j]]) {
              newArr.push(arr[j])
              tArr[arr[j]] = true
            }
          }
          return newArr
        }
      }
    },

    // 选择规格中的值获取详细切换
    checkedItems(item, val) {
      const data = {
        data: item.name,
        dataID: item.specId,
        items: val.name,
        id: val.optionId
      }
      this.skuDatas.push(data)
    },

    // 取消规格添加
    closeSpec() {
      this.isActive = true
      this.choice = true
      this.editorAdd = false
      this.rulesdialogVisible = false
      // 展示的已选数组

      this.skusItems = []
      //  this.copyResSkus=''
      this.editSpecDatas = ''
      this.specGroupsId = []
      this.specGroups = []
      this.skuDatas = []
      this.checkedSpecs = []
      this.saveValue = []
      this.arrIdLength = ''
    },

    // 确认规格添加
    submitSpec() {
      this.allReadyChoice()
      // eslint-disable-next-line
      if (this.arrIdLength == 0) {
        this.$message.error('规格组必选一个规格值!!!')
      } else {
        var _this = this

        if (this.dialogTitles === '新增商品') {
          if (this.arrIdLength > 3) {
            this.$message.error('当前所选规格组超标！！！')
          } else {
            if (
              // eslint-disable-next-line
              this.specGroups[0].length == 0 ||
              // eslint-disable-next-line
              this.specGroupsId[0].length == 0
            ) {
              this.ruleForm.skus = []
            } else {
              this.specGroups.forEach((v, i) => {
                const name = {
                  skuNames: v
                }
                _this.ruleForm.skus.push(name)
              })

              this.specGroupsId.forEach((v, index) => {
                _this.ruleForm.skus[index].specs = v
              })
            }
            this.rulesdialogVisible = false
          }
        } else if (this.dialogTitles === '编辑商品') {
          if (this.arrIdLength !== this.editArrIdLength) {
            this.$message.error('所有规格组必选一个规格值')
          } else {
            this.specGroups.forEach((v, i) => {
              const name = {
                skuNames: v
              }
              _this.finalData.skus.push(name)
            })

            this.specGroupsId.forEach((v, index) => {
              _this.finalData.skus[index].specs = v
            })

            this.copyResSkus.forEach((v, i) => {
              const data = {
                specs: v.specs
              }
              this.saveValue.push(data)
            })

            this.saveValue.forEach((v, index) => {
              this.specGroupsId.forEach((b, ii) => {
                // eslint-disable-next-line
                if (JSON.stringify(v.specs) == JSON.stringify(b)) {
                  this.finalData.skus[ii] = this.copyResSkus[index]
                }
              })
            })

            this.ruleForm.skus = this.finalData.skus
            this.closeSpec()
          }
        }
      }
    },

    // 删除规格组合
    deletSpces(val) {
      const index = this.ruleForm.skus.indexOf(val)
      this.ruleForm.skus.splice(index, 1)
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

    // 子传父
    request() {
      this.$emit('closeDialog', false)
      this.$emit('clearCheckbox', [])
      this.$emit('refresh')
    },

    checkValue(val) {
      if (typeof val !== 'number') {
        this.$message.error('请输入数字！！！')
      }

      if (val < 0) {
        this.$message.error('当前价格小于0无效！！！')
      }
    },

    // 获取编辑的items
    sendDate() {
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      const querydata = {
        spuId: this.$parent.editDatas.id
      }
      queryGoods(querydata).then(res => {
        if (res.errorCode === 9000) {
          this.ruleForm = res
          if (res.skus) {
            this.copyResSkus = Object.assign([], res.skus)
          }

          this.ruleForm.channels = res.channels.split(',')
          this.ruleForm.saleStatus = res.saleStatus.toString()
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 商品新增编辑提交
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.dialogTitles === '新增商品') {
            // eslint-disable-next-line
            if (this.ruleForm.existSpec == 1) {
              const key = 'isDefault'
              const value = '1'
              this.ruleForm.skus[0][key] = value
            }

            const tmp = Object.assign(this.ruleForm.channels.toString())
            this.ruleForm.channels = tmp

            createGoods(this.ruleForm).then(res => {
              if (res.errorCode === 9000) {
                this.$message({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })

                this.resetForm(ruleForm)
              } else {
                this.$message.error(res.errorMessage)
              }
            })
          } else if (this.dialogTitles === '编辑商品') {
            if (
              // eslint-disable-next-line
              this.ruleForm.existSpec == 1 &&
              // eslint-disable-next-line
              this.ruleForm.skus.length == 0
            ) {
              this.$message({
                title: '警告',
                message: '当前规格值不许为空！！！',
                type: 'warning',
                duration: 2000
              })
            } else {
              // eslint-disable-next-line
              if (this.ruleForm.existSpec == 1) {
                const key = 'isDefault'
                const value = '1'
                this.ruleForm.skus[0][key] = value
              }

              const tmp = Object.assign(this.ruleForm.channels.toString())
              this.ruleForm.channels = tmp
              updateGoods(this.ruleForm).then(res => {
                if (res.errorCode === 9000) {
                  this.$message({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success',
                    duration: 2000
                  })

                  this.resetForm(ruleForm)
                } else {
                  this.$message.error(res.errorMessage)
                }
              })
            }
          }
        } else {
          this.$message.error('提交错误！！！')
          return false
        }
      })
    },
    // 表单重置
    resetForm(ruleForm) {
      this.closeSpec()

      // 方式2
      // this.$nextTick(() => {
      //   this.$refs.ruleForm.clearValidate()
      // })
      this.$refs.ruleForm.clearValidate()

      this.ruleForm = {
        name: '', // 名称
        price: '', // 售价--无规格商品必填
        oriPrice: '', // 原价--无规格商品必填
        channels: [], // 销售渠道
        sortOrder: '', // 排序值
        saleStatus: '1', // 是否上架

        buyNotice: '', // 购买须知
        useNotice: '', // 使用须知
        refundNotice: '', // 退款须知
        categoryId: '', // 商品分类id

        cover: '', // 上传呢照片
        spuNo: '', // 商品spu编码
        barcode: '', // spu条形码
        existSpec: 0, // 是否启用商品规格--默认不启用
        skus: []
      }

      this.request()
      this.copyResSkus = []
      this.editArrIdLength = ''
    }
  }
}
