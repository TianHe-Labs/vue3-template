import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/index.vue'

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: () => import('@/pages/redirect/index.vue'),
    meta: { title: '跳转中...', hideInMenu: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/auth/index.vue'),
    meta: { title: '登录认证', hideInMenu: true },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/pages/not-found/index.vue'),
    meta: { title: '404 页面未找到', hideInMenu: true },
  },
  // 必须保证通配符路由位于最后一项
  /* {
    path: '/:match(.*)',
    redirect: '/404',
    meta: { hideInMenu: true },
  }, */
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'User' },
    children: [
      {
        path: '/user',
        name: 'User',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/user/index.vue'),
        meta: {
          title: '用户中心',
          // icon: 'bx:user',
          roles: ['*'],
          hideInMenu: true,
        },
      },
    ],
  },
]
