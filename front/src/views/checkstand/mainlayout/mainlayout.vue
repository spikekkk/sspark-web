<template>
  <div class="layoutAll">
    <el-container>
      <el-header>
        <navbar />
      </el-header>
      <el-container>
        <el-aside width="150px">
          <sidebar class="sidebar-container" />
        </el-aside>
        <el-main>
          <tags-view />
          <AppMain />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
// import ResizeMixin from '../../layout/mixin/ResizeHandler'

export default {
  name: 'CashierLayout',
  components: {
    Navbar,
    AppMain,
    TagsView,
    Sidebar
  },
  // mixins: [ResizeMixin],
  data() {
    return {}
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    var _this = this
    this.timer = setInterval(function() {
      _this.currentTime = _this.$moment(new Date()).format('YYYY-MM-DD HH:mm')
    }, 1000)
  },
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除定时器
    }
  },
  methods: {
    // handleClickOutside() {
    //   this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.layoutAll /deep/ {
  min-width: 1000px;
  .el-container.is-vertical {
    overflow: hidden !important;
    .el-header {
      background: rgba(45, 61, 76, 1);
      box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);
      color: #333;
      text-align: center;
      line-height: 40px;
      height: 40px !important;
      padding: 6px 20px 6px 10px;
    }
    .el-aside {
      background-color: #2d3d4c;
      color: #333;
      text-align: center;
      height: calc(100vh - 40px);
      padding-top: 4px;
      .sidebar-container {
        position: static !important;
        width: 150px !important;
        .el-submenu__title {
          background: #2d3d4c !important;
          margin: 10px 0;
          color: #fff;
          height: 30px;
          line-height: 30px;
          text-align: start;
          padding-left: 16px !important;
          font-weight: 500;
          .el-submenu__icon-arrow {
            display: none !important;
          }
        }
        .el-submenu__title:hover {
          color: #fff !important;
        }
        .el-submenu__title:hover .title_name i {
          color: #fff !important;
        }
        .el-submenu__title:hover .el-submenu__title i {
          color: #fff !important;
        }
        .el-submenu .el-menu-item {
          min-width: 0;
          height: 40px;
          line-height: 40px;
          text-align: start;
          padding-left: 46px !important;
          background: #273544 !important;
          font-size: 12px;
          font-weight: 500;
        }
        .el-submenu .el-menu-item:hover {
          color: #fff !important;
        }
        .el-submenu .el-menu-item.is-active {
          background: #1a252f !important;
        }
        .el-submenu.is-active .el-submenu__title {
          color: #fff !important;
        }
        .el-submenu.is-active .el-submenu__title i {
          color: #fff !important;
        }
        .el-submenu [class^="el-icon-"] {
          margin-right: 0;
          position: absolute;
          top: 12px;
          right: -9px;
          // color: #EFF2F6;
        }
        .el-menu-item.is-active i {
          color: #eff2f6;
          display: block;
        }
        .el-menu-item i {
          display: none;
        }
        .title_name i {
          position: static !important;
          margin-right: 6px !important;
          vertical-align: text-bottom;
        }
        .el-menu .el-menu-item.is-active {
          border-left: 4px solid #5d9cec;
          padding-left: 42px !important;
        }
      }
    }
    .el-main {
      background-color: #eff2f6;
      color: #333;
      height: calc(100vh - 30px);
      padding: 0;
    }
  }
}
</style>
