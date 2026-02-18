"use strict";
const electron = require("electron");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
let mainWindow;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      // Ici on est dans src, mais lors de la compilation, sera dans dist. donc preload.js
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.loadURL("http://localhost:5173");
  setupIPC();
}
function setupIPC() {
  electron.ipcMain.on("get-app-info", (event) => {
    event.returnValue = {
      name: electron.app.getName(),
      //info se trouvant dans package.json
      version: electron.app.getVersion(),
      plateform: process.platform
    };
  });
  electron.ipcMain.on("perform-task", (event, data) => {
    console.log("Tâche reçue: ", data);
    mainWindow.webContents.send("task-result", { success: true, result: "Tâche accomplie par le main process" });
  });
}
electron.app.whenReady().then(createWindow);
