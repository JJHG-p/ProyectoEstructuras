import { Component, inject, Input, signal } from '@angular/core';
import { NodoArbol } from '../../../data-structures/arbol';
import { SeleccionCategoria } from './seleccion-categoria';

@Component({
  selector: 'app-nodo-categoria',
  imports: [NodoCategoria],
  templateUrl: './nodo-categoria.html',
  styleUrl: './nodo-categoria.scss',
})
export class NodoCategoria {
  @Input() nodo!: NodoArbol;

  readonly seleccion = inject(SeleccionCategoria);
  abierto = signal<boolean>(true);

  tieneCategorias() {
    for (const hijo of this.nodo.hijos) {
      if (hijo.tipo === 'categoria') {
        return true;
      }
    }
    return false;
  }

  cuantos() {
    return this.nodo.idsProductos().length;
  }

  elegir() {
    this.seleccion.elegir(this.nodo.ruta);
    this.abierto.set(!this.abierto());
  }
}
