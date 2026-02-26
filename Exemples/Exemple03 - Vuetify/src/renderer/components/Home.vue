<template>
    <v-app>
        <v-app-bar app color="primary" light elevation="10">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Exemple Vuetify - Evolution des applications</v-toolbar-title>
        </v-app-bar>
        
        <!-- menu lateral -->
        <v-navigation-drawer app v-model="drawer" temporary width="185" color="greenlighten-4">
            <v-list>
                <v-list-item title="Accueil" prepend-icon="mdi-home" @click="openAccueil"/>
                <v-list-item title="Profile" prepend-icon="mdi-account"/>
                <v-list-item title="Paramètres" prepend-icon="mdi-cog"/>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container>
                <v-tabs v-model="tab" bg-color="secondary" dark grow>
                    <v-tab value="dashboard">Tableau de bord</v-tab>
                    <v-tab value="form">Formulaire</v-tab>
                    <v-tab value="vdatatable">Tableau de données</v-tab>
                    <v-tab value="todo">Taches</v-tab>
                    <v-tab value="profile">Profil</v-tab>
                    <v-tab value="loadfile">Charger fichier</v-tab>
                </v-tabs>

                <!-- Contenu dynamique selon l'onglet selectionne-->
                <v-window v-model="tab" class="mt-4">
                    <v-window-item value="dashboard"> <DashBoardExample v-if="tab==='dashboard'"/> </v-window-item>
                    <v-window-item value="form"> <FormExample v-if="tab==='form'"/> </v-window-item>
                    <v-window-item value="vdatatable"> <DataTableExample v-if="tab==='vdatatable'"/> </v-window-item>
                    <v-window-item value="todo"> <TodoExample v-if="tab==='todo'"/> </v-window-item>
                    <v-window-item value="profile"> <ProfileExample v-if="tab==='profile'"/> </v-window-item>
                    <v-window-item value="loadfile"> <ChargerFichier v-if="tab==='loadfile'"/> </v-window-item>
                </v-window>

            </v-container>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTableExample from './DataTableExample.vue';
import DashBoardExample from './DashBoardExample.vue';
import FormExample from './FormExample.vue';
import ProfileExample from './ProfileExample.vue';
import TodoExample from './TodoExample.vue';
import ChargerFichier from './ChargerFichier.vue';

const drawer = ref(true);

function openAccueil(){
    window.api.send('open-accueil', "Accueil");
};

const tab = ref('dashboard');

// export default {
//     methods: {
//         openFormWindow() {
//             // Ouverture d'une nouvelle fenêtre pour le formulaire d'inscription
//             window.api.send('open-form-window', "Ouvrir le formulaire d'inscription");
//         },
//     }
// }
</script>