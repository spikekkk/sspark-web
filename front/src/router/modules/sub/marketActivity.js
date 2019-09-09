import Layout from '@/views/layout/Layout'

const marketActivity = {
  path: '/marketactivity',
  component: Layout,
  alwaysShow: true,
  redirect: 'noredirect',
  name: 'marketactivity',
  meta: {
    title: '市场活动',
    icon: 'el-icon-aa-zchuiyuan'
  },
  children: [
    {
      path: 'microGames',
      component: () => import('@/views/sub/marketActivity/microGame/microGame'),
      name: 'microGame',
      meta: {
        title: '微游戏',
        noCache: true
      }
    }
    /* 先行注掉---目前不需要此彩蛋*/
    // {
    //   path: 'payCenter',
    //   component: () => import('@/views/sub/marketActivity/payCenter/payCenter'),
    //   name: 'payCenter',
    //   meta: {
    //     title: '支付中心',
    //     noCache: true
    //   }
    // }
  ]
}
export default marketActivity
