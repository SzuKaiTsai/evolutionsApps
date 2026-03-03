<template>
  <v-container>
    <v-form @submit.prevent="submitForm" ref="formRef">
      <v-text-field v-model="..." label="Matricule" type="number" required />
      <v-text-field v-model="..." label="Prénom" required />
      <v-text-field v-model="..." label="Nom" required />

      <v-select
        v-model="..."
        :items="['M', 'F']"
        label="Genre"
        required
      />

      <v-select
        v-model="..."
        :items="['Débutant', 'Intermédiaire', 'Professionnel']"
        label="Niveau"
        required
      />

      <v-text-field v-model="..." label="Courriel" type="email" required />

      <v-switch v-model="..." label="Actif" />

      <v-btn type="submit" color="primary">Ajouter</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
...
...

const store = ...
const formRef = ref()

const newParticipant = ref<Participant>({
  matricule: 0,
  prenom: '',
  nom: '',
  genre: '',
  niveau: '',
  email: '',
  isActif: true,
})

... {
  try {
    
    const result = ...
    
    if (...) {

	  ...({
        type: "info",
        title: "Ajout",
        message: `...`,
      });

      ... = {
        matricule: 0,
        prenom: '',
        nom: '',
        genre: '',
        niveau: '',
        email: '',
        isActif: true,
      }

      formRef.value?.reset()
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du participant:', error)
  }
}
</script>

<style scoped>
</style>
