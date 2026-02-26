<template>
    <v-container>
        <v-card class="pa-6" max-width="600">
            <v-card-title>Inscription à la conférence</v-card-title>

            <v-form @submit="soumettreFormulaire" ref="form" :key="formKey">
                <v-tooltip location="top">
                    <template v-slot:activator="{ props }">  
                        <v-text-field v-model="formStore.nom" label="Nom complet" :rules="[r.obligatoire]" v-bind="props" />
                    </template>
                    <span>Saisissez votre nom complet</span>
                </v-tooltip>
               
                <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                        <v-text-field v-model="formStore.email" label="Adresse email" :rules="[r.obligatoire, r.email]" v-bind="props" />
                    </template>
                    <span>Format attendu: nom@domaine.com</span>
                </v-tooltip>
                

                <v-select v-model="formStore.niveau" label="Niveau d'expérience" 
                :items="['Débutant', 'Intermédiaire', 'Avancé']"
                :rules="[r.obligatoire]"
                hint="Le niveau d'experience est determine a titre indicatif" persistent-hint
                />

                <v-radio-group v-model="formStore.genre" label="Genre">
                    <v-radio label="Femme" value="F"/>
                    <v-radio label="Homme" value="M"/>
                </v-radio-group>

                <v-switch color="primary" v-model="formStore.newsletter" label="Recevoir les nouveautés par courriel"/>

                <v-btn color="primary" type="submit" class="mt-4">Soumettre</v-btn>
            </v-form>

            <v-snackbar v-model="snackbar" timeout="3000">
                Inscription réussie !
            </v-snackbar>

        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFormStore } from '../stores/formStore';

const formKey = ref(0); // Clé pour réinitialiser le formulaire

const formStore = useFormStore();

// non necessaire on utilise plutot les variables du store pinia
// const nom = ref("");
// const email = ref('');
// const niveau = ref('');
// const genre = ref('');
// const newsletter = ref(false);

const snackbar = ref(false);


const r= {
    
     obligatoire: (v:string) => !!v || 'Ce champ est obligatoire',

     email: (v:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Adresse courriel invalide',
};

function soumettreFormulaire() {

    // Validation du formulaire
    if (!formStore.isFormValid) {
        return;
    }
    
    console.log('Formulaire soumis:', {...formStore.formData});
    
    snackbar.value = true
    formStore.resetForm();
    formKey.value++; // Réinitialiser la clé pour forcer le re-render du formulaire
}
</script>
