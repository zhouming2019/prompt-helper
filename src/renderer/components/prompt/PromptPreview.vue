<template>
  <div class="prompt-preview">
    <el-input
      v-model="formattedPrompt"
      type="textarea"
      :rows="6"
      resize="none"
      readonly
      placeholder="预览内容将显示在这里..."
    />
    <div class="preview-actions">
      <el-button-group>
        <el-button 
          type="primary" 
          :icon="CopyDocument"
          @click="copyToClipboard">
          复制
        </el-button>
        <el-button 
          type="primary" 
          :icon="Download"
          @click="downloadPrompt">
          下载
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { CopyDocument, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PromptPreview',
  props: {
    prompt: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      CopyDocument,
      Download
    }
  },
  computed: {
    formattedPrompt() {
      return this.prompt || ''
    }
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.formattedPrompt)
        ElMessage({
          message: '提示词已复制到剪贴板',
          type: 'success',
          duration: 2000
        })
      } catch (err) {
        ElMessage({
          message: '复制失败，请重试',
          type: 'error',
          duration: 2000
        })
      }
    },
    downloadPrompt() {
      const blob = new Blob([this.formattedPrompt], { type: 'text/plain' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `prompt_${new Date().getTime()}.txt`
      a.click()
      window.URL.revokeObjectURL(url)
      
      ElMessage({
        message: '提示词已下载',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>

<style lang="less" scoped>
.prompt-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;

  :deep(.el-textarea__inner) {
    font-family: var(--el-font-family);
    font-size: 14px;
    line-height: 1.6;
    color: var(--el-text-color-regular);
    background-color: var(--el-fill-color-lighter);
    border-color: var(--el-border-color-lighter);
    
    &:hover, &:focus {
      border-color: var(--el-border-color);
    }
  }

  .preview-actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>