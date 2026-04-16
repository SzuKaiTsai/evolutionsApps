import mysql, { Connection } from 'mysql2/promise';

export class DatabaseService {
  private connection: Connection | null = null;

  private readonly config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestionparticipants',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

    // Méthode pour établir la connexion à la base de données
    public async connect(): Promise<void> {
        if (!this.connection) {
            try {
                this.connection = await mysql.createConnection(this.config);
                console.log('Connexion à la base de données réussie');
            } catch (error) {
                console.error('Erreur de connexion à la base de données:', error);
                throw error;
            }
        }
    }

    // Méthode pour fermer la connexion à la base de données
    public async disconnect(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.end();
                console.log('Connexion à la base de données fermée');
            } catch (error) {
                console.error('Erreur lors de la fermeture de la connexion à la base de données:', error);
                throw error;
            }
        }
    }

    // Méthode pour exécuter une requête SQL
    public async query(sql: string, params?: any[]): Promise<any[]> {
        if (!this.connection) {
            throw new Error('Connexion à la base de données non établie');
        }
        try {
            const [rows] = await this.connection.execute(sql, params);
            return rows as any[];
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête SQL:', error);
            throw error;
        }
    }

    // Méthode pour opérations CRUD (INSERT, UPDATE, DELETE)
    public async execute(sql: string, params?: any[]): Promise<{ affectedRows: number; insertId?: number }> {

        if (!this.connection) {
            throw new Error('Connexion à la base de données non établie');
        }
        try {
            const [result] = await this.connection.execute(sql, params);
            return {
                affectedRows: (result as any).affectedRows,
                insertId: (result as any).insertId
            };
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la requête SQL:', error);
            throw error;
        }

    }


    // Méthode pour verifier si la connexion est établie
    public isConnected(): boolean {
        return this.connection !== null;
    }

    // Méthode pour obtenir la configuration actuelle de la BD
    public getConfig() {
        return { ...this.config };
    }

    // // Méthode pour lire les participants depuis la base de données
    // public async lireParticipants(): Promise<any[]> {
    //     const sql = 'SELECT * FROM participant';
    //     return await this.query(sql);
    // }

    // // Méthode pour ajouter un participant à la base de données
    // public async ajouterParticipant(participant: any): Promise<void> {
    //     const sql = 'INSERT INTO participant (nom, prenom, email) VALUES (?, ?, ?)';
    //     const params = [participant.nom, participant.prenom, participant.email];
    //     await this.query(sql, params);
    // }

    // // Méthode pour supprimer un participant de la base de données
    // public async supprimerParticipant(id: number): Promise<void> {
    //     const sql = 'DELETE FROM participant WHERE id = ?';
    //     const params = [id];
    //     await this.query(sql, params);
    // }



}