<script lang="ts" setup>
import { useSearch } from '@/hooks/search'

const { renderData, fetchData } = useSearch()

fetchData()
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline" text="white">
      <div flex="~" items="center">
        <b text="4xl" font="semibold">数据检索</b>
      </div>
      <!-- <p>
        数据更新：{{ formatDiffNow(0) }}
      </p> -->
    </div>
    <n-card
      title="高级检索"
      :bordered="false"
      footer-class="flex justify-end gap-4"
      class="my-10 shadow-md"
    >
      <template #footer>
        <n-button size="small" @click="fetchData">重置</n-button>
        <n-button size="small" type="primary" @click="fetchData">检索</n-button>
      </template>
    </n-card>
    <n-card
      :bordered="false"
      footer-class="flex justify-end gap-4"
      class="my-10 shadow-md"
    >
      {{ renderData }}
    </n-card>
  </div>
</template>
