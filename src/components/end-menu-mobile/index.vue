<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { useTheme, useLogout } from '@/hooks'

const messageCtx = useMessage()
const { theme, onSwitchTheme } = useTheme()
const { logout } = useLogout()
</script>

<template>
  <div flex="~ gap-2" justify="center" items="center">
    <n-button text @click="onSwitchTheme">
      <template #icon>
        <n-icon class="i-ant-design:moon-filled" v-if="theme" />
        <n-icon class="i-ant-design:sun-filled" v-else />
      </template>
      {{ theme ? '暗色主题' : '亮色主题' }}
    </n-button>

    <n-divider vertical />

    <n-button
      text
      @click="
        () => {
          logout()
          messageCtx.success('已退出登录！')
        }
      "
    >
      <template #icon>
        <n-icon class="i-bx:log-out" />
      </template>
      退出登录
    </n-button>
  </div>
</template>
