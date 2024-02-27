<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)
const topSearchVisible = computed(() => appStore.topSearch)
</script>

<template>
  <n-layout-header pos="fixed" h="14" backdrop="~ blur-sm" shadow="sm" z="10">
    <!-- container="~" -->
    <div h="full" m="x-2" grid="~ cols-3" items="center">
      <router-link :to="{ name: 'Layout' }">
        <TitleBar />
      </router-link>
      <div flex="~" justify="center">
        <template v-if="topSearchVisible">
          <TopSearch />
        </template>
        <template v-else-if="!sideMenuVisible">
          <NavMenu />
        </template>
      </div>
      <EndMenu />
    </div>
  </n-layout-header>
</template>
