import { Auto } from "./auto.js"
import { Calcul } from "./calcul.js";

class Program{
    public static main(): void {
        const s1 = Auto.getInstance() // instanciation d'un objet de type auto
        const s2 = Auto.getInstance() // pas d'instanciation on retourne l'objet deja cree

        if (s1 === s2) {
            console.log("Les deux variables font référence au même objet");
            console.log("s1:", s1);
            console.log("s2:", s2);
        } else {
            // ne devrait pas ce produire car le patron singleton garantit qu'il n'y a qu'une seule instance de la classe Auto
            console.log("Les deux variables font référence à des objets différents");
            console.log("s1:", s1);
            console.log("s2:", s2);
        }

        Calcul.Instance.valeur1 = 12;
        Calcul.Instance.valeur2 = 7.5

        console.log(`${Calcul.Instance.addition()}`)
        console.log(`${Calcul.Instance.soustraction()}`)
    }
}

// exec
Program.main()