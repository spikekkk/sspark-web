import {
  fetchMemberMgrList,
  fetchCardList,
  fetchOrderList,
  queryCustomerVerify
} from '@/api/hq/memberInfo'

import SideDialog from '@/components/SideDialog'
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
  components: {
    SideDialog
  },
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
          return {
            color: item.color
          }
        }
      }
      return {}
    }
  },

  data() {
    return {
      dialogVisible: false,
      loading: false,
      activeName: 'first', // tabs切换
      memberName: null,
      memberPhone: null,
      childNum: '',
      list: null,

      card_list: null, // 会员卡
      order_list: null, // 订单记录
      cancle_list: null, // 核销记录
      childDatas: [],
      childlist: [
        {
          value: '1',
          label: '有孩子'
        },
        {
          value: '0',
          label: '没孩子'
        }
      ],

      sideDialogShow: false,

      pageIndex: 1,
      pageSize: 20,
      totalCount: 0,

      canclepageIndex: 1,
      canclepageSize: 20,
      cancletotalCount: 0,

      orderpageIndex: 1,
      orderpageSize: 20,
      ordertotalCount: 0,

      cardpageIndex: 1,
      cardpageSize: 20,
      cardtotalCount: 0,

      temp: '',
      id: ''
    }
  },
  computed: {
    ...mapGetters(['dictInfo'])
  },

  created() {
    this.$store
      .dispatch('LoadDicts', 'sex,card_type,channel,order_status')
      .then(() => {
        const arr = this.dictInfo['sex']
        if (this.list && this.list.length > 0) {
          this.list = this.list.map(item => {
            item.genderCn = dictFilter(item.gender, arr)
            return item
          })
        }
      })
    this.getList()
  },
  methods: {
    getList() {
      const querydatas = {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex - 1,

        mobile: '' || this.memberPhone,
        name: '' || this.memberName,
        childs: '' || this.childNum
      }
      this.loading = true
      fetchMemberMgrList(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.list = res.results
          this.totalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
        this.loading = false
      })
    },
    // 会员卡查询
    getMembCardList(id) {
      const querydatas = {
        pageSize: this.cardpageSize,
        pageIndex: this.cardpageIndex - 1,
        id: id
      }

      fetchCardList(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.card_list = res.results
          this.cardtotalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 订单查询
    getOrderList(id) {
      const querydatas = {
        pageSize: this.orderpageSize,
        pageIndex: this.orderpageIndex - 1,
        id: id
      }
      fetchOrderList(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.order_list = res.results
          this.ordertotalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    // 核销订单查询
    getCancleList(id) {
      const querydatas = {
        pageSize: this.canclepageSize,
        pageIndex: this.canclepageIndex - 1,
        id: id
      }
      queryCustomerVerify(querydatas).then(res => {
        if (res.errorCode === 9000) {
          this.cancle_list = res.results
          this.cancletotalCount = parseInt(res.data.resultCount)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
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

    /* 分页条数触发*/
    pageSizeChange(val) {
      // eslint-disable-next-line
      if (this.activeName == 'first') {
        this.cardpageSize = val
        this.getMembCardList(this.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'second') {
        this.orderpageSize = val
        this.getOrderList(this.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'third') {
        this.canclepageSize = val
        this.getCancleList(this.id)
      }
    },
    /* 当前页的触发*/
    pageCurrentChange(val) {
      // eslint-disable-next-line
      if (this.activeName == 'first') {
        this.cardpageIndex = val
        this.getMembCardList(this.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'second') {
        this.orderpageIndex = val
        this.getOrderList(this.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'third') {
        this.canclepageIndex = val
        this.getCancleList(this.id)
      }
    },

    // tabs切换
    handleClick(tab, event) {
      this.id = this.temp.id
      // eslint-disable-next-line
      if (this.activeName == 'first') {
        this.getMembCardList(this.temp.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'second') {
        this.getOrderList(this.temp.id)
      }
      // eslint-disable-next-line
      if (this.activeName == 'third') {
        this.getCancleList(this.temp.id)
      }
    },

    // 打开侧边栏
    showSideDialogWithRow(row) {
      this.temp = Object.assign(
        {
          imageUrl: ''
        },
        row
      ) // copy obj
      this.activeName = 'first' //eslint-disable-line
      this.getMembCardList(row.id)
      this.id = this.temp.id
      this.sideDialogShow = true
    },

    searchRefresh() {
      this.memberName = ''
      this.memberPhone = ''
      this.childNum = ''
      this.getList()
    },

    showChildInfo(row) {
      this.dialogVisible = true
      this.childDatas = row.childrens
    }
  }
}
