import db from './db'

// 主题颜色变量
const themes = {
  light: {
    // 基础颜色变量定义
    '--primary-100': '#1E88E5',
    '--primary-200': '#6ab7ff',
    '--primary-300': '#dbffff',
    '--accent-100': '#64B5F6',
    '--accent-200': '#005992',
    '--text-100': '#333333',
    '--text-200': '#5c5c5c',
    '--bg-100': '#FFFFFF',
    '--bg-200': '#f5f5f5',
    '--bg-300': '#cccccc',

    // 背景色 - 使用清爽的灰白配色
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用清晰的层次
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': 'var(--bg-300)',
    '--el-text-color-placeholder': 'var(--bg-300)',
    
    // 边框颜色 - 使用浅灰色调
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-200)',
    
    // 填充色 - 使用渐进的灰度
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用蓝色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': 'var(--primary-300)',
    '--el-color-primary-light-7': 'var(--accent-100)',
    '--el-color-primary-light-8': 'var(--accent-100)',
    '--el-color-primary-light-9': 'var(--primary-300)',
    '--el-color-primary-dark-2': 'var(--accent-200)',

    // 成功状态色
    '--el-color-success': '#67C23A',
    '--el-color-success-light-3': '#95D475',
    '--el-color-success-light-5': '#B3E19D',
    '--el-color-success-light-7': '#D1EDC4',
    '--el-color-success-light-8': '#E1F3D8',
    '--el-color-success-light-9': '#F0F9EB',
    '--el-color-success-dark-2': '#529B2E',

    // 警告状态色
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色
    '--el-color-danger': '#F56C6C',
    '--el-color-danger-light-3': '#F89898',
    '--el-color-danger-light-5': '#FAB6B6',
    '--el-color-danger-light-7': '#FCD3D3',
    '--el-color-danger-light-8': '#FDE2E2',
    '--el-color-danger-light-9': '#FEF0F0',
    '--el-color-danger-dark-2': '#C45656',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#909399',
    '--el-color-info-light-5': '#A6A9AD',
    '--el-color-info-light-7': '#C8C9CC',
    '--el-color-info-light-8': '#DCDFE6',
    '--el-color-info-light-9': '#EBEEF5',
    '--el-color-info-dark-2': '#73767A',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(255, 255, 255, 0.9)',
    '--el-mask-color-extra-light': 'rgba(255, 255, 255, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.12)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(0, 0, 0, 0.18)'
  },
  dark: {
    // 背景色 - 参考 VS Code 深色主题
    '--el-bg-color': '#252526',
    '--el-bg-color-page': '#1e1e1e',
    '--el-bg-color-overlay': '#2d2d2d',
    
    // 文字颜色 - VS Code 文本配色
    '--el-text-color-primary': '#cccccc',
    '--el-text-color-regular': '#9cdcfe',
    '--el-text-color-secondary': '#808080',
    '--el-text-color-placeholder': '#666666',
    
    // 边框颜色
    '--el-border-color': '#454545',
    '--el-border-color-light': '#3b3b3b',
    '--el-border-color-lighter': '#333333',
    
    // 填充色
    '--el-fill-color': '#303030',
    '--el-fill-color-light': '#383838',
    '--el-fill-color-lighter': '#424242',
    '--el-fill-color-blank': '#252526',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(30, 30, 30, 0.8)',
    '--el-mask-color-extra-light': 'rgba(30, 30, 30, 0.3)'
  },
  soft: {
    // 基础颜色变量定义
    '--primary-100': '#5B8DB8',    // 柔和的蓝色
    '--primary-200': '#89B4D9',    // 浅蓝色
    '--primary-300': '#D5E5F2',    // 最浅蓝色
    '--accent-100': '#7BA7CC',     // 强调蓝色
    '--accent-200': '#456F8E',     // 深蓝色
    '--text-100': '#4A4A4A',       // 主要文本色
    '--text-200': '#666666',       // 次要文本色
    '--bg-100': '#F5F2EB',         // 米色背景
    '--bg-200': '#EBE7E0',         // 浅灰米色
    '--bg-300': '#D1CCC3',         // 深灰米色

    // 背景色 - 使用柔和的米色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用柔和的灰色
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': 'var(--bg-300)',
    '--el-text-color-placeholder': 'var(--bg-300)',
    
    // 边框颜色 - 使用柔和的边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-200)',
    
    // 填充色 - 使用渐进的米色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用柔和的蓝色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': 'var(--primary-300)',
    '--el-color-primary-light-7': 'var(--accent-100)',
    '--el-color-primary-light-8': 'var(--accent-100)',
    '--el-color-primary-light-9': 'var(--primary-300)',
    '--el-color-primary-dark-2': 'var(--accent-200)',

    // 成功状态色 - 柔和的绿色
    '--el-color-success': '#7CB555',
    '--el-color-success-light-3': '#A3CD85',
    '--el-color-success-light-5': '#C1DDA9',
    '--el-color-success-light-7': '#DDECC9',
    '--el-color-success-light-8': '#E8F3DC',
    '--el-color-success-light-9': '#F3F9ED',
    '--el-color-success-dark-2': '#629144',

    // 警告状态色 - 柔和的橙色
    '--el-color-warning': '#D4A256',
    '--el-color-warning-light-3': '#E2BE85',
    '--el-color-warning-light-5': '#ECD4AA',
    '--el-color-warning-light-7': '#F5E6CC',
    '--el-color-warning-light-8': '#F8EFDE',
    '--el-color-warning-light-9': '#FCF7EF',
    '--el-color-warning-dark-2': '#A98145',

    // 危险状态色 - 柔和的红色
    '--el-color-danger': '#D47F7F',
    '--el-color-danger-light-3': '#E2A3A3',
    '--el-color-danger-light-5': '#ECBFBF',
    '--el-color-danger-light-7': '#F5D8D8',
    '--el-color-danger-light-8': '#F8E5E5',
    '--el-color-danger-light-9': '#FCF1F1',
    '--el-color-danger-dark-2': '#A96666',

    // 信息状态色 - 柔和的灰色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#A3A3A3',
    '--el-color-info-light-5': '#BFBFBF',
    '--el-color-info-light-7': '#D8D8D8',
    '--el-color-info-light-8': '#E5E5E5',
    '--el-color-info-light-9': '#F1F1F1',
    '--el-color-info-dark-2': '#808080',
    
    // 遮罩颜色 - 使用米色基调
    '--el-mask-color': 'rgba(245, 242, 235, 0.9)',
    '--el-mask-color-extra-light': 'rgba(245, 242, 235, 0.3)',

    // 组件阴影 - 柔和的阴影效果
    '--el-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.08)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(0, 0, 0, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(0, 0, 0, 0.12)'
  },
  warm: {
    // 基础颜色变量定义
    '--primary-100': '#FF7F50',    // 珊瑚橙
    '--primary-200': '#dd6236',    // 深橙色
    '--primary-300': '#8f1e00',    // 暗橙色
    '--accent-100': '#8B4513',     // 马鞍棕
    '--accent-200': '#ffd299',     // 浅杏色
    '--text-100': '#000000',       // 纯黑
    '--text-200': '#2c2c2c',       // 深灰
    '--bg-100': '#F7EEDD',         // 米黄
    '--bg-200': '#ede4d3',         // 浅米色
    '--bg-300': '#c4bcab',         // 灰米色

    // 背景色 - 使用温暖的米色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用深色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': 'var(--bg-300)',
    '--el-text-color-placeholder': 'var(--bg-300)',
    
    // 边框颜色 - 使用温暖的边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-200)',
    
    // 填充色 - 使用渐进的米色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用温暖的橙色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': 'var(--accent-200)',
    '--el-color-primary-light-7': 'var(--accent-200)',
    '--el-color-primary-light-8': 'var(--accent-200)',
    '--el-color-primary-light-9': 'var(--accent-200)',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 暖色调绿色
    '--el-color-success': '#7D9D5A',
    '--el-color-success-light-3': '#A4BE87',
    '--el-color-success-light-5': '#C2D5AA',
    '--el-color-success-light-7': '#DEEACC',
    '--el-color-success-light-8': '#E9F1DD',
    '--el-color-success-light-9': '#F4F8EE',
    '--el-color-success-dark-2': '#647D48',

    // 警告状态色 - 暖色调橙色
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色 - 暖色调红色
    '--el-color-danger': '#C45858',
    '--el-color-danger-light-3': '#D78B8B',
    '--el-color-danger-light-5': '#E5B1B1',
    '--el-color-danger-light-7': '#F0D1D1',
    '--el-color-danger-light-8': '#F5E0E0',
    '--el-color-danger-light-9': '#FAEFEF',
    '--el-color-danger-dark-2': '#9D4646',

    // 信息状态色 - 暖色调灰色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#8C8C8C',
    '--el-color-info-light-5': '#A6A6A6',
    '--el-color-info-light-7': '#C9C9C9',
    '--el-color-info-light-8': '#E0E0E0',
    '--el-color-info-light-9': '#F0F0F0',
    '--el-color-info-dark-2': '#595959',
    
    // 遮罩颜色 - 使用米色基调
    '--el-mask-color': 'rgba(247, 238, 221, 0.9)',
    '--el-mask-color-extra-light': 'rgba(247, 238, 221, 0.3)',

    // 组件阴影 - 温暖的阴影效果
    '--el-box-shadow': '0 2px 4px rgba(139, 69, 19, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(139, 69, 19, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(139, 69, 19, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(139, 69, 19, 0.12)'
  },
  oceanDark: {
    // 基础颜色变量定义
    '--primary-100': '#0D6E6E',    // 深青色
    '--primary-200': '#4a9d9c',    // 中青色
    '--primary-300': '#afffff',    // 浅青色
    '--accent-100': '#FF3D3D',     // 强调红
    '--accent-200': '#ffe0c8',     // 浅橙色
    '--text-100': '#FFFFFF',       // 纯白
    '--text-200': '#e0e0e0',       // 浅灰
    '--bg-100': '#0D1F2D',         // 深蓝黑
    '--bg-200': '#1d2e3d',         // 中蓝黑
    '--bg-300': '#354656',         // 浅蓝黑

    // 背景色 - 使用深邃的蓝黑色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-300)',
    
    // 文字颜色 - 使用明亮的色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#a0a0a0',
    '--el-text-color-placeholder': '#808080',
    
    // 边框颜色 - 使用深色边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-200)',
    
    // 填充色 - 使用渐进的蓝黑色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-300)',
    '--el-fill-color-lighter': 'var(--bg-300)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用青色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': 'var(--primary-300)',
    '--el-color-primary-light-7': '#7ccece',
    '--el-color-primary-light-8': '#a5e0e0',
    '--el-color-primary-light-9': '#d2f0f0',
    '--el-color-primary-dark-2': '#085858',

    // 成功状态色 - 深青色调
    '--el-color-success': '#50B5B5',
    '--el-color-success-light-3': '#7CC8C8',
    '--el-color-success-light-5': '#A5D9D9',
    '--el-color-success-light-7': '#CCEBEB',
    '--el-color-success-light-8': '#E5F5F5',
    '--el-color-success-light-9': '#F0FAFA',
    '--el-color-success-dark-2': '#409090',

    // 警告状态色 - 暖橙色调
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色 - 使用accent红色
    '--el-color-danger': 'var(--accent-100)',
    '--el-color-danger-light-3': '#FF6666',
    '--el-color-danger-light-5': '#FF8080',
    '--el-color-danger-light-7': '#FFB3B3',
    '--el-color-danger-light-8': '#FFD9D9',
    '--el-color-danger-light-9': '#FFF0F0',
    '--el-color-danger-dark-2': '#CC3131',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#909399',
    '--el-color-info-light-5': '#A6A9AD',
    '--el-color-info-light-7': '#C8C9CC',
    '--el-color-info-light-8': '#DCDFE6',
    '--el-color-info-light-9': '#EBEEF5',
    '--el-color-info-dark-2': '#73767A',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(13, 31, 45, 0.8)',
    '--el-mask-color-extra-light': 'rgba(13, 31, 45, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(0, 0, 0, 0.4)'
  },
  vintageDark: {
    // 基础颜色变量定义
    '--primary-100': '#E7D1BB',    // 米褐色
    '--primary-200': '#c8b39e',    // 浅褐色
    '--primary-300': '#84725e',    // 深褐色
    '--accent-100': '#A096A5',     // 淡紫色
    '--accent-200': '#463e4b',     // 深紫色
    '--text-100': '#A096A2',       // 浅紫灰
    '--text-200': '#847a86',       // 深紫灰
    '--bg-100': '#151931',         // 深蓝紫
    '--bg-200': '#252841',         // 中蓝紫
    '--bg-300': '#3d3f5b',         // 浅蓝紫

    // 背景色 - 使用深邃的蓝紫色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-300)',
    
    // 文字颜色 - 使用柔和的紫灰色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#6f677a',
    '--el-text-color-placeholder': '#4d4755',
    
    // 边框颜色 - 使用深色边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-200)',
    
    // 填充色 - 使用渐进的蓝紫色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-300)',
    '--el-fill-color-lighter': 'var(--bg-300)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用米褐色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#d4c0ac',
    '--el-color-primary-light-7': '#e1d1c2',
    '--el-color-primary-light-8': '#ede3d8',
    '--el-color-primary-light-9': '#f6f0ea',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 柔和的绿色调
    '--el-color-success': '#8BA793',
    '--el-color-success-light-3': '#A8BEB0',
    '--el-color-success-light-5': '#C0D1C6',
    '--el-color-success-light-7': '#D8E3DC',
    '--el-color-success-light-8': '#E4ECE7',
    '--el-color-success-light-9': '#F1F5F2',
    '--el-color-success-dark-2': '#6F8676',

    // 警告状态色 - 柔和的橙色调
    '--el-color-warning': '#C4A484',
    '--el-color-warning-light-3': '#D4BC9F',
    '--el-color-warning-light-5': '#E1CFB9',
    '--el-color-warning-light-7': '#EDE1D3',
    '--el-color-warning-light-8': '#F3EAE0',
    '--el-color-warning-light-9': '#F9F4EE',
    '--el-color-warning-dark-2': '#9D836A',

    // 危险状态色 - 柔和的红色调
    '--el-color-danger': '#B79AA1',
    '--el-color-danger-light-3': '#C8B1B7',
    '--el-color-danger-light-5': '#D6C5C9',
    '--el-color-danger-light-7': '#E4D8DB',
    '--el-color-danger-light-8': '#EDE4E6',
    '--el-color-danger-light-9': '#F5F1F2',
    '--el-color-danger-dark-2': '#927B81',

    // 信息状态色 - 使用accent色调
    '--el-color-info': 'var(--accent-100)',
    '--el-color-info-light-3': '#b3abb7',
    '--el-color-info-light-5': '#c4bdc7',
    '--el-color-info-light-7': '#d5d0d7',
    '--el-color-info-light-8': '#e2dfe4',
    '--el-color-info-light-9': '#f0eff1',
    '--el-color-info-dark-2': 'var(--accent-200)',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(21, 25, 49, 0.8)',
    '--el-mask-color-extra-light': 'rgba(21, 25, 49, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.3)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(0, 0, 0, 0.4)'
  },
  sweetPink: {
    // 基础颜色变量定义
    '--primary-100': '#E05297',    // 主粉色
    '--primary-200': '#F3BAD6',    // 浅粉色
    '--primary-300': '#E0E2E5',    // 浅灰色
    '--accent-100': '#f5be0b',     // 金黄色
    '--accent-200': '#fef1c7',     // 浅黄色
    '--text-100': '#292524',       // 深灰色
    '--text-200': '#78716c',       // 中灰色
    '--bg-100': '#FCEEF5',         // 粉白色
    '--bg-200': '#ffffff',         // 纯白色
    '--bg-300': '#FAD9E6',         // 浅粉背景

    // 背景色 - 使用柔和的粉色调
    '--el-bg-color': 'var(--bg-200)',
    '--el-bg-color-page': 'var(--bg-100)',
    '--el-bg-color-overlay': 'var(--bg-200)',
    
    // 文字颜色 - 使用清晰的层次
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#a8a29e',
    '--el-text-color-placeholder': '#d6d3d1',
    
    // 边框颜色 - 使用柔和的粉色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': '#fce7f3',
    '--el-border-color-lighter': '#fbcfe8',
    
    // 填充色 - 使用渐进的粉色
    '--el-fill-color': 'var(--bg-100)',
    '--el-fill-color-light': 'var(--bg-200)',
    '--el-fill-color-lighter': 'var(--bg-200)',
    '--el-fill-color-blank': 'var(--bg-200)',
    
    // 主题色 - 使用粉色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': '#e87bb1',
    '--el-color-primary-light-5': '#f19ec7',
    '--el-color-primary-light-7': '#f7c1dd',
    '--el-color-primary-light-8': '#fad4e8',
    '--el-color-primary-light-9': '#fde7f3',
    '--el-color-primary-dark-2': '#b33f77',

    // 成功状态色 - 柔和的绿色
    '--el-color-success': '#10B981',
    '--el-color-success-light-3': '#6EE7B7',
    '--el-color-success-light-5': '#A7F3D0',
    '--el-color-success-light-7': '#D1FAE5',
    '--el-color-success-light-8': '#ECFDF5',
    '--el-color-success-light-9': '#F0FDF4',
    '--el-color-success-dark-2': '#059669',

    // 警告状态色 - 使用accent金黄色
    '--el-color-warning': 'var(--accent-100)',
    '--el-color-warning-light-3': '#fcd34d',
    '--el-color-warning-light-5': '#fde68a',
    '--el-color-warning-light-7': '#fef3c7',
    '--el-color-warning-light-8': '#fffbeb',
    '--el-color-warning-light-9': '#fefce8',
    '--el-color-warning-dark-2': '#d97706',

    // 危险状态色 - 柔和的红色
    '--el-color-danger': '#F43F5E',
    '--el-color-danger-light-3': '#FDA4AF',
    '--el-color-danger-light-5': '#FECDD3',
    '--el-color-danger-light-7': '#FFE4E6',
    '--el-color-danger-light-8': '#FFF1F2',
    '--el-color-danger-light-9': '#FFF5F5',
    '--el-color-danger-dark-2': '#E11D48',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#a8a29e',
    '--el-color-info-light-5': '#d6d3d1',
    '--el-color-info-light-7': '#e7e5e4',
    '--el-color-info-light-8': '#f5f5f4',
    '--el-color-info-light-9': '#fafaf9',
    '--el-color-info-dark-2': '#57534e',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(252, 238, 245, 0.9)',
    '--el-mask-color-extra-light': 'rgba(252, 238, 245, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(224, 82, 151, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(224, 82, 151, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(224, 82, 151, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(224, 82, 151, 0.08)'
  },
  mintFresh: {
    // 基础颜色变量定义
    '--primary-100': '#5DA399',    // 主青色
    '--primary-200': '#40867d',    // 深青色
    '--primary-300': '#004840',    // 墨绿色
    '--accent-100': '#FF6B6B',     // 珊瑚红
    '--accent-200': '#8f001a',     // 深红色
    '--text-100': '#333333',       // 深灰色
    '--text-200': '#5c5c5c',       // 中灰色
    '--bg-100': '#E0E7E9',         // 浅灰青色
    '--bg-200': '#d6dddf',         // 中灰青色
    '--bg-300': '#aeb5b7',         // 深灰青色

    // 背景色 - 使用清新的灰青色调
    '--el-bg-color': 'var(--bg-200)',
    '--el-bg-color-page': 'var(--bg-100)',
    '--el-bg-color-overlay': 'var(--bg-200)',
    
    // 文字颜色 - 使用清晰的层次
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#7a7a7a',
    '--el-text-color-placeholder': '#999999',
    
    // 边框颜色 - 使用协调的灰青色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': '#c8cfd1',
    '--el-border-color-lighter': '#dce3e5',
    
    // 填充色 - 使用渐进的灰青色
    '--el-fill-color': 'var(--bg-100)',
    '--el-fill-color-light': 'var(--bg-200)',
    '--el-fill-color-lighter': 'var(--bg-200)',
    '--el-fill-color-blank': 'var(--bg-200)',
    
    // 主题色 - 使用青色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': '#7ab5ac',
    '--el-color-primary-light-5': '#97c7c0',
    '--el-color-primary-light-7': '#b4d9d4',
    '--el-color-primary-light-8': '#d2ebe7',
    '--el-color-primary-light-9': '#e6f4f2',
    '--el-color-primary-dark-2': 'var(--primary-200)',

    // 成功状态色 - 协调的绿色
    '--el-color-success': '#67C23A',
    '--el-color-success-light-3': '#95D475',
    '--el-color-success-light-5': '#B3E19D',
    '--el-color-success-light-7': '#D1EDC4',
    '--el-color-success-light-8': '#E1F3D8',
    '--el-color-success-light-9': '#F0F9EB',
    '--el-color-success-dark-2': '#529B2E',

    // 警告状态色 - 使用温暖的橙色
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色 - 使用accent珊瑚红
    '--el-color-danger': 'var(--accent-100)',
    '--el-color-danger-light-3': '#ff8f8f',
    '--el-color-danger-light-5': '#ffb3b3',
    '--el-color-danger-light-7': '#ffd7d7',
    '--el-color-danger-light-8': '#ffe8e8',
    '--el-color-danger-light-9': '#fff5f5',
    '--el-color-danger-dark-2': 'var(--accent-200)',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#909399',
    '--el-color-info-light-5': '#A6A9AD',
    '--el-color-info-light-7': '#C8C9CC',
    '--el-color-info-light-8': '#DCDFE6',
    '--el-color-info-light-9': '#EBEEF5',
    '--el-color-info-dark-2': '#73767A',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(224, 231, 233, 0.9)',
    '--el-mask-color-extra-light': 'rgba(224, 231, 233, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(93, 163, 153, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(93, 163, 153, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(93, 163, 153, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(93, 163, 153, 0.08)'
  },
  lavenderLight: {
    // 基础颜色变量定义
    '--primary-100': '#8B5FBF',    // 主紫色
    '--primary-200': '#61398F',    // 深紫色
    '--primary-300': '#FFFFFF',    // 纯白色
    '--accent-100': '#D6C6E1',     // 浅紫色
    '--accent-200': '#9A73B5',     // 中紫色
    '--text-100': '#4A4A4A',       // 深灰色
    '--text-200': '#878787',       // 中灰色
    '--bg-100': '#F5F3F7',         // 浅紫灰色
    '--bg-200': '#E9E4ED',         // 中紫灰色
    '--bg-300': '#FFFFFF',         // 纯白色

    // 背景色 - 使用柔和的紫色调
    '--el-bg-color': 'var(--bg-300)',
    '--el-bg-color-page': 'var(--bg-100)',
    '--el-bg-color-overlay': 'var(--bg-300)',
    
    // 文字颜色 - 使用清晰的层次
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#a3a3a3',
    '--el-text-color-placeholder': '#c0c0c0',
    
    // 边框颜色 - 使用柔和的紫色
    '--el-border-color': 'var(--bg-200)',
    '--el-border-color-light': '#f0ecf3',
    '--el-border-color-lighter': '#f7f5f9',
    
    // 填充色 - 使用渐进的紫色
    '--el-fill-color': 'var(--bg-100)',
    '--el-fill-color-light': 'var(--bg-200)',
    '--el-fill-color-lighter': 'var(--bg-300)',
    '--el-fill-color-blank': 'var(--bg-300)',
    
    // 主题色 - 使用紫色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': '#a47fcc',
    '--el-color-primary-light-5': '#bd9fd9',
    '--el-color-primary-light-7': '#d6bfe6',
    '--el-color-primary-light-8': '#e2d2ee',
    '--el-color-primary-light-9': '#efe6f7',
    '--el-color-primary-dark-2': 'var(--primary-200)',

    // 成功状态色 - 柔和的绿色
    '--el-color-success': '#67C23A',
    '--el-color-success-light-3': '#95D475',
    '--el-color-success-light-5': '#B3E19D',
    '--el-color-success-light-7': '#D1EDC4',
    '--el-color-success-light-8': '#E1F3D8',
    '--el-color-success-light-9': '#F0F9EB',
    '--el-color-success-dark-2': '#529B2E',

    // 警告状态色 - 温暖的橙色
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色 - 柔和的红色
    '--el-color-danger': '#F56C6C',
    '--el-color-danger-light-3': '#F89898',
    '--el-color-danger-light-5': '#FAB6B6',
    '--el-color-danger-light-7': '#FCD3D3',
    '--el-color-danger-light-8': '#FDE2E2',
    '--el-color-danger-light-9': '#FEF0F0',
    '--el-color-danger-dark-2': '#C45656',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#a3a3a3',
    '--el-color-info-light-5': '#b8b8b8',
    '--el-color-info-light-7': '#d1d1d1',
    '--el-color-info-light-8': '#e6e6e6',
    '--el-color-info-light-9': '#f4f4f4',
    '--el-color-info-dark-2': '#6e6e6e',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(245, 243, 247, 0.9)',
    '--el-mask-color-extra-light': 'rgba(245, 243, 247, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(139, 95, 191, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(139, 95, 191, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(139, 95, 191, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(139, 95, 191, 0.08)'
  },
  royalPurple: {
    // 基础颜色变量定义
    '--primary-100': '#6c35de',    // 主紫色
    '--primary-200': '#a364ff',    // 亮紫色
    '--primary-300': '#ffc7ff',    // 粉紫色
    '--accent-100': '#cb80ff',     // 浅紫色
    '--accent-200': '#373737',     // 深灰色
    '--text-100': '#ffffff',       // 纯白色
    '--text-200': '#e0e0e0',       // 浅灰色
    '--bg-100': '#241b35',         // 深紫黑色
    '--bg-200': '#342a45',         // 中紫黑色
    '--bg-300': '#4d425f',         // 浅紫黑色

    // 背景色 - 使用深邃的紫黑色调
    '--el-bg-color': 'var(--bg-200)',
    '--el-bg-color-page': 'var(--bg-100)',
    '--el-bg-color-overlay': 'var(--bg-300)',
    
    // 文字颜色 - 使用明亮的色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#b0b0b0',
    '--el-text-color-placeholder': '#808080',
    
    // 边框颜色 - 使用深色边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': '#443a56',
    '--el-border-color-lighter': '#534768',
    
    // 填充色 - 使用渐进的紫色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-300)',
    '--el-fill-color-lighter': 'var(--bg-300)',
    '--el-fill-color-blank': 'var(--bg-200)',
    
    // 主题色 - 使用亮紫色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#b98aff',
    '--el-color-primary-light-7': '#d4b3ff',
    '--el-color-primary-light-8': '#e2ccff',
    '--el-color-primary-light-9': '#f0e5ff',
    '--el-color-primary-dark-2': '#5628b8',

    // 成功状态色 - 明亮的绿色
    '--el-color-success': '#67E0A3',
    '--el-color-success-light-3': '#89E7B7',
    '--el-color-success-light-5': '#ABEDC9',
    '--el-color-success-light-7': '#CDF3DC',
    '--el-color-success-light-8': '#DEF7E9',
    '--el-color-success-light-9': '#EFFBF3',
    '--el-color-success-dark-2': '#52B382',

    // 警告状态色 - 明亮的橙色
    '--el-color-warning': '#E6A23C',
    '--el-color-warning-light-3': '#EEB974',
    '--el-color-warning-light-5': '#F3D19E',
    '--el-color-warning-light-7': '#F8E3C5',
    '--el-color-warning-light-8': '#FAF0D9',
    '--el-color-warning-light-9': '#FDF6EC',
    '--el-color-warning-dark-2': '#B88230',

    // 危险状态色 - 明亮的红色
    '--el-color-danger': '#FF6B6B',
    '--el-color-danger-light-3': '#FF8F8F',
    '--el-color-danger-light-5': '#FFB3B3',
    '--el-color-danger-light-7': '#FFD7D7',
    '--el-color-danger-light-8': '#FFE8E8',
    '--el-color-danger-light-9': '#FFF5F5',
    '--el-color-danger-dark-2': '#CC5555',

    // 信息状态色 - 使用accent色调
    '--el-color-info': 'var(--accent-100)',
    '--el-color-info-light-3': '#d699ff',
    '--el-color-info-light-5': '#e0b3ff',
    '--el-color-info-light-7': '#ebccff',
    '--el-color-info-light-8': '#f2e5ff',
    '--el-color-info-light-9': '#f8f2ff',
    '--el-color-info-dark-2': '#a366cc',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(36, 27, 53, 0.8)',
    '--el-mask-color-extra-light': 'rgba(36, 27, 53, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(108, 53, 222, 0.3)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(108, 53, 222, 0.2)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(108, 53, 222, 0.15)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(108, 53, 222, 0.4)'
  },
  freshGreen: {
    // 基础颜色变量定义
    '--primary-100': '#86efac',    // 清新绿
    '--primary-200': '#f0fdf5',    // 浅绿白
    '--primary-300': '#19725D',    // 深绿色
    '--accent-100': '#f5be0b',     // 金黄色
    '--accent-200': '#fef1c7',     // 浅黄色
    '--text-100': '#292524',       // 深灰色
    '--text-200': '#78716c',       // 中灰色
    '--bg-100': '#fafaf9',         // 米白色
    '--bg-200': '#f5f5f4',         // 浅灰色
    '--bg-300': '#E0E2E5',         // 中灰色

    // 背景色 - 使用清新的白色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用清晰的层次
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#a8a29e',
    '--el-text-color-placeholder': '#d6d3d1',
    
    // 边框颜色 - 使用柔和的边框
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': '#f0f0f0',
    '--el-border-color-lighter': '#f5f5f5',
    
    // 填充色 - 使用渐进的白色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用清新的绿色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': '#a5f3c3',
    '--el-color-primary-light-5': '#c4f7d7',
    '--el-color-primary-light-7': '#e2fbeb',
    '--el-color-primary-light-8': '#f0fdf5',
    '--el-color-primary-light-9': '#f8fefa',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 协调的绿色
    '--el-color-success': '#10B981',
    '--el-color-success-light-3': '#6EE7B7',
    '--el-color-success-light-5': '#A7F3D0',
    '--el-color-success-light-7': '#D1FAE5',
    '--el-color-success-light-8': '#ECFDF5',
    '--el-color-success-light-9': '#F0FDF4',
    '--el-color-success-dark-2': '#059669',

    // 警告状态色 - 使用accent金黄色
    '--el-color-warning': 'var(--accent-100)',
    '--el-color-warning-light-3': '#fcd34d',
    '--el-color-warning-light-5': '#fde68a',
    '--el-color-warning-light-7': '#fef3c7',
    '--el-color-warning-light-8': '#fffbeb',
    '--el-color-warning-light-9': '#fefce8',
    '--el-color-warning-dark-2': '#d97706',

    // 危险状态色 - 柔和的红色
    '--el-color-danger': '#EF4444',
    '--el-color-danger-light-3': '#FCA5A5',
    '--el-color-danger-light-5': '#FECACA',
    '--el-color-danger-light-7': '#FEE2E2',
    '--el-color-danger-light-8': '#FEE2E2',
    '--el-color-danger-light-9': '#FEF2F2',
    '--el-color-danger-dark-2': '#DC2626',

    // 信息状态色
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#a8a29e',
    '--el-color-info-light-5': '#d6d3d1',
    '--el-color-info-light-7': '#e7e5e4',
    '--el-color-info-light-8': '#f5f5f4',
    '--el-color-info-light-9': '#fafaf9',
    '--el-color-info-dark-2': '#57534e',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(250, 250, 249, 0.9)',
    '--el-mask-color-extra-light': 'rgba(250, 250, 249, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(134, 239, 172, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(134, 239, 172, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(134, 239, 172, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(134, 239, 172, 0.08)'
  },
  minimalGray: {
    // 基础颜色变量定义
    '--primary-100': '#424242',    // 主灰色
    '--primary-200': '#616161',    // 中灰色
    '--primary-300': '#212121',    // 深灰色
    '--accent-100': '#9E9E9E',     // 浅灰色
    '--accent-200': '#757575',     // 次灰色
    '--text-100': '#212121',       // 主文本色
    '--text-200': '#757575',       // 次要文本
    '--bg-100': '#FFFFFF',         // 纯白背景
    '--bg-200': '#FAFAFA',         // 浅灰背景
    '--bg-300': '#EEEEEE',         // 中灰背景

    // 背景色 - 使用纯净的白灰配色
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用经典灰度
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#9E9E9E',
    '--el-text-color-placeholder': '#BDBDBD',
    
    // 边框颜色 - 使用浅灰色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': '#F5F5F5',
    '--el-border-color-lighter': '#FAFAFA',
    
    // 填充色 - 使用渐进的灰色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用灰色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': '#616161',
    '--el-color-primary-light-5': '#757575',
    '--el-color-primary-light-7': '#9E9E9E',
    '--el-color-primary-light-8': '#BDBDBD',
    '--el-color-primary-light-9': '#E0E0E0',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 低饱和度的绿色
    '--el-color-success': '#66BB6A',
    '--el-color-success-light-3': '#81C784',
    '--el-color-success-light-5': '#A5D6A7',
    '--el-color-success-light-7': '#C8E6C9',
    '--el-color-success-light-8': '#E8F5E9',
    '--el-color-success-light-9': '#F1F8E9',
    '--el-color-success-dark-2': '#4CAF50',

    // 警告状态色 - 低饱和度的橙色
    '--el-color-warning': '#FFA726',
    '--el-color-warning-light-3': '#FFB74D',
    '--el-color-warning-light-5': '#FFCC80',
    '--el-color-warning-light-7': '#FFE0B2',
    '--el-color-warning-light-8': '#FFF3E0',
    '--el-color-warning-light-9': '#FFF8E1',
    '--el-color-warning-dark-2': '#F57C00',

    // 危险状态色 - 低饱和度的红色
    '--el-color-danger': '#EF5350',
    '--el-color-danger-light-3': '#E57373',
    '--el-color-danger-light-5': '#EF9A9A',
    '--el-color-danger-light-7': '#FFCDD2',
    '--el-color-danger-light-8': '#FFEBEE',
    '--el-color-danger-light-9': '#FFEBEE',
    '--el-color-danger-dark-2': '#E53935',

    // 信息状态色 - 使用中性灰
    '--el-color-info': 'var(--text-200)',
    '--el-color-info-light-3': '#BDBDBD',
    '--el-color-info-light-5': '#E0E0E0',
    '--el-color-info-light-7': '#EEEEEE',
    '--el-color-info-light-8': '#F5F5F5',
    '--el-color-info-light-9': '#FAFAFA',
    '--el-color-info-dark-2': '#757575',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(250, 250, 250, 0.9)',
    '--el-mask-color-extra-light': 'rgba(250, 250, 250, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(0, 0, 0, 0.05)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.03)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(0, 0, 0, 0.02)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(0, 0, 0, 0.06)'
  },
  deepBlue: {
    // 基础颜色变量定义
    '--primary-100': '#1565C0',    // 主蓝色
    '--primary-200': '#1E88E5',    // 亮蓝色
    '--primary-300': '#0D47A1',    // 深蓝色
    '--accent-100': '#82B1FF',     // 浅蓝色
    '--accent-200': '#2979FF',     // 鲜蓝色
    '--text-100': '#263238',       // 深色文本
    '--text-200': '#546E7A',       // 次要文本
    '--bg-100': '#ECEFF1',         // 浅灰蓝背景
    '--bg-200': '#CFD8DC',         // 中灰蓝背景
    '--bg-300': '#B0BEC5',         // 深灰蓝背景

    // 背景色 - 使用专业的灰蓝配色
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用沉稳的蓝灰色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#78909C',
    '--el-text-color-placeholder': '#90A4AE',
    
    // 边框颜色 - 使用灰蓝色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的灰蓝色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-300)',
    '--el-fill-color-lighter': 'var(--bg-300)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用专业的蓝色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#42A5F5',
    '--el-color-primary-light-7': '#90CAF9',
    '--el-color-primary-light-8': '#BBDEFB',
    '--el-color-primary-light-9': '#E3F2FD',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 专业的绿色
    '--el-color-success': '#2E7D32',
    '--el-color-success-light-3': '#43A047',
    '--el-color-success-light-5': '#66BB6A',
    '--el-color-success-light-7': '#A5D6A7',
    '--el-color-success-light-8': '#C8E6C9',
    '--el-color-success-light-9': '#E8F5E9',
    '--el-color-success-dark-2': '#1B5E20',

    // 警告状态色 - 专业的橙色
    '--el-color-warning': '#F57C00',
    '--el-color-warning-light-3': '#FB8C00',
    '--el-color-warning-light-5': '#FFA726',
    '--el-color-warning-light-7': '#FFCC80',
    '--el-color-warning-light-8': '#FFF3E0',
    '--el-color-warning-light-9': '#FFF8E1',
    '--el-color-warning-dark-2': '#EF6C00',

    // 危险状态色 - 专业的红色
    '--el-color-danger': '#D32F2F',
    '--el-color-danger-light-3': '#E53935',
    '--el-color-danger-light-5': '#EF5350',
    '--el-color-danger-light-7': '#EF9A9A',
    '--el-color-danger-light-8': '#FFCDD2',
    '--el-color-danger-light-9': '#FFEBEE',
    '--el-color-danger-dark-2': '#C62828',

    // 信息状态色 - 使用蓝灰色调
    '--el-color-info': 'var(--accent-100)',
    '--el-color-info-light-3': '#d699ff',
    '--el-color-info-light-5': '#e0b3ff',
    '--el-color-info-light-7': '#ebccff',
    '--el-color-info-light-8': '#f2e5ff',
    '--el-color-info-light-9': '#f8f2ff',
    '--el-color-info-dark-2': '#a366cc',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(236, 239, 241, 0.9)',
    '--el-mask-color-extra-light': 'rgba(236, 239, 241, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(21, 101, 192, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(21, 101, 192, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(21, 101, 192, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(21, 101, 192, 0.08)'
  },
  forestGreen: {
    // 基础颜色变量定义
    '--primary-100': '#2E7D32',    // 主绿色
    '--primary-200': '#388E3C',    // 亮绿色
    '--primary-300': '#1B5E20',    // 深绿色
    '--accent-100': '#FDD835',     // 金黄色
    '--accent-200': '#F9A825',     // 深金色
    '--text-100': '#1B5E20',       // 深绿色文本
    '--text-200': '#33691E',       // 次要文本
    '--bg-100': '#F1F8E9',         // 浅绿背景
    '--bg-200': '#DCEDC8',         // 中绿背景
    '--bg-300': '#C5E1A5',         // 深绿背景

    // 背景色 - 使用自然的绿色配色
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用深绿色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#558B2F',
    '--el-text-color-placeholder': '#7CB342',
    
    // 边框颜色 - 使用绿色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的绿色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用自然的绿色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#43A047',
    '--el-color-primary-light-7': '#81C784',
    '--el-color-primary-light-8': '#A5D6A7',
    '--el-color-primary-light-9': '#C8E6C9',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 自然的绿色
    '--el-color-success': '#2E7D32',
    '--el-color-success-light-3': '#43A047',
    '--el-color-success-light-5': '#66BB6A',
    '--el-color-success-light-7': '#A5D6A7',
    '--el-color-success-light-8': '#C8E6C9',
    '--el-color-success-light-9': '#E8F5E9',
    '--el-color-success-dark-2': '#1B5E20',

    // 警告状态色 - 金黄色
    '--el-color-warning': '#F9A825',
    '--el-color-warning-light-3': '#FBC02D',
    '--el-color-warning-light-5': '#FDD835',
    '--el-color-warning-light-7': '#FFF176',
    '--el-color-warning-light-8': '#FFF59D',
    '--el-color-warning-light-9': '#FFF9C4',
    '--el-color-warning-dark-2': '#F57F17',

    // 危险状态色 - 深红色
    '--el-color-danger': '#C62828',
    '--el-color-danger-light-3': '#D32F2F',
    '--el-color-danger-light-5': '#E53935',
    '--el-color-danger-light-7': '#EF5350',
    '--el-color-danger-light-8': '#E57373',
    '--el-color-danger-light-9': '#FFCDD2',
    '--el-color-danger-dark-2': '#B71C1C',

    // 信息状态色 - 使用绿色调
    '--el-color-info': '#33691E',
    '--el-color-info-light-3': '#558B2F',
    '--el-color-info-light-5': '#689F38',
    '--el-color-info-light-7': '#7CB342',
    '--el-color-info-light-8': '#8BC34A',
    '--el-color-info-light-9': '#9CCC65',
    '--el-color-info-dark-2': '#1B5E20',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(241, 248, 233, 0.9)',
    '--el-mask-color-extra-light': 'rgba(241, 248, 233, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(46, 125, 50, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(46, 125, 50, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(46, 125, 50, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(46, 125, 50, 0.08)'
  },
  coralPink: {
    // 基础颜色变量定义
    '--primary-100': '#FF7F7F',    // 珊瑚粉
    '--primary-200': '#FF9999',    // 浅珊瑚粉
    '--primary-300': '#FF6666',    // 深珊瑚粉
    '--accent-100': '#FFB6C1',     // 浅粉红
    '--accent-200': '#FF8DA1',     // 深粉红
    '--text-100': '#4A4A4A',       // 深灰色文本
    '--text-200': '#666666',       // 次要文本
    '--bg-100': '#FFF5F5',         // 浅粉背景
    '--bg-200': '#FFE8E8',         // 中粉背景
    '--bg-300': '#FFD6D6',         // 深粉背景

    // 背景色 - 使用柔和的粉色配色
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用灰色调
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#808080',
    '--el-text-color-placeholder': '#999999',
    
    // 边框颜色 - 使用粉色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的粉色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用柔和的珊瑚粉色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#FFB3B3',
    '--el-color-primary-light-7': '#FFC6C6',
    '--el-color-primary-light-8': '#FFD9D9',
    '--el-color-primary-light-9': '#FFECEC',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 成功状态色 - 柔和的绿色
    '--el-color-success': '#95C9A6',
    '--el-color-success-light-3': '#A8D3B6',
    '--el-color-success-light-5': '#BBDCC5',
    '--el-color-success-light-7': '#CEE6D5',
    '--el-color-success-light-8': '#E1EFE4',
    '--el-color-success-light-9': '#F4F9F4',
    '--el-color-success-dark-2': '#82B696',

    // 警告状态色 - 柔和的橙色
    '--el-color-warning': '#FFB366',
    '--el-color-warning-light-3': '#FFC285',
    '--el-color-warning-light-5': '#FFD1A3',
    '--el-color-warning-light-7': '#FFE0C2',
    '--el-color-warning-light-8': '#FFEFE0',
    '--el-color-warning-light-9': '#FFF7F0',
    '--el-color-warning-dark-2': '#FFA347',

    // 危险状态色 - 柔和的红色
    '--el-color-danger': '#FF8080',
    '--el-color-danger-light-3': '#FF9999',
    '--el-color-danger-light-5': '#FFB3B3',
    '--el-color-danger-light-7': '#FFCCCC',
    '--el-color-danger-light-8': '#FFE6E6',
    '--el-color-danger-light-9': '#FFF0F0',
    '--el-color-danger-dark-2': '#FF6666',

    // 信息状态色 - 使用灰色调
    '--el-color-info': '#909399',
    '--el-color-info-light-3': '#A6A9AD',
    '--el-color-info-light-5': '#BCBEC2',
    '--el-color-info-light-7': '#D3D4D6',
    '--el-color-info-light-8': '#E9E9EB',
    '--el-color-info-light-9': '#F4F4F5',
    '--el-color-info-dark-2': '#767980',
    
    // 遮罩颜色
    '--el-mask-color': 'rgba(255, 245, 245, 0.9)',
    '--el-mask-color-extra-light': 'rgba(255, 245, 245, 0.3)',

    // 组件阴影
    '--el-box-shadow': '0 2px 4px rgba(255, 127, 127, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(255, 127, 127, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(255, 127, 127, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(255, 127, 127, 0.08)'
  },
  // 墨韵主题 - 水墨画风格
  inkRhythm: {
    // 基础颜色变量定义
    '--primary-100': '#2C3E50',    // 墨色
    '--primary-200': '#34495E',    // 淡墨色
    '--primary-300': '#1B2631',    // 浓墨色
    '--accent-100': '#95A5A6',     // 石青色
    '--accent-200': '#7F8C8D',     // 深灰色
    '--text-100': '#2C3E50',       // 主文本色
    '--text-200': '#7F8C8D',       // 次要文本色
    '--bg-100': '#FAFAFA',         // 宣纸色
    '--bg-200': '#F5F5F5',         // 浅灰色
    '--bg-300': '#E0E0E0',         // 中灰色

    // 背景色 - 使用宣纸色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用墨色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#95A5A6',
    '--el-text-color-placeholder': '#BDC3C7',
    
    // 边框颜色 - 使用淡墨色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的灰色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用墨色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#465C6E',
    '--el-color-primary-light-7': '#5D7A8C',
    '--el-color-primary-light-8': '#7497AA',
    '--el-color-primary-light-9': '#8BB4C8',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 组件阴影 - 水墨晕染效果
    '--el-box-shadow': '0 2px 4px rgba(44, 62, 80, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(44, 62, 80, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(44, 62, 80, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(44, 62, 80, 0.08)'
  },
  // 瓷青主题 - 青花瓷风格
  porcelainCyan: {
    // 基础颜色变量定义
    '--primary-100': '#1B6B93',    // 青花色
    '--primary-200': '#2E8BAC',    // 浅青色
    '--primary-300': '#114B69',    // 深青色
    '--accent-100': '#88BDBC',     // 天青色
    '--accent-200': '#5B8B8A',     // 青灰色
    '--text-100': '#2C4F63',       // 主文本色
    '--text-200': '#5B8B8A',       // 次要文本色
    '--bg-100': '#F8FCFF',         // 瓷白色
    '--bg-200': '#F0F7FA',         // 浅青白
    '--bg-300': '#E6EEF2',         // 青白色

    // 背景色 - 使用瓷白色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用青色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#88BDBC',
    '--el-text-color-placeholder': '#B4D6D5',
    
    // 边框颜色 - 使用青白色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的青白色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用青花色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#4BA3C3',
    '--el-color-primary-light-7': '#7BBBD9',
    '--el-color-primary-light-8': '#A8D3E9',
    '--el-color-primary-light-9': '#D5EBF6',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 组件阴影 - 青瓷光泽效果
    '--el-box-shadow': '0 2px 4px rgba(27, 107, 147, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(27, 107, 147, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(27, 107, 147, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(27, 107, 147, 0.08)'
  },
  // 丹霞主题 - 丹霞地貌风格
  sunsetRed: {
    // 基础颜色变量定义
    '--primary-100': '#C23B22',    // 丹霞红
    '--primary-200': '#D35D47',    // 浅丹红
    '--primary-300': '#8C1C0A',    // 深丹红
    '--accent-100': '#E6A23C',     // 暖金色
    '--accent-200': '#B88230',     // 赭石色
    '--text-100': '#2C1810',       // 主文本色
    '--text-200': '#5C392E',       // 次要文本色
    '--bg-100': '#FDF6F3',         // 红玉色
    '--bg-200': '#F7EBE7',         // 浅红白
    '--bg-300': '#E8D3CC',         // 红白色

    // 背景色 - 使用红玉色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用赭石色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#8C5B4A',
    '--el-text-color-placeholder': '#B39084',
    
    // 边框颜色 - 使用红白色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的红白色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用丹霞红色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#E07F6C',
    '--el-color-primary-light-7': '#EBA190',
    '--el-color-primary-light-8': '#F3C3B4',
    '--el-color-primary-light-9': '#F9E5D8',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 组件阴影 - 丹霞层次效果
    '--el-box-shadow': '0 2px 4px rgba(194, 59, 34, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(194, 59, 34, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(194, 59, 34, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(194, 59, 34, 0.08)'
  },
  // 竹影主题 - 竹林风格
  bambooShade: {
    // 基础颜色变量定义
    '--primary-100': '#2E7D32',    // 竹青色
    '--primary-200': '#388E3C',    // 浅竹色
    '--primary-300': '#1B5E20',    // 深竹色
    '--accent-100': '#8BC34A',     // 竹叶色
    '--accent-200': '#689F38',     // 苔绿色
    '--text-100': '#1B2E1B',       // 主文本色
    '--text-200': '#3E5C3E',       // 次要文本色
    '--bg-100': '#F6F9F6',         // 竹白色
    '--bg-200': '#EDF2ED',         // 浅竹白
    '--bg-300': '#DBE5DB',         // 竹灰色

    // 背景色 - 使用竹白色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用竹青色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#5C785C',
    '--el-text-color-placeholder': '#8FA68F',
    
    // 边框颜色 - 使用竹灰色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的竹白色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用竹青色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#4CAF50',
    '--el-color-primary-light-7': '#81C784',
    '--el-color-primary-light-8': '#A5D6A7',
    '--el-color-primary-light-9': '#C8E6C9',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 组件阴影 - 竹影效果
    '--el-box-shadow': '0 2px 4px rgba(46, 125, 50, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(46, 125, 50, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(46, 125, 50, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(46, 125, 50, 0.08)'
  },
  // 玉韵主题 - 和田玉风格
  jadeRhythm: {
    // 基础颜色变量定义
    '--primary-100': '#7BAF9E',    // 玉色
    '--primary-200': '#96C3B4',    // 浅玉色
    '--primary-300': '#5C8B7D',    // 深玉色
    '--accent-100': '#D4C5A9',     // 籽料色
    '--accent-200': '#A69781',     // 玉皮色
    '--text-100': '#2C3C37',       // 主文本色
    '--text-200': '#5C6E69',       // 次要文本色
    '--bg-100': '#F8FAF9',         // 玉白色
    '--bg-200': '#F0F4F2',         // 浅玉白
    '--bg-300': '#E2E8E6',         // 玉灰色

    // 背景色 - 使用玉白色调
    '--el-bg-color': 'var(--bg-100)',
    '--el-bg-color-page': 'var(--bg-200)',
    '--el-bg-color-overlay': 'var(--bg-100)',
    
    // 文字颜色 - 使用玉色系
    '--el-text-color-primary': 'var(--text-100)',
    '--el-text-color-regular': 'var(--text-200)',
    '--el-text-color-secondary': '#8B9E9A',
    '--el-text-color-placeholder': '#B4C2BF',
    
    // 边框颜色 - 使用玉灰色
    '--el-border-color': 'var(--bg-300)',
    '--el-border-color-light': 'var(--bg-200)',
    '--el-border-color-lighter': 'var(--bg-100)',
    
    // 填充色 - 使用渐进的玉白色
    '--el-fill-color': 'var(--bg-200)',
    '--el-fill-color-light': 'var(--bg-100)',
    '--el-fill-color-lighter': 'var(--bg-100)',
    '--el-fill-color-blank': 'var(--bg-100)',
    
    // 主题色 - 使用玉色调
    '--el-color-primary': 'var(--primary-100)',
    '--el-color-primary-light-3': 'var(--primary-200)',
    '--el-color-primary-light-5': '#B1D7CA',
    '--el-color-primary-light-7': '#CCEAE0',
    '--el-color-primary-light-8': '#E0F2EB',
    '--el-color-primary-light-9': '#F0F9F6',
    '--el-color-primary-dark-2': 'var(--primary-300)',

    // 组件阴影 - 玉光效果
    '--el-box-shadow': '0 2px 4px rgba(123, 175, 158, 0.1)',
    '--el-box-shadow-light': '0 2px 12px 0 rgba(123, 175, 158, 0.06)',
    '--el-box-shadow-lighter': '0 2px 8px 0 rgba(123, 175, 158, 0.04)',
    '--el-box-shadow-dark': '0 2px 16px 0 rgba(123, 175, 158, 0.08)'
  }
}

