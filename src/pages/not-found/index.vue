<script lang="ts" setup>
import { DEFAULT_ROUTE_NAME } from '@/router/constants'
</script>

<template>
  <n-layout
    content-class="!h-screen flex flex-col justify-center items-center overflow-hidden layout__main"
  >
    <p class="my-4 text-xl font-medium">404 Not Found</p>
    <router-link :to="{ name: DEFAULT_ROUTE_NAME }">
      <n-button type="primary">返回</n-button>
    </router-link>
  </n-layout>
</template>
