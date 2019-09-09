<template>
  <transition name="slide-fade">
    <div v-show="isVisible" class="side-custr-info" >
      <div class="info-wrapper">
        <el-row>
          <el-button icon="el-icon-circle-close-outline" circle style="border:0px;font-size:20px;float:right;" @click="handleClose"/>
        </el-row>
        <el-row class="custr-base-info-wrapper">
          <el-row>
            <el-col :span="20" :offset="1">
              <div class="avatar-wrapper" style="float:left;">
                <img src="https://img.ishanshan.com/gimg/n/20181014/cf29391eaa75489ae53427ef175066f6" class="user-avatar">
              </div><span class="grid-content info_head">{{ c.name }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">客户类型：{{ ca.category }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">账号：{{ ca.acctNo }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">卡号：{{ ca.cardNo }}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">联系电话：{{ c.mobile }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">公司电话：{{ c.busiPhone }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">住宅电话：{{ c.homePhone }}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">开户日期：{{ ca.dayOpened }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">账单日：{{ ca.cycleNbr }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">逾期期数：{{ ca.mthsOdue }}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">逾期金额：{{ ca.lastOdueAmount }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">电催次数：{{ ca.acTimes }}</span></el-col>
            <el-col :span="6" :offset="2"><span class="grid-content info_label">人催次数：{{ ca.mcTimes }}</span></el-col>
          </el-row>
          <el-row style="margin-top:15px;">
            <el-col :span="22" :offset="1">
              <el-tabs v-model="activeTab" type="border-card" @tab-click="handleTabClick">
                <el-tab-pane label="联系人" name="first">
                  <keep-alive>
                    <custr-relp v-if="activeTab=='first'" :custr-id="custrId"/>
                  </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="账单信息" name="second">
                  <keep-alive>
                    <custr-bill-list v-if="activeTab=='second'" :acct-id="acctId"/>
                  </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="智能催收记录" name="third">
                  <keep-alive>
                    <custr-ac-list v-if="activeTab=='third'" :acct-id="acctId"/>
                  </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="人工催收记录" name="fourth">
                  <keep-alive>
                    <custr-mc-list v-if="activeTab=='fourth'" :acct-id="acctId"/>
                  </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="客户经理记录" name="five">
                  <keep-alive>
                    <custr-m-list v-if="activeTab=='five'" :acct-id="acctId"/>
                  </keep-alive>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </el-row>
      </div>
    </div>
  </transition>
</template>

<script>
import { fetchCustrInfo } from '@/api/workbench'
import CustrRelp from './custrRelp'
import CustrBillList from './custrBillList'
import CustrAcList from './custrAcList'
import CustrMcList from './custrMcList'
import CustrMList from './custrMList'

export default {
  name: 'CustrInfo',
  components: {
    CustrRelp,
    CustrBillList,
    CustrAcList,
    CustrMcList,
    CustrMList
  },
  props: {
    'visible': {
      type: Boolean,
      default: true
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isVisible: this.visible,
      activeTab: '',
      custrId: 0,
      acctId: 1,
      c: {},
      ca: {}
    }
  },
  watch: {
    'visible'(val) {
      this.isVisible = val
    },
    'isVisible'(val) {
      this.$emit('update:visible', val)
    },
    'params'(n, o) {
      this.activeTab = this.activeTab === '0' ? 'first' : this.activeTab
      this.custrId = n.custrId
      this.acctId = n.acctId
      if (n.acctId !== o.acctId) {
        this.getCustrInfo()
      }
    }
  },
  methods: {
    getCustrInfo() {
      fetchCustrInfo(this.acctId).then(res => {
        this.c = res.data.c
        this.ca = res.data.ca
      })
    },
    handleClose() {
      this.isVisible = false
    },
    handleTabClick() {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.side-custr-info {
    top:0px;
    right: 0px;
    z-index:10;
    width:80%;
    position:absolute;
    margin-left:-20px;
    height:calc(100vh - 84px);
    background-color: #ffffff;
    -moz-box-shadow:2px 2px 5px #333333;
    -webkit-box-shadow:2px 2px 5px #333333;
    box-shadow:2px 2px 5px #333333;
    .custr-base-info-wrapper{
      padding: 20px;
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .info_label {
        text-align: right;
        float: left;
        font-size: 14px;
        font-weight: bold;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .info_head {
        text-align: right;
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      .info_content {
        text-align: left;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}
.avatar-wrapper {
  cursor: pointer;
  margin-top: 5px;
  position: relative;
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
