const remote = window.require('@electron/remote');
const fs = window.require('fs');
const path = window.require('path');
import { DEFAULT_SHORTCUTS } from './shortcuts'

const userDataPath = remote.app.getPath('userData');
const dbPath = path.join(userDataPath, 'db.json');

// 确保数据文件存在
if (!fs.existsSync(dbPath)) {
  const defaultData = {
    templates: [],  // 移除默认模板
    settings: {
      theme: 'light',
      language: 'zh-CN',
      autoSave: true,
      autoSaveInterval: 5,
      maxHistorySize: 50,
      primaryColor: '#409EFF',
      fontSize: 14,
      
      aiBaseUrl: 'https://api.deepseek.com/v1',
      aiApiKey: '',  // DeepSeek API密钥
      aiModel: 'deepseek-chat',  // AI模型名称
      aiTemperature: 0.7,  // AI输出的随机性 (0-1)
      aiMaxTokens: 2000,  // AI输出的最大长度
    }
  };
  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
}

function readData() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// 数据库键名常量
const DB_KEYS = {
  SETTINGS: 'settings',
  TEMPLATES: 'templates',
  HISTORY: 'history',
  SHORTCUTS: 'shortcuts'  // 添加快捷键配置的键名
}

// 获取快捷键配置
function getShortcuts() {
  try {
    const shortcuts = localStorage.getItem(DB_KEYS.SHORTCUTS)
    return shortcuts ? JSON.parse(shortcuts) : { ...DEFAULT_SHORTCUTS }
  } catch (error) {
    console.error('获取快捷键配置失败:', error)
    return { ...DEFAULT_SHORTCUTS }
  }
}

// 更新快捷键配置
function updateShortcuts(shortcuts) {
  try {
    localStorage.setItem(DB_KEYS.SHORTCUTS, JSON.stringify(shortcuts))
    return true
  } catch (error) {
    console.error('保存快捷键配置失败:', error)
    return false
  }
}

// 重置快捷键配置
function resetShortcuts() {
  try {
    const shortcuts = { ...DEFAULT_SHORTCUTS }
    localStorage.setItem(DB_KEYS.SHORTCUTS, JSON.stringify(shortcuts))
    return shortcuts
  } catch (error) {
    console.error('重置快捷键配置失败:', error)
    return DEFAULT_SHORTCUTS
  }
}

// 数据库操作方法
const dbOperations = {
  getTemplates() {
    const data = readData();
    return data.templates || [];
  },

  getTemplateById(id) {
    const data = readData();
    return data.templates.find(template => template.id === id);
  },

  saveTemplate(template) {
    const data = readData();
    const newTemplate = {
      ...template,
      id: Date.now().toString(), // 使用时间戳作为ID
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.templates.push(newTemplate);
    writeData(data);
    return newTemplate;
  },

  updateTemplate(template) {
    const data = readData();
    const index = data.templates.findIndex(t => t.id === template.id);
    if (index !== -1) {
      data.templates[index] = {
        ...template,
        updatedAt: new Date().toISOString()
      };
      writeData(data);
      return true;
    }
    return false;
  },

  getSettings() {
    const data = readData();
    return data.settings || {};
  },

  updateSettings(settings) {
    const data = readData();
    data.settings = { ...data.settings, ...settings };
    writeData(data);
    return data.settings;
  },

  resetSettings() {
    const data = readData();
    data.settings = {
      theme: 'light',
      language: 'zh-CN',
      primaryColor: '#409EFF',
      fontSize: 14,
      
      autoSave: true,
      autoSaveInterval: 5,
      maxHistorySize: 50,

      aiBaseUrl: 'https://api.deepseek.com/v1',
      aiApiKey: '',  // DeepSeek API密钥
      aiModel: 'deepseek-chat',  // AI模型名称
      aiTemperature: 0.7,  // AI输出的随机性 (0-1)
      aiMaxTokens: 2000,  // AI输出的最大长度
    };
    writeData(data);
    return data.settings;
  },

  /**
   * 删除指定ID的模板
   * @param {string} id - 要删除的模板ID
   * @returns {boolean} - 删除是否成功
   */
  deleteTemplate(id) {
    const data = readData();
    const initialLength = data.templates.length;
    data.templates = data.templates.filter(template => template.id !== id);
    
    // 如果数组长度变化，说明找到并删除了模板
    if (data.templates.length !== initialLength) {
      writeData(data);
      return true;
    }
    return false;
  },

  getShortcuts,
  updateShortcuts,
  resetShortcuts
};

// 导出数据库操作方法
export default dbOperations;