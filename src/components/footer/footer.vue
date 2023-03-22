<script lang="ts" setup>
import { useAppStore } from '@/store'

const { copyright } = useAppStore()
</script>

<template>
  <n-layout-footer
    pos="relative"
    h="12"
    m="-t-12"
    flex="~"
    justify="center"
    align="items-center"
    bg="!transparent"
  >
    <p text="sm">&copy; {{ new Date().getFullYear() }} {{ copyright }}</p>
  </n-layout-footer>
</template>
