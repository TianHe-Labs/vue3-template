<script lang="ts" setup>
import { computed, h, inject } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import { type RouteRecordRaw, useRouter } from 'vue-router'
import { useAppStore, useRouteStore } from '@/store'

withDefaults(defineProps<{ mode?: 'vertical' | 'horizontal' }>(), {
  mode: 'vertical',
})

const route = useRoute()

const activeMenu = computed(
  () => route.meta.activeMenu || (route.name as string)
)

const appStore = useAppStore()

const { routes } = useRouteStore()

const menuOptions = computed(() => {
  // 路由转菜单项
  function transformMenu(_route: any) {
    const { name, meta, children } = _route
    if (!name || !meta) return null
    let menuItem: MenuOption = {
      key: name as string,
      label: meta?.title,
      icon: meta?.icon
        ? () => h(NIcon, { class: `i-${meta?.icon}` })
        : undefined,
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
      item.children = item.children?.filter(
        (childItem) => !childItem.meta?.hideInMenu
      )
      item.children = menuCollector(item.children)

      return transformMenu(item)
    })

    return collector.filter(Boolean) // 剔除 null
  }

  // 路由 Layout 层为无效层级
  const flatRoutes = routes.flatMap((route: any) => {
    if (route.name === 'Layout' || !route.meta) {
      return route.children
    }
    return route
  })

  // cmputed
  return menuCollector(flatRoutes)
})

const router = useRouter()
// 移动端导航菜单
const toggleMobileDrawerMenu = inject('toggleMobileDrawerMenu') as (
  opts?: any
) => void
const onUpdateSelected = (key: string) => {
  router.push({
    name: key,
  })
  toggleMobileDrawerMenu({ isMenuClick: true })
}
</script>

<template>
  <n-menu
    accordion
    :value="activeMenu"
    :mode="mode"
    :collapsed="appStore.sideCollapse"
    :collapsed-width="60"
    :collapsed-icon-size="20"
    :options="menuOptions"
    class="justify-center"
    @update:value="onUpdateSelected"
  />
</template>
