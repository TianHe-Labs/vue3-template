<script lang="ts" setup>
import { useSearchCondition } from './searchCondition'
import { useSearchResult } from './searchResult'

const { queryKeyword } = useSearchCondition()
const { onInputEnterKeyup } = useSearchResult()
</script>

<template>
  <n-input
    w="![420px]"
    size="large"
    clearable
    v-model:value="queryKeyword"
    placeholder="输入关键字回车以检索"
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
