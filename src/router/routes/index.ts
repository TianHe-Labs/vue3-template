import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/index.vue'

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/auth/index.vue'),
    meta: { title: '登录认证', hideInMenu: true },
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'Index' },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "index" */ '@/pages/index.vue'),
        meta: {
          title: '首页',
          // icon: 'bx:home-alt',
          // roles: ['admin'],
        },
      },
    ],
  },
]
