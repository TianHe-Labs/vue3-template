<script lang="ts" setup>
import { zhCN, dateZhCN, GlobalThemeOverrides } from 'naive-ui'
import { provideAppMeta } from '@/lib/providers'

provideAppMeta()

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#0078d4',
    primaryColorHover: '#40a9ff',
    infoColor: '#f4f7fe',
    warningColor: '#ffc80a',
    errorColor: '#fa4100',
  },
  DataTable: {
    paginationMargin: '16px 12px',
    peers: {
      Pagination: {},
    },
  },
}
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
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
