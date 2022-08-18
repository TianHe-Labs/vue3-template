import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/Index.vue'

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/Auth.vue'),
    meta: { title: '登录认证', isNavMenu: false },
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'Index' },
    meta: { title: '首页', isNavMenu: false /* , permissions: ['admin'] */ },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () =>
          import(/* webpackChunkName: "index" */ '@/pages/Index.vue'),
        meta: {
          title: '首页',
          isNavMenu: true /* , permissions: ['admin'] */,
        },
      },
    ],
  },
]
