<template>
  <!-- 提示词编辑器容器 -->
  <div class="prompt-editor">
    <!-- 模板信息区域 -->
    <div class="template-info">
      <!-- 可编辑的模板名称 -->
      <h3 
        contenteditable="true"
        @input="handleNameInput"
        @blur="handleNameBlur"
        ref="nameEditor"
      >{{ editedName }}</h3>
      <!-- 可编辑的使用场景描述 -->
      <p 
        class="scenario" 
        contenteditable="true"
        @input="handleScenarioInput"
        @blur="handleScenarioBlur"
        ref="scenarioEditor"
      >{{ editedScenario }}</p>
    </div>
    <!-- 模板内容编辑区域 -->
    <div class="template-content">
      <!-- CodeMirror编辑器容器 -->
      <div ref="editorContainer" class="template-input"></div>
    </div>
    <!-- 底部按钮组 -->
    <div class="button-group">
      <!-- 按钮组容器 -->
      <div class="left-buttons">
        <!-- 新建模板按钮 -->
        <el-button text @click="handleSaveAsNew" size="small" class="save-new-button">
          新建模板
        </el-button>
        
        <!-- 更新模板按钮 -->
        <el-button text @click="handleUpdate" size="small" class="update-button">
          更新模板
        </el-button>

        <!-- AI改写按钮 -->
        <el-button 
          text 
          @click="handleAIRewrite" 
          size="small" 
          class="rewrite-button"
          :loading="isRewriting"
          :disabled="isRewriting"
        >
          AI改写
        </el-button>
      </div>
      <!-- 复制提示词按钮 -->
      <el-button type="primary" @click="handleCopy" size="default" class="copy-button">复制提示词</el-button>
    </div>
  </div>
</template>

<script>
// 导入所需的依赖
import { ElMessage } from 'element-plus' // Element Plus 消息提示组件
import db from '../../services/db' // 数据库服务
import CodeMirror from 'codemirror' // CodeMirror编辑器
import { rewritePrompt } from '../../services/ai'
import { startAutoSave, stopAutoSave, saveHistory } from '../../services/editor'
// 导入CodeMirror相关样式和模式
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/eclipse.css' // 导入亮色主题
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'

