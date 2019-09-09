import Layout from '@/views/layout/Layout'

const shopMgrRouter = {
  path: '/hqshopmgr',
  component: Layout,
  redirect: 'noredirect',
  name: 'HqShopmgr',
  meta: {
    title: '门店管理',
    icon: 'el-icon-aa-zcmdgl',
    mKey: '10200000'
  },
  children: [{
    path: 'hqBranchMgr',
    component: () =>
        import('@/views/hq/shopMgr/storeMgr/storeMgr.vue'),
    name: 'HqBranchMgr',
    meta: {
      title: '门店管理',
      noCache: true,
      mKey: '10201000'
    }
  },
  {
    path: 'emplMgr',
    component: () =>
        import('@/views/hq/shopMgr/staffMgr/staffMgr.vue'),
    name: 'EmplMgr',
    meta: {
      title: '员工管理',
      noCache: true,
      mKey: '10204000'
    }
  }
  ]
}

export default shopMgrRouter
