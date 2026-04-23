// classe abstraite du sujet(l'observable)
// 

import type { IObservateur } from "./IObservateur.js";

export abstract class Sujet{

    private Observateurs: IObservateur[] = [];

    public ajouter(observateur: IObservateur): void{
        this.Observateurs.push(observateur);
    }

    public retirer(observateur: IObservateur): void{
        this.Observateurs = this.Observateurs.filter(obs => obs !== observateur);
    }
    
    public notifier(): void{
        for(const ob of this.Observateurs){
            ob.actualiser();
        }
    }

}