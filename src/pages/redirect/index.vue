<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const { params, query } = route
const { path } = params
router.replace({ path: '/' + path, query })
</script>

<template>
  <n-spin size="medium" />
</template>
