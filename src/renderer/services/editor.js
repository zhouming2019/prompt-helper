import db from './db'

let autoSaveTimer = null

/**
 * 启动自动保存功能
 * @param {Object} template - 当前编辑的模板
 * @param {Function} saveCallback - 保存回调函数
 */
export function startAutoSave(template, saveCallback) {
  // 获取设置
  const settings = db.getSettings()
  if (!settings.autoSave) return

  // 清除之前的定时器
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
  }

  // 设置新的定时器
  const interval = settings.autoSaveInterval * 60 * 1000 // 转换为毫秒
  autoSaveTimer = setInterval(() => {
    if (template && saveCallback) {
      saveCallback(template)
    }
  }, interval)
}

/**
 * 停止自动保存
 */
export function stopAutoSave() {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer)
    autoSaveTimer = null
  }
}

/**
 * 保存编辑历史
 * @param {Object} template - 模板对象
 */
export function saveHistory(template) {
  try {
    const settings = db.getSettings()
    const history = JSON.parse(localStorage.getItem('editHistory') || '[]')
    
    // 添加新的历史记录
    history.unshift({
      ...template,
      savedAt: new Date().toISOString()
    })

    // 限制历史记录数量
    if (history.length > settings.maxHistorySize) {
      history.length = settings.maxHistorySize
    }

    // 保存到本地存储
    localStorage.setItem('editHistory', JSON.stringify(history))
  } catch (error) {
    console.error('保存历史记录失败:', error)
  }
}

/**
 * 获取编辑历史
 * @returns {Array} 历史记录列表
 */
export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('editHistory') || '[]')
  } catch (error) {
    console.error('获取历史记录失败:', error)
    return []
  }
}

/**
 * 清除编辑历史
 */
export function clearHistory() {
  localStorage.removeItem('editHistory')
}

export default {
  startAutoSave,
  stopAutoSave,
  saveHistory,
  getHistory,
  clearHistory
} 