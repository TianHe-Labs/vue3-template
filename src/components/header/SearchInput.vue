<script lang="ts" setup>
import { useSearchCondition, useSearchResult } from '@/lib/providers'

const { queryKeyword } = useSearchCondition()
const { onInputEnterKeyup } = useSearchResult()
</script>

<template>
  <n-input
    w="![420px]"
    clearable
    v-model:value="queryKeyword"
    placeholder="输入域名回车以检索"
    :input-props="{
      onKeyup: onInputEnterKeyup,
    }"
  >
    <template #prefix>
      <n-icon>
        <icon-clarity-search-line />
      </n-icon>
    </template>
  </n-input>
</template>
