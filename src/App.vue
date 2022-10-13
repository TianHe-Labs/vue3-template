<script lang="ts" setup>
import { provideAppMeta, provideAppTheme } from '@/lib/providers'

provideAppMeta()
const { appTheme, themeOverrides, zhCN, dateZhCN } = provideAppTheme()
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="appTheme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :class="{ dark: appTheme }"
  >
    <n-loading-bar-provider>
      <n-message-provider placement="bottom" :max="1">
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
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  overflow: hidden
</style>
