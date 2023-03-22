<script lang="ts" setup>
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { DEFAULT_ROUTE } from '@/router/constants'
import { useAppStore, useUserStore } from '@/store'

const { name: appName, desc: appDesc } = useAppStore()

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
// const route = useRoute()
const router = useRouter()
const { signIn } = useUserStore()

const handlers = {
  authLogin() {
    if (authFormState.btnLoading) return
    authFormRef.value?.validate(async (errors) => {
      if (!errors) {
        authFormState.btnLoading = true
        authFormState.btnText = '登 录 中 ...'
        try {
          await signIn(authFormData)
          const { redirect, ...othersQuery } = router.currentRoute.value.query
          router.push({
            path: (redirect as string) || DEFAULT_ROUTE.fullPath,
            query: {
              ...othersQuery,
            },
          })
          messageCtx.success('认证成功，正在跳转！')
        } catch (err: any) {
          if (axios.isAxiosError(err)) {
            messageCtx.error(`[${err.response?.status}]${err.message}`)
          } else {
            console.log(err)
            messageCtx.error(
              `[908]${err?.message || '应用服务异常，请联系管理员！'}`
            )
          }
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
        w="full md:3/4 min-100 max-140"
        p="8 md:12"
        bg="white opacity-90 dark:dark-400"
        filter="~ drop-shadow-md"
        rounded="sm"
      >
        <div flex="~ gap-4" align="items-center" p="b-12">
          <img
            src="~@/assets/logo-dark.svg"
            width="48"
            height="48"
            :alt="appName"
          />
          <div>
            <h1 text="xl" font="medium">{{ appName }}</h1>
            <p text="md" font="medium tracking-wide">{{ appDesc }}</p>
          </div>
        </div>
        <n-form
          ref="authFormRef"
          :show-label="false"
          :model="authFormData"
          :rules="authFormRules"
          size="large"
        >
          <n-form-item path="username" class="mb-1">
            <n-input
              size="large"
              clearable
              v-model:value="authFormData.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <icon-bx-user class="mr-2 opacity-80" />
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password" class="mb-1">
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
                <icon-bx-lock class="mr-2 opacity-80" />
              </template>
            </n-input>
          </n-form-item>
        </n-form>
        <p m="b-5" text="dakr-700 dark:light-700">忘记密码？联系管理员！</p>

        <n-button
          block
          size="large"
          type="primary"
          class="!font-semibold"
          :loading="authFormState.btnLoading"
          @click="handlers.authLogin"
        >
          {{ authFormState.btnText }}
        </n-button>
      </div>
    </n-layout-content>
    <Footer />
  </n-layout>
</template>
