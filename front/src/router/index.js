import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
import cashierLayout from '@/views/checkstand/mainlayout/mainlayout'

/* Router Modules */
// import hqproductMgrRouter from './modules/hq/productmgr'
import hqpermissionRouter from './modules/hq/shopmgr'
import hqmemberRouter from './modules/hq/membermgr'
import hqorderRouter from './modules/hq/ordermgr'
import hqstatisticsRouter from './modules/hq/statistics'
import hqshopcfgRouter from './modules/hq/storeSet'

import productMgrRouter from './modules/sub/productmgr'
import permissionRouter from './modules/sub/shopmgr'
import memberRouter from './modules/sub/membermgr'
import orderRouter from './modules/sub/ordermgr'
import statisticsRouter from './modules/sub/statistics'
import shopcfgRouter from './modules/sub/storeSet'
import marketActive from './modules/sub/marketActivity'

import pointListRouter from './modules/checkstand/pointList'
import orderListRouter from './modules/checkstand/order'
import memberListRouter from './modules/checkstand/member'
import statisticalRouter from './modules/checkstand/statistical'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // {
  //   path: '/loading',
  //   component: () => import('@/views/layout/components/Loading'),
  //   hidden: true
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/subIndex'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true }
      }
    ]
  },
  productMgrRouter,
  permissionRouter,
  memberRouter,
  orderRouter,
  marketActive,
  statisticsRouter,
  shopcfgRouter,

  { path: '*', redirect: '/', hidden: true }
]

export const hqAsyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/hqIndex'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true }
      }
    ]
  },
  // hqproductMgrRouter,
  hqpermissionRouter,
  hqmemberRouter,
  hqorderRouter,
  hqstatisticsRouter,
  hqshopcfgRouter,
  { path: '*', redirect: '/', hidden: true }
]

export const cashierRouterMap = [
  {
    path: '',
    component: cashierLayout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true }
      }
    ]
  },
  pointListRouter,
  memberListRouter,
  orderListRouter,
  statisticalRouter,
  { path: '*', redirect: '/', hidden: true }
]
