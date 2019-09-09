import Layout from '@/views/layout/Layout'

const orderRouter = {
  path: '/orderman',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'Orderman',
  meta: {
    title: '订单管理',
    icon: 'el-icon-aa-zcddgl',
    mKey: '20400000'
  },
  children: [{
    path: 'ordermgr',
    component: () =>
      import('@/views/sub/orderMgr/orderMgr.vue'),
    name: 'Ordermgr',
    meta: {
      title: '订单信息',
      mKey: '20401000'
    }
  }]
}
export default orderRouter
