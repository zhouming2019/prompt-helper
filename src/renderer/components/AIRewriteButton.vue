<template>
  <el-button 
    type="primary"
    @click="handleRewrite" 
    :title="title"
    :disabled="disabled"
    class="rewrite-button">
    <el-icon class="icon"><EditPen /></el-icon>
    <span>{{ title }}</span>
  </el-button>
</template>

<script>
import { EditPen } from '@element-plus/icons-vue'

export default {
  name: 'AIRewriteButton',
  components: {
    EditPen
  },
  props: {
    title: {
      type: String,
      default: 'AI改写'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['rewrite'],
  methods: {
    handleRewrite() {
      this.$emit('rewrite')
    }
  }
}
</script>

<style lang="less" scoped>
.rewrite-button {
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
    box-shadow: 0 2px 12px 0 rgba(var(--el-color-primary-rgb), 0.4);
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