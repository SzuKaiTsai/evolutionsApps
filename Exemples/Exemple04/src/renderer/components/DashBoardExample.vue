<template>
    <!-- https://vuetifyjs.com/en/styles/spacing/#usage -->
    <v-card class="ma-4 pa-4">
        <v-card-title>
            <v-row>
                <v-col cols="1">
                    <v-img src="../components/image/cards/dashboard.png" height="40" width="30"/>
                </v-col>
                <v-col cols="5" class="text-h5 font-weight-bold">
                    Tableau de bord réservations
                </v-col>
            </v-row>
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col cols="12" md="4">
                    <!-- https://vuetifyjs.com/en/styles/colors/#sass-color-pack -->
                    <v-card color="blue lighten-4" class="pa-4">
                        <v-icon size="40" color="white" class="mr-2">mdi-calendar</v-icon>
                        <div class="text-h6 mt-2">Réservation du jour: {{ rerservationsJour }}</div>
                        <v-chip class="ma-2" text-color="white">Voir les details</v-chip>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12" md="4">
                    <!-- https://vuetifyjs.com/en/styles/colors/#sass-color-pack -->
                    <v-card color="green lighten-4" class="pa-4">
                        <v-icon size="40" style="color: whitesmoke">mdi-chart-line</v-icon>
                        <div class="text-h6 mt-2">taux d'occupation 75%</div>
                        <v-chip class="ma-2" text-color="white">Voir les details</v-chip>
                        <v-progress-circular :model-value="75" color="warning" size="60"></v-progress-circular>
                    </v-card>
                </v-col>
            </v-row>

            <v-row class="mt-4">
                <v-col cols="12" md="4">
                    <!-- https://vuetifyjs.com/en/styles/colors/#sass-color-pack -->
                    <v-card color="orange lighten-4" class="pa-4">
                        <v-icon size="40" style="color: gold">mdi-bell</v-icon>
                        <div class="text-h6 mt-2" style="color: white">Notifications recentes: 3</div>
                        <v-chip class="ma-2" text-color="white">Voir les details</v-chip>
                    </v-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

import{ref} from 'vue'
const rerservationsJour = ref(12)

</script>