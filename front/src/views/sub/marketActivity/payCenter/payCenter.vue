<template>
  <div class="pay_center">
    <el-tabs
      v-model="activeTabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="收付款账号"
        name="first"
      >
        <payAccount />

      </el-tab-pane>
      <el-tab-pane
        label="账号明细"
        name="second"
      >
        <accountDetail />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import payAccount from './components/payAccount'
import accountDetail from './components/accountDetail/accountDetail'
export default {
  components: {
    payAccount,
    accountDetail
  },
  data() {
    return {
      activeTabs: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
    }
  }
}
</script>
<style lang="scss" scoped>
.pay_center /deep/ {
  background-color: #ffff;
  margin-left: 10px;
  .el-tabs__nav-scroll {
    margin-left: 10px;
  }
}
</style>
