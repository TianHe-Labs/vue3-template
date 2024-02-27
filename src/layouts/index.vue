<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import { provideSearch } from '@/hooks'

// 侧边栏导航 OR 顶栏导航
const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)

const onUpdateCollapsed = (collapse: boolean) => {
  appStore.updateSettings({ sideCollapse: collapse })
}

// 顶栏检索
provideSearch()
</script>

<template>
  <n-layout position="absolute">
    <Header :bordered="sideMenuVisible" style="height: var(--header-height)" />
    <n-layout
      :has-sider="sideMenuVisible"
      position="absolute"
      :style="{
        top: sideMenuVisible ? 'var(--header-height)' : 0,
      }"
      class="layout__main"
    >
      <n-layout-sider
        v-if="sideMenuVisible"
        :default-collapsed="appStore.sideCollapse"
        bordered
        :width="240"
        :collapsed-width="60"
        show-trigger="bar"
        collapse-mode="width"
        backdrop="~ blur-sm"
        filter="~ drop-shadow-md"
        @update:collapsed="onUpdateCollapsed"
      >
        <NavMenu />
      </n-layout-sider>
      <n-layout
        :native-scrollbar="false"
        class="h-full"
        content-style="height: 100%; display: flex; flex-direction: column"
      >
        <n-layout-content
          :class="['flex-auto mx-auto', { container: !sideMenuVisible }]"
        >
          <router-view v-slot="{ Component }">
            <transition :duration="200" name="fade-top" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </n-layout-content>
        <Footer />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style lang="sass" scoped>
.n-layout
  --header-height: 56px
</style>
