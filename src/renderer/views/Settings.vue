<template>
  <div class="settings-page">
    <!-- 标题栏 -->
    <div class="page-title">
      <div class="title-content">
        <div>
          <h2>{{ $t('common.settings') }}</h2>
          <p class="subtitle">{{ $t('common.settingsDesc') }}</p>
        </div>
      </div>
      <div class="title-actions">
        <el-button-group>
          <template-button />
          <reset-button />
        </el-button-group>
      </div>
    </div>

    <div class="settings-content">
      <el-form 
        :model="settings" 
        label-width="140px"
        class="settings-form">
      
      <!-- 外观设置 -->
      <el-divider>{{ $t('settings.appearance') }}</el-divider>
      <el-form-item :label="$t('settings.theme.label')">
        <el-select v-model="settings.theme" size="small">
          <el-option :label="$t('settings.theme.system')" value="system" />
          <el-option :label="$t('settings.theme.light')" value="light" />
          <el-option :label="$t('settings.theme.dark')" value="dark" />
          <el-option :label="$t('settings.theme.soft')" value="soft" />
          <el-option :label="$t('settings.theme.warm')" value="warm" />
          <el-option :label="$t('settings.theme.oceanDark')" value="oceanDark" />
          <el-option :label="$t('settings.theme.vintageDark')" value="vintageDark" />
          <el-option :label="$t('settings.theme.sweetPink')" value="sweetPink" />
          <el-option :label="$t('settings.theme.mintFresh')" value="mintFresh" />
          <el-option :label="$t('settings.theme.lavenderLight')" value="lavenderLight" />
          <el-option :label="$t('settings.theme.royalPurple')" value="royalPurple" />
          <el-option :label="$t('settings.theme.freshGreen')" value="freshGreen" />
          <el-option :label="$t('settings.theme.minimalGray')" value="minimalGray" />
          <el-option :label="$t('settings.theme.deepBlue')" value="deepBlue" />
          <el-option :label="$t('settings.theme.forestGreen')" value="forestGreen" />
          <el-option :label="$t('settings.theme.coralPink')" value="coralPink" />
          <el-option :label="$t('settings.theme.inkRhythm')" value="inkRhythm" />
          <el-option :label="$t('settings.theme.porcelainCyan')" value="porcelainCyan" />
          <el-option :label="$t('settings.theme.sunsetRed')" value="sunsetRed" />
          <el-option :label="$t('settings.theme.bambooShade')" value="bambooShade" />
          <el-option :label="$t('settings.theme.jadeRhythm')" value="jadeRhythm" />
        </el-select>
        <div class="setting-tip">{{ $t('settings.theme.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.fontSize.label')">
        <el-input-number 
          v-model="settings.fontSize"
          :min="12"
          :max="20"
          :step="1"
          size="small"
          controls-position="right" />
        <span class="unit">px</span>
        <div class="setting-tip">{{ $t('settings.fontSize.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.language.label')">
        <el-select v-model="settings.language" size="small">
          <el-option label="简体中文" value="zh-CN" />
          <el-option label="English" value="en-US" />
        </el-select>
        <div class="setting-tip">{{ $t('settings.language.tip') }}</div>
      </el-form-item>

      <!-- 编辑器设置 -->
      <el-divider>{{ $t('settings.editor.title') }}</el-divider>
      <el-form-item :label="$t('settings.editor.autoSave.label')">
        <el-switch v-model="settings.autoSave" />
        <div class="setting-tip">{{ $t('settings.editor.autoSave.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.editor.saveInterval.label')">
        <el-input-number 
          v-model="settings.autoSaveInterval"
          :min="1"
          :max="30"
          :step="1"
          size="small"
          controls-position="right"
          :disabled="!settings.autoSave" />
        <span class="unit">{{ $t('settings.editor.saveInterval.unit') }}</span>
        <div class="setting-tip">{{ $t('settings.editor.saveInterval.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.editor.history.label')">
        <el-input-number 
          v-model="settings.maxHistorySize"
          :min="10"
          :max="100"
          :step="10"
          size="small"
          controls-position="right" />
        <span class="unit">{{ $t('settings.editor.history.unit') }}</span>
        <div class="setting-tip">{{ $t('settings.editor.history.tip') }}</div>
      </el-form-item>

      <!-- AI设置 -->
      <el-divider>{{ $t('settings.ai.title') }}</el-divider>
      <el-form-item 
        :label="$t('settings.ai.apiUrl.label')"
        :rules="[{ required: true, message: '请输入 API 地址', trigger: 'blur' }]">
        <el-input 
          v-model="settings.aiBaseUrl"
          size="small"
          :placeholder="$t('settings.ai.apiUrl.placeholder')">
          <template #prefix>
            <el-icon><Pointer /></el-icon>
          </template>
        </el-input>
        <div class="setting-tip">{{ $t('settings.ai.apiUrl.tip') }}</div>
      </el-form-item>

      <el-form-item 
        :label="$t('settings.ai.apiKey.label')"
        :rules="[{ required: true, message: '请输入 API 密钥', trigger: 'blur' }]">
        <el-input 
          v-model="settings.aiApiKey"
          type="password"
          size="small"
          show-password
          :placeholder="$t('settings.ai.apiKey.placeholder')">
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
        <div class="setting-tip">{{ $t('settings.ai.apiKey.tip') }}</div>
      </el-form-item>

      <el-form-item 
        :label="$t('settings.ai.model.label')"
        :rules="[{ required: true, message: '请输入 AI 模型名称', trigger: 'blur' }]">
        <el-select 
          v-model="settings.aiModel"
          size="small"
          disabled>
          <el-option label="DeepSeek Chat" value="deepseek-chat" />
        </el-select>
        <div class="setting-tip">{{ $t('settings.ai.model.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.ai.temperature.label')">
        <el-slider 
          v-model="settings.aiTemperature"
          :min="0"
          :max="1"
          :step="0.1"
          :format-tooltip="value => value.toFixed(1)"
          :marks="{
            0: '0',
            0.5: '0.5',
            1: '1'
          }" />
        <div class="setting-tip">{{ $t('settings.ai.temperature.tip') }}</div>
      </el-form-item>

      <el-form-item :label="$t('settings.ai.maxTokens.label')">
        <el-input-number 
          v-model="settings.aiMaxTokens"
          :min="100"
          :max="4000"
          :step="100"
          size="small"
          controls-position="right" />
        <span class="unit">{{ $t('settings.ai.maxTokens.unit') }}</span>
        <div class="setting-tip">{{ $t('settings.ai.maxTokens.tip') }}</div>
      </el-form-item>

      <!-- AI设置部分后添加快捷键设置 -->
      <el-divider>快捷键设置</el-divider>
      
      <!-- 功能快捷键 -->
      <el-form-item label="重新加载">
        <el-input 
          v-model="shortcuts.reload"
          size="small"
          @keydown.native.prevent="recordShortcut($event, 'reload')"
          readonly
          placeholder="点击输入快捷键">
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
        <div class="setting-tip">重新加载应用窗口</div>
      </el-form-item>

      <el-form-item label="显示窗口">
        <el-input 
          v-model="shortcuts.showWindow"
          size="small"
          @keydown.native.prevent="recordShortcut($event, 'showWindow')"
          readonly
          placeholder="点击输入快捷键">
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
        <div class="setting-tip">显示或恢复最小化的窗口</div>
      </el-form-item>

      <!-- 重置按钮 -->
      <el-form-item>
        <el-button type="warning" @click="resetShortcuts">
          重置快捷键
        </el-button>
        <div class="setting-tip">将所有快捷键恢复为默认设置</div>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { ArrowLeft, RefreshLeft, InfoFilled, Key, Pointer } from '@element-plus/icons-vue'
import db from '../services/db'
import { applyTheme, watchSystemTheme } from '../services/theme'
import { setLanguage } from '../services/i18n'
import TemplateButton from '../components/TemplateButton.vue'
import ResetButton from '../components/ResetButton.vue'
import shortcuts from '../services/shortcuts'

export default {
  name: 'Settings',
  components: {
    TemplateButton,
    ResetButton
  },
  data() {
    return {
      settings: {
        theme: 'light',
        language: 'zh-CN',
        autoSave: true,
        autoSaveInterval: 5,
        maxHistorySize: 50,
        fontSize: 14,
        aiBaseUrl: 'https://api.deepseek.com/v1',
        aiApiKey: '',
        aiModel: 'deepseek-chat',
        aiTemperature: 0.7,
        aiMaxTokens: 2000
      },
      shortcuts: shortcuts.DEFAULT_SHORTCUTS,
      recordingShortcut: null,
      removeThemeWatcher: null,
      ArrowLeft,
      RefreshLeft,
      InfoFilled,
      Key,
      Pointer
    }
  },
  watch: {
    settings: {
      deep: true,
      handler(newSettings) {
        this.saveSettings(newSettings)
        // 应用主题设置
        applyTheme(newSettings)
        // 应用语言设置
        if (this.settings.language) {
          setLanguage(this.settings.language)
        }
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    loadSettings() {
      try {
        const savedSettings = db.getSettings()
        this.settings = { ...this.settings, ...savedSettings }
        // 初始应用主题设置
        applyTheme(this.settings)
      } catch (error) {
        ElMessage.error('加载设置失败：' + error.message)
      }
    },
    saveSettings(settings) {
      try {
        db.updateSettings(settings)
        ElMessage.success('设置已保存')
      } catch (error) {
        ElMessage.error('保存设置失败：' + error.message)
      }
    },
    resetSettings() {
      try {
        this.settings = db.resetSettings()
        ElMessage.success('已恢复默认设置')
      } catch (error) {
        ElMessage.error('重置设置失败：' + error.message)
      }
    },
    recordShortcut(event, type) {
      // 获取按键组合
      const keys = []
      if (event.ctrlKey) keys.push('Ctrl')
      if (event.shiftKey) keys.push('Shift')
      if (event.altKey) keys.push('Alt')
      if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt') {
        keys.push(event.key.toUpperCase())
      }
      
      // 至少需要一个修饰键
      if (!event.ctrlKey && !event.altKey) {
        ElMessage.warning('快捷键必须包含 Ctrl 或 Alt')
        return
      }
      
      // 组合键字符串
      const shortcut = keys.join('+')
      
      // 检查是否与其他快捷键冲突
      for (const [key, value] of Object.entries(this.shortcuts)) {
        if (key !== type && value === shortcut) {
          ElMessage.warning(`该快捷键已被"${key}"使用`)
          return
        }
      }
      
      // 更新快捷键
      this.shortcuts[type] = shortcut
      
      // 保存到数据库
      try {
        shortcuts.updateShortcuts(this.shortcuts)
        ElMessage.success('快捷键设置已保存')
      } catch (error) {
        console.error('保存快捷键失败:', error)
        ElMessage.error('保存快捷键失败')
      }
    },
    loadShortcuts() {
      try {
        const savedShortcuts = shortcuts.getShortcuts()
        this.shortcuts = savedShortcuts
      } catch (error) {
        console.error('加载快捷键失败:', error)
        ElMessage.error('加载快捷键失败')
      }
    },
    resetShortcuts() {
      try {
        shortcuts.resetShortcuts()
        this.shortcuts = shortcuts.DEFAULT_SHORTCUTS
        ElMessage.success('快捷键已重置为默认设置')
      } catch (error) {
        console.error('重置快捷键失败:', error)
        ElMessage.error('重置快捷键失败')
      }
    }
  },
  mounted() {
    this.loadSettings()
    this.loadShortcuts()
    // 监听系统主题变化
    this.removeThemeWatcher = watchSystemTheme(() => {
      if (this.settings.theme === 'system') {
        applyTheme(this.settings)
      }
    })
  },
  beforeDestroy() {
    // 清理系统主题监听器
    if (this.removeThemeWatcher) {
      this.removeThemeWatcher()
    }
  }
}
</script>

<style lang="less" scoped>
.settings-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color-page);

  .page-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color-lighter);

    .title-content {
      h2 {
        font-size: 20px;
        color: var(--el-text-color-primary);
        margin-bottom: 8px;
        font-weight: 600;
      }

      .subtitle {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }

    .title-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .settings-content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background-color: var(--el-bg-color-page);

    /* 隐藏滚动条 */
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    .settings-form {
      max-width: 800px;
      margin: 0;
      margin-right: auto;
      background-color: var(--el-bg-color);
      padding: 20px;
      border-radius: 8px;
      border: 1px solid var(--el-border-color-lighter);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

      .el-divider {
        &__text {
          color: var(--el-text-color-primary);
          background-color: var(--el-bg-color);
        }
      }

      .el-form-item {
        margin-bottom: 24px;

        &__label {
          color: var(--el-text-color-primary);
          padding-left: 0;
        }

        .unit {
          margin-left: 8px;
          color: var(--el-text-color-regular);
        }

        .setting-tip {
          margin-top: 4px;
          font-size: 12px;
          color: var(--el-text-color-secondary);
          line-height: 1.4;
        }
      }

      .el-input,
      .el-select {
        width: 300px;
      }

      .el-slider {
        width: 300px;
        margin-top: 8px;
        margin-bottom: 24px;

        :deep(.el-slider__marks-text) {
          margin-top: 12px;
        }
      }

      .el-input-number {
        width: 120px;
      }
    }
  }
}
</style>