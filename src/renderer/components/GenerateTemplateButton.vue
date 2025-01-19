<template>
  <!-- 生成模板按钮组件 -->
  <el-button 
    text
    @click="handleGenerate" 
    :title="title"
    :disabled="disabled"
    class="generate-button">
    <el-icon class="icon"><CirclePlus /></el-icon>
    <span>{{ title }}</span>
  </el-button>
</template>

<script>
import { CirclePlus } from '@element-plus/icons-vue'

export default {
  name: 'GenerateTemplateButton',
  components: {
    CirclePlus
  },
  props: {
    title: {
      type: String,
      default: '生成模板'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['generate'],
  methods: {
    handleGenerate() {
      this.$emit('generate')
    }
  }
}
</script>

<style lang="less" scoped>
.generate-button {
  min-width: 120px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  .icon {
    font-size: 16px;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background-color: var(--el-color-success-light-9);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>