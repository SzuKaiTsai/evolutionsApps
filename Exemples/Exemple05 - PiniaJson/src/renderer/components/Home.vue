<template>
  <v-app>

    <!-- Barre de navigation supérieure -->
    <v-app-bar app color="primary" dark elevation="10">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Gestion d’état avec Pinia et persistence de données avec JSON</v-toolbar-title>
    </v-app-bar>

    <!-- Menu latéral -->
    <v-navigation-drawer app v-model="drawer" temporary width="200" color="green lighten-4" elevation="10">
      <!-- Contenu du menu vertical -->
       <v-list>
         <v-list-item title="Accueil" prepend-icon="mdi-home" @click="openAccueil"></v-list-item>
       </v-list>
    </v-navigation-drawer> 

    <v-main>
      <v-container>
        <v-data-table :items="participants" :headers="headers" item-value="matricule" class="lignes-alternance" show-expand
        @click:row="(event: MouseEvent, row: {item: Participant}) => handleRowClick(row.item)">
            <template v-slot:item.niveau="{ item }">
              <v-select 
              v-model="item.niveau" 
              :items="['Débutant', 'Intermédiaire', 'Professionnel']" 
              density="compact" 
              variant="outlined" 
              hide-details disabled class="disabled-black">
                
              </v-select>
            </template>

            <template v-slot:expanded-row="{ item }">
              <td :colspan="headers.length">
                <div>
                  <strong>Email:</strong> {{ item.email }} <br>
                  <strong>Actif:</strong>
                  <img :src="item.isActif ? '../components/images/active.png' : '../components/images/inactive.png'" :alt="item.isActif ? 'Actif' : 'Inactif'" width="30" height="30">
                </div>
              </td>
            </template>

        </v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

// importer la fonction ref pour créer une référence réactive
import { ref, onMounted,computed } from 'vue'

import { useParticipantStore } from '../stores/participantStores';

import { Participant } from "../../common/participant";

// initiliser une variable réactive pour contrôler l'ouverture ou la fermeture du menu latéral
const drawer = ref(true);

const store = useParticipantStore();

const headers = ref([
  { title: 'Matricule', value: 'matricule' },
  { title: 'Nom', value: 'nom' },
  { title: 'Prénom', value: 'prenom' },
  { title: 'Genre', value: 'genre' },
  { title: 'Niveau', value: 'niveau' },

]);

const participants = computed(() => store.participants);

onMounted( async() => {
  await store.chargerParticipants();
});

function handleRowClick(participant: Participant) {
  console.log("Participant sélectionné:", participant);
}

function openAccueil() {
  window.api.send('open-accueil', "Accueil");
}


</script>

<style scoped>
.lignes-alternance :deep(tbody tr:nth-child(odd)) {
  background-color: #546c7a;
}
.lignes-alternance :deep(tbody tr:nth-child(even)) {
  background-color: #8696a8;
}

.disabled-black :deep(.v-field--disabled){
  color: black;
  opacity: 1;
}
</style>