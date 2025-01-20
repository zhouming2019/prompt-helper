<template>
  <!-- 编辑器按钮组件 - 用于导航到编辑器页面 -->
  <el-button 
    type="primary" 
    text 
    :icon="icon" 
    @click="goToEditor" 
    :title="$t('buttons.create')">
    {{ $t('buttons.create') }}
  </el-button>
</template>

<script>
/**
 * 编辑器按钮组件
 * 功能：提供一个可点击的按钮，点击后导航到编辑器页面
 */
export default {
  name: 'EditorButton',
  // 组件属性定义
  props: {
    // 按钮图标
    // 参数类型：Object (Element Plus Icon组件)
    // 必填项：是
    icon: {
      type: Object,
      required: true
    },
    // 按钮标题
    // 参数类型：String
    // 必填项：是
    // 用于显示按钮的悬停提示
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * 导航到编辑器页面
     * 功能：点击按钮时触发，使用 Vue Router 导航到 /editor 路由
     * 注意：确保路由配置中存在 /editor 路径
     */
    goToEditor() {
      this.$router.push('/editor');
    }
  }
}
</script>
