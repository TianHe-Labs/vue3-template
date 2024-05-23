<script lang="ts" setup>
import { useSearch } from './hooks/search'

const { renderData } = useSearch()
</script>

<template>
  <div flex-auto container mx-auto px-4 py-8>
    <Breadcrumb :items="['数据搜索']" />
    <div mt-4 text-xl>数据搜索</div>
    <div>{{ renderData }}</div>
  </div>
</template>
