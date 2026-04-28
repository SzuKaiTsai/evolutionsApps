import type { ICarteCredit } from "./ICarteCredit.js";

export class RemiseEnArgent implements ICarteCredit{

    public getTypeCarte(): string{
        return "Remise en argent";
    }
    public getLimitCredit():number{
        return 1000;
    }
    public getChargeAnnuelle():number{
        return 20;
    }
}