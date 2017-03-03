/*
* @Author: Rambo
* @Date:   2017-02-23 17:08:44
*/
const {
    app,
    BrowserWindow,
    ipcMain,
    webContents
} = require('electron')
const path = require('path')
const url = require('url')


// 保持一个对于 window 对象的全局引用，如果你不这样做，
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭
let mainWin, settingsWindow;
let opacity = 1;
function createWindow() {
    // 创建浏览器窗口。
    mainWin = new BrowserWindow({
        width: 400,
        height: 110,
        center: true,
        frame: false,
        resizable: false,
        autoHideMenuBar: true,
        useContentSize: true,
        maximizable: false,
        alwaysOnTop: true,
        transparent: true
        // 
    })

    // 加载应用的 index.html。
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, '/app/index.html'),
        protocol: 'file:'
    }))

    // 打开开发者工具。
    // mainWin.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    mainWin.on('closed', () => {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWin = null
    })
    
    mainWin.webContents.on('dom-ready', () => {
        mainWin.webContents.insertCSS(`body{opacity: ${opacity}}`);
    })
}


ipcMain.on('open-settings-window', () => {
    if (settingsWindow) {
        return;
    }
    let mainWinPos = mainWin.getPosition();
    settingsWindow = new BrowserWindow({
        frame: false,
        height: 100,
        resizable: false,
        width: 370,
        autoHideMenuBar: true,
        transparent: true,
        parent: mainWin,
        x: mainWinPos[0] + 15,
        y: mainWinPos[1] + 50
    });
    // settingsWindow.webContents.openDevTools()
    settingsWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/settings.html'),
        protocol: 'file:'
    }));

    settingsWindow.on('closed', () => {
        settingsWindow = null;
        mainWin.removeListener('move', () => {});
    });

    mainWin.on('move', (e) => {
        if (settingsWindow) {
            settingsWindow.setPosition(mainWin.getPosition()[0] + 15, mainWin.getPosition()[1] + 50);
        }
    });

});

ipcMain.on('close-settings-window', () => {
    if (settingsWindow) {
        settingsWindow.close();
    }
});


ipcMain.on('set-main-window-top', (e, k) => {
    mainWin.setAlwaysOnTop(k);
})

ipcMain.on('set-main-window-opacity', (e, k) => {
    opacity = k;
    mainWin.webContents.insertCSS(`body{opacity: ${opacity}}`);
})

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在这文件，你可以续写应用剩下主进程代码。
    // 也可以拆分成几个文件，然后用 require 导入。
    if (win === null) {
        createWindow()
    }
})