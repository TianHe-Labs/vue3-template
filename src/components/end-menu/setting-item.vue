<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const { appSettings, setSettings } = useAppStore()

const defaultValue = computed(() => (appSettings as any)?.[props.name])

const onUpdateValue = (value: boolean) => {
  setSettings({ [props.name]: value })
}
</script>

<template>
  <n-switch
    size="small"
    :default-value="defaultValue"
    @update:value="onUpdateValue"
  />
</template>
