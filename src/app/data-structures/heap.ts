// Responsable: Miguel
// Uso: ranking de productos más solicitados (Home y orden "Más solicitados" del Catálogo)
interface ElementoHeap<T> {
  valor: T;
  prioridad: number;
}

// Heap máximo: el elemento con MAYOR prioridad siempre está arriba (posición 0).
// Es un árbol binario guardado en un arreglo:
// hijo izquierdo de i = 2i + 1, hijo derecho de i = 2i + 2, padre de i = floor((i - 1) / 2)
export class Heap<T> {
  private elementos: ElementoHeap<T>[] = [];

  // O(log n): lo agrega al final y lo sube mientras sea mayor que su padre
  insertar(valor: T, prioridad: number) {
    this.elementos.push({ valor, prioridad });
    this.subir(this.elementos.length - 1);
  }

  // O(log n): saca el de mayor prioridad, pone el último arriba y lo baja a su lugar
  extraerMax(): T | null {
    if (this.elementos.length === 0) {
      return null;
    }
    const mayor = this.elementos[0];
    const ultimo = this.elementos.pop()!;

    if (this.elementos.length > 0) {
      this.elementos[0] = ultimo;
      this.bajar(0);
    }
    return mayor.valor;
  }

  // O(1): mira el mayor sin sacarlo
  verMax(): T | null {
    return this.elementos.length === 0 ? null : this.elementos[0].valor;
  }

  tamano() {
    return this.elementos.length;
  }

  estaVacio() {
    return this.elementos.length === 0;
  }

  private subir(indice: number) {
    let i = indice;
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.elementos[i].prioridad <= this.elementos[padre].prioridad) {
        break;
      }
      this.intercambiar(i, padre);
      i = padre;
    }
  }

  private bajar(indice: number) {
    let i = indice;
    const total = this.elementos.length;
    while (true) {
      const izquierdo = 2 * i + 1;
      const derecho = 2 * i + 2;
      let mayor = i;
      if (
        izquierdo < total &&
        this.elementos[izquierdo].prioridad > this.elementos[mayor].prioridad
      ) {
        mayor = izquierdo;
      }
      if (derecho < total && this.elementos[derecho].prioridad > this.elementos[mayor].prioridad) {
        mayor = derecho;
      }
      if (mayor === i) {
        break;
      }
      this.intercambiar(i, mayor);
      i = mayor;
    }
  }

  private intercambiar(a: number, b: number) {
    const temporal = this.elementos[a];
    this.elementos[a] = this.elementos[b];
    this.elementos[b] = temporal;
  }
}
