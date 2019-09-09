import Layout from '@/views/layout/Layout'

const productMgrRouter = {
  path: '/productMgr',
  component: Layout,
  redirect: 'noredirect',
  name: 'ProductMgr',
  meta: {
    title: '商品管理',
    icon: 'el-icon-aa-zvspgl',
    mKey: '20100000'
  },
  children: [{
    path: 'allProducts',
    component: () =>
        import('@/views/sub/productMgr/allProductMgr/productMgr.vue'),
    name: 'AllProducts',
    meta: {
      title: '全部商品',
      noCache: true,
      mKey: '20101000'
    }
  },
  {
    path: 'category',
    component: () =>
        import('@/views/sub/productMgr/categoryMgr/categoryMgr.vue'),
    name: 'Category',
    meta: {
      title: '分类管理',
      noCache: true,
      mKey: '20102000'
    }
  },
  {
    path: 'productSku',
    component: () =>
        import('@/views/sub/productMgr/specMgr/specMgr.vue'),
    name: 'ProductSku',
    meta: {
      title: '规格管理',
      noCache: true,
      mKey: '20103000'
    }
  },
  {
    path: 'stock',
    component: () =>
        import('@/views/sub/productMgr/stockMgr/stockMgr.vue'),

    name: 'Stock',
    meta: {
      title: '库存管理',
      noCache: true,
      mKey: '20104000'
    }
  }
  ]
}

export default productMgrRouter
