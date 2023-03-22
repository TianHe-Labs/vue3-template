<script lang="ts" setup>
import { useAppStore } from '@/store'
import { useTheme } from '@/hooks'

const { name: appName, desc: appDesc, sideMenu, topSearch } = useAppStore()
const { theme } = useTheme()
</script>

<template>
  <n-layout-header
    pos="fixed"
    h="14"
    bg="light-200 opacity-80 dark:dark-200 dark:opacity-80"
    backdrop="~ blur-md"
    filter="~ drop-shadow-md"
    z="10"
  >
    <!-- container="~" m="x-auto" -->
    <div grid="~ cols-3" align="items-center">
      <div flex="~" align="items-center">
        <router-link :to="{ name: 'Layout' }">
          <img
            v-if="theme"
            w="14"
            h="14"
            src="~@/assets/logo-dark.svg"
            :alt="appName"
          />
          <img
            v-else
            w="14"
            h="14"
            src="~@/assets/logo-light.svg"
            :alt="appName"
          />
        </router-link>
        <div p="x-2">
          <h1 text="md" font="bold">{{ appName }}</h1>
          <p text="xs">{{ appDesc }}</p>
        </div>
      </div>
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
