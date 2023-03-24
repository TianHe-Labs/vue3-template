<script lang="ts" setup>
import { useAppStore } from '@/store'

import { provideSearchCondition } from '@/components/top-search/searchCondition'
import { provideSearchResult } from '@/components/top-search/searchResult'

import Header from './components/header.vue'
import Banner from './components/banner.vue'

// 侧边栏导航 OR 顶栏导航
const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)
const topBannerVisible = computed(() => appStore.topBanner)

const onUpdateCollapsed = (collapse: boolean) => {
  appStore.updateSettings({ sideCollapse: collapse })
}

// 顶栏检索
const { queryKeyword } = provideSearchCondition()
provideSearchResult(queryKeyword)
</script>

<template>
  <n-layout position="absolute">
    <Header :bordered="sideMenuVisible" style="height: var(--header-height)" />
    <n-layout
      :has-sider="sideMenuVisible"
      position="absolute"
      :style="{
        top: sideMenuVisible || !topBannerVisible ? 'var(--header-height)' : 0,
      }"
      content-style="height: 100%;background: #fafafa"
      class="layout__main"
    >
      <n-layout-sider
        v-if="sideMenuVisible"
        :default-collapsed="appStore.sideCollapse"
        bordered
        width="240"
        show-trigger="bar"
        collapse-mode="width"
        bg="white opacity-95 dark:dark-300 dark:opacity-95"
        backdrop="~ blur-sm"
        filter="~ drop-shadow-md"
        @update:collapsed="onUpdateCollapsed"
      >
        <NavMenu />
      </n-layout-sider>
      <n-layout
        :native-scrollbar="false"
        class="h-full bg-light-300 dark:bg-dark-300"
        content-style="height: 100%; display: flex; flex-direction: column"
      >
        <div class="flex-auto">
          <Banner v-if="!sideMenuVisible && topBannerVisible" />
          <div
            pos="relative"
            :container="sideMenuVisible ? '' : '~'"
            m="x-auto"
            p="4"
          >
            <router-view v-slot="{ Component }">
              <transition :duration="200" name="fade-top" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
        <Footer />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style lang="sass" scoped>
.n-layout
  --header-height: 56px
</style>
