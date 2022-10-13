<script lang="ts" setup>
import { useAppMeta, useAppTheme } from '@/lib/providers'

const { appName, appDesc } = useAppMeta()
const { appTheme, onSwitchTheme } = useAppTheme()
</script>

<template>
  <n-layout-header
    pos="fixed"
    h="12"
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
            v-if="appTheme"
            width="48"
            height="48"
            src="~@/assets/logo-dark.svg"
            :alt="appName"
          />
          <img
            v-else
            width="48"
            height="48"
            src="~@/assets/logo-light.svg"
            :alt="appName"
          />
        </router-link>
        <div p="x-2">
          <p text="xs">{{ appDesc }}</p>
          <h1 text="md" font="bold">{{ appName }}</h1>
        </div>
      </div>
      <div flex="~" justify="center">
        <!-- <NavMenu /> -->
        <SearchInput />
      </div>
      <div flex="~ gap-2" justify="end">
        <n-button text @click="onSwitchTheme">
          <icon-bi-moon-stars-fill v-if="appTheme" />
          <icon-bi-sun-fill v-else />
        </n-button>
        <AvatarMenu />
      </div>
    </div>
  </n-layout-header>
</template>
