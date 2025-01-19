import { createRouter, createWebHashHistory } from 'vue-router';
import MyTemplates from './MyTemplates.vue';
import Editor from './Editor.vue';
import Settings from './Settings.vue';

const routes = [
  {
    path: '/',
    redirect: '/my-templates'
  },
  {
    path: '/my-templates',
    name: 'my-templates',
    component: MyTemplates
  },
  {
    path: '/editor',
    name: 'editor',
    component: Editor,
    props: true
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router; 