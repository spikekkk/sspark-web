import cashierLayout from '@/views/checkstand/mainlayout/mainlayout'

const orderRouter = {
  path: '/order',
  // 是否显示子路由
  alwaysShow: true,
  component: cashierLayout,
  redirect: 'noredirect',
  name: 'order',
  meta: {
    title: '订单',
    mKey: '30300000',
    icon: 'el-icon-aa-zcddgl'
  },
  children: [
    {
      path: 'orderList',
      component: () =>
        import('@/views/checkstand/order/order.vue'),
      name: 'orderList',
      meta: {
        title: '订单列表',
        mKey: '30301000'
      }
    }
  ]
}
export default orderRouter
