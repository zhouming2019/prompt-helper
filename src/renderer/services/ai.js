/**
 * AI改写提示词
 * @param {string} originalPrompt - 原始提示词
 * @returns {Promise<string>} - 改写后的提示词
 */
import db from './db'

export async function rewritePrompt(originalPrompt) {
  try {
    // 验证输入内容
    if (!originalPrompt || originalPrompt.trim().length === 0) {
      throw new Error('请先输入需要改写的内容')
    }

    // 从数据库获取用户配置
    const settings = db.getSettings()
    const apiKey = settings.aiApiKey
    const baseUrl = settings.aiBaseUrl || 'https://api.deepseek.com/v1'
    const model = settings.aiModel || 'deepseek-chat'
    const temperature = settings.aiTemperature || 0.7
    const maxTokens = settings.aiMaxTokens || 2000

    // 检查 API 密钥是否已配置
    if (!apiKey) {
      throw new Error('请先在设置中配置 API 密钥')
    }

    // 调用 DeepSeek API 进行提示词优化
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // 使用用户配置的 API 密钥
      },
      body: JSON.stringify({
        model: model, // 使用配置的 AI 模型
        messages: [
          {
            role: "system",
            // 系统提示,定义AI助手的角色和任务
            content: "你是一个专业的提示词优化专家。你需要优化用户提供的提示词，使其更加清晰、具体和有效。保持原有意图的同时，添加必要的上下文和细节。"
          },
          {
            role: "user",
            // 用户输入,包含待优化的提示词
            content: `请优化以下提示词，使其更加有效：\n\n${originalPrompt.trim()}`
          }
        ],
        temperature: temperature, // 使用配置的随机性参数
        max_tokens: maxTokens // 使用配置的最大长度
      })
    });

    // 检查API响应状态
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API 请求失败');
    }

    // 解析API响应数据
    const data = await response.json();
    // 返回优化后的提示词
    return data.choices[0].message.content;
  } catch (error) {
    // 错误处理和日志记录
    console.error('AI改写失败:', error);
    throw new Error(error.message || 'AI改写失败，请稍后重试');
  }
}

// 导出模块接口
export default {
  rewritePrompt
} 