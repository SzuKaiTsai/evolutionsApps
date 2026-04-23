// interface de l'observateur du sujet(l'observable)
// a chaque modif de l'etat de l'observable, on informe l'observateur

export interface IObservateur{
    actualiser(): void;

}