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
  <n-breadcrumb class="-mx-1">
    <n-breadcrumb-item>
      <router-link :to="{ name: 'Layout' }">
        <n-icon class="i-fluent:apps-24-filled" />
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
