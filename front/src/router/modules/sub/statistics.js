/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const syscfgRouter = {
  path: '/statistics',
  component: Layout,
  redirect: 'noredirect',
  name: 'Statistics',
  meta: {
    title: '数据分析',
    icon: 'el-icon-aa-zcsjtj',
    mKey: '20500000'
  },
  children: [
    {
      path: 'jytj',
      component: () => import('@/views/sub/statistics/manage/manage.vue'),
      name: 'Jytj',
      meta: {
        title: '经营统计',
        mKey: '20501000'
      }
    },
    {
      path: 'spfx',
      component: () => import('@/views/sub/statistics/commodity/commodity.vue'),
      name: 'Spfx',
      meta: {
        title: '商品统计',
        mKey: '20502000'
      }
    },
    {
      path: 'hyfx',
      component: () => import('@/views/sub/statistics/member/member.vue'),
      name: 'Hyfx',
      meta: {
        title: '会员统计',
        mKey: '20503000'
      }
    },
    {
      path: 'rcfx',
      component: () =>
        import('@/views/sub/statistics/rechargeDetail/rechargeDetail.vue'),
      name: 'Rcfx',
      meta: {
        title: '充值流水',
        mKey: '20504000'
      }
    }
    // {
    //   path: 'csfx',
    //   component: () =>
    //     import('@/views/sub/statistics/cardStream/cardStream.vue'),
    //   name: 'Csfx',
    //   meta: {
    //     title: '储值卡交易流水',
    //     mKey: '20505000'
    //   }
    // }
  ]
}
export default syscfgRouter
