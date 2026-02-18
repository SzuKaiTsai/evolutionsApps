"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app: represente l'app Electron, elle gere le cycle de vie de l'application (demarrage, ouverture de la fenetre, fermeture, etat(app.whenReady()))
//BrowserWindow: class qui cree la fenetre native dans laquelle sera chargee la page web.
// nativeImage et Tray pour afficher une iconedans la zone de notification
const electron_1 = require("electron");
// importer le module path de Node.js. EX: manipuler les fichiers pour charger les pages web dans la fenetre.
const path_1 = __importDefault(require("path"));
let win = null;
let childWindow = null;
const createWindow = () => {
    //Instanciation de la fenetre
    win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 500,
        minHeight: 500,
        maxWidth: 1200,
        maxHeight: 650,
        resizable: true,
        transparent: false,
        frame: true,
        backgroundColor: 'rgba(172, 216, 136, 0.33)',
        icon: path_1.default.join(__dirname, 'assets/pomme.ico'),
        webPreferences: {
            // true pour le moment mais risque car on autorise l'access aux API Node.js dans les pages web.
            nodeIntegration: true
        }
    });
    //affiche une icone dans la zone de notif
    const iconPath = path_1.default.join(__dirname, 'assets/pomme.ico');
    const trayIcon = electron_1.nativeImage.createFromPath(iconPath);
    const tray = new electron_1.Tray(trayIcon);
    tray.setToolTip('Affichage avec try');
    //Charge le fichier HTML dans la fenetre cree
    win.loadFile(path_1.default.join(__dirname, '../index.html'));
};
// Lorsque l'environnement est pret
electron_1.app.whenReady().then(() => {
    // Instanciation de la fenetre splash
    const splash = new electron_1.BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
    });
    // chargement du fichier html dans la fenetre 
    splash.loadFile(path_1.default.join(__dirname, '../splash.html'));
    setTimeout(() => {
        splash.close();
        createWindow();
        if (win) {
            childWindow = new electron_1.BrowserWindow({
                width: 400,
                height: 300,
                title: 'fenetre enfant',
                parent: win,
                modal: true, //fenetre modale = impossible d'utiliser les autres fenetres lorsqu'elle est ouverte.
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                },
            });
            childWindow.loadURL('data:text/html,<head><meta charset="UTF-8"></head><body><h2> fenetre enfant modale</h2><p>ceci est une fenetre enfant modale</p></body>');
            //on l'affiche une fois prete
            childWindow.once('ready-to-show', () => {
                if (childWindow)
                    childWindow.show();
            });
        }
    }, 5000);
});
