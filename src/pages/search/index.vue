<script lang="ts" setup>
import { useSearch } from './hooks/search'
import { useOssStore } from '@/store'

const { renderData } = useSearch()

const { signatureUrl } = useOssStore()
</script>

<template>
  <div flex-auto container mx-auto px-4 py-8>
    <Breadcrumb :items="['数据搜索']" />
    <div mt-4 text-xl>数据搜索</div>
    <div class="dark:font-bold">{{ renderData.length }}</div>
    阿里云STS测试
    <img
      :src="
        signatureUrl(
          'http://baihe-beijing.oss-cn-beijing.aliyuncs.com/screenshots/www.hnyongxun.cn/1633505615394.jpeg'
        )
      "
      alt=""
    />
  </div>
</template>
