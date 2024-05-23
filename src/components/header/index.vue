<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useAppStore } from '@/store'
import SearchBar from '@/pages/search/components/search-bar.vue'

const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)
const topSearchVisible = computed(() => appStore.topSearch)

const headerClass = computed(() => {
  if (appStore.topSearch || !appStore.sideMenu) {
    return 'grid-cols-3'
  }
  return 'grid-cols-2'
})

// 移动端导航菜单
const toggleMobileDrawerMenu = inject('toggleMobileDrawerMenu') as () => void
</script>

<template>
  <n-layout-header
    position="absolute"
    class="backdrop-filter backdrop-blur-md shadow-sm z-9"
  >
    <!-- container="~" -->
    <div
      pos="relative"
      h="full"
      m="x-auto"
      p="x-3"
      flex="~"
      justify-between
      items="center"
      :class="headerClass"
    >
      <router-link :to="{ name: 'Layout' }">
        <TitleBar title-class="hidden sm:block" />
      </router-link>
      <template v-if="topSearchVisible">
        <!-- hidden lg:block -->
        <div
          class="w-360px absolute left-1/2 transform -translate-x-1/2 search-bar-wrapper"
        >
          <SearchBar />
        </div>
      </template>
      <template v-else-if="!sideMenuVisible">
        <div class="hidden md:block nav-menu-wrapper">
          <NavMenu mode="horizontal" />
        </div>
      </template>
      <div class="hidden md:block end-menu-wrapper">
        <EndMenu />
      </div>

      <!-- 移动端导航菜单入口 -->
      <n-button
        text
        class="text-xl md:hidden"
        @click.stop="toggleMobileDrawerMenu"
      >
        <icon-bx:menu />
      </n-button>
    </div>
  </n-layout-header>
</template>
