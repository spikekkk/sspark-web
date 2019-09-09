<template>
  <div class="roleWrapper" >
    <el-row class="roleContent">
      <el-col :span="10" :offset="1" class="roleContentCol">
        <el-card :body-style="{ padding: '0px' }" class="roleContentColContent">
          <div slot="header" class="clearfix">
            <span>角色信息</span>
          </div>
          <div style="padding: 0px 14px 14px 14px;">
            <el-row v-for="item in roleList" :key="item.id" class="role-info" >
              <template v-if="item.edStatus === 0" >
                <el-col :span="10" >
                  <el-button type="text" class="button" style="float:left;" @click="selectRole(item)">{{ item.name }}</el-button>
                </el-col>
                <template v-if="item.type === '1'">
                  <el-col :span="3" :offset="11" style="text-align:center;">
                    <el-button type="text" class="button" @click="copyRole(item)">复制</el-button>
                  </el-col>
                </template>
                <template v-else>
                  <el-col :span="3" :offset="5" style="text-align:center;">
                    <el-button type="text" class="button" @click="renameRole(item)">重命名</el-button>
                  </el-col>
                  <el-col :span="3" style="text-align:center;">
                    <el-button type="text" class="button" @click="copyRole(item)">复制</el-button>
                  </el-col>
                  <el-col :span="3" style="text-align:center;">
                    <el-button type="text" class="button" @click="delRole(item)">删除</el-button>
                  </el-col>
                </template>

              </template>
              <template v-else>
                <el-col :span="10" >
                  <el-input v-model="item.name" />
                </el-col>
                <el-col :span="3" :offset="8" style="text-align:center;">
                  <el-button type="text" class="button" @click="submitRenameRole(item)">确定</el-button>
                </el-col>
                <el-col :span="3" style="text-align:center;">
                  <el-button type="text" class="button" @click="cancelRenameRole(item)">取消</el-button>
                </el-col>
              </template>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="10" class="roleContentCol">
        <el-card :body-style="{ padding: '0px' }" class="roleContentColContent">
          <div slot="header" class="clearfix">
            <span>权限信息</span>
          </div>
          <div style="padding: 14px;">
            <el-tree
              ref="tree"
              :data="menus"
              :props="defaultProps"
              node-key="id"
              show-checkbox
              default-expand-all
              highlight-current />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { loadMenus } from '@/api/sys'

export default {
  data() {
    return {
      currentDate: new Date(),
      roleList: [],
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getRoles()
    this.getMenus()
  },
  methods: {
    getRoles() {
      /* loadRoles().then(res => {
        this.roleList = res.results.sort((a, b) => {
          return Number(a) - Number(b)
        }).map(e => {
          return {
            id: e['value'],
            name: e['label'],
            type: e['type'],
            menus: e['menus'] || '',
            edStatus: 0
          }
        })
      }) */
    },
    getMenus() {
      loadMenus().then(res => {
        this.menus = res.results
      })
    },
    selectRole(item) {
      const menuChecked = (item.menus || '').split(',')
      this.$refs.tree.setCheckedKeys(menuChecked)
    },
    renameRole(item) {
      item.edStatus = 1
    },
    copyRole(item) {

    },
    delRole(item) {

    },
    submitRenameRole(item) {
      item.edStatus = 0
    },
    cancelRenameRole(item) {
      item.edStatus = 0
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.roleWrapper {
  padding-top: 40px;
  padding-bottom: 40px;
  height: calc(100vh - 84px);
  .roleContent {
    height: 100%;
    .roleContentCol {
      height: 100%;
      .roleContentColContent {
        height: 100%;
      }
    }
    .role-info {
      padding: 10px 0px 10px 0px;
      border-bottom: solid 1px #ebeef5;
      height: 57px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
    }
  }
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
