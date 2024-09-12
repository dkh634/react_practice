const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow(isDev) {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
}

app.whenReady().then(() => {
    import('electron-is-dev').then((module) => {
        const isDev = module.default;
        createWindow(isDev);

        app.on('activate', function () {
            if (BrowserWindow.getAllWindows().length === 0) createWindow(isDev);
        });
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
