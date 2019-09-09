/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const syscfgRouter = {
  path: '/hqstatistics',
  component: Layout,
  redirect: 'noredirect',
  name: 'HqStatistics',
  meta: {
    title: '数据分析',
    icon: 'el-icon-aa-zcsjtj',
    mKey: '10500000'
  },
  children: [
    {
      path: 'hqjytj',
      component: () => import('@/views/hq/statistics/manage/manage.vue'),
      name: 'Hqjytj',
      meta: {
        title: '经营统计',
        mKey: '10501000'
      }
    },
    {
      path: 'hqspfx',
      component: () => import('@/views/hq/statistics/commodity/commodity.vue'),
      name: 'Hqspfx',
      meta: {
        title: '商品统计',
        mKey: '10502000'
      }
    },
    {
      path: 'hqhyfx',
      component: () => import('@/views/hq/statistics/member/member.vue'),
      name: 'Hqhyfx',
      meta: {
        title: '会员统计',
        mKey: '10503000'
      }
    },
    {
      path: 'rcfx',
      component: () =>
        import('@/views/hq/statistics/rechargeDetail/rechargeDetail.vue'),
      name: 'Rcfx',
      meta: {
        title: '充值流水',
        mKey: '10504000'
      }
    }
    // {
    //   path: 'csfx',
    //   component: () =>
    //     import('@/views/hq/statistics/cardStream/cardStream.vue'),
    //   name: 'Csfx',
    //   meta: {
    //     title: '储值卡交易流水',
    //     mKey: '10505000'
    //   }
    // }
  ]
}
export default syscfgRouter
