<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'
import SearchBar from '@/pages/search/components/search-bar.vue'

const appStore = useAppStore()

const sideMenuVisible = computed(() => appStore.sideMenu)
const topSearchVisible = computed(() => appStore.topSearch)
</script>

<template>
  <n-layout-header pos="fixed" h="14" backdrop="~ blur-sm" shadow="~" z="10">
    <!-- container="~" -->
    <div h="full" m="x-2" grid="~ cols-3" items="center">
      <router-link :to="{ name: 'Layout' }">
        <TitleBar />
      </router-link>
      <div flex="~" justify="center">
        <template v-if="topSearchVisible">
          <SearchBar class="hidden md:block" />
        </template>
        <template v-else-if="!sideMenuVisible">
          <NavMenu />
        </template>
      </div>
      <EndMenu />
    </div>
  </n-layout-header>
</template>
