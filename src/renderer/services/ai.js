/**
 * AI改写提示词
 * @param {Object} templateData - 模板数据对象
 * @param {string} templateData.templateName - 模板名称
 * @param {string} templateData.scenarioDescription - 使用场景描述
 * @param {string} templateData.templateContent - 模板内容
 * @returns {Promise<Object>} - 改写后的模板数据
 */
import db from './db'

export async function rewritePrompt(templateData) {
  try {
    // 验证输入内容
    if (!templateData || !templateData.templateContent || templateData.templateContent.trim().length === 0) {
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
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: `你是一个专业的提示词优化专家。你需要优化用户提供的提示词模板，包括模板名称、使用场景描述和模板内容。
保持原有意图的同时，添加必要的上下文和细节。templateName不超过20字，scenarioDescription不超过30字，templateContent不超过500字

请按照以下 JSON 格式输出优化结果：
{
  "templateName": "优化后的模板名称",
  "scenarioDescription": "优化后的使用场景描述",
  "templateContent": "优化后的模板内容"
}`
          },
          {
            role: "user",
            content: `请优化以下提示词模板：
            
模板名称：${templateData.templateName || ''}
使用场景：${templateData.scenarioDescription || ''}
模板内容：${templateData.templateContent.trim()}`
          }
        ],
        temperature: temperature,
        max_tokens: maxTokens,
        response_format: {
          type: 'json_object'  // 启用 JSON 输出格式
        }
      })
    });

    // 检查API响应状态
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'API 请求失败');
    }

    // 解析API响应数据
    const data = await response.json();
    const result = data.choices[0].message.content;

    // 尝试解析返回的JSON数据
    try {
      const parsedResult = JSON.parse(result);
      return {
        templateName: parsedResult.templateName || templateData.templateName,
        scenarioDescription: parsedResult.scenarioDescription || templateData.scenarioDescription,
        templateContent: parsedResult.templateContent || templateData.templateContent
      };
    } catch (parseError) {
      console.error('解析AI返回结果失败:', parseError);
      throw new Error('AI返回的数据格式不正确');
    }
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