export default {
  name: 'PromptEditor',
  // 组件属性定义
  props: {
    templateData: {
      type: Object,
      required: false,
      // 默认模板数据
      default: () => ({
        name: '新建提示词',
        template: '',
        scenario: '默认使用场景。'
      })
    }
  },
  // 组件内部数据
  data() {
    // 从路由参数中获取模板数据
    let routeTemplate = null;
    try {
      if (this.$route.query.template) {
        routeTemplate = JSON.parse(this.$route.query.template);
      }
    } catch (error) {
      // 错误处理但不输出到控制台
    }

    return {
      // 优先使用路由参数中的数据，如果没有则使用默认值
      template: routeTemplate?.template || '',
      editedName: routeTemplate?.name || '新建提示词',
      editedScenario: routeTemplate?.scenario || '默认使用场景。',
      localTemplateData: routeTemplate || null,
      isDarkMode: document.documentElement.getAttribute('data-theme') === 'dark',
      isRewriting: false
    }
  },
  // 监听属性变化
  watch: {
    // 监听路由参数变化
    '$route.query.template': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          try {
            const routeTemplate = JSON.parse(newVal);
            if (this.editor) {
              this.editor.setValue(routeTemplate.template || '');
            }
            this.template = routeTemplate.template || '';
            this.editedName = routeTemplate.name || '新建提示词';
            this.editedScenario = routeTemplate.scenario || '默认使用场景。';
            this.localTemplateData = routeTemplate;
          } catch (error) {
            // 错误处理但不输出到控制台
          }
        }
      }
    },
    // 监听主题变化
    isDarkMode: {
      immediate: true,
      handler(newVal) {
        if (this.editor) {
          this.editor.setOption('theme', newVal ? 'monokai' : 'eclipse')
        }
      }
    }
  },
  // 组件挂载后初始化编辑器
  mounted() {
    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          this.isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark'
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    this.initCodeMirror();
    // 启动自动保存
    startAutoSave(this.localTemplateData, this.handleUpdate);
  },
  methods: {
    // 初始化CodeMirror编辑器
    initCodeMirror() {
      // 从本地存储获取保存的编辑器状态
      let savedState = null;
      try {
        const stateStr = localStorage.getItem('editorState');
        if (stateStr) {
          savedState = JSON.parse(stateStr);
        }
      } catch (error) {
        console.error('解析保存的编辑器状态失败:', error);
      }

      this.editor = CodeMirror(this.$refs.editorContainer, {
        lineNumbers: true,
        mode: 'javascript',
        theme: this.isDarkMode ? 'monokai' : 'eclipse',
        value: this.template || (savedState?.content || ''),
        lineWrapping: true,
        viewportMargin: Infinity,
        height: 'auto',  // 添加高度设置
        scrollbarStyle: null,  // 禁用默认滚动条样式
        undoDepth: 200,  // 历史记录深度
        historyEventDelay: 200  // 历史记录事件延迟
      });

      // 设置编辑器实例的样式
      this.editor.getWrapperElement().style.height = 'auto';
      this.editor.getScrollerElement().style.height = 'auto';

      // 恢复编辑器状态
      if (savedState) {
        // 恢复历史记录
        if (savedState.history) {
          this.editor.setHistory(savedState.history);
        }
        // 恢复光标位置
        if (savedState.cursorPosition) {
          this.editor.setCursor(savedState.cursorPosition);
        }
        // 恢复滚动位置
        if (savedState.scrollPosition) {
          this.$nextTick(() => {
            this.editor.scrollTo(
              savedState.scrollPosition.left,
              savedState.scrollPosition.top
            );
          });
        }
      }

      this.editor.refresh();

      // 监听编辑器变化
      this.editor.on('change', (instance) => {
        this.template = instance.getValue();
        // 保存编辑器状态
        this.saveEditorState();
        // 内容变化时刷新编辑器大小
        this.$nextTick(() => {
          this.editor.refresh();
        });
      });

      // 监听滚动事件
      this.editor.on('scroll', () => {
        this.saveEditorState();
      });

      // 监听光标位置变化
      this.editor.on('cursorActivity', () => {
        this.saveEditorState();
      });

      this.editor.on('paste', (instance, event) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain');
        instance.replaceSelection(text);
      });
    },

    // 保存编辑器状态
    saveEditorState() {
      if (!this.editor) return;

      const state = {
        content: this.editor.getValue(),
        scrollPosition: {
          left: this.editor.getScrollInfo().left,
          top: this.editor.getScrollInfo().top
        },
        cursorPosition: this.editor.getCursor(),
        history: this.editor.getHistory(),
        timestamp: Date.now()
      };

      try {
        localStorage.setItem('editorState', JSON.stringify(state));
      } catch (error) {
        // 错误处理但不输出到控制台
      }
    },
    // 验证模板数据完整性
    validateTemplate() {
      if (!this.editedName?.trim()) {
        ElMessage.warning('模板名称不能为空')
        return false
      }
      if (!this.template?.trim()) {
        ElMessage.warning('提示词内容不能为空')
        return false
      }
      if (!this.editedScenario?.trim()) {
        ElMessage.warning('使用场景不能为空')
        return false
      }
      return true
    },
    // 处理名称输入
    handleNameInput(event) {
      // 限制输入长度为30字
      let text = event.target.textContent
      if (text.length > 30) {
        text = text.slice(0, 30)
        event.target.textContent = text
        // 将光标移到末尾
        const range = document.createRange()
        const sel = window.getSelection()
        range.selectNodeContents(event.target)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      this.editedName = text
      this.$emit('update:templateData', { 
        ...this.templateData, 
        name: this.editedName 
      })
    },
    // 处理名称失焦
    handleNameBlur(event) {
      const text = this.editedName || '新建提示词'
      event.target.textContent = text
      // 添加title属性以显示完整文本
      event.target.title = text
    },
    // 处理场景输入
    handleScenarioInput(event) {
      // 限制输入长度为30字
      let text = event.target.textContent
      if (text.length > 30) {
        text = text.slice(0, 30)
        event.target.textContent = text
        // 将光标移到末尾
        const range = document.createRange()
        const sel = window.getSelection()
        range.selectNodeContents(event.target)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      }
      this.editedScenario = text
      this.$emit('update:templateData', { 
        ...this.templateData, 
        scenario: this.editedScenario 
      })
    },
    // 处理场景失焦
    handleScenarioBlur(event) {
      const text = this.editedScenario || '默认使用场景。'
      event.target.textContent = text
      // 添加title属性以显示完整文本
      event.target.title = text
    },
    // 处理内容输入
    handleInput(event) {
      this.template = event.target.innerText
      this.$emit('update:template', this.template)
    },
    // 处理粘贴事件
    handlePaste(event) {
      event.preventDefault()
      const text = event.clipboardData.getData('text/plain')
      document.execCommand('insertText', false, text)
    },
    // 处理复制操作
    handleCopy() {
      if (!this.template) {
        ElMessage.warning('没有可复制的内容')
        return
      }
      navigator.clipboard.writeText(this.template)
        .then(() => {
          ElMessage.success('复制成功')
        })
        .catch(() => {
          ElMessage.error('复制失败')
        })
    },
    // 处理新建模板
    handleSaveAsNew() {
      if (!this.validateTemplate()) return

      try {
        const newTemplate = {
          name: this.editedName,
          template: this.template,
          scenario: this.editedScenario
        }
        const savedTemplate = db.saveTemplate(newTemplate)
        // 保存到历史记录
        saveHistory(savedTemplate)
        ElMessage.success('保存成功')
        this.$router.push({
          name: 'my-templates'
        })
      } catch (error) {
        ElMessage.error('保存失败：' + error.message)
      }
    },
    // 处理更新模板
    handleUpdate() {
      if (!this.localTemplateData?.id) {
        ElMessage.warning('当前模板未保存，请使用新建模板功能')
        return
      }

      if (!this.validateTemplate()) return

      try {
        const updatedTemplate = {
          ...this.localTemplateData,
          name: this.editedName,
          template: this.template,
          scenario: this.editedScenario
        }
        if (db.updateTemplate(updatedTemplate)) {
          ElMessage.success('更新成功')
          // 保存到历史记录
          saveHistory(updatedTemplate)
          this.$router.push({
            name: 'my-templates'
          })
        } else {
          ElMessage.error('更新失败：模板不存在')
        }
      } catch (error) {
        ElMessage.error('更新失败：' + error.message)
      }
    },
    // 处理 AI 改写
    async handleAIRewrite() {
      try {
        // 获取编辑器当前内容
        const content = this.editor.getValue();
        
        // 检查内容是否为空
        if (!content || content.trim().length === 0) {
          ElMessage.warning('请先输入需要改写的内容');
          return;
        }

        // 设置改写状态
        this.isRewriting = true;

        // 调用 AI 改写服务
        const rewrittenContent = await rewritePrompt(content);
        
        // 更新编辑器内容
        this.editor.setValue(rewrittenContent);
        
        // 提示成功
        ElMessage.success('AI改写完成');
      } catch (error) {
        // 错误提示
        ElMessage.error(error.message || 'AI改写失败，请稍后重试');
      } finally {
        // 重置改写状态
        this.isRewriting = false;
      }
    }
  },
  // 组件销毁前清理编辑器
  beforeDestroy() {
    if (this.editor) {
      // 保存最终的编辑器状态
      this.saveEditorState();
      this.editor.toTextArea();
    }
    // 停止自动保存
    stopAutoSave();
  }
}
</script>

