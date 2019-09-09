import {
  fetchOrderMgrList,
  queryEmployeeList // 员工查询
} from '@/api/sub/orderMgr'

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

  data() {
    return {
      employeeDatas: [], // 员工信息

      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,

      loading: false,

      listQuery: {
        purchaseId: '',
        orderStatus: '',
        nameTel: '',
        orderChannel: '',
        dataTimes: [],
        cashierId: ''
      },

      orderList: null
    }
  },
  computed: {
    ...mapGetters(['dictInfo'])
  },

  mounted() {
    this.getList()
    // this.filters()
  },

  created() {
    this.getEmployee()
    this.$store
      .dispatch('LoadDicts', 'order_status,pay_type,channel')
      .then(() => {
        const arr = this.dictInfo['order_status']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
  },

  methods: {
    getList() {
      const querydatas = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        purchaseId: this.listQuery.purchaseId || '',
        orderStatus: this.listQuery.orderStatus || '',
        nameTel: this.listQuery.nameTel || '',
        orderChannel: this.listQuery.orderChannel || '',

        startTime: this.listQuery.dataTimes[0] || '',
        endTime: this.listQuery.dataTimes[1] || '',
        cashierId: this.listQuery.cashierId || ''
      }
      this.loading = true
      fetchOrderMgrList(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.orderList = res.results
          this.totalCount = parseInt(res.data.resultCount)
          //  this.unique(this.orderList)
        } else {
          this.$message.error(res.errorMessage)
        }
        this.loading = false
      })
    },

    // 获取员工数据
    getEmployee() {
      const data = {
        hq: 'shop'
      }
      queryEmployeeList(data).then(res => {
        if (res.errorCode === 9000) {
          this.employeeDatas = res.userList
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    /* 刷新 */
    refresh(formName) {
      this.$refs[formName].resetFields()
      this.pageIndex = 1
      this.getList()
    },

    /* 分页条数触发*/
    sizeChange(val) {
      this.pageSize = val
      this.getList()
    },

    /* 当前页的触发*/
    currentChange(val) {
      this.pageIndex = val
      this.getList()
    },

    handleFilter() {
      this.pageIndex = 1
      this.getList()
    }
  }
}
