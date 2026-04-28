import type { ICarteCredit } from "./ICarteCredit.js";
import { RemiseEnArgentFactory } from "./RemiseEnArgentFactory.js";
import { PlatiniumFactory } from "./PlatiniumFactory.js";

function main():void{
    console.log("Création de la 1ere carte de crédit\n(Remise en argent)")
    const ccRemiseEnArgent: ICarteCredit = new RemiseEnArgentFactory().creerCarte();

    if(ccRemiseEnArgent!=null){
        console.log("\nType: " + ccRemiseEnArgent.getTypeCarte() + "\nLimite: " + ccRemiseEnArgent.getLimitCredit() + "\nCharge: " + ccRemiseEnArgent.getChargeAnnuelle())
    }

    console.log("\nCréation de la 2e carte de crédit\n(Platinium)")
    const ccPlatinium: ICarteCredit = new PlatiniumFactory().creerCarte();

    if(ccPlatinium!=null){
        console.log("\nType: " + ccPlatinium.getTypeCarte() + "\nLimite: " + ccPlatinium.getLimitCredit() + "\nCharge: " + ccPlatinium.getChargeAnnuelle())
    }
}

main();