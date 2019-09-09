<template>
  <div class="staff_container">
    <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="人员管理" name="userMgr">
        <user-mgr v-if="activeTab=='userMgr'" tab-click />
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="roleMgr" class="role_box_style">
        <role-mgr v-if="activeTab=='roleMgr'" />
      </el-tab-pane>
      <el-tab-pane label="部门管理" name="deptMgr">
        <dept-mgr v-if="activeTab=='deptMgr'" ref="deptMgr"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script src="./staffMgr.js"></script>

<style rel="stylesheet/scss" lang="scss" >
  .staff_container{
    margin: 0 10px 0 10px;
    box-sizing: border-box;
    // .el-tabs__nav{
    //   background:linear-gradient(360deg,rgba(211,217,225,1) 0%,rgba(222,227,234,1) 100%);
    // }
    .el-tabs--border-card{
      border: 0;
      box-shadow: none;
      background: none;
    }
    .el-tabs--border-card>.el-tabs__header{
      background: #EFF2F6;
    }
    .el-tabs__nav-scroll{
      overflow: hidden;
      background: #EFF2F6;
      border: 0;
    }
    .el-tabs__item{
      width:100px;
      height:38px;
      border-radius:5px 5px 0px 0px;
      color: #666;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item{
      background: linear-gradient(360deg,rgba(211,217,225,1) 0%,rgba(222,227,234,1) 100%);
      margin-right: 3px;
      border: 0;
    }
    .el-tabs__header{
      margin: 0 0;
    }
    .is-active {
      color: #333;
      background-color: #fff !important;
      border-right-color: #dcdfe6;
      border-left-color: #dcdfe6;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      background: #fff !important;
      color: #333;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
      color: #333;
    }
    .el-tabs--border-card>.el-tabs__content{
      padding: 0;
    }
    .role_box_style{
      height: calc(100vh - 120px);
      background: #fff;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    /*滚动条样式*/
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块样式*/
      border-radius: 5px;
      background: #C8E2F8;
    }
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道样式*/
      border-radius: 0;
      background: #fff;
    }
  }

</style>
