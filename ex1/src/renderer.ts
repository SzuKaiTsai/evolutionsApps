console.log('renderer est pret');

// Ecouteur d'event qui s'assure que le DOM est completement charge avant d'exec le code.
document.addEventListener('DOMContentLoaded', ()=> {
    console.log('Electron est pret');
});

// clic sur le bouton 'bonjourBtn' affice une fenetre d'alerte
document.getElementById('bonjourBtn')?.addEventListener('click', () => {
    alert('Bonjour depuis le renderer process.');
    console.log('bonjour depuis le renderer process');
});