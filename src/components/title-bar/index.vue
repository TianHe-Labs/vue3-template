<script lang="ts" setup>
import { CSSProperties, PropType } from 'vue'
import { useAppStore } from '@/store'
import { useTheme } from '@/hooks'

defineProps({
  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
      fontSize: '1rem',
      lineHeight: '1.5rem',
    }),
  },
  descStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({
      fontSize: '0.75rem',
      lineHeight: '1rem',
    }),
  },
})

const appStore = useAppStore()
const { theme } = useTheme()
</script>

<template>
  <div flex="~ gap-2" items="center" overflow="hidden">
    <img
      v-if="theme"
      h="full"
      src="~@/assets/logo-dark.svg"
      :alt="appStore.name"
    />
    <img v-else h="full" src="~@/assets/logo-light.svg" :alt="appStore.name" />
    <div>
      <h1 font="bold" :style="titleStyle">{{ appStore.name }}</h1>
      <p :style="descStyle">{{ appStore.description }}</p>
    </div>
  </div>
</template>
