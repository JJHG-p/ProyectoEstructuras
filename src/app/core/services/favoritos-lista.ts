import { Injectable, inject, signal } from '@angular/core';
import { get, ref, set } from 'firebase/database';
import { db } from '../firebase.config';
import { ListaEnlazada } from '../../data-structures/lista-enlazada';
import { ItemLista } from '../../models/item-lista';
import { Producto } from '../../models/producto';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class FavoritosLista {
  private auth = inject(Auth);
  private lista = new ListaEnlazada<ItemLista>();
  private carga: Promise<void>;

  items = signal<ItemLista[]>([]);

  constructor() {
    this.carga = this.auth.listo.then(() => this.cargar());
  }

  async cargar() {
    const uid = this.auth.uid();
    if (!uid) return;

    const instantanea = await get(ref(db, `listas/${uid}/favoritos`));
    this.lista.limpiar();

    if (instantanea.exists()) {
      const datos = instantanea.val();
      const arreglo = (Array.isArray(datos) ? datos : Object.values(datos)) as ItemLista[];
      for (const item of arreglo) {
        this.lista.agregar(item);
      }
    }
    this.items.set(this.lista.aArreglo());
  }

  contiene(productoId: string): boolean {
    for (const item of this.items()) {
      if (item.productoId === productoId) {
        return true;
      }
    }
    return false;
  }

  async alternar(producto: Producto) {
    await this.carga;
    const id = producto.id!;

    if (this.contiene(id)) {
      this.lista.eliminar((item) => item.productoId === id);
    } else {
      this.lista.agregar({
        productoId: id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagenUrl: producto.imagenUrl,
        vendedorEmail: producto.vendedorEmail,
        cantidad: 1
      });
    }
    await this.guardar();
  }

  async quitar(productoId: string) {
    this.lista.eliminar((item) => item.productoId === productoId);
    await this.guardar();
  }

  private async guardar() {
    const arreglo = this.lista.aArreglo();
    this.items.set(arreglo);

    const uid = this.auth.uid();
    if (uid) {
      await set(ref(db, `listas/${uid}/favoritos`), arreglo);
    }
  }
}
