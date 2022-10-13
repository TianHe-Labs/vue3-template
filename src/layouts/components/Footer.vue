<script lang="ts" setup>
import { useAppMeta } from '@/lib/providers'

const { appCopr } = useAppMeta()
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
    <p text="sm">&copy; {{ new Date().getFullYear() }} {{ appCopr }}</p>
  </n-layout-footer>
</template>
