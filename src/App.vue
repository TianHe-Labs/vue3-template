<script lang="ts" setup>
import { provide, ref } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { provideTheme } from './hooks'
import Feedback from '@/components/feedback/index.vue'

const { theme, themeOverrides, zhCN, dateZhCN } = provideTheme()

// 反馈
const feedbackPanelVisible = ref<boolean>(false)
provide('feedbackPanelVisible', feedbackPanelVisible)

// 响应式
const breakpoints = useBreakpoints(breakpointsTailwind)
provide('breakpoints', breakpoints)
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :class="[{ dark: theme }]"
  >
    <!-- unocss dark mode 与naiveui协同注入，
      unocss 默认使用class="dark"，因此可以利用naiveui的接口动态改变class，
      也可以在unocss.config.ts中改变默认配置，使用naiveui的选择器，但naiveui并没有显式地在DOM添加相关标记，即没有相关选择器，所以选择前一种方式
    -->
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
