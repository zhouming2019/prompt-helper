<template>
  <!-- 我的模板页面主容器 -->
  <div class="my-templates">
    <!-- 页面标题区域 -->
    <div class="page-title">
      <div class="title-content">
        <h2>{{ $t('pages.templates.title') }}</h2>
        <p class="subtitle">{{ $t('pages.templates.subtitle') }}</p>
      </div>
      <!-- 标题栏操作按钮组 -->
      <div class="title-actions">
          <editor-button :icon="Plus" :title="$t('buttons.create')" />
          <settings-button />

      </div>
    </div>

    <!-- 搜索框区域 -->
    <div class="templates-header">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          :placeholder="$t('pages.templates.searchPlaceholder')"
          class="search-input"
        />
      </div>
    </div>

    <!-- 模板列表展示区域 -->
    <div v-if="loading" class="loading-state">
      {{ $t('common.loading') }}
    </div>
    <div v-else-if="error" class="error-state">
      {{ error }}
    </div>
    <div v-else-if="sortedTemplates.length === 0" class="empty-state">
      {{ $t('common.noData') }}
    </div>
    <div v-else class="templates-grid">
      <TemplateCard
        v-for="template in sortedTemplates"
        :key="template.id"
        :template="template"
        @edit="editTemplate"
        @delete="deleteTemplate"
        @generate="generatePrompt"
      />
    </div>
  </div>
</template>

<script>
// 导入所需组件和依赖
import TemplateCard from '../components/TemplateCard.vue';
import SettingsButton from '../components/SettingsButton.vue';
import EditorButton from '../components/EditorButton.vue';
import { Plus } from '@element-plus/icons-vue';
import db from '../services/db';  // 使用默认导入

export default {
  name: 'MyTemplates',
  // 注册使用的组件
  components: {
    TemplateCard,
    SettingsButton,
    EditorButton
  },
  // 组件数据
  data() {
    return {
      templates: [], // 存储模板列表
      searchQuery: '', // 搜索关键词
      loading: false, // 加载状态
      error: null, // 错误信息
      Plus // Element Plus 图标
    };
  },
  // 计算属性
  computed: {
    // 根据搜索关键词过滤并按更新时间排序模板
    sortedTemplates() {
      const query = this.searchQuery.toLowerCase();
      return this.templates
        .filter(template =>
          template.name.toLowerCase().includes(query) ||
          template.scenario.toLowerCase().includes(query)
        )
        .sort((a, b) => {
          // 如果没有 updatedAt，则使用 id（时间戳）进行排序
          const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : parseInt(a.id);
          const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : parseInt(b.id);
          return timeB - timeA;
        });
    }
  },
  // 组件方法
  methods: {
    // 加载模板列表
    loadTemplates() {
      try {
        this.loading = true;
        this.error = null;
        this.templates = db.getTemplates(); // 使用默认导入的方法
      } catch (err) {
        this.error = '加载模板失败：' + err.message;
      } finally {
        this.loading = false;
      }
    },
    // 编辑模板
    editTemplate(template) {
      this.$router.push({
        name: 'editor',
        query: { template: JSON.stringify(template) }
      });
    },
    // 删除模板
    async deleteTemplate(template) {
      if (confirm('确定要删除这个模板吗？')) {
        try {
          if (db.deleteTemplate(template.id)) { // 使用默认导入的方法
            this.loadTemplates();
          }
        } catch (err) {
          this.error = '删除模板失败：' + err.message;
        }
      }
    },
    // 生成提示词
    generatePrompt(template) {
      this.$router.push({
        name: 'editor',
        query: { template: JSON.stringify(template) }
      });
    }
  },
  // 组件挂载时加载模板
  mounted() {
    this.loadTemplates();
  }
};
</script>

<style lang="less" scoped>
// 模板页面主容器样式
.my-templates {
  // padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;

  // 页面标题区域样式
  .page-title {
    display: flex;
    justify-content: space-between;
    background-color: var(--el-bg-color);
    align-items: center;
    padding: 8px 20px;
    border-bottom: 1px solid var(--el-border-color);
    
    // 标题内容样式
    .title-content {
      max-width: 300px;
      min-width: 200px;
      width: 60%;
      h2 {
        font-size: 20px;
        color: #2c3e50;
        margin-bottom: 8px;
        font-weight: 600;
      }

      .subtitle {
        font-size: 12px;
        color: #909399;
      }
    }

    // 标题操作按钮样式
    .title-actions {
      display: flex;
      min-width: 100px;
      gap: 8px;
      justify-content: flex-end;
      max-width: 200px; // 限制最大宽度为300px

      .action-btn {
        background: none;
        border: none;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;

        img {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  // 搜索框区域样式
  .templates-header {
    // margin: 20px;
    display: flex;
    justify-content: center;
    padding: 8px 20px;

    .search-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 400px;

      .search-input {
        width: 100%;
        padding: 10px 15px;
        background: var(--el-bg-color);
        border: 1px solid var(--el-border-color);
        border-radius: 8px;
        font-size: 16px;
        color: var(--el-text-color-primary);
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: var(--el-color-primary);
          box-shadow: 0 0 0 2px var(--el-color-primary-light-8);
        }

        &::placeholder {
          color: var(--el-text-color-placeholder);
        }
      }
    }
  }

  // 加载和错误状态样式
  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 40px;
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .error-state {
    color: #f56c6c;
  }

  // 模板网格布局样式
  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px;
    overflow-y: auto;
    padding: 20px;
    
    // 隐藏滚动条
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>