<style lang="less" scoped>
/* 提示词编辑器容器样式 */
.prompt-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);  // 使用更浅的边框颜色
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);  // 添加更柔和的投影
  overflow: hidden;
  /* 模板信息区域样式 */
  .template-info {
    padding: 16px;
    border-bottom: 1px solid var(--el-border-color-lighter);  // 使用更浅的边框颜色

    /* 标题样式 */
    h3 {
      font-size: 18px;
      margin-bottom: 8px;
      color: var(--el-text-color-primary);
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      cursor: pointer;
      
      &:focus {
        border-bottom: 1px solid var(--el-color-primary);  // 减小边框粗细
      }
    }

    /* 场景描述样式 */
    .scenario {
      font-size: 14px;
      color: var(--el-text-color-secondary);
      margin: 0;
      outline: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      cursor: pointer;
      
      &:focus {
        border-bottom: 1px solid var(--el-color-primary);  // 减小边框粗细
      }
    }
  }

  /* 模板内容区域样式 */
  .template-content {
    flex: 1;
    padding: 4px;
    background-color: var(--el-bg-color);
    overflow: auto;
    display: flex;
    flex-direction: column;
    /* 自定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: var(--el-bg-color-page);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--el-border-color-darker);
      border-radius: 2px;
      
      &:hover {
        background: var(--el-text-color-secondary);
      }
    }

    /* 编辑器输入区域样式 */
    .template-input {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      
      :deep(.CodeMirror) {
        width: 100%;
        height: auto !important;
        min-height: 100%;  // 设置最小高度
        font-family: "Courier New", monospace;
        font-size: 14px;
        line-height: 1.5;
        background-color: var(--el-bg-color-page) !important;
        color: var(--el-text-color-primary) !important;
        // border: 1px solid var(--el-border-color);
        border-radius: 4px;

        .CodeMirror-scroll {
          min-height: inherit;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .CodeMirror-sizer {
          min-height: inherit;
        }

        .CodeMirror-gutters {
          height: 100%;
          background-color: var(--el-bg-color) !important;
          border-right: 1px solid var(--el-border-color-lighter);  // 使用更浅的边框颜色
          padding: 0 3px;
        }

        .CodeMirror-linenumber {
          color: var(--el-text-color-secondary) !important;
          padding: 0 5px;
        }

        .CodeMirror-cursor {
          border-left: 2px solid var(--el-text-color-primary);
        }

        .CodeMirror-selected {
          background-color: var(--el-color-primary-light-8) !important;
        }

        /* 隐藏所有滚动条 */
        ::-webkit-scrollbar {
          display: none !important;
        }

        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      }
    }
  }

  /* 底部按钮组样式 */
  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--el-bg-color);
    border-top: 1px solid var(--el-border-color-lighter);  // 使用更浅的边框颜色

    /* 左侧按钮组样式 */
    .left-buttons {
      display: flex;
      gap: 12px;
    }

    /* 复制按钮样式 */
    .copy-button {
      min-width: 100px;
    }
  }
}
</style>