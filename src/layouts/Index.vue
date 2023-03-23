<script lang="ts" setup>
import { useAppStore } from '@/store'

import { provideSearchCondition } from '@/components/top-search/searchCondition'
import { provideSearchResult } from '@/components/top-search/searchResult'

import Header from './components/header.vue'
import Banner from './components/banner.vue'

// 侧边栏导航 OR 顶栏导航
const { sideMenu, sideCollapse, updateSettings } = useAppStore()

const collapsed = ref<boolean>(sideCollapse)

const onUpdateCollapsed = (collapse: boolean) => {
  collapsed.value = collapse
  updateSettings({ sideCollapse: collapse })
}

// 顶栏检索
const { queryKeyword } = provideSearchCondition()
provideSearchResult(queryKeyword)
</script>

<template>
  <n-layout position="absolute">
    <Header :bordered="sideMenu" style="height: var(--header-height)" />
    <n-layout
      :has-sider="sideMenu"
      position="absolute"
      :style="{ top: sideMenu ? 'var(--header-height)' : 0 }"
      content-style="height: 100%;background: #fafafa"
      class="layout__main"
    >
      <n-layout-sider
        v-if="sideMenu"
        :collapsed="collapsed"
        bordered
        width="240"
        show-trigger="bar"
        collapse-mode="width"
        bg="white opacity-95 dark:dark-300 dark:opacity-95"
        backdrop="~ blur-sm"
        filter="~ drop-shadow-md"
        @update:collapsed="onUpdateCollapsed"
      >
        <NavMenu :collapsed="collapsed" />
      </n-layout-sider>
      <n-layout
        :native-scrollbar="false"
        class="h-full bg-light-300 dark:bg-dark-300"
        content-style="height: 100%; display: flex; flex-direction: column"
      >
        <div class="flex-auto">
          <Banner v-if="!sideMenu" />
          <div pos="relative" :container="sideMenu ? '' : '~'" m="x-auto" p="4">
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
