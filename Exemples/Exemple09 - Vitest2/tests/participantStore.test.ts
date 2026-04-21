import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { Participant, Genre, Niveau } from '../src/common/participant'
import { useParticipantStore } from '../src/renderer/stores/participantStore'

// Déclaration global pour dire a Typescript que l'objet window possede une propriété api
declare global {
    interface Window {
        api: any
    }
}

describe('participantStore', () => {
    
    //Donnees de test partagees entre les tests
    let participants: Participant[]

    beforeEach(() => {

        // Crée un Mock Global de window.api avant chaque test
        global.window = global.window || {} as any; // Assure que window existe
        (global.window as any).api = {
            send: vi.fn(), // Mock de la méthode send
            on: vi.fn(), // Mock de la méthode receive
            once: vi.fn(), // Mock de la méthode once
            ajouterParticipant: vi.fn(), // Mock de la méthode ajouterParticipant
            chargerParticipants: vi.fn(), // Mock de la méthode chargerParticipants
            modifierParticipant: vi.fn(), // Mock de la méthode modifierParticipant
            supprimerParticipant: vi.fn(), // Mock de la méthode supprimerParticipant
            showMessageBox: vi.fn() // Mock de la méthode showMessageBox
        }



        // Initialiser Pinia avant chaque test
        setActivePinia(createPinia())

        // Créer un jeu de données de test avant chaque test
        participants = [
            new Participant({
                matricule: 1,
                prenom: 'Alice',
                nom: 'Tremblay',
                genre: 'F' as Genre,
                niveau: 'Débutant' as Niveau,
                email: 'alice@example.com',
                isActif: true
            }),
            new Participant({
                matricule: 2,
                prenom: 'Bob',
                nom: 'Gagnon',
                genre: 'M' as Genre,
                niveau: 'Intermédiaire' as Niveau,
                email: 'bob@example.com',
                isActif: true
            }),
            new Participant({
                matricule: 3,
                prenom: 'Charlie',
                nom: 'Dubois',
                genre: 'M' as Genre,
                niveau: 'Professionnel' as Niveau,
                email: 'charlie@example.com',
                isActif: false
            }),
            new Participant({
                matricule: 4,
                prenom: 'Diana',
                nom: 'Leblanc',
                genre: 'F' as Genre,
                niveau: 'Débutant' as Niveau,
                email: 'diana@example.com',
                isActif: true
            })
        ]

    })

    // Test le fonctionnement du getter participantactifs
    describe('getter participantActifs', () => {
        it('devrait retourner uniquement les participants actifs', () => {
            const store = useParticipantStore()

            store.participants = participants

            // Appel au getter
            const actifs = store.participantsActifs

            // Assertions
            expect(actifs).toHaveLength(3) // devrait fonctionner car nous avons 3 participants actifs dans notre jeu de données de test
            expect(actifs.every(p => p.isActif)).toBe(true)

            
            expect(actifs.find(p => p.matricule === 3)).toBeUndefined() // le participant n'est pas actif
            expect(actifs.map(p => p.matricule)).toEqual([1, 2, 4]) // on verifie que ces matricules sont bien actifs
        })
    })

    // Tester l'ajout d'un participant en utilisant la simulation de l'API avec un Mock vi de Vitest
    it('Ajouter participant', async ()=> {
        // Créer un participant de test
        const participant = new Participant({
            matricule: 12345,
                prenom: 'Jean',
                nom: 'Dupont',
                genre: 'M',
                niveau: 'Débutant',
                email: 'jean@example.com',
                isActif: true
        });

        // Configurer le mock pour retourner un succes
        (window.api.ajouterParticipant as any).mockResolvedValue({ success: true })

        // Appel de la méthode ajouterParticipant du store
        await useParticipantStore().ajouterParticipant(participant)


        // Expect
        expect(window.api.ajouterParticipant).toHaveBeenCalledWith(participant) // Vérifie que la méthode a été appelée avec le participant
    })


    describe('suppression de participant', () => {
        it('devrait appeler l\'API avec le bon id et verifier que le mock a ete appele', async () => {
            const store = useParticipantStore()
            const matriculeASupprimer = 2;

            // Configurer le mock pour retourner un succès
            (window.api.supprimerParticipant as any).mockResolvedValue({ success: true, message: 'Participant supprimé avec succès' })
            
            // act agir
            const result = await store.supprimerParticipant(matriculeASupprimer)

            // assert
        
            expect(result).toEqual({ success: true }) // Vérifie que le résultat est celui attendu

            expect(window.api.supprimerParticipant).toHaveBeenCalledTimes(1) // Vérifie que la méthode a été appelée une fois

            expect(window.api.supprimerParticipant).toHaveBeenCalledWith(matriculeASupprimer) // Vérifie que la méthode a été appelée avec le bon id
        })

        it('devrait gerer les erreurs lors de la suppression avec mock', async () => {

            //arrange prep du test
            const store = useParticipantStore()
            const matriculeASupprimer = 999; // Id qui n'existe pas

            // Configurer le mock pour retourner une erreur
            (window.api.supprimerParticipant as any).mockResolvedValue({ success: false, error: 'Participant non trouvé' })
            // act agir
            const result = await store.supprimerParticipant(matriculeASupprimer)
            // assert
            expect(result.success).toBe(false)
            expect(result.error).toBe('Participant non trouvé')
            expect(window.api.supprimerParticipant).toHaveBeenCalledTimes(1) // Vérifie que la méthode a été appelée une fois
            expect(window.api.supprimerParticipant).toHaveBeenCalledWith(matriculeASupprimer) // Vérifie que la méthode a été appelée avec le bon id


        })
    })

})