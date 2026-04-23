export class Calcul{
    private static instance : Calcul | null = null

    public valeur1: number = 0
    public valeur2: number = 0

    private constructor(){}

    public static get Instance(): Calcul {
        if (this.instance === null) {
            this.instance = new Calcul()
        }
        return this.instance
    }
    
    public addition():number{
        return this.valeur1 + this.valeur2
    }
    
    public soustraction():number{
        return this.valeur1 - this.valeur2
    }

}