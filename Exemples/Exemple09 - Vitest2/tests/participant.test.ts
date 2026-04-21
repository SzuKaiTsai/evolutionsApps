import { describe, it, expect, beforeEach } from 'vitest';
import { Participant, Genre, Niveau } from '../src/common/participant';

//Test de la classe Participant
describe('Participant', () => {

    //Test du constructeur Participant
    describe('Constructeur', () => {
        it('devrait créer un participant avec toutes les propriétés valides', () => {
            // Arrange (Préparer)
            const data = {
                matricule: 12345,
                prenom: 'Marie',
                nom: 'Tremblay',
                genre: 'F' as Genre,
                niveau: 'Intermédiaire' as Niveau,
                email: 'marie.tremblay@example.com',
                isActif: true
            }

            // Act (Agir)
            const participant = new Participant(data);

            // Assert (Vérifier)
            expect(participant.matricule).toBe(12345)
            expect(participant.prenom).toBe('Marie')
            expect(participant.nom).toBe('Tremblay')
            expect(participant.genre).toBe('F')
            expect(participant.niveau).toBe('Intermédiaire')
            expect(participant.email).toBe('marie.tremblay@example.com')
            expect(participant.isActif).toBe(true)
        })

        
        it('devrait initialiser toutes les propriétés avec leurs valeurs par défaut', () => {
        const participant = new Participant()

        expect(participant.matricule).toBe(0)
        expect(participant.prenom).toBe('')
        expect(participant.nom).toBe('')
        expect(participant.genre).toBe('')
        expect(participant.niveau).toBe('')
        expect(participant.email).toBe('')
        expect(participant.isActif).toBe(true)
        })
    })

    describe('Validation du genre', () => {
        it('devrait accepter un genre masculin valide', () => {
            const participant = new Participant({genre: 'M' as Genre})
            expect(participant.genre).toBe('M')
        })

    })

    describe('Validation du niveau', () => {
        it('devrait accepter un niveau débutant valide', () => {
            const participant = new Participant({niveau: 'Débutant' as Niveau})
            expect(participant.niveau).toBe('Débutant')
        })
    })

    describe('Validation de isActif avec valeur par défaut', () => {
        it('devrait true par défaut', () => {
            const participant = new Participant()
            expect(participant.isActif).toBe(true)
        })
    })

    describe('Constructeur avec données partielles', () => {
        it('devrait assigner les valeurs fournies et utiliser les valeurs par défaut pour les propriétés non fournies', () => {
            const data = {
                matricule: 67890,
                prenom: 'Jean'
            }
            const participant = new Participant(data)
            expect(participant.matricule).toBe(67890)
            expect(participant.prenom).toBe('Jean')
            expect(participant.nom).toBe('')
            expect(participant.genre).toBe('')
            expect(participant.niveau).toBe('')
            expect(participant.email).toBe('')
            expect(participant.isActif).toBe(true)
        })
    })



    describe('Validation du niveau', () => {
        it('devrait accepter un niveau intermédiaire valide', () => {
            const participant = new Participant({niveau: 'Intermédiaire' as Niveau})
            expect(participant.niveau).toBe('Intermédiaire')
        })
        it('devrait accepter un niveau professionnel valide', () => {
            const participant = new Participant({niveau: 'Professionnel' as Niveau})
            expect(participant.niveau).toBe('Professionnel')
        })
        it('devrait rejeter un niveau expert invalide', () => {
            const participant = new Participant({niveau: 'Expert' as Niveau})
            expect(participant.niveau).not.toBe('Expert')
        })
    })
})