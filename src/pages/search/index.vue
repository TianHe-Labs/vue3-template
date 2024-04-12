<script lang="ts" setup>
import { useSearch } from './hooks/search'

const { renderData } = useSearch()
</script>

<template>
  <div flex-auto container mx-auto mb-10>
    <Breadcrumb :items="['数据搜索']" />
    <div text-xl>数据搜索</div>
    <div>{{ renderData }}</div>
  </div>
</template>
