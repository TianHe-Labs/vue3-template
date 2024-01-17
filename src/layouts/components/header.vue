<script lang="ts" setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)
const topSearchVisible = computed(() => appStore.topSearch)
</script>

<template>
  <n-layout-header
    pos="fixed"
    h="14"
    bg="white opacity-90 dark:dark-200 dark:opacity-90"
    backdrop="~ blur-sm"
    z="10"
  >
    <!-- container="~" -->
    <div h="full" m="x-2" grid="~ cols-3" items="center">
      <router-link :to="{ name: 'Layout' }">
        <TitleBar />
      </router-link>
      <div flex="~" justify="center">
        <template v-if="sideMenuVisible || topSearchVisible">
          <TopSearch />
        </template>
        <template v-else>
          <NavMenu />
        </template>
      </div>
      <EndMenu />
    </div>
  </n-layout-header>
</template>
