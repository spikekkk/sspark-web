const Base = require('./../base.js');
const edenServerEureka = think.config('eden_server_eureka');
const baseUrl = think.config('baseUrl');

module.exports = class extends Base {
  // 门店管理---人员管理列表
  async queryListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============人员 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/user/queryUser', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---新增人员
  async createUserAction() {
    const postData = this.ctx.request.body.post;
    console.log('============新增人员 postData===============', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/user/addUser', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---编辑更新人员
  async updateUserAction() {
    const postData = this.ctx.request.body.post;
    console.log('============编辑人员显示信息 postData===============', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/user/getUser', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---确定编辑更新人员按钮
  async updateUserBtnAction() {
    const postData = this.ctx.request.body.post;
    console.log('============确定编辑人员显示信息 postData============', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/user/updateUser', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---删除人员
  async deleteUserAction() {
    const postData = this.ctx.request.body.post;
    console.log('============删除人员 postData===============', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/user/deleteUser', postData).then(res => res.json());
    this.body = json;
  }
  
  // 门店管理---部门管理列表
  async queryDeptListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============部门列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/department/queryDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---新增部门
  async createDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门新增 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/department/addDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---查看编辑部门信息
  async updateDeptAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/department/getDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---确定编辑部门信息
  async updateDeptBtnAction() {
    const postData = this.ctx.request.body.post;
    console.log('=============部门编辑查看 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/department/updateDepartment', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---角色管理列表
  async queryRoleListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============角色列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/queryRole', postData).then(res => res.json());
    this.body = json;
  }
   // 门店管理---角色下拉框列表
   async queryRoleListDownAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============角色下拉框列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/queryRoleList', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---角色对应权限菜单列表
  async queryRoleMenuAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============权限菜单 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/queryRoleMenuTree', postData).then(res => res.json());
    this.body = json;
  }
   // 门店管理---复制角色
   async copyRoleListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============复制角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/copyRole', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---新增角色
  async createRoleAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============新增角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/addRole', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---新增角色
  async updateRoleNameAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============编辑角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/updateRole', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---删除角色名称
  async deleteRoleNameAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============删除角色 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/deleteRole', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---保存角色权限
  async saveRoleMenusAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============保存角色权限 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/shop/role/bindRoleMenus', postData).then(res => res.json());
    this.body = json;
  }
  // 门店管理---交班管理列表
  async queryhandsListAction() {
    const postData = this.ctx.request.body.post || {};
    console.log('=============交班管理列表 postData ================', postData);
    const json = await this.postJson(edenServerEureka, baseUrl + '/counter/shift/queryList', postData).then(res => res.json());
    this.body = json;
  }
};
