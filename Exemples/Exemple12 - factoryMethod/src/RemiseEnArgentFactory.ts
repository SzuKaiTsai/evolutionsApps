import { CarteCreditFactory } from "./CarteCreditFactory.js";
import type { ICarteCredit } from "./ICarteCredit.js";
import { RemiseEnArgent } from "./RemiseEnArgent.js";

export class RemiseEnArgentFactory extends CarteCreditFactory{
    protected fabriquerCarte(): ICarteCredit {
        const ccRemiseEnArgent = new RemiseEnArgent();
        return ccRemiseEnArgent;
    }
}