<script lang="ts" setup>
import { useTheme, useSign } from '@/hooks'

const userOptions = [
  {
    label: '注销',
    key: 'logout',
  },
]

const { theme, onSwitchTheme } = useTheme()
const { signOut } = useSign()

const handlers = {
  onSelect(key: string) {
    switch (key) {
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
  <div flex="~ gap-2" justify="end">
    <n-button text @click="onSwitchTheme">
      <icon-bi-moon-stars-fill v-if="theme" />
      <icon-bi-sun-fill v-else />
    </n-button>
    <n-dropdown
      trigger="hover"
      :options="userOptions"
      placement="bottom-end"
      @select="handlers.onSelect"
    >
      <n-avatar
        m="x-3"
        round
        size="small"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
    </n-dropdown>
  </div>
</template>
