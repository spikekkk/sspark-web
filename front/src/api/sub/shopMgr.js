import request from '@/utils/request'

// 门店管理---人员管理列表
export function fetchShopMgrList(data) {
  return request({
    url: '/sub/shopMgr/queryList',
    method: 'post',
    data: data
  })
}

// 门店管理---新增人员信息
export function createShopUser(data) {
  return request({
    url: '/sub/shopMgr/createUser',
    method: 'post',
    data: data
  })
}

// 门店管理---编辑更新人员信息
export function updateShopUser(data) {
  return request({
    url: '/sub/shopMgr/updateUser',
    method: 'post',
    data: data
  })
}

// 门店管理---确定编辑更新人员信息
export function updateShopUserBtn(data) {
  return request({
    url: '/sub/shopMgr/updateUserBtn',
    method: 'post',
    data: data
  })
}

// 门店管理---删除人员信息
export function deleteShopUser(data) {
  return request({
    url: '/sub/shopMgr/deleteUser',
    method: 'post',
    data: data
  })
}

// 门店管理---部门管理列表
export function fetchDeptList(data) {
  return request({
    url: '/sub/shopMgr/queryDeptList',
    method: 'post',
    data: data
  })
}

// 门店管理---新增部门
export function createAddDept(data) {
  return request({
    url: '/sub/shopMgr/createDept',
    method: 'post',
    data: data
  })
}

// 门店管理---查看编辑部门信息
export function updateAddDept(data) {
  return request({
    url: '/sub/shopMgr/updateDept',
    method: 'post',
    data: data
  })
}

// 门店管理---确定编辑部门信息
export function updateAddDeptBtn(data) {
  return request({
    url: '/sub/shopMgr/updateDeptBtn',
    method: 'post',
    data: data
  })
}

// 门店管理---角色管理列表
export function fetchRoleList(data) {
  return request({
    url: '/sub/shopMgr/queryRoleList',
    method: 'post',
    data: data
  })
}

// 门店管理---角色下拉框列表
export function queryRoleListDown(data) {
  return request({
    url: '/sub/shopMgr/queryRoleListDown',
    method: 'post',
    data: data
  })
}

// 门店管理---角色对应权限菜单列表
export function fetchRoleMenuList(data) {
  return request({
    url: '/sub/shopMgr/queryRoleMenu',
    method: 'post',
    data: data
  })
}

// 门店管理---新增角色
export function createAddRole(data) {
  return request({
    url: '/sub/shopMgr/createRole',
    method: 'post',
    data: data
  })
}

// 门店管理---复制角色
export function copyRoleList(data) {
  return request({
    url: '/sub/shopMgr/copyRoleList',
    method: 'post',
    data: data
  })
}

// 门店管理---编辑角色
export function updateRoleName(data) {
  return request({
    url: '/sub/shopMgr/updateRoleName',
    method: 'post',
    data: data
  })
}

// 门店管理---删除角色名称
export function deleteRoleName(data) {
  return request({
    url: '/sub/shopMgr/deleteRoleName',
    method: 'post',
    data: data
  })
}

// 门店管理---删除角色名称
export function saveRoleMenus(data) {
  return request({
    url: '/sub/shopMgr/saveRoleMenus',
    method: 'post',
    data: data
  })
}

// 门店管理---交班管理列表
export function fetchHandsList(data) {
  return request({
    url: '/sub/shopMgr/queryhandsList',
    method: 'post',
    data: data
  })
}
