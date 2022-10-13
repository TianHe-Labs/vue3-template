<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { useStore } from '@/store'

const userOptions = [
  {
    label: '注销',
    key: 'logout',
  },
]

const { auth } = useStore()

const router = useRouter()
const messageCtx = useMessage()

const handlers = {
  onSelect(key: string) {
    switch (key) {
      case 'logout':
        auth.signOut()
        router.push({ name: 'Auth' })
        messageCtx.success('已注销登录！')
        break
      default:
        return
    }
  },
}
</script>

<template>
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
</template>
