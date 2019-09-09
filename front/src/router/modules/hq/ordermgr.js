import Layout from '@/views/layout/Layout'

const orderRouter = {
  path: '/hqordermgr',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'Orderman',
  meta: {
    title: '订单管理',
    icon: 'el-icon-aa-zcddgl',
    mKey: '10400000'
  },
  children: [{
    path: 'ordermgr',
    component: () =>
      import('@/views/hq/orderMgr/orderMgr.vue'),
    name: 'HqOrderMgr',
    meta: {
      title: '订单信息',
      mKey: '10401000'
    }
  }]

}
export default orderRouter
