import { createApp } from 'vue';

import App from './App.vue';

createApp(App).mount('#app');

const appInfoElement = document.createElement('div');
const taskButton = document.createElement('button');
const resultElement = document.createElement('div');
const calculatorElement = document.createElement('div');

// Configuration de l'UI

taskButton.textContent = 'Exécuter la tâche';
document.body.append(appInfoElement, taskButton, resultElement, calculatorElement);

// Exemple a. Demander d'avoir les informations de l'application.
// Le renderer appelle la fonction exposée par le preload
const info = window.electronAPI.getAppInfo();

appInfoElement.innerHTML = `
<h2>Informations sur l'application </h2>
<p> Nom: ${info.name}</p>
<p> Version: ${info.version}</p>
<p> Plateforme: ${info.plateform}</p>
`;


// Exemple b. Demander de réaliser une tâche
taskButton.addEventListener('click', () => {
    window.electronAPI.performTask({ action: 'Executer une tâche', payload: 'test'});
});

// Le renderer se met à l'écoute de la réponse du main process. Quand il répond, on met l'UI à jour
window.electronAPI.onTaskResult(result => {
    resultElement.textContent = `Résultat de la tâche : ${JSON.stringify(result)}`;
});

// Exemple c. calculatrice
document.getElementById("add")!.addEventListener("click", async() => {
    const a = parseInt((document.getElementById('a') as HTMLInputElement).value, 10);
    console.log("Valeur de a: " + a);

    const b = parseInt((document.getElementById('b') as HTMLInputElement).value, 10);
    console.log("Valeur de b: " + b);

    const somme = await window.electronAPI.calculate(a, b);

    console.log("Resultat: " + somme);
    (document.getElementById("result") as HTMLInputElement)!.value = "Resultat: " + somme;

})