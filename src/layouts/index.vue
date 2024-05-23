<script lang="ts" setup>
import { computed, ref, provide } from 'vue'
import { useAppStore } from '@/store'
import { provideSearch } from '@/pages/search/hooks/search'

// 侧边栏导航 OR 顶栏导航
const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)

const onUpdateCollapsed = (collapse: boolean) => {
  appStore.setSettings({ sideCollapse: collapse })
}

// 顶栏检索
provideSearch()

// 移动端导航菜单
const mobileDrawerMenuVisible = ref<boolean>(false)
provide('toggleMobileDrawerMenu', (opts?: any) => {
  if (opts?.isMenuClick) {
    mobileDrawerMenuVisible.value = false
  } else {
    mobileDrawerMenuVisible.value = !mobileDrawerMenuVisible.value
  }
})
</script>

<template>
  <n-layout position="absolute">
    <Header :bordered="sideMenuVisible" style="height: var(--header-height)" />
    <n-layout
      position="absolute"
      :has-sider="sideMenuVisible"
      content-class="h-full"
    >
      <!-- 侧边导航模式 -->
      <n-layout-sider
        v-if="sideMenuVisible"
        :collapsed="appStore.sideCollapse"
        :width="220"
        :collapsed-width="60"
        bordered
        show-trigger
        collapse-mode="width"
        class="hidden md:flex backdrop-filter backdrop-blur-md"
        content-class="py-1"
        style="padding-top: var(--header-height)"
        @update:collapsed="onUpdateCollapsed"
      >
        <NavMenu />
      </n-layout-sider>
      <!-- 移动端渲染抽屉式菜单 -->
      <n-drawer
        v-model:show="mobileDrawerMenuVisible"
        :width="220"
        :auto-focus="false"
        display-directive="show"
        placement="left"
        class="md:hidden"
      >
        <div
          class="pl-8 border-b font-medium"
          style="
            height: var(--header-height);
            line-height: var(--header-height);
            font-size: 18px;
          "
        >
          导航
        </div>
        <n-scrollbar
          style="
            height: calc(100vh - var(--header-height) - var(--drawer-bottom));
          "
        >
          <NavMenu />
        </n-scrollbar>
        <div style="height: var(--drawer-bottom)">
          <EndMenuMobile />
        </div>
      </n-drawer>

      <!-- 主体 -->
      <n-layout
        :native-scrollbar="false"
        class="h-full layout__main"
        content-class="h-full flex flex-col"
      >
        <div flex-auto style="padding-top: var(--header-height)">
          <router-view v-slot="{ Component }">
            <transition :duration="200" name="fade-top" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
        <Footer />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style>
:root {
  --header-height: 56px;
  --drawer-bottom: 48px;
}
.n-data-table {
  background-color: var(--n-color);
}

.n-scrollbar > .n-scrollbar-rail {
  z-index: 99;
}
</style>
