import { Participant } from "../../common/participant";
import { promises as fs } from 'fs';
import path from 'path';
import { ipcMain, app } from 'electron';

export class ParticipantService {
    private participantsFilePath : string;

    constructor() {
        const dataDir = path.join(app.getAppPath(), 'data');
        this.participantsFilePath = path.join(dataDir, 'participants.json');
    }


    private async lireParticipants(): Promise<Participant[]> {
        try {
            const data = await fs.readFile(this.participantsFilePath, 'utf-8');
            const participants = JSON.parse(data);
            return participants.map((p: any) => new Participant(p));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                // Si le fichier n'existe pas, retourner une liste vide
                console.warn(`Fichier ${this.participantsFilePath} non trouvé. Création d'une liste vide.`);
                return [];
            }
            throw error;
        }
    }

    // Méthode pour charger les participants, utilisée par le renderer process via IPC
    public async chargerParticipants(): Promise<Participant[]> {
        return await this.lireParticipants();
    }

    public registerIpcHandlers(): void {
        ipcMain.handle('Canal-ChargerParticipants', async () => {
            return await this.chargerParticipants();
        });
    }

}