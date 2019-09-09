import Layout from '@/views/layout/Layout'

const shopcfgRouter = {
  path: '/hqshopcfg',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'HqSyscfg',
  meta: {
    title: '门店设置',
    icon: 'el-icon-aa-zcmdsz',
    mKey: '10600000'
  },
  children: [{
    path: 'hqsysParams',
    component: () =>
      import('@/views/hq/storeSetting/personInfo/personInfo.vue'),
    name: 'HqSysParams',
    meta: {
      title: '个人信息',
      mKey: '10602000'
    }
  }

  //   {
  //   path: 'hquserInfo',
  //   component: () =>
  //     import('@/views/hq/storeSetting/storeInfo/storeInfo.vue'),
  //   name: 'HqUserInfo',
  //   meta: {
  //     title: '门店信息',
  //     mKey: '10601000'
  //   }
  // },
  ]
}
export default shopcfgRouter
