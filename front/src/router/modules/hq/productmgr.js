import Layout from '@/views/layout/Layout'

const productMgrRouter = {
  path: '/hqproductmgr',
  component: Layout,
  redirect: 'noredirect',
  name: 'HqProductMgr',
  meta: {
    title: '商品管理',
    icon: 'el-icon-aa-zvspgl',
    mKey: '10100000'
  },
  children: [{
    path: 'hqallProducts',
    component: () =>
    import('@/views/hq/productMgr/productsMgr.vue'),
    name: 'HqAllProducts',
    meta: {
      title: '全部商品',
      noCache: true,
      mKey: '10101000'
    }
  }, {
    path: 'hqcategory',
    component: () =>
      import('@/views/hq/productMgr/classifyMgr.vue'),
    name: 'HqCategory',
    meta: {
      title: '分类管理',
      noCache: true,
      mKey: '10102000'
    }
  }, {
    path: 'hqproductSku',
    component: () =>
      import('@/views/hq/productMgr/specsMgr.vue'),
    name: 'HqProductSku',
    meta: {
      title: '规格管理',
      noCache: true,
      mKey: '10103000'
    }
  }
  ]
}

export default productMgrRouter
