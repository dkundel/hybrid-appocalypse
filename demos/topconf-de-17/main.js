const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(`file://${__dirname}/index.html`);

  win.on('close', () => {
    win = null;
    dialog.showMessageBox(win, { title: 'Bye!' });
  });
}

ipcMain.on('error', () => {
  dialog.showErrorBox('Oops', 'Something went wrong');
});

app.on('ready', createWindow);
