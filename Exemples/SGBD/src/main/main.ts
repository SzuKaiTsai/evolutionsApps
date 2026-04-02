import {app, BrowserWindow, ipcMain, dialog} from 'electron';
import path from 'path';
import { ParticipantService } from './service/participantService'

import { Participant } from '@/common/participant';

// Déclaration de la fenêtre principale
// nul indique que la fenêtre n'est pas encore créée
let mainWindow: BrowserWindow | null = null;
let modifWindow: BrowserWindow | null = null;
let selectedParticipantForModif: Participant | null = null;

let participantService: ParticipantService;



app.on('ready', async () => {

  participantService = new ParticipantService()
  try{
    await participantService.init() // Initialiser le service avant de créer la fenêtre
    console.log('Service des participants initialisé avec la BD')
  } catch (error: any) {
    console.error('Erreur lors de l\'initialisation du service :', error)
    dialog.showErrorBox('Erreur d\'initialisation', 'Une erreur est survenue lors de l\'initialisation du service de participants. Veuillez vérifier la console pour plus de détails.')
    app.quit() // Quitter l'application si le service ne peut pas être initialisé
    return
  }

    mainWindow = new BrowserWindow({
        width: 950,
        height: 760,
        autoHideMenuBar: true, // Masquer la barre de menu
        show:false,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'), // Utilisation d'un chemin absolu
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

  // Ceci est une fonction qui attend que la fenêtre soit prête à être affichée avant de l'afficher
  mainWindow?.once('ready-to-show', () => {
    mainWindow?.show()
  });

  // Ceci est une fonction qui attend que le contenu soit complètement chargé avant d'afficher la fenêtre
  mainWindow?.webContents.on('did-finish-load', () => {
    mainWindow?.show()
  });

    mainWindow.loadURL('http://localhost:5173'); // URL de l'application Vue.js
});

app.on('before-quit', async ()=> {
  if (participantService) {
    await participantService.close() // Fermer la connexion à la BD avant de quitter l'application
    console.log('Connexion à la BD fermée')
  }
});

ipcMain.on('ajouter-participant', () => {
  const ajoutWindow = new BrowserWindow({
    width: 550,
    height: 700,
    title: "Nouveau participant",
    modal: true,
    parent: mainWindow || undefined, // Associer la fenêtre modale à la fenêtre principale
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
    },
  });

  // Ceci est une fonction qui attend que la fenêtre soit prête à être affichée avant de l'afficher
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
  ajoutWindow?.once('ready-to-show', () => {
    ajoutWindow?.show()
  });

  // Ceci est une fonction qui attend que le contenu soit complètement chargé avant d'afficher la fenêtre
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
  ajoutWindow?.webContents.on('did-finish-load', () => {
    ajoutWindow?.show()
  });

  // Charge la route Vue dans la nouvelle fenêtre
  ajoutWindow.loadURL('http://localhost:5173/#/ajouterParticipant')
});

ipcMain.on('modifier-participant', (event, participant: Participant) => {
  // Stocker le participant sélectionné pour le passer à la fenêtre de modification
  selectedParticipantForModif = participant;

  const modifWindow = new BrowserWindow({
    width: 550,
    height: 700,
    title: "Modifier un participant",
    modal: true,
    parent: mainWindow || undefined, // Associer la fenêtre modale à la fenêtre principale
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
    },
  });

  // Ceci est une fonction qui attend que la fenêtre soit prête à être affichée avant de l'afficher
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
    modifWindow?.once('ready-to-show', () => {
    modifWindow?.show()
    // Envoyer le participant à la fenêtre après qu'elle soit prête
    if (modifWindow && selectedParticipantForModif) {
      modifWindow.webContents.send('selected-participant', selectedParticipantForModif)
    }
  });

  // Ceci est une fonction qui attend que le contenu soit complètement chargé avant d'afficher la fenêtre
  // Pour qu'il n'y ait pas d'écran blanc avant le chargement complet de la vue
  modifWindow?.webContents.on('did-finish-load', () => {
    modifWindow?.show()
  });

  // Charge la route Vue dans la nouvelle fenêtre
  modifWindow.loadURL('http://localhost:5173/#/modifierParticipant')
});

// Communication entre le processus principal et le processus de rendu
ipcMain.on('message-channel', (event, arg)=> {
    console.log('Message reçu :', arg);
    event.reply('message-channel', 'Réponse du main process');
});




ipcMain.handle('Canal-ChargerParticipants', async () => {
  try
  {
    const data = await participantService.chargerParticipants()
    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('Canal-AjouterParticipant', async (event, participant: Participant) => {
  try {
    await participantService.ajouterParticipant(participant)

    // Notifier la fenêtre principale (Home) qu'un nouveau participant a été ajouté
    // pour que son store se mette à jour en temps réel
    if (mainWindow) {
      mainWindow.webContents.send('participant-added', participant)
    }
    return { success: true, data: participant }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})

// Pour afficher une boîte de dialogue depuis le main process
ipcMain.handle("showMessageBox", async (event, options) => {
  return dialog.showMessageBox(options);
});


ipcMain.handle('Canal-SupprimerParticipant', async (_event, matricule) => {
  try {
    await participantService.supprimerParticipant(matricule)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})


ipcMain.handle('Canal-ModifierParticipant', async (_event, updatedParticipant: Participant) => {
  try {
    await participantService.modifierParticipant(updatedParticipant)
    // Notifier la fenêtre principale qu'un participant a été modifié
    if (mainWindow) {
      // Convertir en plain object pour éviter les erreurs de sérialisation
      const plainParticipant = JSON.parse(JSON.stringify(updatedParticipant))
      mainWindow.webContents.send('participant-modified', plainParticipant)
    }
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})

