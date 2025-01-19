<template>
  <!-- 模板卡片容器 -->
  <div class="template-card">
    <!-- 卡片头部区域 -->
    <div class="template-header">
      <h3 class="template-name">{{ template.name }}</h3>
      <!-- 操作按钮组 -->
      <div class="action-icons">
        <el-icon
          class="action-icon delete-icon"
          @click="$emit('delete', template)"
          :title="$t('buttons.delete')">
          <DeleteFilled />
        </el-icon>
      </div>
    </div>
    <!-- 卡片内容区域 -->
    <div class="template-content">
      <!-- 模板预览内容 -->
      <div class="template-preview">{{ template.scenario }}</div>
    </div>
    <!-- 卡片底部操作区 -->
    <div class="template-actions">
      <button class="action-btn generate-btn" @click="handleGenerate">
        {{ $t('buttons.generate') }}
      </button>
    </div>
  </div>
</template>

<script>
import { DeleteFilled } from '@element-plus/icons-vue'

export default {
  name: 'TemplateCard',
  components: {
    DeleteFilled
  },
  // 组件属性定义
  props: {
    // 模板数据对象
    template: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleGenerate() {
      // 使用路由导航到编辑器页面,并通过 query 传递模板数据
      this.$router.push({
        path: '/editor',
        query: { template: JSON.stringify(this.template) }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// 模板卡片基础样式
.template-card {
  background: var(--el-bg-color);
  border-radius: 8px;
  padding: 12px;
  box-shadow: var(--el-box-shadow);
  transition: transform 0.2s;
  border: 1px solid var(--el-border-color-light);

  // 悬停效果
  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--el-box-shadow-light);
  }

  // 卡片头部样式
  .template-header {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    // 模板名称样式
    .template-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--el-text-color-primary);
      margin: 0;
    }
    
    // 操作图标容器样式
    .action-icons {
      display: flex;
      gap: 6px;

      // 操作图标样式
      .action-icon {
        width: 20px;
        height: 20px;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.7;
        }

        // 删除图标红色
        &.delete-icon {
          color: var(--el-color-danger);
        }
      }
    }
  }

  // 卡片内容区域样式
  .template-content {
    // 模板预览区域样式
    .template-preview {
      font-size: 13px;
      color: var(--el-text-color-regular);
      line-height: 1.5;
      margin-bottom: 8px;
      background: var(--el-fill-color-light);
      padding: 10px;
      border-radius: 4px;
      max-height: 80px;
      overflow-y: auto;
    }
  }

  // 底部操作区域样式
  .template-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;

    // 操作按钮基础样式
    .action-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      // 生成按钮特定样式
      &.generate-btn {
        background: var(--el-color-primary);
        color: white;

        &:hover {
          background: var(--el-color-primary-light-3);
          transform: scale(1.05);
        }

        &:active {
          background: var(--el-color-primary-dark-2);
        }
      }
    }
  }
}
</style>