class NodoLista<T> {
    valor: T;
    siguiente: NodoLista<T> | null = null;

    constructor(valor: T) {
        this.valor = valor;
    }
}

export class ListaEnlazada<T> {
    private cabeza: NodoLista<T> | null = null;
    private cantidad = 0;

    agregar(valor: T) {
        const nuevo = new NodoLista(valor);

        if (this.cabeza === null) {
            this.cabeza = nuevo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevo;
        }
        this.cantidad++;
    }

    agregarAlInicio(valor: T) {
        const nuevo = new NodoLista(valor);
        nuevo.siguiente = this.cabeza;
        this.cabeza = nuevo;
        this.cantidad++;
    }

    buscar(condicion: (valor: T) => boolean): T | null {
        let actual = this.cabeza;
        while (actual !== null) {
            if (condicion(actual.valor)) {
                return actual.valor;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    eliminar(condicion: (valor: T) => boolean): boolean {
        let anterior: NodoLista<T> | null = null;
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.valor)) {
                if (anterior === null) {
                    this.cabeza = actual.siguiente;
                } else {
                    anterior.siguiente = actual.siguiente;
                }
                this.cantidad--;
                return true;
            }
            anterior = actual;
            actual = actual.siguiente;
        }
        return false;
    }

    tamano() {
        return this.cantidad;
    }

    estaVacia() {
        return this.cantidad === 0;
    }

    aArreglo(): T[] {
        const resultado: T[] = [];
        let actual = this.cabeza;
        while (actual !== null) {
            resultado.push(actual.valor);
            actual = actual.siguiente;
        }
        return resultado;
    }

    limpiar() {
        this.cabeza = null;
        this.cantidad = 0;
    }
}