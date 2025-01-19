<template>
  <div class="prompt-create">
    <!-- 模板选择 -->
    <el-form 
      ref="promptForm"
      :model="formData"
      label-position="top">
      <el-form-item 
        label="选择模板" 
        prop="templateId"
        :rules="[
          { required: true, message: '请选择一个模板', trigger: 'change' }
        ]">
        <el-select 
          v-model="formData.templateId"
          placeholder="请选择模板"
          style="width: 100%"
          @change="handleTemplateChange">
          <el-option
            v-for="template in templates"
            :key="template.id"
            :label="template.name"
            :value="template.id">
            <span>{{ template.name }}</span>
            <span class="template-scenario">{{ template.scenario }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 变量输入区域 -->
    <div v-if="selectedTemplate" class="variables-section">
      <h3>变量设置</h3>
      <el-form 
        ref="variablesForm"
        :model="variables"
        label-position="top">
        <el-card 
          v-for="variable in selectedTemplate.variables"
          :key="variable.name"
          class="variable-card"
          shadow="hover">
          <template #header>
            <div class="variable-header">
              <span>{{ variable.name }}</span>
              <el-tag size="small" effect="plain">
                {{ getVariableTypeName(variable.type) }}
              </el-tag>
            </div>
          </template>

          <!-- 文本输入 -->
          <el-input
            v-if="variable.type === 'text'"
            v-model="variables[variable.name]"
            :placeholder="`请输入${variable.name}`"
            clearable />

          <!-- 数字输入 -->
          <el-input-number
            v-else-if="variable.type === 'number'"
            v-model="variables[variable.name]"
            :min="variable.min"
            :max="variable.max"
            :placeholder="`请输入${variable.name}`"
            style="width: 100%" />

          <!-- 选择输入 -->
          <el-select
            v-else-if="variable.type === 'select'"
            v-model="variables[variable.name]"
            :placeholder="`请选择${variable.name}`"
            style="width: 100%">
            <el-option
              v-for="option in variable.options"
              :key="option"
              :label="option"
              :value="option" />
          </el-select>
        </el-card>
      </el-form>
    </div>

    <!-- 预览区域 -->
    <div v-if="selectedTemplate" class="preview-section">
      <el-divider>预览</el-divider>
      <prompt-preview :prompt="generatedPrompt" />
    </div>

    <!-- 操作按钮 -->
    <div class="action-buttons">
      <el-button @click="cancel">取消</el-button>
      <el-button 
        type="primary"
        :disabled="!selectedTemplate"
        @click="generatePrompt">
        生成提示词
      </el-button>
    </div>
  </div>
</template>

<script>
import PromptPreview from './PromptPreview.vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'PromptCreate',
  components: {
    PromptPreview
  },
  data() {
    return {
      formData: {
        templateId: ''
      },
      templates: [], // 从父组件传入或从API获取
      selectedTemplate: null,
      variables: {},
      generatedPrompt: ''
    }
  },
  methods: {
    getVariableTypeName(type) {
      const types = {
        text: '文本',
        number: '数字',
        select: '选择'
      }
      return types[type] || type
    },
    handleTemplateChange(templateId) {
      this.selectedTemplate = this.templates.find(t => t.id === templateId)
      if (this.selectedTemplate) {
        // 初始化变量值
        this.variables = {}
        this.selectedTemplate.variables.forEach(v => {
          this.variables[v.name] = v.default || ''
        })
      }
    },
    generatePrompt() {
      if (!this.selectedTemplate) {
        ElMessage.warning('请先选择一个模板')
        return
      }

      try {
        let prompt = this.selectedTemplate.template
        Object.entries(this.variables).forEach(([key, value]) => {
          prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), value)
        })
        this.generatedPrompt = prompt
        
        this.$emit('generate', {
          template: this.selectedTemplate,
          variables: this.variables,
          prompt: this.generatedPrompt
        })
      } catch (err) {
        ElMessage.error('生成提示词时发生错误')
      }
    },
    cancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.prompt-create {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px;
  height: 100%;
  overflow: auto;

  .template-scenario {
    float: right;
    color: var(--el-text-color-secondary);
    font-size: 13px;
  }

  .variables-section {
    h3 {
      font-size: 16px;
      font-weight: 500;
      color: var(--el-text-color-primary);
      margin: 0 0 16px;
    }

    .variable-card {
      margin-bottom: 16px;

      .variable-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .preview-section {
    flex: 1;
    min-height: 200px;
  }

  .action-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: auto;
    padding-top: 24px;
  }
}
</style>