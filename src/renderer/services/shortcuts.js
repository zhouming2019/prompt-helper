// 默认快捷键配置
export const DEFAULT_SHORTCUTS = {
  // 功能快捷键
  reload: 'F5',              // 重新加载窗口
  showWindow: 'Shift+Enter'  // 显示/恢复窗口
}

// 快捷键验证规则
export const SHORTCUT_RULES = {
  // 修饰键
  modifiers: ['Ctrl', 'Alt', 'Shift'],
  // 允许的普通键
  keys: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
    'Left', 'Right', 'Up', 'Down', 'Space', 'Tab', 'Enter', 'Escape',
    ',', '.', '/', ';', '[', ']', '-', '='
  ]
}

/**
 * 获取快捷键配置
 * @returns {Object} 快捷键配置对象
 */
export function getShortcuts() {
  try {
    const shortcuts = localStorage.getItem('shortcuts')
    return shortcuts ? JSON.parse(shortcuts) : { ...DEFAULT_SHORTCUTS }
  } catch (error) {
    console.error('获取快捷键配置失败:', error)
    return { ...DEFAULT_SHORTCUTS }
  }
}

/**
 * 更新快捷键配置
 * @param {Object} shortcuts - 新的快捷键配置
 * @returns {boolean} 是否更新成功
 */
export function updateShortcuts(shortcuts) {
  try {
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
    return true
  } catch (error) {
    console.error('保存快捷键配置失败:', error)
    return false
  }
}

/**
 * 重置快捷键配置
 * @returns {Object} 重置后的快捷键配置
 */
export function resetShortcuts() {
  try {
    const shortcuts = { ...DEFAULT_SHORTCUTS }
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
    return shortcuts
  } catch (error) {
    console.error('重置快捷键配置失败:', error)
    return DEFAULT_SHORTCUTS
  }
}

/**
 * 验证快捷键格式是否正确
 * @param {string} shortcut - 快捷键字符串
 * @returns {boolean} - 是否合法
 */
export function validateShortcut(shortcut) {
  const parts = shortcut.split('+').map(part => part.trim())
  
  // 至少需要一个修饰键和一个普通键
  if (parts.length < 2) return false
  
  // 检查修饰键
  const modifiers = parts.slice(0, -1)
  const key = parts[parts.length - 1]
  
  // 验证修饰键
  const validModifiers = modifiers.every(mod => SHORTCUT_RULES.modifiers.includes(mod))
  if (!validModifiers) return false
  
  // 验证普通键
  return SHORTCUT_RULES.keys.includes(key)
}

/**
 * 格式化快捷键字符串
 * @param {string} shortcut - 快捷键字符串
 * @returns {string} - 格式化后的快捷键字符串
 */
export function formatShortcut(shortcut) {
  return shortcut.split('+')
    .map(part => part.trim())
    .join(' + ')
}

/**
 * 检查快捷键是否冲突
 * @param {Object} shortcuts - 快捷键配置对象
 * @param {string} newShortcut - 新的快捷键
 * @param {string} currentAction - 当前操作名称
 * @returns {string|null} - 如果有冲突返回冲突的操作名称，否则返回null
 */
export function checkConflict(shortcuts, newShortcut, currentAction) {
  for (const [action, shortcut] of Object.entries(shortcuts)) {
    if (action !== currentAction && shortcut === newShortcut) {
      return action
    }
  }
  return null
}

// 导出默认对象
export default {
  DEFAULT_SHORTCUTS,
  SHORTCUT_RULES,
  validateShortcut,
  formatShortcut,
  checkConflict,
  getShortcuts,
  updateShortcuts,
  resetShortcuts
} 