import { describe, it, expect, beforeEach } from 'vitest';
import { Vector3D, Sphere } from '../src/index.ts';

// le nom du describe doit correspondre au nom de la class qu'il test
describe('Vector3D', () => {
    
    // le nom de it doit correspondre a la fonctionnalité que l'on veut tester
    it("doit initialiser les propriétés X, Y et Z correctement", () => {
        const v = new Vector3D(1, 2, 3);

        expect(v.X).toBe(1); // toBe est utilisée pour une égalité stricte de valeur et de type(===)
        expect(v.Y).toBe(2);
        expect(v.Z).toEqual(3); // toEqual est utilisée pour une égalité profonde d'objets (fonctionne aussi pour les types primitifs)
    });


});

describe('Sphere', () => {

    // declaration de variables dans la portee du describe pour y avoir acces dans tous les it
    let v: Vector3D;
    let sp: Sphere;

    // initialiser les variables avant chaque test
    beforeEach(() => {
        v = new Vector3D(1, 2, 3);
        sp = new Sphere(v, 5);
    });

    it("doit initialiser les propriétés Emplacement", () => {
        // const emplacement = new Vector3D(1, 2, 3);
        // const sphere = new Sphere(emplacement, 5);
        // expect(sphere.Emplacement).toBe(emplacement);
        // expect(sphere.Rayon).toBe(5);

        v.X = 10;
        expect(sp.Emplacement.X).toBe(10);
    });
})