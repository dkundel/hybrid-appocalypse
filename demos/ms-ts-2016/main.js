const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 600, height: 600 });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('close', () => {
    win = null;
  });
}

ipcMain.on('criticalmsg', (evt, msg) => {
  dialog.showErrorBox('Something went really bad', msg);
});

app.commandLine.appendSwitch('--enable-experimental-web-platform-features');

app.on('ready', createWindow);