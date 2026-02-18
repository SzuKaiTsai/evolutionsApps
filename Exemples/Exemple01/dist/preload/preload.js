"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Le script preload expose une API sécurisée appelée electronAPI
  // Exemple a. Communication synchrone
  // Il crée une fonction "getAppInfo"
  getAppInfo: () => electron.ipcRenderer.sendSync("get-app-info"),
  // Exemple b. Communication asynchrone
  // onTaskResult permet au renderer de s'abonner à l'événement task-result
  // Lorsque le main process renvoie une réponse, la fonction callback est exécutée
  onTaskResult: (callback) => {
    electron.ipcRenderer.on("task-result", (_, result) => callback(result));
  }
});
