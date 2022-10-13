<script lang="ts" setup>
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { useStore } from '@/store'
import { useAppMeta } from '@/lib/providers'

import Footer from '@/layouts/components/Footer.vue'

const { appName, appDesc } = useAppMeta()

const authFormRef = ref<Nullable<FormInst>>()

const authFormData = reactive<AuthFormData>({
  username: '',
  password: '',
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
const route = useRoute()
const router = useRouter()
const { auth } = useStore()

const handlers = {
  authLogin() {
    authFormRef.value?.validate(async (errors) => {
      if (errors) {
        messageCtx.error(`${errors[0][0]?.message}`)
      } else {
        authFormState.btnLoading = true
        authFormState.btnText = '登 录 中 ...'
        try {
          if (await auth.signIn(authFormData)) {
            messageCtx.success('认证成功，正在跳转！')
            const toPath = route.query?.redirect?.toString() || '/'
            router.push({ path: toPath })
          }
        } catch (err) {
          if (axios.isAxiosError(err)) {
            if ((err.response?.data as AxiosResData)?.state) {
              const { state, msg } = err.response?.data as AxiosResData
              messageCtx.error(`[${state}]${msg}`)
            } else {
              messageCtx.error(`[${err.response?.status}]${err.message}`)
            }
          } else {
            messageCtx.error('[908]应用服务异常，请联系管理员！')
          }
        }
        authFormState.btnLoading = false
        authFormState.btnText = '登 录'
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
  <n-layout overflow="hidden">
    <n-layout-content
      h="screen"
      p="b-12"
      bg="transparent"
      :content-style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
      class="layout__content"
    >
      <div
        w="full md:3/4 min-90 max-120"
        p="8 md:12"
        bg="white opacity-90 dark:dark-400"
        filter="~ drop-shadow-md"
        border="rounded-sm"
      >
        <div flex="~ gap-4" align="items-center" p="b-12">
          <img
            src="~@/assets/logo-dark.svg"
            width="48"
            height="48"
            :alt="appName"
          />
          <div>
            <p text="md" font="tracking-wide">{{ appDesc }}</p>
            <h1 text="xl">{{ appName }}</h1>
          </div>
        </div>
        <n-form
          :show-label="false"
          :model="authFormData"
          :rules="authFormRules"
          ref="authFormRef"
        >
          <n-form-item path="username">
            <n-input
              size="large"
              v-model:value="authFormData.username"
              placeholder="请输入用户名"
            />
          </n-form-item>
          <n-form-item path="password">
            <n-input
              type="password"
              size="large"
              show-password-on="click"
              v-model:value="authFormData.password"
              placeholder="请输入密码"
              :input-props="{
                onKeyup: handlers.onAuthInputEnterKeyup,
              }"
            />
          </n-form-item>
        </n-form>
        <div flex="~" justify="between" align="items-center" p="t-4">
          <p text="dakr-700 dark:light-700">忘记密码？联系管理员！</p>
          <n-button
            type="primary"
            :loading="authFormState.btnLoading"
            @click="handlers.authLogin"
          >
            {{ authFormState.btnText }}
          </n-button>
        </div>
      </div>
    </n-layout-content>
    <Footer />
  </n-layout>
</template>
