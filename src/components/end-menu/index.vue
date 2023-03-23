<script lang="ts" setup>
import { useRouter } from 'vue-router'
// import { useMessage } from 'naive-ui'
import { Icon } from '@iconify/vue'
import { useTheme, useSign } from '@/hooks'

const userOptions = [
  /* {
    label: '用户中心',
    key: 'profile',
    icon: () => h(Icon, { icon: 'bx:user' }),
  }, */
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(Icon, { icon: 'bx:log-out' }),
  },
]

const router = useRouter()
// const messageCtx = useMessage()
const { theme, onSwitchTheme } = useTheme()
const { signOut } = useSign()

const handlers = {
  onSelect(key: string) {
    switch (key) {
      case 'profile':
        router.push({ name: 'Profile' })
        break
      case 'logout':
        signOut()
        break
      default:
        return
    }
  },
}
</script>

<template>
  <div flex="~ gap-5" justify="end" m="x-2">
    <n-button text @click="onSwitchTheme">
      <icon-bi-moon-stars-fill v-if="theme" />
      <icon-bi-sun-fill v-else />
    </n-button>
    <n-dropdown
      trigger="hover"
      size="large"
      :options="userOptions"
      placement="bottom-end"
      @select="handlers.onSelect"
    >
      <n-avatar
        round
        size="small"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </n-dropdown>
  </div>
</template>
