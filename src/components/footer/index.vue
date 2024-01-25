<script lang="ts" setup>
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<template>
  <n-layout-footer flex="~" justify="center" items="center">
    <p p="y-4" text="sm">
      &copy; {{ new Date().getFullYear() }} {{ appStore.copyright }}
    </p>
  </n-layout-footer>
</template>
