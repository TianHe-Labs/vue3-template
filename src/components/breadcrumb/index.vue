<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  items?: (string | (RouteLocationRaw & { title: string }))[]
}

// string[] // { name: 'Route Name', title: '' }[]

withDefaults(defineProps<Props>(), {
  items: () => [],
})
</script>

<template>
  <n-breadcrumb class="-mx-1 mt-8 mb-4">
    <n-breadcrumb-item clickable href="/">
      <router-link :to="{ name: 'Layout' }">
        <n-icon><icon-fluent:apps-24-filled /></n-icon>
      </router-link>
    </n-breadcrumb-item>
    <n-breadcrumb-item v-for="(item, index) in items" :key="index">
      <router-link v-if="item && (item as any)?.name" :to="item">
        {{ (item as any)?.title }}
      </router-link>
      <template v-else>{{ item }}</template>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
