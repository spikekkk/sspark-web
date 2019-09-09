<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <div>
          <router-view :key="key"/>
        </div>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 68px);
  width: 100%;
  position: relative;
  padding: 20px 0 0 10px;
  box-sizing: border-box;
  /* overflow: hidden; */
  /* height: 100%; */
}
.breadcrumb-icon{
  height: 14px;
  width: 8px;
  background: #5D9CEC;
  border-radius: 3px;
  float: left;
  margin-right: 10px;
}
.app-main /deep/ .el-breadcrumb{
  padding: 0 10px;
  margin-bottom: 20px;
}
.app-main /deep/ .el-breadcrumb__inner{
  color: #666;
}
.app-main /deep/ .el-breadcrumb__separator{
  color: #666;
  font-weight: 500;
  margin: 0 10px 0px 5px;
}
</style>

