// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
 
  // Create the browser window.
  var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : null,
  database : 'music_lib'
});
var redirect_url="";
connection.connect();
var sql = 'SELECT * FROM `rvm_users`';
connection.query(sql, function (error, results, fields) {
 if (error) console.log(error.code);
 else {
     console.log(results);
     var logged_in=results[0].logged_in;
     if(logged_in==1)
     {
       redirect_url="index.html";
     }
     else
     {
      redirect_url="about.html";
     }
    
     //emp_name is column name in your database
 }
});
connection.end(); 
const windowOptions = {
  width: 1080,
  minWidth: 680,
  height: 840,
  title: app.getName()
}
  mainWindow = new BrowserWindow(windowOptions)
  console.log(redirect_url);
  // and load the index.html of the app.
 
  mainWindow.loadFile("index.html")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
