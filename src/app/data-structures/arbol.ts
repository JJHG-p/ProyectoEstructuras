import type { CategoriaDato } from "../models/categorias";
import type { Producto } from "../models/producto";

export class NodoArbol {
    nombre: string;
    tipo: 'categoria' | 'producto';
    ruta: string;
    productoId: string;
    hijos: NodoArbol[];

    constructor(nombre: string, tipo: 'categoria' | 'producto', ruta = '', productoId = '') {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ruta = ruta;
        this.productoId = productoId;
        this.hijos = [];
    }

    agregarHijo(nodo: NodoArbol): boolean {
        if (this.tipo === 'producto') {
            return false;
        }
        this.hijos.push(nodo);
        return true;
    }

    idsProductos(): string[] {
        if (this.tipo === 'producto') {
            return [this.productoId];
        }
        let ids: string[] = [];
        for (const hijo of this.hijos) {
            ids = ids.concat(hijo.idsProductos());
        }
        return ids;
    }
}

export class Arbol {
    raiz: NodoArbol = new NodoArbol('Todas las categorias', 'categoria');

    static crear(categorias: CategoriaDato[], productos: Producto[]): Arbol {
        const arbol = new Arbol();
        arbol.agregarCategorias(arbol.raiz, categorias);

        for (const producto of productos) {
            const destino = arbol.buscarPorRuta(producto.ruta);
            if (destino !== null && producto.id) {
                destino.agregarHijo(new NodoArbol(producto.titulo, 'producto', '', producto.id));
            }
        }
        return arbol;
    }

    private agregarCategorias(padre: NodoArbol, datos: CategoriaDato[]) {
        for (const dato of datos) {
            const ruta = padre.ruta === '' ? dato.nombre : padre.ruta + '/' + dato.nombre;
            const nodo = new NodoArbol(dato.nombre, 'categoria', ruta);
            padre.agregarHijo(nodo);
            if (dato.hijos) {
                this.agregarCategorias(nodo, dato.hijos);
            }
        }
    }

    buscarPorRuta(ruta: string): NodoArbol | null {
        if (ruta === '') {
            return this.raiz;
        }

        let actual: NodoArbol = this.raiz;
        for (const parte of ruta.split('/')) {
            let siguiente: NodoArbol | null = null;
            for (const hijo of actual.hijos) {
                if (hijo.tipo === 'categoria' && hijo.nombre === parte) {
                    siguiente = hijo;
                }
            }
            if (siguiente === null) {
                return null;
            }
            actual = siguiente;
        }
        return actual;
    }

    rutasDestino(nodo: NodoArbol = this.raiz): string[] {
        let rutas: string[] = [];
        let tieneCategorias = false;

        for (const hijo of nodo.hijos) {
            if (hijo.tipo === 'categoria') {
                tieneCategorias = true;
                rutas = rutas.concat(this.rutasDestino(hijo));
            }
        }

        if (!tieneCategorias && nodo.ruta !== '') {
            rutas.push(nodo.ruta);
        }
        return rutas;
    }
}