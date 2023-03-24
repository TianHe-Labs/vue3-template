<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { MenuOption } from 'naive-ui'
import { RouteRecordRaw, RouterLink } from 'vue-router'
import { useAppStore, useRouteStore } from '@/store'

const route = useRoute()

const activeMenu = computed(() => route.name as string)

const { sideMenu } = useAppStore()

const menuMode = computed(() => (sideMenu ? 'vertical' : 'horizontal'))

const { routes } = useRouteStore()

const menuOptions = computed(() => {
  // 路由转菜单项
  function transformMenu(_route: any) {
    const { name, meta, children } = _route
    if (!name || !meta) return null
    let menuItem: MenuOption = {
      key: name as string,
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: name as string,
            },
            class: '!inline-block !text-base !leading-loose',
          },
          { default: () => meta?.title }
        ),
      icon: meta?.icon ? () => h(Icon, { icon: meta?.icon }) : undefined,
    }
    if (children && children.length) {
      menuItem = { ...menuItem, children }
    }
    return menuItem
  }
  // 导航菜单收集（根据已经生成的路由）
  function menuCollector(_routes: RouteRecordRaw[]) {
    if (!_routes) return null

    const collector: any = _routes.map((item) => {
      // 判断当前路由是否隐藏，默认（缺省）不隐藏
      if (item.meta?.hideInMenu) {
        return null
      }
      // 判断子路由是否隐藏

      // 如果没有子路由，或者设置了隐藏子路由
      if (!item.children || item.meta?.hideChildrenInMenu) {
        item.children = undefined
        return transformMenu(item)
      }

      // 否则，遍历并递归判断子路由
      item.children = item.children.filter(
        (childItem) => !childItem.meta?.hideInMenu
      )
      item.children = menuCollector(item.children)

      return transformMenu(item)
    })

    return collector.filter(Boolean) // 剔除 null
  }

  // 路由 Layout 层为无效层级
  const flatRoutes = routes.flatMap((route) => {
    if (!route.name || !route.meta || route.name === 'Layout') {
      return route.children
    }
    return route
  })

  // cmputed
  return menuCollector(flatRoutes)
})
</script>

<template>
  <n-menu
    accordion
    :value="activeMenu"
    :mode="menuMode"
    :options="menuOptions"
  />
</template>
