import { app, BrowserWindow, ipcMain, dialog } from 'electron';
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

}

app.whenReady().then(createWindow);

// Communication entre le processus principal et le processus de rendu
ipcMain.on('message-channel',(event, arg) => {
    console.log('Message reçu: ', arg);
    event.reply('message-channel', 'Réponse du main process');
});

// Ecoute de l'evenement pour l'ouverture de la nouvelle fenetre
ipcMain.on('open-form-window', ()=>{
    const formWindow = new BrowserWindow({
        width:450,
        height:600,
        backgroundColor: '#d5cdcb',
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true, //isoler le contexte de rendu pour plus de securite
        }

    });

    // Charger form.vue dans la fenetre electron
    formWindow.loadURL('http://localhost:5173/#/form');
});

//Afficher la boite de message contenant les donnees saisies
ipcMain.on('show-dialog',(event, formDataString) => {
    const formData = JSON.parse(formDataString);
    const message = `
        nom: ${formData.nom}\n
        prenom: ${formData.prenom}\n
        dateNaissance: ${formData.dateNaissance}\n
        email: ${formData.email}\n
        region: ${formData.region}\n
        statutProfessionnel: ${formData.statutProfessionnel.join(", ")}\n
        etatMatrimonial: ${formData.etatMatrimonial}\n
        langagesChoisis: ${formData.langagesChoisis.join(", ")}\n `;

    dialog.showMessageBox({
        type: 'info',
        title: 'Formulaire validé',
        message: 'Données du formulaire',
        detail: message,
        buttons: ['OK'],
    })
});

// b-
ipcMain.on("focus-nom",(event) => {
    event.sender.send("apply-focus");
});