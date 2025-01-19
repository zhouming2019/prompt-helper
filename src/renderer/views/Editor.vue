<template>
  <div class="editor">
    <!-- 标题栏 -->
    <div class="page-title">
      <div class="title-content">
        <div>
          <h2>{{ $t('pages.editor.title') }}</h2>
          <p class="subtitle">{{ $t('pages.editor.subtitle') }}</p>
        </div>
      </div>
      <div class="title-actions">
        <el-button-group style="justify-content: flex-end;">
          <template-button />
          <settings-button />
        </el-button-group>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="edit-section">
      <prompt-editor 
        :template-data="templateData"
        @update:template="handleTemplateUpdate" />
    </div>
  </div>
</template>

<script>
import TemplateButton from '../components/TemplateButton.vue'
import SettingsButton from '../components/SettingsButton.vue'
import PromptEditor from '../components/prompt/PromptEditor.vue'

export default {
  name: 'Editor',
  components: {
    PromptEditor,
    TemplateButton,
    SettingsButton
  },
  data() {
    return {
      templateData: {
        id: '1',
        name: '文章生成提示词',
        template: '请以tone的语气，写一篇关于topic的type。\n\n要求：\n1. 文章主题为"topic"\n2. 使用style的写作风格\n3. 总字数控制在length字左右\n\n反向提示词：请避免使用过于简单或模糊的表达，确保内容具有深度和专业性。',
        scenario: '适用于需要生成高质量、结构完整的专业文章场景。'
      }
    }
  },
  methods: {
    handleTemplateUpdate(template) {
      this.templateData.template = template
    }
  }
}
</script>

<style lang="less" scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--el-bg-color-page);

  .page-title {
    display: flex;
    justify-content: space-between;
    background-color: var(--el-bg-color);
    align-items: center;
    padding: 8px 20px;
    border-bottom: 1px solid var(--el-border-color);

    .title-content {
      h2 {
        font-size: 20px;
        color: var(--el-text-color-primary);
        margin-bottom: 8px;
        font-weight: 600;
      }

      .subtitle {
        font-size: 10px;
        color: var(--el-text-color-secondary);
      }
    }
    
    .title-actions {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: flex-end;

      :deep(.el-button-group) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

.edit-section {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background-color: var(--el-bg-color-page);
}
</style>
