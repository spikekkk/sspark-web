<template>
  <div>
    <CommonSearch
      :is-inline="true"
      :params="formInline"
      :forms="formInline"
      @toParent="resetFieldHanle"
    />
    <el-button
      type="primary"
      class="fr"
      @click="exportExcel('classDatas')"
    >导出</el-button>

    <div style="padding-bottom: 10px;">
      <span>收入：</span><span style="color: #108ee9;font-size: 22px;font-weight: 700;">{{ count }}</span>元
      <span style="margin-left:10px">数量：<span>{{ num }}笔</span></span>
    </div>

    <el-table
      :data="tableData"
      :height="tableHeight"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="tradeNo"
        label="交易单号"
      />
      <el-table-column
        prop="businessType"
        label="业务类型"
      />
      <el-table-column
        prop="businessName"
        label="业务名称"
      />
      <el-table-column
        prop="payUser"
        label="发生人"
      />
      <el-table-column
        prop="payAmount"
        label="发生金额"
      />
      <el-table-column
        prop="status"
        label="支付状态"
      />
      <el-table-column
        prop="modifyTime"
        label="提交时间"
      />
    </el-table>
  </div>
</template>

<script>
import { queryPayOrderMsgList, queryPayOrderTotal, queryPayTelBankMsg } from '@/api/sub/payAccount' //eslint-disable-line
// import { exportFile } from '@/utils/exportFile'
import CommonSearch from '@/components/CommonSearch/CommonSearch'

export default {
  components: {
    CommonSearch
    // CommonTable
  },

  data() {
    return {
      tableData: [],
      count: '',
      num: '',

      changeTabs: '',

      listQuery: {
        show: true // 是否显示
      },
      columns: [

        {
          label: '编号',
          prop: 'id',

          formatter: (row, column, cellValue) => {
            return `<div style="color:#1D9DF2;text-overflow:ellipsis;overflow:hidden">${row.id}</div>`
          }
        },
        {
          label: '交易单号',
          prop: 'tradeNo'
        },
        {
          label: '业务类型',
          prop: 'businessType'
        },
        {
          label: '业务名称',
          prop: 'businessName',
          render: (h, params) => {
            return h('span', { style: 'height:20px' }, [
              h('el-popover', {
                props: { placement: 'top', trigger: 'hover', content: params.row.businessName }
              }, [
                h('a', { slot: 'reference' }, params.row.businessName)
              ])
            ])
          }
        },
        {
          label: '发生人',
          prop: 'payUser'
        },
        {
          label: '发生金额',
          prop: 'payAmount'
        }, {
          label: '支付状态',
          prop: 'status'
        },

        {
          label: '提交时间',
          prop: 'modifyTime'
        }
      ],
      optionsTab: {
        // apiService: queryPayOrderMsgList, // 表格的数据请求接口
        isSettingShow: true, // 是否出现设置,
        params: {
          status: '1',
          startTime: this.$moment().subtract(1, 'months').format('YYYY-MM-DD'),
          endTime: this.$moment().format('YYYY-MM-DD')
        }
      },
      tableHeight: 'calc(100vh - 347px)',
      formInline: {
        searchMethod: (formValue) => {
          this.searchHandle(formValue)
        },
        modifyTime: [
          this.$moment().subtract(1, 'months').format('YYYY-MM-DD'),
          this.$moment().format('YYYY-MM-DD')
        ],
        forms: [

          {
            itemType: 'datePicker',
            datePickerType: 'daterange',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期',
            valueFormat: 'yyyy-MM-dd',
            modelValue: 'modifyTime',
            itemStyle: 'width:231px',
            isClearable: true,
            toChange: 'dateChange'
          },
          {
            itemType: 'select',
            placeholder: '业务类型',
            modelValue: 'businessType',
            isClearable: true,
            selectOption: [
              {
                label: '微游戏',
                value: '10'
              }, {
                label: '微活动',
                value: '11'
              }, {
                label: '微官网活动',
                value: '12'
              }
            ]
          },
          {
            itemType: 'input',
            placeholder: '业务名称',
            modelValue: 'name',
            isClearable: true
          }

        ]
      },
      formValue: {}
    }
  },

  mounted() {
    this.searchHandle()
    this.queryPayOrderMsgList()
  },

  methods: {
    queryPayOrderMsgList(params) {
      queryPayOrderMsgList(params).then(res => {
        if (res.errorCode === 9000) {
          this.tableData = res.result
          console.log('res--->', res)
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    getOrderTotal(params) {
      queryPayOrderTotal(params).then(res => {
        if (res.errorCode === 9000) {
          this.count = res.data.count
          this.num = res.data.num
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },

    searchHandle(formValue) {
      // 搜索的入参
      const params = {
        startTime: this.formInline.modifyTime[0],
        endTime: this.formInline.modifyTime[1],
        status: this.changeTabs === '退款明细' ? '4' : '1',
        tabsKey: this.changeTabs === '退款明细' ? 'refundDetails' : 'paymentDetails'
      }
      if (formValue) {
        this.formValue = formValue
        if (this.formValue.name) {
          params.businessName = this.formValue.name
        }

        if (this.formValue.businessType) {
          params.businessType = this.formValue.businessType
        }

        if (this.formValue.modifyTime) {
          params.startTime = this.formValue.modifyTime[0]
          params.endTime = this.formValue.modifyTime[1]
        }
      }

      this.getOrderTotal(params)
      this.queryPayOrderMsgList(params)
    },
    /* 搜索重置 */
    resetFieldHanle(formName) {
      // 重置的入参
      const params = {
        pageIndex: 0,
        startTime: this.formInline.modifyTime[0],
        endTime: this.formInline.modifyTime[1],
        status: this.changeTabs === '退款明细' ? '4' : '1'
      }
      this.queryPayOrderMsgList(params)
    },
    // 导出
    exportExcel() {
      const params = {
        status: this.changeTabs === '退款明细' ? '4' : '1',
        startTime: this.formInline.modifyTime[0],
        endTime: this.formInline.modifyTime[1],
        name: this.formInline.name,
        businessType: this.formInline.businessType
      }

      if (this.formValue.modifyTime) {
        params.startTime = this.formValue.modifyTime[0]
        params.endTime = this.formValue.modifyTime[1]
      }

      for (const key in params) {
        if (!params[key]) {
          delete params[key]
        }
      }
      if (this.$refs.tableCommon.totalCount > 0) {
        // exportFile(`${window.SYS_URL}/sysBase/payment/export`, params)
      } else {
        this.$message.error('暂无数据导出')
      }
    },
    // 调用两个路径
    changeTabName(val) {
      this.changeTabs = val
      this.$nextTick(() => {
        this.searchHandle()
      })
    }

  }
}
</script>
