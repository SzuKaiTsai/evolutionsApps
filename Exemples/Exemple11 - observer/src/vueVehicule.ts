// classe VueVehicule implemente l'interface de IObservateur
import type { IObservateur } from "./IObservateur.js";
import { Vehicule } from "./vehicule.js";


export class VueVehicule implements IObservateur{
    private vehicule: Vehicule;
    private texte: string = "";


    constructor(v: Vehicule) {
        this.vehicule = v;
        v.ajouter(this); // ajouter un nouvel observateur pour Vehicule
        this.actualiser();
    }

    public actualiser(): void {
        this.texte = `description: ${this.vehicule.Description}, Prix: ${this.vehicule.Prix}`
    }

    public afficher():void{
        console.log(this.texte)
    }
}