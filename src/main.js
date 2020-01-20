import path from 'path';
import url from 'url';
import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  let win = new BrowserWindow({
    width: 600,
    height: 300,
    icon: `${__dirname}/img/icon.svg`,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true,
  }));

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  app.quit();
});
