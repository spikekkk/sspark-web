import Layout from '@/views/layout/Layout'

const shopMgrRouter = {
  path: '/shopmgr',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'Shopmgr',
  meta: {
    title: '门店管理',
    icon: 'el-icon-aa-zcmdgl',
    mKey: '20200000'
  },
  children: [{
    path: 'staffMgr',
    component: () => import('@/views/sub/shopMgr/staffMgr/staffMgr.vue'),
    name: 'StaffMgr',
    meta: {
      title: '员工管理',
      noCache: true,
      mKey: '20203000'
    }
  },
  {
    path: 'handsMgr',
    component: () => import('@/views/sub/shopMgr/handsMgr/handsMgr.vue'),
    name: 'HandsMgr',
    meta: {
      title: '交班管理',
      noCache: true,
      mKey: '20204000'
    }
  }
  ]
}

export default shopMgrRouter
