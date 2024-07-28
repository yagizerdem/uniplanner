// preload.js

const { contextBridge, ipcRenderer } = require("electron");

// Expose a safe subset of APIs to the renderer process
contextBridge.exposeInMainWorld("API", {
  getToDo: () => ipcRenderer.invoke("getToDo"),
  writeToDo: (data) => ipcRenderer.invoke("writeToDo", data),
  getTimable: () => ipcRenderer.invoke("getTimable"),
  writeTimable: (data) => ipcRenderer.invoke("writeTimable", data),
});
