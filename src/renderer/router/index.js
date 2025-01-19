// 导入 Vue Router 相关方法和组件
import { createRouter, createWebHashHistory } from 'vue-router';
import MyTemplates from '../views/MyTemplates.vue';
import Editor from '../views/Editor.vue';
import Settings from '../views/Settings.vue';

// 定义路由配置
const routes = [
  {
    path: '/', // 根路径
    redirect: '/my-templates' // 重定向到模板列表页
  },
  {
    path: '/my-templates', // 模板列表页路径
    name: 'my-templates',
    component: MyTemplates
  },
  {
    path: '/editor', // 编辑器页面路径
    name: 'editor', 
    component: Editor
  },
  {
    path: '/settings', // 设置页面路径
    name: 'settings',
    component: Settings
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式的路由
  routes
});

// 导出路由实例
export default router;