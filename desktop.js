const { app, BrowserWindow, ipcMain, Tray, Menu, dialog } = require('electron');
const url = require('url');
const storage = require('electron-json-storage');
const path = require('path');

const ARGS = process.argv.slice(1);
const DEBUG = ARGS.some(val => val === '--debug');
const APP_ICON = `${__dirname}/img/app-48x48.png`;
const TRAY_ICON = `${__dirname}/img/app-24x24.png`

let win, settings;

let defaultSettings = {
  showCloseMessage: true,
};

let settingsFilePromise = new Promise((resolve, reject) => {
  try {
    storage.get('settings', (err, data) => {
      if (err) throw err;
      resolve(data);
    });
  } catch (exception) {
    reject(exception);
  }
}).then((userSettings) => {
  settings = Object.assign({}, defaultSettings, userSettings);
});

function updateSetting(key, value, callback = (err, data) => {}) {
  settings[key] = value;
  storage.set('settings', settings, callback);
}

function closeDialog(callback) {
  const closeDialogConfig = {
    title: 'Are you sure you want to close the game?',
    message: `Some message about the consequences of closing the game`,
    checkboxLabel: `Don't show me this again`,
    buttons: ['Cancel', 'Ok'],
    icon: APP_ICON,
  };
  dialog.showMessageBox(closeDialogConfig, callback);
}

function createWindow() {
  let height = 600;
  let width = 800;
  const winConfig = {
    autoHideMenuBar: true,
    useContentSize: true,
    frame: false,
    icon: APP_ICON,
    maxHeight: height,
    minHeight: height,
    height: height,
    maxWidth: width,
    minWidth: width,
    width: width,
  };
  if (DEBUG) {
    winConfig.maxWidth = width + 500;
    winConfig.width = width + 500;
  }
  win = new BrowserWindow(winConfig);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'desktop.html'),
    protocol: 'file:',
    slashes: true
  }));
  if (DEBUG) {
    win.webContents.openDevTools();
  }

  win.on('close', (event) => {
    if (settings.showCloseMessage) {
      event.preventDefault();
      let close = new Promise((resolve, reject) => {
        try {
          closeDialog((res, check) => {
            if (check) {
              updateSetting('showCloseMessage', false, {
                if (err) {
                  console.error(err);
                }
              });
            }
            if (res === 1) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        } catch (exception) {
          reject(exception);
        }
      }).then((kill) => {
        if (kill) {
          win.destroy();
          win = null;
        }
      });
    }
  });
}

ipcMain.on('ping', (event, arg) => {
  console.log(arg);
  event.sender.send('pong', 'pong');
});

app.on('ready', () => {
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: (event) => {
        win.show();
      }
    },
    {
      label: 'Quit',
      click: (event) => {
        win.close();
      }
    },
  ]);
  tray = new Tray(TRAY_ICON);
  tray.setToolTip('Squire 2');
  tray.setContextMenu(trayMenu);
  createWindow();
});

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!win) {
    createWindow();
  }
});
