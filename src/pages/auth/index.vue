<script lang="ts" setup>
import { FormInst, FormRules, useMessage } from 'naive-ui'
import { DEFAULT_ROUTE } from '@/router/constants'
import { useUserStore } from '@/store'

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
          messageCtx.success('认证成功，正在跳转！')

          const { redirect, ...othersQuery } = router.currentRoute.value.query
          router
            .push({
              path:
                (redirect as string) || `/redirect/${DEFAULT_ROUTE.fullPath}`,
              query: {
                ...othersQuery,
              },
            })
            .catch()
        } catch (err) {
          // pass
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
    position="absolute"
    content-style="display: flex; flex-direction: column;"
    class="bg-light-100 dark:bg-dark-100 layout__main"
  >
    <div
      w="full md:3/4 min-100 max-140"
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
              <icon-bx-user class="mr-2 opacity-80" />
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
              <icon-bx-lock class="mr-2 opacity-80" />
            </template>
          </n-input>
        </n-form-item>
      </n-form>
      <p m="b-6" text="sm dark-700 dark:light-700">忘记密码？联系管理员！</p>

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
