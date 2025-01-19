<template>
  <div id="app">
    <div class="header">
      <div class="title-bar">
        <!-- 左侧可拖拽区域和标题 -->
        <div class="drag-area">
          <h1>提示宝</h1>
        </div>
        <!-- 右侧窗口控制按钮组 -->
        <div class="window-controls">
          <!-- 窗口置顶按钮 -->
          <button 
            class="control-btn pin" 
            :class="{ 'active': isAlwaysOnTop }"
            @click="toggleAlwaysOnTop"
            title="窗口置顶"
            style="width: 30px; height: 30px;"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
            </svg>
          </button>
          <!-- 最小化按钮 -->
          <button 
            class="control-btn minimize" 
            @click="minimizeWindow"
            title="最小化"
            style="width: 30px; height: 30px;"
          >
            <span>&#x2012;</span>
          </button>
          <!-- 关闭按钮 -->
          <button 
            class="control-btn close" 
            @click="closeWindow"
            title="关闭"
            style="width: 30px; height: 30px;"
          >
            <span>&#x2715;</span>
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
const { getCurrentWindow } = require('@electron/remote');

export default {
  name: 'App',
  data() {
    return {
      isAlwaysOnTop: false
    }
  },
  methods: {
    minimizeWindow() {
      getCurrentWindow().minimize();
    },
    closeWindow() {
      getCurrentWindow().close();
    },
    toggleAlwaysOnTop() {
      const win = getCurrentWindow();
      this.isAlwaysOnTop = !this.isAlwaysOnTop;
      win.setAlwaysOnTop(this.isAlwaysOnTop);
    }
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
}

.header {
  flex-shrink: 0;
  background-color: var(--el-bg-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--el-bg-color);
    -webkit-app-region: drag;
    height: 32px;

    .drag-area {
      flex: 1;
      padding-left: 8px;
      
      h1 {
        font-size: 14px;
        color: var(--el-text-color-primary);
        margin: 0;
      }
    }

    .window-controls {
      display: flex;
      -webkit-app-region: no-drag;

      .control-btn {
        width: 46px;
        height: 32px;
        border: none;
        background: transparent;
        color: var(--el-text-color-regular);
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;

        &.pin {
          &.active {
            background-color: #42b983;
            svg {
              transform: rotate(-45deg);
              color: #fff;
              filter: drop-shadow(0 0 2px rgba(255,255,255,0.5));
            }
          }
          &:hover {
            background-color: rgba(66, 185, 131, 0.2);
          }
          &:active {
            background-color: rgba(66, 185, 131, 0.4);
          }
          svg {
            transition: all 0.2s ease;
          }
        }

        &.close {
          &:hover {
            background-color: #e81123;
            color: #fff;
          }
        }

        &.minimize:hover {
          background-color: var(--el-fill-color-light);
        }

        span {
          line-height: 1;
          transition: all 0.2s ease;
        }
      }
    }
  }
}

.content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background-color: var(--el-bg-color-page);
  position: relative;

  > * {
    height: 100%;
  }
}

/* 全局样式 */
:root {
  /* 默认使用浅色主题的变量 */
  --el-bg-color: #ffffff;
  --el-bg-color-page: #f2f3f5;
  --el-bg-color-overlay: #ffffff;
  --el-text-color-primary: #303133;
  --el-text-color-regular: #606266;
  --el-text-color-secondary: #909399;
  --el-text-color-placeholder: #a8abb2;
  --el-border-color: #dcdfe6;
  --el-border-color-light: #e4e7ed;
  --el-border-color-lighter: #ebeef5;
  --el-fill-color: #f0f2f5;
  --el-fill-color-light: #f5f7fa;
  --el-fill-color-lighter: #fafafa;
  --el-fill-color-blank: #ffffff;
  --el-mask-color: rgba(255, 255, 255, 0.9);
  --el-mask-color-extra-light: rgba(255, 255, 255, 0.3);
}

/* 应用主题颜色 */
body {
  background-color: var(--el-bg-color-page);
  color: var(--el-text-color-primary);
}

