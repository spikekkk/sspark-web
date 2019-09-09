<template>
  <div class="dashboardWrap">
    <div class="dashboard_container">
      <!-- <component :is="currentRole"/> -->
      <div class="dashboard_top">
        <div class="dash_top_left">
          <div class="dash_left_text1">乐客云</div>
          <div class="dash_left_text2">一站式亲子乐园经营平台</div>
          <div class="dash_left_text3"><span /></div>
          <div class="dash_left_text4">
            <p>乐客云是针对中小型游乐场的经营管理推出的一款系</p>
            <p>统，包括了管理后台，收银台，让经营者轻松完成店铺</p>
            <p>收银，数据统计，员工管理等各项日常运营活动</p>
          </div>
        </div>
        <div class="dash_top_right">
          <img
            src="https://img.ishanshan.com/gimg/n/20181203/75c25a886f252f5661c4aca5a6560aab"
            alt=""
          >
        </div>
      </div>
      <div class="dashboard_bottom">
        <div class="dash_bot_sys">
          <div class="dash_bot_icon">
            <img
              src="https://img.ishanshan.com/gimg/n/20181204/3a7b7f2be6f8eaf721e61ad34e22cf71"
              alt=""
            >
          </div>
          <div class="dash_sys_text">商品</div>
          <div class="dash_sys_detail">
            <div>支持门票，会员卡，游乐园零</div>
            <div>售商品的管理，销售</div>
          </div>
        </div>
        <div class="dash_bot_sys">
          <div class="dash_bot_icon">
            <img
              src="https://img.ishanshan.com/gimg/n/20181204/0f9800106e496ab676d9e549a565ee73"
              alt=""
            >
          </div>
          <div class="dash_sys_text">会员</div>
          <div class="dash_sys_detail">
            <div>追踪会员消费行为，让营销更</div>
            <div>有针对性</div>
          </div>
        </div>
        <div class="dash_bot_sys">
          <div class="dash_bot_icon">
            <img
              src="https://img.ishanshan.com/gimg/n/20181204/84808ce9600d210cad2ba22fa397e049"
              alt=""
            >
          </div>
          <div class="dash_sys_text">收银</div>
          <div class="dash_sys_detail">
            <div>收银高效，灵活，线下排队说</div>
            <div>再见</div>
          </div>
        </div>
        <div class="dash_bot_sys">
          <div class="dash_bot_icon">
            <img
              src="https://img.ishanshan.com/gimg/n/20181204/3b95617da1a8a67dd7220b9a6537a861"
              alt=""
            >
          </div>
          <div class="dash_sys_text">订单</div>
          <div class="dash_sys_detail">
            <div>一览全店所有各种订单，门店</div>
            <div>订单全知晓</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      // 默认的显示模块
      // currentRole: 'adminDashboard'
    }
  },
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
  },
  created() {
    // 判定用户的权限--选择显示
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .dashboardWrap{
//   height: 100%;
//   width: 100%;
// }
.dashboard_container /deep/ {
  background: #fff;
  height: calc(100vh - 98px);
  // margin: 10px;
  margin-top: 0;
  padding: 0 53px;
  box-sizing: border-box;
  overflow: auto;
  min-width: 1169px;
  /*滚动条样式*/
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块样式*/
    border-radius: 5px;
    background: #c8e2f8;
  }
  ::-webkit-scrollbar-track {
    /*滚动条里面轨道样式*/
    border-radius: 0;
    background: #fff;
  }
  .dashboard_top {
    margin-top: 120px;
    display: flex;
    justify-content: center;
    .dash_top_left {
      padding: 44px 0;
      box-sizing: border-box;
      margin-right: 100px;
      min-width: 396px;
      .dash_left_text1 {
        font-size: 36px;
        color: #333;
        font-weight: 600;
        position: relative;
        line-height: 50px;
        span {
          width: 90px;
          display: inline-block;
          border: 2px solid;
          position: absolute;
          top: 20px;
          margin-left: 10px;
        }
      }
      .dash_left_text2 {
        font-size: 36px;
        color: #333;
        font-weight: 600;
        line-height: 50px;
        margin-top: 20px;
      }
      .dash_left_text3 {
        margin: 30px 0;
        line-height: 18px;
        height: 3px;
        position: relative;
        span {
          border-top: 3px solid #6cabef;
          display: inline-block;
          width: 60px;
          position: absolute;
        }
      }
      .dash_left_text4 {
        font-size: 16px;
        color: #333;
        font-weight: 400;
        margin-top: 10px;
      }
    }
    .dash_top_right {
      width: 598px;
      height: 368px;
      // border: 1px dashed #eee;
    }
  }
  .dashboard_bottom {
    margin-top: 80px;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    .dash_bot_sys {
      margin: 0 50px;
      text-align: center;
      .dash_bot_icon {
        width: 120px;
        height: 120px;
        // border: 1px dashed #ddd;
        padding: 10px;
        box-sizing: border-box;
        margin-left: 45px;
        img {
          width: 100%;
        }
      }
      .dash_sys_text {
        color: #333;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-top: 12px;
      }
      .dash_sys_detail {
        font-size: 16px;
        color: #666;
        line-height: 22px;
        margin-top: 10px;
        min-width: 208px;
      }
    }
    .dash_bot_sys:nth-child(1) {
      margin-right: 35px;
    }
    .dash_bot_sys:nth-child(4) {
      margin-left: 35px;
    }
  }
}
</style>
