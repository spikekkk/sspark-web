<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#2D3D4C"
      text-color="#B3C1C8"
      active-text-color="#fff"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" class="siderbar_list_style"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    // this.$router.push('/dashboard/index')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .siderbar_list_style /deep/{
    .title_name{
      // color: #A8B5BC;
      margin-right: 30px;
      i{
        color: #A8B5BC;
      }
    }
    .el-submenu, .el-menu-item{
      min-width: 150px;
      box-sizing: border-box;
    }
  }
</style>

