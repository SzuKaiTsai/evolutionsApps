import { Participant } from "../../common/participant";
import { ipcMain, app } from "electron";
import { promises as fs } from 'fs';
import path from 'path';

export class ParticipantService{

    private participantsFilePath: string;

    constructor() {
        // Calculer le chemin vers le fichier participants.json
        // En développement: depuis le répertoire racine du projet
        // En production: depuis le répertoire userData d'Electron
        const dataDir = path.join(app.getAppPath(), 'data');
        this.participantsFilePath = path.join(dataDir, 'participants.json');
    }

    // Méthode privée pour lire le fichier JSON
    private async lireParticipants(): Promise<Participant[]> {
        try {
            const data = await fs.readFile(this.participantsFilePath, 'utf-8');
            const participants = JSON.parse(data);
            return participants.map((p: any) => new Participant(p));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                // Si le fichier n'existe pas, retourner un tableau vide
                console.warn(`Fichier ${this.participantsFilePath} introuvable, retour d'un tableau vide`);
                return [];
            }
            throw error;
        }
    }

    // Récupérer tous les participants
    public async chargerParticipants(): Promise<Participant[]> {
        return await this.lireParticipants();
    }


  // Enregistrer les canaux IPC dans le processus principal (main) pour permettre 
  // au renderer (Vue.js + Pinia) de communiquer avec le main (Electron + service + accès fichier + DB) 
  public registerIpcHandlers(): void {
    ipcMain.handle('Canal-ChargerParticipants', async () => {
      return await this.chargerParticipants()
    })
  }
   
  // Ajout un participant
  public async ajouterParticipant(participant: Participant): Promise<void> {
    const participants = await this.lireParticipants();
    participants.push(participant);
    await this.ecrireParticipants(participants);
  }

  // Méthode privée pour écrire dans le fichier JSON
  private async ecrireParticipants(participants: Participant[]): Promise<void> {
    const jsonData = JSON.stringify(participants, null, 2);
    await fs.writeFile(this.participantsFilePath, jsonData, 'utf-8');
  }

  // Supprimer un participant
  public async supprimerParticipant(matricule: number): Promise<void> {

    const participants = await this.lireParticipants();
    const index = participants.findIndex(p => p.matricule === matricule)

    if (index !== -1) {
      participants.splice(index, 1);
      await this.ecrireParticipants(participants);
    } else {
      throw new Error(`Participant avec matricule ${matricule} introuvable`)
    }
  }


    // Modifier un participant existant
  public async modifierParticipant(updated: Partial<Participant>): Promise<void> {
    
      const participants = await this.lireParticipants();

      const index = participants.findIndex(p => p.matricule === updated.matricule)
    if (index !== -1) {
      participants[index] = { ...participants[index], ...updated }
      await this.ecrireParticipants(participants);
    } else {
      throw new Error(`Participant avec matricule ${updated.matricule} introuvable`)
    }
  }


    
}
