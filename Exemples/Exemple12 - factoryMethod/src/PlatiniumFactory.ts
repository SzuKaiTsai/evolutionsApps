import { CarteCreditFactory } from "./CarteCreditFactory.js";
import type { ICarteCredit } from "./ICarteCredit.js";
import { Platinium } from "./Platinium.js";

export class PlatiniumFactory extends CarteCreditFactory{
    protected fabriquerCarte(): ICarteCredit {
        const ccPlatinium = new Platinium();
        return ccPlatinium;
    }
}