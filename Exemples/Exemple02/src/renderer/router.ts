import { createRouter, createWebHashHistory } from "vue-router";

// importation de la page d'accueil et de la page Form
import Home from "./components/Home.vue";
import Form from "./components/Form.vue";

const routes = [
     //Definition de la route vers la page d'accueil
    {path: '/', component: Home},
    {path: '/form', component: Form}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// exportation du router pour l'utiliser dans l'app
export default router;