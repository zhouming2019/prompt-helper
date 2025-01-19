<template>
  <div class="template-editor">
    <div class="editor-header">
      <h3>{{ isEdit ? '编辑模板' : '新建模板' }}</h3>
      <div class="header-actions">
        <button class="cancel-btn" @click="cancel">取消</button>
        <button class="save-btn" @click="save">保存</button>
      </div>
    </div>
    <div class="editor-content">
      <div class="basic-info">
        <div class="form-item">
          <label>模板名称</label>
          <input v-model="formData.name" type="text" placeholder="请输入模板名称">
        </div>
        <div class="form-item">
          <label>使用场景</label>
          <input v-model="formData.scenario" type="text" placeholder="请输入使用场景">
        </div>
        <div class="form-item">
          <label>模板内容</label>
          <textarea v-model="formData.template" placeholder="请输入模板内容，使用 {变量名} 表示变量"></textarea>
        </div>
      </div>

      <div class="variables-section">
        <div class="section-header">
          <h4>变量列表</h4>
          <button class="add-btn" @click="addVariable">添加变量</button>
        </div>
        <div class="variables-list">
          <div v-for="(variable, index) in formData.variables" 
               :key="index"
               class="variable-item">
            <div class="variable-content">
              <div class="form-item">
                <label>变量名称</label>
                <input v-model="variable.name" type="text" placeholder="请输入变量名称">
              </div>
              <div class="form-item">
                <label>变量类型</label>
                <select v-model="variable.type">
                  <option value="text">文本</option>
                  <option value="select">选择</option>
                  <option value="number">数字</option>
                </select>
              </div>
              <div class="form-item" v-if="variable.type === 'select'">
                <label>选项列表</label>
                <input v-model="variable.options" type="text" placeholder="请输入选项，用逗号分隔">
              </div>
            </div>
            <button class="delete-btn" @click="removeVariable(index)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromptTemplateEditor',
  props: {
    template: {
      type: Object,
      default: () => ({
        name: '',
        scenario: '',
        template: '',
        variables: []
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        scenario: '',
        template: '',
        variables: []
      }
    };
  },
  created() {
    if (this.isEdit && this.template) {
      this.formData = JSON.parse(JSON.stringify(this.template));
    }
  },
  methods: {
    addVariable() {
      this.formData.variables.push({
        name: '',
        type: 'text',
        options: ''
      });
    },
    removeVariable(index) {
      this.formData.variables.splice(index, 1);
    },
    save() {
      // TODO: 验证表单数据
      this.$emit('save', this.formData);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="less" scoped>
.template-editor {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  .editor-header {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e7ed;

    h3 {
      margin: 0;
      font-size: 16px;
      color: #303133;
    }

    .header-actions {
      display: flex;
      gap: 12px;

      button {
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &.cancel-btn {
          background: #909399;
          color: white;

          &:hover {
            background: #a6a9ad;
          }
        }

        &.save-btn {
          background: #409eff;
          color: white;

          &:hover {
            background: #66b1ff;
          }
        }
      }
    }
  }

  .editor-content {
    padding: 16px;

    .basic-info, .variables-section {
      margin-bottom: 24px;
    }

    .form-item {
      margin-bottom: 16px;

      label {
        display: block;
        font-size: 14px;
        color: #606266;
        margin-bottom: 8px;
      }

      input, select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        font-size: 14px;
        color: #606266;

        &:focus {
          outline: none;
          border-color: #409eff;
        }
      }

      textarea {
        width: 100%;
        height: 120px;
        padding: 8px 12px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        font-size: 14px;
        color: #606266;
        resize: vertical;

        &:focus {
          outline: none;
          border-color: #409eff;
        }
      }
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      h4 {
        margin: 0;
        font-size: 15px;
        color: #303133;
      }

      .add-btn {
        padding: 6px 12px;
        background: #67c23a;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #85ce61;
        }
      }
    }

    .variable-item {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: #f5f7fa;
      border-radius: 4px;
      margin-bottom: 12px;

      .variable-content {
        flex: 1;
      }

      .delete-btn {
        align-self: center;
        padding: 6px 12px;
        background: #f56c6c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background: #f78989;
        }
      }
    }
  }
}
</style> 