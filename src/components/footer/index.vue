<script lang="ts" setup>
import { useAppStore } from '@/store'

const { appMeta } = useAppStore()
</script>

<template>
  <n-layout-footer flex="~" justify="center" items="center">
    <p p="y-4" text="sm">
      &copy; {{ new Date().getFullYear() }} {{ appMeta.copr }}
    </p>
  </n-layout-footer>
</template>
