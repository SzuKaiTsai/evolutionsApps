//app: represente l'app Electron, elle gere le cycle de vie de l'application (demarrage, ouverture de la fenetre, fermeture, etat(app.whenReady()))
//BrowserWindow: class qui cree la fenetre native dans laquelle sera chargee la page web.
// nativeImage et Tray pour afficher une iconedans la zone de notification
import {app, BrowserWindow, nativeImage, Tray} from 'electron'

// importer le module path de Node.js. EX: manipuler les fichiers pour charger les pages web dans la fenetre.
import path from 'path';

let win: BrowserWindow | null = null;
let childWindow: BrowserWindow | null = null;

const createWindow = () => {
    //Instanciation de la fenetre
    win = new BrowserWindow({
            width: 800,
            height:600,

            minWidth:500,
            minHeight:500,

            maxWidth:1200,
            maxHeight:650,

            resizable:true,

            transparent:false,

            frame:true,
            backgroundColor:'rgba(172, 216, 136, 0.33)',

            icon: path.join(__dirname, 'assets/pomme.ico'),

            webPreferences:{
                // true pour le moment mais risque car on autorise l'access aux API Node.js dans les pages web.
                nodeIntegration: true
            }
        });


        //affiche une icone dans la zone de notif
        const iconPath = path.join(__dirname, 'assets/pomme.ico');
        const trayIcon = nativeImage.createFromPath(iconPath);
        const tray = new Tray(trayIcon);
        tray.setToolTip('Affichage avec try');

        //Charge le fichier HTML dans la fenetre cree
        win.loadFile(path.join(__dirname, '../index.html'))
};

// Lorsque l'environnement est pret
app.whenReady().then(()=>{

    // Instanciation de la fenetre splash
    const splash = new BrowserWindow({
        width: 400,
        height: 300,
        frame: false,
        transparent: true,
        alwaysOnTop: true,

    });

    // chargement du fichier html dans la fenetre 
    splash.loadFile(path.join(__dirname, '../splash.html'));

    setTimeout(()=>{
        splash.close();
        
        createWindow();

        if(win){
            childWindow = new BrowserWindow({
                width:400,
                height:300,
                title: 'fenetre enfant',
                parent: win,
                modal: true, //fenetre modale = impossible d'utiliser les autres fenetres lorsqu'elle est ouverte.
                show: false,
                webPreferences:{
                    nodeIntegration: true,

                },
            });
            childWindow.loadURL('data:text/html,<head><meta charset="UTF-8"></head><body><h2> fenetre enfant modale</h2><p>ceci est une fenetre enfant modale</p></body>')

            //on l'affiche une fois prete
            childWindow.once('ready-to-show', () => {
                if(childWindow) childWindow.show();
            })
        }

    }, 5000);
})