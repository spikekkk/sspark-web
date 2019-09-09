import cashierLayout from '@/views/checkstand/mainlayout/mainlayout'

const orderRouter = {
  path: '/member',
  // 是否显示子路由
  alwaysShow: true,
  component: cashierLayout,
  redirect: 'noredirect',
  name: 'member',
  meta: {
    title: '会员',
    mKey: '30200000',
    icon: 'el-icon-aa-zchuiyuan'
  },
  children: [
    {
      path: 'memberQuery',
      component: () =>
        import('@/views/checkstand/member/memberQuery.vue'),
      name: 'memberQuery',
      meta: {
        title: '会员查询',
        mKey: '30201000'
      }
    }
  ]
}
export default orderRouter
