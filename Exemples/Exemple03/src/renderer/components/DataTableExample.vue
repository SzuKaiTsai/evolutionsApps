<template>
    <v-data-table :header="headers" :items="desserts" :items-per-page="10" show-select v-model="selected" return-object>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Liste des desserts</v-toolbar-title>
            </v-toolbar>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const selected = ref([]);
const headers = [
    { title: 'Dessert (100g)', key: 'name', sortable: true },
    { title: 'Calories', key: 'calories', sortable: true },
    { title: 'Gras (g)', key: 'fat' }
];
const desserts = [
    { name: 'Gâteau au chocolat', calories: 450, fat:25 },
    { name: 'Tarte aux pommes', calories: 320, fat:15 },
    { name: 'Crème brûlée', calories: 380, fat:20 },
    { name: 'Glace à la vanille', calories: 210, fat:10 },
    { name: 'Cheesecake', calories: 500, fat:30 },
    { name: 'Mousse au chocolat', calories: 420, fat:25 },
    { name: 'Tiramisu', calories: 350, fat:18 },
    { name: 'Pavlova', calories: 300, fat:12 },
    { name: 'Éclair au café', calories: 400, fat:22 },
    { name: 'Macaron', calories: 150, fat:8 },
    { name: 'Crêpe au Nutella', calories: 280, fat:14 },
    { name: 'Brownie', calories: 450, fat:28 },
    { name: 'Flan', calories: 200, fat:9 },
    { name: 'Gaufre', calories: 350, fat:20 },
    { name: 'Tarte au citron', calories: 320, fat:18 }
];

</script>