const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('close', () => {
    win = null;
  });
}

ipcMain.on('devfest', (evt, errMsg) => {
  dialog.showErrorBox('Something went wrong!', errMsg);
})

app.on('ready', createWindow);