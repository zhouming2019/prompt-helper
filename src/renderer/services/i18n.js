import { createI18n } from 'vue-i18n'
import db from './db'

// 中文语言包
const zhCN = {
  common: {
    appName: '提词器工具',
    settings: '设置',
    settingsDesc: '自定义您的使用体验',
    save: '保存',
    reset: '重置',
    success: '成功',
    error: '错误',
    loading: '加载中...',
    back: '返回',
    delete: '删除',
    edit: '编辑',
    create: '新建',
    cancel: '取消',
    confirm: '确认',
    search: '搜索',
    noData: '暂无数据',
    copySuccess: '复制成功',
    defaultScenario: '默认使用场景。'
  },
  buttons: {
    template: '模板',
    create: '新建',
    settings: '设置',
    resetDefault: '恢复默认',
    generate: '生成提示词',
    edit: '编辑',
    delete: '删除'
  },
  pages: {
    templates: {
      title: '我的模板',
      subtitle: '管理和使用您的提示词模板',
      searchPlaceholder: '搜索模板...',
      noData: '暂无模板',
      deleteConfirm: '确定要删除这个模板吗？'
    },
    editor: {
      title: '编辑器',
      subtitle: '编辑和生成您的提示词'
    }
  },
  settings: {
    appearance: '外观设置',
    theme: {
      label: '主题模式',
      system: '跟随系统',
      light: '浅色',
      dark: '深色',
      soft: '柔和',
      warm: '暖橙',
      oceanDark: '深海蓝',
      vintageDark: '复古紫',
      sweetPink: '甜心粉',
      mintFresh: '清新薄荷',
      lavenderLight: '薰衣草',
      royalPurple: '皇家紫',
      freshGreen: '清新绿',
      minimalGray: '极简灰',
      deepBlue: '深邃蓝',
      forestGreen: '森林绿',
      coralPink: '珊瑚粉',
      inkRhythm: '墨韵',
      porcelainCyan: '瓷青',
      sunsetRed: '丹霞',
      bambooShade: '竹影',
      jadeRhythm: '玉韵',
      tip: '选择界面的主题模式'
    },
    fontSize: {
      label: '字体大小',
      tip: '调整界面文字大小 (12-20px)'
    },
    language: {
      label: '界面语言',
      tip: '选择界面显示语言'
    },
    editor: {
      title: '编辑器设置',
      autoSave: {
        label: '自动保存',
        tip: '启用后将自动保存编辑内容'
      },
      saveInterval: {
        label: '保存间隔',
        tip: '自动保存的时间间隔 (1-30分钟)',
        unit: '分钟'
      },
      history: {
        label: '历史记录数',
        tip: '保存的最大历史记录数量 (10-100条)',
        unit: '条'
      }
    },
    ai: {
      title: 'AI设置',
      apiUrl: {
        label: 'API地址',
        tip: 'DeepSeek API 的基础地址',
        placeholder: '请输入 DeepSeek API 地址'
      },
      apiKey: {
        label: 'API密钥',
        tip: '在 DeepSeek 官网获取的 API 密钥',
        placeholder: '请输入 DeepSeek API 密钥'
      },
      model: {
        label: 'AI模型',
        tip: '目前仅支持 DeepSeek Chat 模型'
      },
      temperature: {
        label: '输出随机性',
        tip: '调整 AI 输出的随机性，值越大输出越具有创意性',
        marks: {
          0: '精确',
          0.5: '平衡',
          1: '创意'
        }
      },
      maxTokens: {
        label: '最大输出长度',
        tip: '单次生成的最大 token 数量 (建议 100-4000)',
        unit: 'tokens'
      }
    }
  }
}

// 英文语言包
const enUS = {
  common: {
    appName: 'Prompt Word Tool',
    settings: 'Settings',
    settingsDesc: 'Customize your experience',
    save: 'Save',
    reset: 'Reset',
    success: 'Success',
    error: 'Error',
    loading: 'Loading...',
    back: 'Back',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    cancel: 'Cancel',
    confirm: 'Confirm',
    search: 'Search',
    noData: 'No Data',
    copySuccess: 'Copied successfully',
    defaultScenario: 'Default usage scenario.'
  },
  buttons: {
    template: 'Template',
    create: 'Create',
    settings: 'Settings',
    resetDefault: 'Reset Default',
    generate: 'Generate Prompt',
    edit: 'Edit',
    delete: 'Delete'
  },
  pages: {
    templates: {
      title: 'My Templates',
      subtitle: 'Manage and use your prompt templates',
      searchPlaceholder: 'Search templates...',
      noData: 'No templates',
      deleteConfirm: 'Are you sure you want to delete this template?'
    },
    editor: {
      title: 'Editor',
      subtitle: 'Edit and generate your prompts'
    }
  },
  settings: {
    appearance: 'Appearance',
    theme: {
      label: 'Theme Mode',
      system: 'System',
      light: 'Light',
      dark: 'Dark',
      soft: 'Soft',
      warm: 'Warm Orange',
      oceanDark: 'Ocean Dark',
      vintageDark: 'Vintage Dark',
      sweetPink: 'Sweet Pink',
      mintFresh: 'Mint Fresh',
      lavenderLight: 'Lavender Light',
      royalPurple: 'Royal Purple',
      freshGreen: 'Fresh Green',
      minimalGray: 'Minimal Gray',
      deepBlue: 'Deep Blue',
      forestGreen: 'Forest Green',
      coralPink: 'Coral Pink',
      inkRhythm: 'Ink Rhythm',
      porcelainCyan: 'Porcelain Cyan',
      sunsetRed: 'Sunset Red',
      bambooShade: 'Bamboo Shade',
      jadeRhythm: 'Jade Rhythm',
      tip: 'Choose interface theme mode'
    },
    fontSize: {
      label: 'Font Size',
      tip: 'Adjust interface font size (12-20px)'
    },
    language: {
      label: 'Language',
      tip: 'Select interface language'
    },
    editor: {
      title: 'Editor Settings',
      autoSave: {
        label: 'Auto Save',
        tip: 'Automatically save content while editing'
      },
      saveInterval: {
        label: 'Save Interval',
        tip: 'Time interval for auto-saving (1-30 minutes)',
        unit: 'minutes'
      },
      history: {
        label: 'History Size',
        tip: 'Maximum number of history records (10-100)',
        unit: 'records'
      }
    },
    ai: {
      title: 'AI Settings',
      apiUrl: {
        label: 'API URL',
        tip: 'Base URL for DeepSeek API',
        placeholder: 'Enter DeepSeek API URL'
      },
      apiKey: {
        label: 'API Key',
        tip: 'Get your API key from DeepSeek website',
        placeholder: 'Enter DeepSeek API key'
      },
      model: {
        label: 'AI Model',
        tip: 'Currently only supports DeepSeek Chat model'
      },
      temperature: {
        label: 'Output Randomness',
        tip: 'Adjust AI output randomness, higher value means more creative output',
        marks: {
          0: 'Precise',
          0.5: 'Balanced',
          1: 'Creative'
        }
      },
      maxTokens: {
        label: 'Max Output Length',
        tip: 'Maximum token count for single generation (recommended 100-4000)',
        unit: 'tokens'
      }
    }
  }
}

// 创建 i18n 实例
const i18n = createI18n({
  locale: db.getSettings().language || 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

// 切换语言
export function setLanguage(lang) {
  i18n.global.locale = lang
  const settings = db.getSettings()
  settings.language = lang
  db.updateSettings(settings)
}

export default i18n 