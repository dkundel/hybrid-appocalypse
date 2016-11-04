const {app, BrowserWindow} = require('electron');
const express = require('express');
const mkdirp = require('mkdirp');

const PORT = process.env.PORT || 9999;

let win;
let server;
let slidedeck;

if (process.argv.length > 2 && process.argv[2] !== '--notes') {
  slidedeck = process.argv[2];
} else {
  slidedeck = 'devfest-at-16';
}

let extension = process.argv.indexOf('--notes') !== -1 ? '.notes' : '';

mkdirp.sync('code');

const URL = `http://localhost:${PORT}/${slidedeck}/index${extension}.html`;

function createWindow() {
  win = new BrowserWindow({width: 800, height: 600, frame: true});

  win.loadURL(URL);

  if (process.env.NODE_ENV === 'debug') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null 
  });
}

function createServer() {
  return new Promise((resolve, reject) => {
    server = express();
    server.use(express.static('slides'));
    server.listen(PORT, () => {
      resolve(server);
    }); 
  });
}

function appReady() {
  createServer().then(createWindow);
}

app.on('ready', appReady);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});