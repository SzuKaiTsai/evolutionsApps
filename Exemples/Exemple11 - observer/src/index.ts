import { VueVehicule } from "./vueVehicule.js"
import { Vehicule } from "./vehicule.js"

function main():void{
    const v = new Vehicule();
    const vue = new VueVehicule(v);

    v.Description = "voiture de sport";
    v.Prix = 100000;

    vue.afficher();

    v.Prix = 90000;

    vue.afficher();
}

main();