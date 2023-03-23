<script lang="ts" setup>
import { useAppStore } from '@/store'

const { sideMenu, topSearch } = useAppStore()
</script>

<template>
  <n-layout-header
    pos="fixed"
    bg="white opacity-90 dark:dark-200 dark:opacity-90"
    backdrop="~ blur-sm"
    z="10"
  >
    <!-- container="~" -->
    <div h="full" m="x-2" grid="~ cols-3" align="items-center">
      <router-link :to="{ name: 'Layout' }">
        <TitleBar />
      </router-link>
      <div flex="~" justify="center">
        <template v-if="sideMenu || topSearch">
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
