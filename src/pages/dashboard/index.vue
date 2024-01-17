<script lang="ts" setup>
const loading = ref<boolean>(false)
const renderData = ref()

const fetchData = async () => {
  loading.value = true
  try {
    const { data } = await axios.get('api/stats')
    renderData.value = data
  } catch (err) {
    //
  } finally {
    loading.value = false
  }
}

fetchData()
</script>

<template>
  <div class="animation">
    <div flex="~" justify="between" align="items-baseline">
      <div flex="~" items="center">
        <b text="4xl white" font="semibold">数据态势</b>
      </div>

      <!-- <p>
        数据更新：{{ formatDiffNow(0) }}
      </p> -->
    </div>
    <n-card
      :bordered="false"
      footer-class="flex justify-end gap-4"
      class="my-10 shadow-md"
    >
      {{ renderData }}
      <p class="font-number">{{ renderData?.total }}</p>
    </n-card>
  </div>
</template>
