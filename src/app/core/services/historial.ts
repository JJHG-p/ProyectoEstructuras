import { Injectable, signal } from '@angular/core';
import { Pila } from '../../data-structures/pila';

@Injectable({
  providedIn: 'root',
})
export class Historial {
  private pila = new Pila<string>();

  vistos = signal<string[]>([]);

  visitar(id: string) {
    if (id !== '' && this.pila.peek() !== id) {
      this.pila.push(id);
      this.vistos.set(this.pila.aArreglo());
    }
  }

  volver(): string | null {
    this.pila.pop();
    this.vistos.set(this.pila.aArreglo());
    return this.pila.peek();
  }
}