// 主题持久化相关的常量
const THEME_STORAGE_KEY = 'app_theme_settings'

// 默认主题设置
const DEFAULT_THEME_SETTINGS = {
  theme: 'system', // 默认跟随系统
  fontSize: 14
}

// 保存主题设置到本地存储
function saveThemeSettings(settings) {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(settings))
}

// 从本地存储读取主题设置
function loadThemeSettings() {
  try {
    const savedSettings = localStorage.getItem(THEME_STORAGE_KEY)
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_THEME_SETTINGS
  } catch (error) {
    console.error('Failed to load theme settings:', error)
    return DEFAULT_THEME_SETTINGS
  }
}

/**
 * 应用主题设置
 * @param {Object} settings - 设置对象
 */
export function applyTheme(settings) {
  // 保存设置到本地存储
  saveThemeSettings(settings)
  
  // 获取当前系统主题
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // 根据设置决定使用哪个主题
  const theme = settings.theme === 'system' 
    ? (prefersDark ? 'dark' : 'light') 
    : settings.theme
  
  // 设置主题属性
  document.documentElement.setAttribute('data-theme', theme)
  
  // 应用主题颜色变量
  const themeColors = themes[theme]
  for (const [key, value] of Object.entries(themeColors)) {
    document.documentElement.style.setProperty(key, value)
  }
  
  // 应用字体大小
  document.documentElement.style.setProperty('--el-font-size-base', `${settings.fontSize}px`)
}

/**
 * 监听系统主题变化
 * @param {Function} callback - 主题变化时的回调函数
 * @returns {Function} 清理函数
 */
export function watchSystemTheme(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

export default {
  applyTheme,
  watchSystemTheme,
  loadThemeSettings,
  DEFAULT_THEME_SETTINGS
} 