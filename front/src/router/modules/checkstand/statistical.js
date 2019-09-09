import cashierLayout from '@/views/checkstand/mainlayout/mainlayout'
const pointListRouter = {
  path: '/statistical',
  // 是否显示子路由
  alwaysShow: true,
  component: cashierLayout,
  redirect: 'noredirect',
  name: 'statistical',
  meta: {
    title: '数据统计',
    mKey: '30400000',
    icon: 'el-icon-aa-zcsjtj'
  },
  children: [
    {
      path: 'cashier',
      component: () =>
        import('@/views/checkstand/statistical/cashier/cashier.vue'),
      name: 'cashier',
      meta: {
        title: '收银统计',
        mKey: '30401000'
      }
    },
    {
      path: 'cancel',
      component: () =>
        import('@/views/checkstand/statistical/cancel/cancel.vue'),
      name: 'cancel',
      meta: {
        title: '核销统计',
        mKey: '30402000'
      }
    },
    {
      path: 'rechargeDetail',
      component: () =>
        import('@/views/checkstand/statistical/rechargeDetail/rechargeDetail.vue'),
      name: 'rechargeDetail',
      meta: {
        title: '充值流水',
        mKey: '30403000'
      }
    }
    // {
    //   path: 'cardSteam',
    //   component: () =>
    //     import('@/views/checkstand/statistical/cardStream/cardStream.vue'),
    //   name: 'cardSteam',
    //   meta: {
    //     title: '储值卡交易流水',
    //     mKey: '30404000'
    //   }
    // }
  ]
}
export default pointListRouter
