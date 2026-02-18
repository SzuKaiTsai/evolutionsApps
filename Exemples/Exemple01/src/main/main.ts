import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow

function createWindow() {
    // Créer une nouvelle window pour l'application.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'), // Ici on est dans src, mais lors de la compilation, sera dans dist. donc preload.js
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    // Le projet "web" va être démarré sur l'application au lieu de chrome
    mainWindow.loadURL('http://localhost:5173');

    // Fonction pour configurer les communications IPC
    setupIPC();

}


function setupIPC() {

    // Exemple a. Communication IPC synchrone
        // Définition d'un gestionnaire IPC nommé get-app-info
    ipcMain.on('get-app-info', (event) => {
        event.returnValue = {
            name: app.getName(),    //info se trouvant dans package.json
            version: app.getVersion(),

            plateform: process.platform
        };
    });

    // Exemple b. Communication IPC asynchrone
        // Le main process se met à l'écoute (on) de l'événement IPC "perform-task"
    ipcMain.on('perform-task', (event, data) =>{
        console.log("Tâche reçue: ", data);

        // Une fois le traitement terminé, le main process envoi une réponse (send) au renderer via un nouvel événement 'task-result'
        mainWindow.webContents.send('task-result', {success: true, result: 'Tâche accomplie par le main process'});
    });

    // exemple c. communication IPC bidirectionnelle
    // declaration d'un gestionnaire IPC qui ecoute les requetes nommées "calculate"
    // Event: pas besoin d'event, donc _
    // args: la destructuration {}
    ipcMain.handle('calculate',(_, {a, b}) => a+b);
}

app.whenReady().then(createWindow);