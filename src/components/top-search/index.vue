<script lang="ts" setup>
import { useSearch } from '@/hooks'

const { queryKeyword, onInputKeyup } = useSearch()
</script>

<template>
  <n-input
    w="![420px]"
    size="large"
    clearable
    v-model:value="queryKeyword"
    placeholder="输入关键字回车以检索"
    :input-props="{
      onKeyup: onInputKeyup,
    }"
  >
    <template #prefix>
      <n-icon>
        <icon-clarity-search-line />
      </n-icon>
    </template>
  </n-input>
</template>
