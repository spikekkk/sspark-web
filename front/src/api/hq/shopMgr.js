import request from '@/utils/request'

// 总店管理---门店管理列表
export function queryHqShopList(data) {
  return request({
    url: '/hq/shopMgr/queryHqShopList',
    method: 'post',
    data: data
  })
}

// 总店管理---新增门店
export function addHqShop(data) {
  return request({
    url: '/hq/shopMgr/addHqShop',
    method: 'post',
    data: data
  })
}

// 总店管理---查看门店详情
export function getHqShop(data) {
  return request({
    url: '/hq/shopMgr/getHqShop',
    method: 'post',
    data: data
  })
}

// 总店管理---编辑门店信息
export function updateHqShop(data) {
  return request({
    url: '/hq/shopMgr/updateHqShop',
    method: 'post',
    data: data
  })
}

// 总店管理---启用禁用门店
export function setHqShopStatus(data) {
  return request({
    url: '/hq/shopMgr/setHqShopStatus',
    method: 'post',
    data: data
  })
}

// 总店管理---部门管理列表
export function queryHqDepartment(data) {
  return request({
    url: '/hq/shopMgr/queryHqDepartment',
    method: 'post',
    data: data
  })
}

// 总店管理---新增部门
export function createAddDept(data) {
  return request({
    url: '/hq/shopMgr/createDept',
    method: 'post',
    data: data
  })
}

// 总店管理---删除部门
export function deleteAddDept(data) {
  return request({
    url: '/hq/shopMgr/createDept',
    method: 'post',
    data: data
  })
}

// 总店管理---查看编辑部门信息
export function updateAddDept(data) {
  return request({
    url: '/hq/shopMgr/updateDept',
    method: 'post',
    data: data
  })
}

// 总店管理---确定编辑部门信息
export function updateAddDeptBtn(data) {
  return request({
    url: '/hq/shopMgr/updateDeptBtn',
    method: 'post',
    data: data
  })
}

// 总店管理---人员管理列表
export function fetchShopMgrList(data) {
  return request({
    url: '/hq/shopMgr/queryList',
    method: 'post',
    data: data
  })
}

// 总店管理---新增人员信息
export function createShopUser(data) {
  return request({
    url: '/hq/shopMgr/createUser',
    method: 'post',
    data: data
  })
}

// 总店管理---编辑更新人员信息
export function updateShopUser(data) {
  return request({
    url: '/hq/shopMgr/updateUser',
    method: 'post',
    data: data
  })
}

// 总店管理---确定编辑更新人员信息
export function updateShopUserBtn(data) {
  return request({
    url: '/hq/shopMgr/updateUserBtn',
    method: 'post',
    data: data
  })
}

// 总店管理---删除人员信息
export function deleteShopUser(data) {
  return request({
    url: '/hq/shopMgr/deleteUser',
    method: 'post',
    data: data
  })
}

// 门店管理---角色管理列表1
export function fetchRoleList(data) {
  return request({
    url: '/hq/shopMgr/queryRoleList',
    method: 'post',
    data: data
  })
}

// 门店管理---角色下拉框列表2
export function hqQueryRoleListDown(data) {
  return request({
    url: '/hq/shopMgr/queryRoleListDown',
    method: 'post',
    data: data
  })
}

// 门店管理---角色对应权限菜单列表3
export function fetchRoleMenuList(data) {
  return request({
    url: '/hq/shopMgr/queryRoleMenu',
    method: 'post',
    data: data
  })
}

// 门店管理---新增角色4
export function createAddRole(data) {
  return request({
    url: '/hq/shopMgr/createRole',
    method: 'post',
    data: data
  })
}

// 门店管理---复制角色5
export function copyRoleList(data) {
  return request({
    url: '/hq/shopMgr/copyRoleList',
    method: 'post',
    data: data
  })
}

// 门店管理---编辑角色6
export function updateRoleName(data) {
  return request({
    url: '/hq/shopMgr/updateRoleName',
    method: 'post',
    data: data
  })
}

// 门店管理---删除角色名称7
export function deleteRoleName(data) {
  return request({
    url: '/hq/shopMgr/deleteRoleName',
    method: 'post',
    data: data
  })
}

// 门店管理---删除角色名称8
export function saveRoleMenus(data) {
  return request({
    url: '/hq/shopMgr/saveRoleMenus',
    method: 'post',
    data: data
  })
}
