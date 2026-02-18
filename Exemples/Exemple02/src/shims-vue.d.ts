declare module '*.vue'{
    import { DefineComponent } from "vue";

    // declaration d'un composant vue generique
    const component: DefineComponent<{}, {}, any>;

    // exportation du composant pour l'utilisation dnas les fichiers ts
    export default component;

}