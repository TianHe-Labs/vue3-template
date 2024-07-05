<script lang="ts" setup>
import { useSearch } from '../hooks/search'

const { queryKeyword, onEnterSearch } = useSearch()
</script>

<template>
  <n-input
    size="large"
    clearable
    v-model:value="queryKeyword"
    placeholder="输入关键字回车以检索"
    @keydown.enter="onEnterSearch"
  >
    <template #prefix>
      <n-icon>
        <n-icon class="i-clarity-search-line" />
      </n-icon>
    </template>
  </n-input>
</template>
