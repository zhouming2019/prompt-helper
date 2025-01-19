// 导入 Electron 的 app 和 BrowserWindow 模块
const { app, BrowserWindow, globalShortcut, Tray, Menu, nativeImage } = require('electron');
// 导入 path 模块
const path = require('path');
// 判断当前是否为开发环境
const isDev = !app.isPackaged;
// 初始化远程模块
require('@electron/remote/main').initialize();

// 设置应用程序名称
app.name = 'PromptHelper';

// 保存主窗口和托盘的引用
let mainWindow = null;
let tray = null;

// 优化创建系统托盘的函数
function createTray() {
  // 获取图标路径
  const iconPath = isDev ? 
    path.join(process.cwd(), 'resources', 'icon.ico') :
    path.join(process.resourcesPath, 'icon.ico');

  // 创建托盘图标
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  
  if (tray) {
    tray.destroy();
  }

  tray = new Tray(icon);
  tray.setToolTip('提示宝');
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          createWindow();
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出程序',
      click: () => {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  
  tray.setContextMenu(contextMenu);
  
  tray.on('click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.focus();
      } else {
        mainWindow.show();
      }
    } else {
      createWindow();
    }
  });
}

// 注册全局快捷键
function registerGlobalShortcuts() {
  // 注册 Shift+Enter 快捷键
  const ret1 = globalShortcut.register('Shift+Return', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.show();
      mainWindow.focus();
      mainWindow.moveTop();
    } else {
      createWindow();
    }
  });

  // 注册 F5 快捷键
  const ret2 = globalShortcut.register('F5', () => {
    if (mainWindow && mainWindow.isFocused()) {
      mainWindow.reload();
    }
  });
}

// 创建主窗口的函数
async function createWindow() {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 440,
    height: 900,
    minWidth: 400,
    minHeight: 700,
    frame: false,
    show: true, // 改为 true，立即显示窗口
    backgroundColor: '#f5f7fa',
    title: '提示宝',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      webviewTag: true,
      devTools: isDev,
      defaultEncoding: 'UTF-8'
    }
  });

  require('@electron/remote/main').enable(mainWindow.webContents);

  // 优化窗口加载
  try {
    if (isDev) {
      await mainWindow.loadURL('http://localhost:3001');
      mainWindow.webContents.openDevTools({ mode: 'right' });
      mainWindow.focus(); // 确保窗口获得焦点
    } else {
      await mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
      mainWindow.focus(); // 确保窗口获得焦点
    }

    // 移除等待加载完成的事件，因为我们已经设置 show: true
    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    mainWindow.on('close', (event) => {
      if (!app.isQuiting) {
        event.preventDefault();
        mainWindow.hide();
        return false;
      }
      return true;
    });

  } catch (err) {
    console.error('Window creation error:', err);
    app.quit();
  }
}

// 应用程序启动优化
app.whenReady().then(async () => {
  // 创建托盘要在窗口之前
  createTray();
  await createWindow();
  
  registerGlobalShortcuts();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });

  if (isDev) {
    require('electron').ipcMain.on('reload-window', () => {
      if (mainWindow) {
        mainWindow.reload();
      }
    });
  }
}).catch((err) => {
  console.error('App startup error:', err);
  app.quit();
});

// 修改窗口关闭事件处理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin' && app.isQuiting) {
    globalShortcut.unregisterAll();
    app.quit();
  }
});

// 当应用退出时清理资源
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
});

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
}); 