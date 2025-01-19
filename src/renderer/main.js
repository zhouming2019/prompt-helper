import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router/index.js';
import i18n from './services/i18n';
import themeService from './services/theme';

const app = createApp(App);

// 初始化主题
const themeSettings = themeService.loadThemeSettings();
themeService.applyTheme(themeSettings);

// 监听系统主题变化
if (themeSettings.theme === 'system') {
  themeService.watchSystemTheme(() => {
    themeService.applyTheme(themeSettings);
  });
}

app.use(ElementPlus);
app.use(router);
app.use(i18n);

app.mount('#app'); 