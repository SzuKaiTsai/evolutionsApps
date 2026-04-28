import type { ICarteCredit } from "./ICarteCredit.js";

export abstract class CarteCreditFactory{
    protected abstract fabriquerCarte():ICarteCredit;

    public creerCarte():ICarteCredit{
        return this.fabriquerCarte();
    }
}