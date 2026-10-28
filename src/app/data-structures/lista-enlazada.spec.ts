import { describe, it, expect } from 'vitest';
import { ListaEnlazada } from './lista-enlazada';

describe('ListaEnlazada', () => {
    it('agrega al final y al inicio respetando el orden', () => {
        const lista = new ListaEnlazada<number>();
        lista.agregar(1);
        lista.agregar(2);
        lista.agregarAlInicio(0);

        expect(lista.aArreglo()).toEqual([0, 1, 2]);
        expect(lista.tamano()).toBe(3);
    });

    it('elimina un elemento del medio, del inicio y devuelve false si no existe', () => {
        const lista = new ListaEnlazada<number>();
        lista.agregar(1);
        lista.agregar(2);
        lista.agregar(3);

        expect(lista.eliminar((n) => n === 2)).toBe(true);
        expect(lista.aArreglo()).toEqual([1, 3]);
        expect(lista.eliminar((n) => n === 1)).toBe(true);
        expect(lista.aArreglo()).toEqual([3]);
        expect(lista.eliminar((n) => n === 99)).toBe(false);
    });

    it('busca por condición y limpia la lista', () => {
        const lista = new ListaEnlazada<{ id: string }>();
        lista.agregar({ id: 'a' });
        lista.agregar({ id: 'b' });

        expect(lista.buscar((x) => x.id === 'b')).toEqual({ id: 'b' });
        expect(lista.buscar((x) => x.id === 'z')).toBeNull();

        lista.limpiar();
        expect(lista.estaVacia()).toBe(true);
    });
});