/* 主题切换过渡效果 */
* {
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

/* 深色主题样式 */
[data-theme='dark'] {
  /* 深色主题下的卡片和容器背景色 */
  .el-card,
  .el-dialog,
  .el-message-box,
  .el-drawer,
  .el-popover {
    background-color: var(--el-bg-color-overlay) !important;
    border-color: var(--el-border-color) !important;
  }

  /* 深色主题下的输入框和选择器背景色 */
  .el-input__inner,
  .el-textarea__inner,
  .el-select-dropdown,
  .el-input-number__decrease,
  .el-input-number__increase {
    background-color: var(--el-fill-color) !important;
    border-color: var(--el-border-color) !important;
    color: var(--el-text-color-regular) !important;
  }

  /* 深色主题下的下拉菜单和选择器选项背景色 */
  .el-dropdown-menu,
  .el-select-dropdown,
  .el-picker-panel {
    background-color: var(--el-bg-color-overlay) !important;
    border-color: var(--el-border-color) !important;
    
    .el-select-dropdown__item,
    .el-dropdown-menu__item {
      color: var(--el-text-color-regular) !important;
      
      &:hover,
      &.selected {
        background-color: var(--el-fill-color-light) !important;
      }
    }
  }

  /* 深色主题下的表格背景色 */
  .el-table {
    background-color: var(--el-bg-color-overlay) !important;
    color: var(--el-text-color-regular) !important;

    th,
    td {
      background-color: var(--el-bg-color-overlay) !important;
      border-color: var(--el-border-color) !important;
    }

    tr {
      &:hover > td {
        background-color: var(--el-fill-color-light) !important;
      }
    }
  }

  /* 深色主题下的分割线颜色 */
  .el-divider {
    background-color: var(--el-border-color) !important;
    
    &__text {
      background-color: var(--el-bg-color) !important;
      color: var(--el-text-color-primary) !important;
    }
  }

  /* 深色主题下的按钮样式 */
  .el-button {
    &.el-button--default {
      background-color: var(--el-fill-color) !important;
      border-color: var(--el-border-color) !important;
      color: var(--el-text-color-regular) !important;

      &:hover {
        background-color: var(--el-fill-color-light) !important;
      }
    }

    &--text {
      color: var(--el-text-color-regular) !important;
      
      &:hover {
        color: var(--el-color-primary) !important;
      }
    }
  }

  /* 深色主题下的标题栏样式 */
  .header .title-bar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* 深色主题下的滚动条样式 */
  ::-webkit-scrollbar {
    background-color: var(--el-bg-color) !important;
    
    &-thumb {
      background-color: var(--el-border-color) !important;
      
      &:hover {
        background-color: var(--el-text-color-secondary) !important;
      }
    }
  }

  /* 深色主题下的搜索框样式 */
  .search-input {
    background-color: var(--el-fill-color) !important;
    border-color: var(--el-border-color) !important;
    color: var(--el-text-color-regular) !important;

    &::placeholder {
      color: var(--el-text-color-placeholder) !important;
    }
  }

  /* 深色主题下的模板卡片样式 */
  .template-card {
    background-color: var(--el-bg-color-overlay) !important;
    border-color: var(--el-border-color) !important;

    .template-name {
      color: var(--el-text-color-primary) !important;
    }

    .template-preview {
      background-color: var(--el-fill-color) !important;
      color: var(--el-text-color-regular) !important;
    }
  }

  /* 深色主题下的编辑器区域样式 */
  .editor-container {
    background-color: var(--el-bg-color-overlay) !important;
    border-color: var(--el-border-color) !important;
    
    /* 编辑器输入区域 */
    .editor-input {
      background-color: var(--el-fill-color) !important;
      color: var(--el-text-color-regular) !important;
      border-color: var(--el-border-color) !important;
    }

    /* 编辑器工具栏 */
    .editor-toolbar {
      background-color: var(--el-bg-color) !important;
      border-color: var(--el-border-color) !important;

      .toolbar-btn {
        color: var(--el-text-color-regular) !important;
        
        &:hover {
          background-color: var(--el-fill-color-light) !important;
        }
      }
    }

    /* 行号区域 */
    .line-numbers {
      background-color: var(--el-fill-color) !important;
      color: var(--el-text-color-secondary) !important;
      border-right-color: var(--el-border-color) !important;
    }
  }

  /* 深色主题下的编辑器页面样式 */
  .editor-page {
    background-color: var(--el-bg-color-page) !important;

    /* 编辑器标题 */
    .editor-title {
      color: var(--el-text-color-primary) !important;
    }

    /* 编辑器说明文本 */
    .editor-description {
      color: var(--el-text-color-secondary) !important;
    }

    /* 默认使用场景文本 */
    .default-scene {
      color: var(--el-text-color-regular) !important;
      background-color: var(--el-fill-color) !important;
      border-color: var(--el-border-color) !important;
    }
  }

  /* 深色主题下的底部按钮组 */
  .editor-footer {
    background-color: var(--el-bg-color) !important;
    border-top-color: var(--el-border-color) !important;
  }
}
</style> 