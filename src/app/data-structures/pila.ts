class NodoPila<T> {
    valor: T;
    abajo: NodoPila<T> | null;

    constructor(valor: T, abajo: NodoPila<T> | null) {
        this.valor = valor;
        this.abajo = abajo;
    }
}

export class Pila<T> {
    private cima: NodoPila<T> | null = null;
    private cantidad = 0;

    push(valor: T) {
        this.cima = new NodoPila(valor, this.cima);
        this.cantidad++;
    }

    pop(): T | null {
        if (this.cima === null) {
            return null;
        }
        const valor = this.cima.valor;
        this.cima = this.cima.abajo;
        this.cantidad--;
        return valor;
    }

    peek(): T | null {
        return this.cima === null ? null : this.cima.valor;
    }

    tamano() {
        return this.cantidad;
    }

    estaVacia() {
        return this.cantidad === 0;
    }

    aArreglo(): T[] {
        const resultado: T[] = [];
        let actual = this.cima;
        while (actual !== null) {
            resultado.push(actual.valor);
            actual = actual.abajo;
        }
        return resultado;
    }
}