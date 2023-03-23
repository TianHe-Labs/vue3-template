<script lang="ts" setup>
import { provideTheme } from './hooks'

const { theme, themeOverrides, zhCN, dateZhCN } = provideTheme()
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :class="[{ dark: theme }, 'w-screen h-screen overflow-hidden']"
  >
    <n-loading-bar-provider>
      <n-message-provider placement="top" :max="2">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-top" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style lang="sass">
#app
  position: relative
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  overflow: hidden
</style>
