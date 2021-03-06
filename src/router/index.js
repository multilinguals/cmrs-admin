import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: 'Dashboard', icon: 'dashboard'}
    }]
  },

  {
    path: '/restaurant',
    component: Layout,
    redirect: '/restaurant/index',
    meta: {title: '餐厅', icon: 'restaurant'},
    children: [
      {
        path: 'index',
        name: 'RestaurantIndex',
        component: () => import('@/views/restaurant/index'),
        meta: {title: '餐厅管理', icon: 'restaurant'}
      },
      {
        path: 'detail/:id',
        name: 'RestaurantDetail',
        component: () => import('@/views/restaurant/detail'),
        meta: {title: '餐厅详情', icon: 'restaurant'},
        hidden: true,
      }
    ]
  },

  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/user',
    hidden: true,
    children: [
      {
        path: 'user',
        name: 'SettingUser',
        component: () => import('@/views/setting/user'),
        meta: {title: '个人信息', icon: 'dashboard'}
      },
      {
        path: 'password',
        name: 'SettingPassword',
        component: () => import('@/views/setting/password'),
        meta: {title: '修改密码', icon: 'dashboard'}
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {title: '系统用户', icon: 'meeting_fill'},
    children: [
      {
        path: 'index',
        name: 'UserIndex',
        component: () => import('@/views/user/user/index'),
        meta: {title: '用户管理', icon: 'people_fill'}
      },
      {
        path: 'role',
        name: 'UserRole',
        component: () => import('@/views/user/role/index'),
        meta: {title: '角色管理', icon: 'eye'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
