export class Auto {
    // variable statique de type auto
    private static instance: Auto | null = null

    // constructeur prive
    private constructor(){}

    // methode statique pour instancier un seul objet auto dans l'exec
    public static getInstance(): Auto {
        // si on n'a pas encore d'instance, on en cree une
        if (this.instance === null) {
            this.instance = new Auto()
        }
        // on retourne l'instance existante ou nouvellement creee
        return this.instance
    }
}