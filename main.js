var electron = require('electron');
var app = electron.app;  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var globalShortcut = electron.globalShortcut;

var KEYS = [
  'A',
  'MediaPlayPause',
  'Ctrl+MediaPlayPause'
];

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    globalShortcut.unregisterAll();
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  KEYS.forEach(register);
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

function register(key) {
  var callback = onKeyDown.bind(null, key);
  if (!globalShortcut.register(key, callback)) {
    process.stderr.write('failed to bind key=' + key + '\n');
  }
}

function onKeyDown(key) {
  process.stdout.write('key=' + key + '\n');
}