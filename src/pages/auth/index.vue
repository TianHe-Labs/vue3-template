<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { useStorage } from '@vueuse/core'
import { DEFAULT_ROUTE } from '@/router/constants'
import { useUserStore } from '@/store'

const authFormRef = ref<Nullable<FormInst>>()

const authConfigData = useStorage('auth-config', {
  username: '',
  password: '',
  rememberPassword: true,
})

const authFormData = reactive<AuthFormData>({
  username: authConfigData.value.username,
  password: authConfigData.value.password,
})

const authFormRules: FormRules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['input', 'blur'],
    },
  ],
}

const authFormState = reactive({
  btnLoading: false,
  btnText: '登 录',
})

const messageCtx = useMessage()
const router = useRouter()
const userStore = useUserStore()

const handlers = {
  authLogin() {
    if (authFormState.btnLoading) return
    authFormRef.value?.validate(async (errors) => {
      if (!errors) {
        authFormState.btnLoading = true
        authFormState.btnText = '登 录 中 ...'
        try {
          await userStore.login(authFormData)

          const { redirect, ...othersQuery } = router.currentRoute.value.query

          router.push({
            path: (redirect as string) || DEFAULT_ROUTE.fullPath,
            query: {
              ...othersQuery,
            },
          })
          messageCtx.success('认证成功，正在跳转！')

          const { rememberPassword } = authConfigData.value
          // 实际生产环境需要进行加密存储。
          authConfigData.value.username = rememberPassword
            ? authFormData.username
            : ''
          authConfigData.value.password = rememberPassword
            ? authFormData.password
            : ''
        } catch (err: any) {
          console.error(err)
          messageCtx.error(`[登录失败]${err?.message}`)
        } finally {
          authFormState.btnLoading = false
          authFormState.btnText = '登 录'
        }
      }
    })
  },
  onAuthInputEnterKeyup(event: KeyboardEvent) {
    // 拦截回车事件
    if (event.target !== event.currentTarget) return
    if (event.shiftKey || event.key !== 'Enter') return
    event.stopPropagation()
    event.preventDefault()
    // 回车事件处理
    handlers.authLogin()
  },
}
</script>

<template>
  <n-layout
    content-class="!h-screen flex flex-col overflow-hidden layout__main"
  >
    <div
      w="full md:3/4"
      max-w="120"
      m="auto"
      p="8 md:12"
      bg="white dark:dark-200"
      filter="~ drop-shadow-md"
      rounded="~"
    >
      <TitleBar
        :title-style="{ fontSize: '1.25rem' }"
        :desc-style="{ fontSize: '1rem' }"
        m="b-12"
      />
      <n-form
        ref="authFormRef"
        :show-label="false"
        :model="authFormData"
        :rules="authFormRules"
        size="large"
      >
        <n-form-item path="username" class="mb-2">
          <n-input
            size="large"
            clearable
            v-model:value="authFormData.username"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <n-icon class="i-bx-user mr-2 opacity-80" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password" class="mb-2">
          <n-input
            type="password"
            size="large"
            clearable
            show-password-on="click"
            v-model:value="authFormData.password"
            placeholder="请输入密码"
            :input-props="{
              onKeyup: handlers.onAuthInputEnterKeyup,
            }"
          >
            <template #prefix>
              <n-icon class="i-bx-lock mr-2 opacity-80" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>

      <div flex justify-between items-center m="b-6">
        <n-checkbox v-model:checked="authConfigData.rememberPassword">
          记住密码
        </n-checkbox>
        <p text="sm dark-700 dark:light-700">忘记密码？联系管理员！</p>
      </div>

      <n-button
        block
        size="large"
        type="primary"
        :loading="authFormState.btnLoading"
        @click="handlers.authLogin"
      >
        {{ authFormState.btnText }}
      </n-button>
    </div>
    <Footer />
  </n-layout>
</template>
