import type { ICarteCredit } from "./ICarteCredit.js";

export class Platinium implements ICarteCredit{

    public getTypeCarte(): string{
        return "Platinium";
    }
    public getLimitCredit():number{
        return 5000;
    }
    public getChargeAnnuelle():number{
        return 100;
    }
}