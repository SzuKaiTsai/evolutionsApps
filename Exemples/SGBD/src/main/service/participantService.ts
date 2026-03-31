import { Participant } from "../../common/participant";
import { ipcMain } from "electron";
import { DatabaseService } from "./databaseService";

export class ParticipantService{

    private db: DatabaseService;

    constructor() {
        this.db = new DatabaseService();
    }

    // Méthode pour initialiser la connexion à la base de données
    public async init(): Promise<void> {
        await this.db.connect();
    }

    // Récupérer tous les participants
    public async chargerParticipants(): Promise<Participant[]> {
        try {
          const query = `SELECT * FROM participant`;
          const rows = await this.db.query(query);
          return rows.map((row: any) => new Participant({
            matricule: row.matricule,
            prenom: row.prenom,
            nom: row.nom,
            genre: row.genre,
            niveau: row.niveau,
            email: row.email,
            isActif: row.isActif === 1 ? true : false
          }));
          
        } catch (error: any) {
          console.error('Erreur lors du chargement des participants:', error.message);
          throw error;
        }
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
    try {
      const query = `INSERT INTO participant (Matricule, Prenom, Nom, Genre, Niveau, Email, isActif) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const params = [participant.matricule, participant.prenom, participant.nom, participant.genre, participant.niveau, participant.email, participant.isActif ? 1 : 0];
      await this.db.execute(query, params);
    } catch (error: any) {      
      console.error('Erreur lors de l\'ajout du participant:', error.message);
    }
  }

  // Supprimer un participant
  public async supprimerParticipant(matricule: number): Promise<void> {
    try {
      const query = `DELETE FROM participant WHERE Matricule = ?`;
      const result = await this.db.execute(query, [matricule]);
      if (result.affectedRows === 0) {
        throw new Error(`Aucun participant trouvé avec le matricule ${matricule} pour suppression.`);
      }
    } catch (error: any) {
      console.error('Erreur lors de la suppression du participant:', error.message);
    }
   
  }


    // Modifier un participant existant
  public async modifierParticipant(updated: Partial<Participant>): Promise<void> {
    try {
      if (!updated.matricule) {
        throw new Error('Le matricule est requis pour modifier un participant.');
      }
      
      const query = `UPDATE participant SET Prenom = ?, Nom = ?, Genre = ?, Niveau = ?, Email = ?, isActif = ? WHERE Matricule = ?`;
      const params = [
        updated.prenom,
        updated.nom,
        updated.genre,
        updated.niveau,
        updated.email,
        updated.isActif ? 1 : 0,
        updated.matricule
      ];
      const result = await this.db.execute(query, params);

      if (result.affectedRows === 0) {
        throw new Error(`Aucun participant trouvé avec le matricule ${updated.matricule} pour modification.`);
      }

    } catch (error: any) {
      console.error('Erreur lors de la modification du participant:', error.message);
    }
      
  }


  // Méthode pour fermer la connexion à la base de données
  public async close(): Promise<void> {
    await this.db.disconnect();
  }
    
}
