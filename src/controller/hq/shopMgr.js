const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 总店管理----门店管理列表
  async queryHqShopListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============门店管理列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/shop/queryHqShopList', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理----新增门店
  async addHqShopAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============新增门店 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/shop/addHqShop', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理----查看门店详情
  async getHqShopAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============查看门店详情 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/shop/getHqShop', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理----编辑门店信息
  async updateHqShopAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============编辑门店信息 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/shop/updateHqShop', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理----启用禁用门店
  async setHqShopStatusAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============启用禁用门店 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/shop/setHqShopStatus', postData).then(res => res.json());
    this.body = json;
  }
   // 总店管理---部门管理列表
   async queryHqDepartmentAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============部门列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/queryHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---新增部门
  async createDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门新增 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/addHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---查看编辑部门信息
  async updateDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/getHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---确定编辑部门信息
  async updateDeptBtnAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/updateHqDepartment', postData).then(res => res.json());
    this.body = json;
  }

//人员管理--start
// 总店管理---查询人员管理列表
async queryListAction() {
  const postData = this.ctx.request.body.post || {};
  console.log('=============人员 postData ================', postData);
  const json = await this.postJson(edenServerEureka, baseUrl + '/hq/user/queryHqUser', postData).then(res => res.json());
  this.body = json;
}
// 总店管理---新增人员
async createUserAction() {
  const postData = this.ctx.request.body.post;
  console.log('============新增人员 postData===============', postData);
  const json = await this.postJson(edenServerEureka, baseUrl + '/hq/user/addHqUser', postData).then(res => res.json());
  this.body = json;
}
// 总店管理---编辑更新人员
async updateUserAction() {
  const postData = this.ctx.request.body.post;
  console.log('============编辑人员显示信息 postData===============', postData);
  const json = await this.postJson(edenServerEureka, baseUrl + '/hq/user/getHqUser', postData).then(res => res.json());
  this.body = json;
}
// 总店管理---确定编辑更新人员按钮
async updateUserBtnAction() {
  const postData = this.ctx.request.body.post;
  console.log('============确定编辑人员显示信息 postData============', postData);
  const json = await this.postJson(edenServerEureka, baseUrl + '/hq/user/updateHqUser', postData).then(res => res.json());
  this.body = json;
}
// 总店管理---删除人员
async deleteUserAction() {
  const postData = this.ctx.request.body.post;
  console.log('============删除人员 postData===============', postData);
  const json = await this.postJson(edenServerEureka, baseUrl + '/hq/user/deleteHqUser', postData).then(res => res.json());
  this.body = json;
}



  // 总店管理---获取部门管理列表
  async queryDeptListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============部门列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/queryHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---新增部门
  async createDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门新增 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/addHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---查看编辑部门信息
  async updateDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/getHqDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---确定编辑部门信息
  async updateDeptBtnAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/updateHqDepartment', postData).then(res => res.json());
    this.body = json;
  }

    // 总店管理---确定编辑部门信息
    async deleteDeptBtnAction() {
      const postData = this.ctx.request.body.post;
      console.log('=============部门编辑查看 postData ================', postData);
      const json = await this.postJson(edenServerEureka, baseUrl + '/hq/department/deleteHqDepartment', postData).then(res => res.json());
      this.body = json;
    }





  // 总店管理---角色管理列表
  async queryRoleListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============角色列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/queryHqRole', postData).then(res => res.json());
    this.body = json;
  }
   // 总店管理---角色下拉框列表
   async queryRoleListDownAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============角色下拉框列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/queryHqRoleList', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---角色对应权限菜单列表
  async queryRoleMenuAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============权限菜单 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/queryHqRoleMenuTree', postData).then(res => res.json());
    this.body = json;
  }
   // 总店管理---复制角色
   async copyRoleListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============复制角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/copyHqRole', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---新增角色
  async createRoleAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============新增角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/addHqRole', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---编辑角色
  async updateRoleNameAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============编辑角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/updateHqRole', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---删除角色名称
  async deleteRoleNameAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============删除角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/deleteHqRole', postData).then(res => res.json());
    this.body = json;
  }
  // 总店管理---保存角色权限
  async saveRoleMenusAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============保存角色权限 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/hq/role/bindHqRoleMenu', postData).then(res => res.json());
    this.body = json;
  }


  
}