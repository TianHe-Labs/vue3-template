<script lang="ts" setup>
import { provide, ref } from 'vue'
import { provideTheme } from './hooks'
import Feedback from '@/components/feedback/index.vue'

const { theme, themeOverrides, zhCN, dateZhCN } = provideTheme()

// 反馈
const feedbackPanelVisible = ref<boolean>(false)
provide('feedbackPanelVisible', feedbackPanelVisible)
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :class="[{ dark: theme }]"
  >
    <n-loading-bar-provider>
      <n-message-provider placement="top" :max="2">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-top" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>

        <Feedback />
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
