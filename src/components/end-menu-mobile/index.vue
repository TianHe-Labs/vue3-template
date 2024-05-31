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
        <icon-ant-design:moon-filled v-if="theme" />
        <icon-ant-design:sun-filled v-else />
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
        <icon-bx:log-out />
      </template>
      退出登录
    </n-button>
  </div>
</template>
