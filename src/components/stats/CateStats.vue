<script lang="ts" setup>
import type { Component } from 'vue'
import { useMessage, useThemeVars } from 'naive-ui'
import { formatNumber } from '@/lib/utils'
import { domainStatus } from '@/lib/mappings'

const domainStatusLoading = ref<boolean>(false)

const domainStats = ref<DomainStats>(<DomainStats>{})

const gridCount = computed(() => {
  const len = Object.keys(domainStats.value).length
  const cols = Math.min(4, len),
    rows = (len % 4) + 1
  return { cols, rows }
})

const domainStatsMappings: Mappings<Component> = {
  expiring: defineAsyncComponent(() => import('~icons/mdi/timer-alert')),
  expired: defineAsyncComponent(() => import('~icons/mdi/timer-pause')),
  occupied: defineAsyncComponent(() => import('~icons/mdi/timer-refresh')),
  illegal: defineAsyncComponent(
    () => import('~icons/clarity/times-circle-solid')
  ),
}

const themeVars = useThemeVars()

const messageCtx = useMessage()

const handlers = {
  async fetchDomainStatus() {
    domainStatusLoading.value = true
    try {
      const { /* status, */ data } = await axios.get<AxiosResData>('/api/tags')
      const { state, payload } = data
      if (state === 800) {
        domainStats.value = payload
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
        messageCtx.error(`[908]应用服务异常，请联系管理员！`)
      }
    }
    domainStatusLoading.value = false
  },
}

onBeforeMount(async () => {
  handlers.fetchDomainStatus()
})
</script>

<template>
  <div
    :class="`grid grid-cols-${gridCount.cols} grid-rows-${gridCount.rows} gap-6 my-8`"
  >
    <div
      flex="~ gap-4"
      align="items-stretch"
      p="6"
      bg="white"
      border="rounded-sm"
      cursor="!pointer"
      class="custom-shadow"
      v-for="(keyCount, key) in domainStats"
      :key="key"
    >
      <n-popover trigger="hover">
        <template #trigger>
          <n-progress
            type="circle"
            :stroke-width="10"
            :offset-degree="180"
            :rail-color="themeVars.infoColor"
            :color="themeVars.errorColor"
            :percentage="0"
            h="!16"
            w="!16"
            border="rounded-1/2"
          >
            <n-icon :size="32" :color="themeVars.errorColor">
              <component :is="domainStatsMappings[key]" />
            </n-icon>
          </n-progress>
        </template>
        <span>0%</span>
      </n-popover>
      <n-statistic>
        <template #label>
          <span>{{ domainStatus[key] }}域名</span>
        </template>
        <b text="3xl" font="number">
          {{ formatNumber(keyCount) }}
        </b>
        <b m="l-2" text="sm">个</b>
        <!-- <template #suffix>
          <span class="text-base"> / {{ formatNumber(0) }} </span>
        </template> -->
      </n-statistic>
    </div>
  </div>
</template>
