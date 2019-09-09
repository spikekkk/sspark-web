import cashierLayout from '@/views/checkstand/mainlayout/mainlayoutNew'

const pointListRouter = {
  path: '/pointList',
  // 是否显示子路由
  alwaysShow: true,
  component: cashierLayout,
  redirect: 'noredirect',
  name: 'pointList',
  meta: {
    title: '点单',
    mKey: '30100000',
    icon: 'el-icon-aa-zcdiandan'
  },
  children: [
    {
      path: 'ticket',
      component: () =>
        import('@/views/checkstand/pointList/ticket/ticket.vue'),
      name: 'ticket',
      meta: {
        title: '门票',
        mKey: '30101000'
      }
    }, {
      path: 'memberCard',
      component: () =>
        import('@/views/checkstand/pointList/memberCard/memberCard.vue'),
      name: 'memberCard',
      meta: {
        title: '会员卡',
        mKey: '30102000'
      }
    }, {
      path: 'retailGoods',
      component: () =>
        import('@/views/checkstand/pointList/retailGoods/retailGoods.vue'),
      name: 'retailGoods',
      meta: {
        title: '零售商品',
        mKey: '30103000'
      }
    }
  ]
}
export default pointListRouter
