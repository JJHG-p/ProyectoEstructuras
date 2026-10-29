import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Arbol } from '../../data-structures/arbol';
import { Productos } from '../../core/services/productos';
import { CATEGORIAS } from '../../models/categorias';
import { dinero } from '../../models/formato';
import { Producto } from '../../models/producto';
import { NodoCategoria } from './nodo-categoria/nodo-categoria';
import { SeleccionCategoria } from './nodo-categoria/seleccion-categoria';

@Component({
  selector: 'app-categorias',
  imports: [NodoCategoria, RouterLink],
  providers: [SeleccionCategoria],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {
  private productos = inject(Productos);
  readonly seleccion = inject(SeleccionCategoria);

  dinero = dinero;

  readonly arbol = computed(() => Arbol.crear(CATEGORIAS, this.productos.lista()));

  readonly nodoActual = computed(
    () => this.arbol().buscarPorRuta(this.seleccion.ruta()) ?? this.arbol().raiz
  );

  readonly productosActuales = computed(() => {
    const resultado: Producto[] = [];
    for (const id of this.nodoActual().idsProductos()) {
      const producto = this.productos.porId(id);
      if (producto) {
        resultado.push(producto);
      }
    }
    return resultado;
  });
}
