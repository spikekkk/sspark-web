import Layout from '@/views/layout/Layout'

const memberRouter = {
  path: '/hqmembermgr',
  // 是否显示子路由
  alwaysShow: true,
  component: Layout,
  redirect: 'noredirect',
  name: 'Hqmembermgr',
  meta: {
    title: '会员管理',
    icon: 'el-icon-aa-zchygl',
    mKey: '10300000'
  },
  children: [{
    path: 'hqmemberinfo',
    component: () =>
      import('@/views/hq/memberMgr/memberMgr.vue'),
    name: 'HqMemberinfo',
    meta: {
      title: '会员信息',
      // icon: 'peoplemg',
      mKey: '10301000'
    }
  }]
}
export default memberRouter
