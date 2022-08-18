<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import {
  useAppMeta,
  useSearchCondition,
  useSearchResult,
} from '@/lib/providers'
import { useUserAuth } from '@/store/modules'
// import { emitAppEvent } from '@/lib/plugins'

const { appName, appDesc } = useAppMeta()
const { signOut } = useUserAuth()

const { queryKeyword } = useSearchCondition()

const { onInputEnterKeyup } = useSearchResult()

const userOptions = [
  {
    label: '注销',
    key: 'logout',
  },
]

const router = useRouter()
const message = useMessage()

const handlers = {
  handleSelect(key: string) {
    switch (key) {
      case 'logout':
        signOut()
        router.push({ name: 'Auth' })
        message.success('已注销登录！')
        break
      default:
        return
    }
  },
  onInputEnterKeyup,
}
</script>

<template>
  <n-layout-header
    position="absolute"
    grid="~ cols-3"
    h="[48px]"
    align="items-center"
    bg="dark-100"
    opacity="94"
    backdrop="~ blur-xl"
    filter="~ drop-shadow-lg"
    z="20"
  >
    <div flex="~" align="items-center">
      <router-link :to="{ name: 'Layout' }">
        <img
          src="~@/assets/logo-light.svg"
          width="48"
          height="48"
          :alt="appName"
        />
      </router-link>
      <div p="x-2">
        <p text="xs">{{ appDesc }}</p>
        <h1 text="md" font="bold">{{ appName }}</h1>
      </div>
    </div>
    <div flex="~" justify="center">
      <n-input
        w="![420px]"
        clearable
        v-model:value="queryKeyword"
        placeholder="输入域名回车以检索"
        :input-props="{
          onKeyup: handlers.onInputEnterKeyup,
        }"
      >
        <template #prefix>
          <n-icon>
            <icon-clarity-search-line />
          </n-icon>
        </template>
      </n-input>
    </div>
    <div flex="~" justify="end">
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        placement="bottom-end"
        @select="handlers.handleSelect"
      >
        <n-avatar
          m="x-3"
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </n-dropdown>
    </div>
  </n-layout-header>
</template>
