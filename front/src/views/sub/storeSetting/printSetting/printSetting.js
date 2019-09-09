import { getPrintSetup, updatePrintSetup } from '@/api/sub/storeSetting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      syncPrint: '',
      printValue: '',
      printList: [],
      noticeText: '图片提示语',
      cover: '',
      activeName: 'first',
      radioType: '58mm', // radio切换
      json: '', // json格式字符串
      statusArr: '' // 字典获取的数据
    }
  },
  computed: {
    ...mapGetters(['dictInfo'])
  },
  filters: {
    dictFilter(status, arr, cname) {
      if (cname) {
        return cname
      }
      for (const item of arr || []) {
        if (String(item.value) === String(status)) {
          return item.label
        }
      }
      return status
    }
  },
  created() {
    // 调用字典的数据
    this.$store.dispatch('LoadDicts', 'receipt_spec').then(() => {
      this.statusArr = this.dictInfo['receipt_spec']
    })
  },
  mounted() {
    this.getPrinterList()
    this.getPrintSetting()
  },
  methods: {
    getPrinterCount() {
      return window.LODOP.GET_PRINTER_COUNT()
    },
    getPrinterName(iPrinterNO) {
      return window.LODOP.GET_PRINTER_NAME(iPrinterNO)
    },
    getPrinterList() {
      const arr = []
      for (let i = 0; i <= this.getPrinterCount(); i++) {
        const data = {
          name: this.getPrinterName(i),
          key: i
        }
        arr.push(data)
      }
      this.printList = arr
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      if (res.sucess) {
        this.cover = res.data.url
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
    /**
     * 获取打印设置
     */
    getPrintSetting() {
      getPrintSetup({}).then(res => {
        if (res.errorCode === 9000) {
          let printTabs = 'orderSetup'
          if (this.activeName === 'second') {
            printTabs = 'verifySetup'
          }
          if (this.activeName === 'third') {
            printTabs = 'shiftSetup'
          }

          this.radioType = res.printSetup[printTabs].receiptSpec
          this.cover = res.printSetup[printTabs].qrCode
          this.noticeText = res.printSetup[printTabs].qrCodeTips
          if (res.printSetup[printTabs].defaultPrinter) {
            this.printValue = parseInt(res.printSetup[printTabs].defaultPrinter)
          } else {
            this.printList.forEach((v, i) => {
              // eslint-disable-next-line
              if (v.name == window.LODOP.GET_PRINTER_NAME(-1)) {
                this.printValue = v.key
              }
            })
          }

          this.syncPrint = res.printSetup[printTabs].syncPrint
        } else {
          this.$message.error(res.errorMessage || '查询出错')
        }
      })
    },
    /* radio切换*/
    radioChange(val) {
      const printObj = {}
      printObj.receiptSpec = val
      this.json = JSON.stringify(printObj)
    },
    /* 更新打印配置*/
    updatePrintSetting() {
      const orderSetup = {
        receiptSpec: this.radioType,
        qrCode: this.cover,
        qrCodeTips: this.noticeText,
        defaultPrinter: this.printValue
      }
      // (orderSetup.receiptSpec = this.radioType),
      // (orderSetup.qrCode = this.cover),
      // (orderSetup.qrCodeTips = this.noticeText),
      // (orderSetup.defaultPrinter = this.printValue)

      const data = {
        printSetup: { orderSetup },
        printSetupType: '1'
      }
      if (this.activeName === 'second') {
        data.printSetupType = '2'
        data.printSetup.verifySetup = data.printSetup.orderSetup
        data.printSetup.verifySetup.syncPrint = this.syncPrint
        delete data.printSetup['orderSetup']
      }

      if (this.activeName === 'third') {
        data.printSetupType = '3'
        data.printSetup.shiftSetup = data.printSetup.orderSetup
        delete data.printSetup['orderSetup']
      }

      updatePrintSetup(data).then(res => {
        if (res.errorCode === 9000) {
          this.$message.success(res.errorMessage)
        } else {
          this.$message.error(res.errorMessage || '更新出错')
        }
      })
    },
    handleClick(tab, event) {
      this.getPrintSetting()
    }
  }
}
