<script lang="ts" setup>
import { useAppStore } from '@/store'

const { copyright } = useAppStore()
</script>

<template>
  <n-layout-footer flex="~" justify="center" align="items-center">
    <p p="y-4" text="sm">
      &copy; {{ new Date().getFullYear() }} {{ copyright }}
    </p>
  </n-layout-footer>
</template>
