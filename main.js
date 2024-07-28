const { app, BrowserWindow, ipcMain } = require("electron");
var path = require("path");
const dbHelper = require("./dbHelper");
const DbHelper = require("./dbHelper");
dbHelper.invoke();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // Ensure context isolation is enabled
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });
  win.webContents.openDevTools();
  const dbHelper = new DbHelper();
  dbHelper.createStore();

  ipcMain.handle("getToDo", async (event, data) => {
    try {
      var toDoData = dbHelper.getToDoList();
      return toDoData;
    } catch (error) {
      console.error("Error handling writeToDo:", error);
      return { status: "error", message: error.message };
    }
  });
  ipcMain.handle("writeToDo", async (event, data) => {
    try {
      dbHelper.writeToDoList(data);
      var toDoData = dbHelper.getToDoList();
      return toDoData;
    } catch (error) {
      console.error("Error handling writeToDo:", error);
      return { status: "error", message: error.message };
    }
  });
  ipcMain.handle("writeTimable", async (event, data) => {
    try {
      dbHelper.writeTimable(data);
      const result = dbHelper.getTimable();
      return result;
    } catch (error) {
      console.error("Error handling writeToDo:", error);
      return { status: "error", message: error.message };
    }
  });
  ipcMain.handle("getTimable", async (event, data) => {
    try {
      var result = dbHelper.getTimable();
      return result;
    } catch (error) {
      console.error("Error handling writeToDo:", error);
      return { status: "error", message: error.message };
    }
  });

  win.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
