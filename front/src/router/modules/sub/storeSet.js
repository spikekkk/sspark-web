import Layout from '@/views/layout/Layout'

const shopcfgRouter = {
  path: '/shopcfg',
  component: Layout,
  redirect: 'noredirect',
  name: 'Syscfg',
  meta: {
    title: '门店设置',
    icon: 'el-icon-aa-zcmdsz',
    mKey: '20600000'
  },
  children: [{
    path: 'storeInfo',
    component: () =>
      import('@/views/sub/storeSetting/storeInfo/storeInfo.vue'),
    name: 'StoreInfo',
    meta: {
      title: '门店信息',
      mKey: '20601000'
    }
  },
  {
    path: 'personInfo',
    component: () =>
      import('@/views/sub/storeSetting/personInfo/personInfo.vue'),
    name: 'PersonInfo',
    meta: {
      title: '个人信息',
      mKey: '20602000'
    }
  },
  {
    path: 'printSetting',
    component: () =>
      import('@/views/sub/storeSetting/printSetting/printSetting.vue'),
    name: 'PrintSetting',
    meta: {
      title: '打印设置',
      mKey: '20604000'
    }
  }]
}
export default shopcfgRouter
