<script lang="ts" setup>
import { h, inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NAvatar, NText, useMessage } from 'naive-ui'
import { useClipboard } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import { useUserStore, useAppStore } from '@/store'
import { useTheme, useLogout } from '@/hooks'
import SettingItem from './setting-item.vue'

const feedbackPanelVisible = inject('feedbackPanelVisible') as boolean

const { username, userRoleText } = useUserStore()

const userOptions = [
  {
    key: 'header',
    type: 'render',
    render: () =>
      h(
        'div',
        {
          class: 'flex items-end gap-3 px-4 py-1',
        },
        [
          h(
            NAvatar,
            {
              round: true,
            },
            { default: () => h(Icon, { icon: 'fa6-solid:user' }) }
          ),
          h('div', null, [
            h(
              NText,
              { depth: 1, strong: true, class: 'uppercase' },
              { default: () => username }
            ),
            h(
              NText,
              { tag: 'p', depth: 3, class: 'text-xs' },
              { default: () => `欢迎您！${userRoleText}` }
            ),
          ]),
        ]
      ),
  },
  {
    type: 'divider',
  },
  {
    label: '用户中心',
    key: 'user',
    icon: () => h(Icon, { icon: 'bx:user' }),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h(Icon, { icon: 'bx:log-out' }),
  },
]

const router = useRouter()
const messageCtx = useMessage()
const { theme, onSwitchTheme } = useTheme()
const { logout } = useLogout()

// 设置
const settingsDrawerVisible = ref<boolean>(false)
const appStore = useAppStore()
const { copy } = useClipboard()

const handlers = {
  onSelect(key: string) {
    switch (key) {
      case 'user':
        router.push({ name: 'User' })
        break
      case 'logout':
        logout()
        messageCtx.success('已退出登录！')
        break
      default:
        return
    }
  },
  onOpenSettings() {
    settingsDrawerVisible.value = true
  },
  async onCopySettings() {
    const text = JSON.stringify(appStore.$state, null, 2)
    await copy(text)
    messageCtx.info('复制成功，请粘贴到 src/settings.json 文件中')
  },
}

const isDev = import.meta.env.DEV
</script>

<template>
  <div flex="~ gap-x-6" items="center">
    <n-button text class="opacity-80 hover:opacity-100" @click="onSwitchTheme">
      <icon-ant-design:moon-filled v-if="theme" />
      <icon-ant-design:sun-filled v-else />
    </n-button>

    <n-button
      text
      class="opacity-80 hover:opacity-100"
      @click="feedbackPanelVisible = !feedbackPanelVisible"
    >
      <icon-fluent:person-feedback-24-filled class="text-sm" />
    </n-button>

    <n-button
      v-if="isDev"
      text
      class="opacity-80 hover:opacity-100"
      @click="handlers.onOpenSettings"
    >
      <icon-ant-design:setting-filled class="text-sm" />
    </n-button>

    <n-dropdown
      trigger="hover"
      size="large"
      show-arrow
      :options="userOptions"
      placement="bottom-end"
      @select="handlers.onSelect"
    >
      <n-avatar round size="small" class="cursor-pointer">
        <Icon icon="fa6-solid:user" />
      </n-avatar>
    </n-dropdown>
  </div>

  <n-drawer v-if="isDev" v-model:show="settingsDrawerVisible" :width="280">
    <n-drawer-content title="页面设置">
      <div flex="~" justify="between" items="center" m="y-2">
        <span>侧边导航</span>
        <SettingItem name="sideMenu" />
      </div>
      <div flex="~" justify="between" items="center" m="y-2">
        <span>顶部搜索</span>
        <SettingItem name="topSearch" />
      </div>
      <!-- 腰部：说明 -->
      <n-alert title="说明" type="info" :show-icon="false" :bordered="false">
        更新配置仅临时生效，若要实际应用于项目，点击下方的
        "复制配置"，将当前配置粘贴替换到 settings.json 中
      </n-alert>
      <!-- 底部：操作 -->
      <template #footer>
        <n-button type="primary" @click="handlers.onCopySettings"
          >复制配置</n-button
        >
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
