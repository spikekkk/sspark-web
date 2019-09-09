<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="lineNumber"
        label="行号"
      />
      <el-table-column
        prop="name"
        label="会员名称"
      />
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120px"
      />
      <el-table-column
        v-if="dialogTitle==='会员卡导入'"
        prop="cardType"
        label="卡类型"
        width="120px"
      />
      <el-table-column
        prop="validName"
        label="是否有效"
      />
      <el-table-column
        prop="reason"
        show-overflow-tooltip
        label="描述信息"
      />
      <el-table-column
        prop="otherReason"
        show-overflow-tooltip
        label="其他描述信息"
      />
      <el-table-column
        v-if="dialogTitle==='会员卡导入'"
        label="剩余天数/充值余额"
        prop="prop1"
      />
      <el-table-column
        v-if="dialogTitle==='会员卡导入'"
        label="剩余次数/赠送余额"
        prop="prop2"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="sex"
        label="性别"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child1Name"
        label="子女1姓名"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child1Sex"
        label="子女1性别"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child1Birthday"
        label="子女1生日"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child2Name"
        label="子女2姓名"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child2Sex"
        label="子女2性别"
      />
      <el-table-column
        v-if="dialogTitle==='会员导入'"
        prop="child2Birthday"
        label="子女2生日"
      />
      <el-table-column
        v-if="activeStep===2"
        prop="statusName"
        label="已导入数据"
      />
    </el-table>

  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {

  data() {
    return {

    }
  },
  computed: {
    ...mapState('importStep', ['tableData', 'dialogTitle', 'activeStep'])
  },
  method: { /* 分页条数触发*/

  }
}
</script>
<style lang="scss" scoped>
</style>
