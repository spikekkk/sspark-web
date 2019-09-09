import Layout from '@/views/layout/Layout'

const memberRouter = {
  path: '/memberman',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'Memberman',
  meta: {
    title: '会员管理',
    icon: 'el-icon-aa-zchygl',
    mKey: '20300000'
  },
  children: [{
    path: 'membermgr',
    component: () =>
      import('@/views/sub/memberMgr/memberMgr.vue'),
    name: 'Membermgr',
    meta: {
      title: '会员信息',
      noCache: true,
      mKey: '20301000'
    }
  }]
}
export default memberRouter
