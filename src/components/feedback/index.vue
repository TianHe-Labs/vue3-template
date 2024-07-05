<template>
  <!-- 如果没有导航栏，在右边放一个固定按钮入口 -->
  <div class="sm:hidden">
    <n-float-button
      :bottom="80"
      :right="40"
      size="large"
      circle
      strong
      @click="feedbackPanelVisible = !feedbackPanelVisible"
    >
      <n-icon class="i-fluent:person-feedback-24-regular" />
    </n-float-button>
  </div>
  <n-modal
    v-model:show="feedbackPanelVisible"
    preset="card"
    title="问题反馈"
    class="w-full md:w-720px md:h-auto"
  >
    <n-form ref="feedbackFormRef" :model="feedbackModel">
      <n-form-item
        required
        path="type"
        label="问题类型"
        :rule="[
          {
            required: true,
            message: '请输入问题类型',
          },
        ]"
      >
        <n-select
          v-model:value="feedbackModel.type"
          clearable
          :options="typeOptions"
          placeholder="请输入问题类型"
        />
      </n-form-item>
      <n-form-item
        required
        path="content"
        label="反馈详情"
        :rule="[
          {
            required: true,
            message: '请输入反馈详情',
          },
        ]"
      >
        <n-input
          v-model:value="feedbackModel.content"
          clearable
          type="textarea"
          :autosize="{
            minRows: 5,
            maxRows: 9,
          }"
          placeholder="请输入反馈详情"
        />
      </n-form-item>
      <!-- <n-form-item path="attachment" label="上传附件">
        <n-upload
          draggable
          multiple
          :max="10"
          :default-file-list="fileList"
          :file-list="fileList"
          list-type="image-card"
          @before-upload="beforeUpload"
        >
          <n-upload-dragger :class="{ 'w-full': fileList.length <= 0 }">
            <n-text> 点击或者拖动文件到该区域来上传 </n-text>
          </n-upload-dragger>
        </n-upload>
      </n-form-item> -->
    </n-form>

    <template #footer>
      <div flex="~ justify-end gap-4">
        <n-button @click="feedbackPanelVisible = !feedbackPanelVisible">
          取消
        </n-button>
        <n-button type="primary" @click="handleSubmit">提交</n-button>
      </div>
    </template>
  </n-modal>
</template>

<script lang="ts" setup>
import { reactive, ref, /* shallowRef, */ inject } from 'vue'
import { /* UploadFileInfo, */ useMessage } from 'naive-ui'
import axios from 'axios'

const feedbackPanelVisible = inject('feedbackPanelVisible') as boolean

const typeOptions = [
  { value: 'fix', label: '错误修复' },
  { value: 'feat', label: '新增功能' },
  { value: 'perf', label: '优化调整' },
  { value: 'style', label: '外观美化' },
  { value: 'docs', label: '文档说明' },
  { value: 'support', label: '技术协助' },
  { value: 'other', label: '其他问题' },
]

const feedbackFormRef = ref()

/* const fileList = shallowRef<UploadFileInfo[]>([])

const beforeUpload = ({ file }: { file: UploadFileInfo }) => {
  console.log(file)
  fileList.value.push(file)
  return false
} */

const feedbackModel = reactive({
  type: null,
  content: '',
})

const messageCtx = useMessage()

const handleSubmit = async () => {
  const errors = await feedbackFormRef.value?.validate()
  if (errors && errors.length) {
    return false
  }
  try {
    const resp = await axios.post('/api/feedback/create')
    if (resp.status >= 200 && resp.status < 300) {
      messageCtx.success('提交成功，请等待反馈')
      return true
    }
    return true
  } catch (err: any) {
    messageCtx.error(`${err?.message || '提交失败，请稍后重试或联系我们'}`)
    return false
  }
}
</script>
