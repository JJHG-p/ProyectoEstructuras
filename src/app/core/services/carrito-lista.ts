import { Injectable, computed, inject, signal } from '@angular/core';
import { get, ref, set } from 'firebase/database';
import { db } from '../firebase.config';
import { ListaEnlazada } from '../../data-structures/lista-enlazada';
import { ItemLista } from '../../models/item-lista';
import { Producto } from '../../models/producto';
import { Auth } from './auth';
import { Solicitudes } from './solicitudes';

// Carrito de compras. Usa una LISTA ENLAZADA y la guarda en Firebase: listas/{uid}/carrito
@Injectable({ providedIn: 'root' })
export class CarritoLista {
  private auth = inject(Auth);
  private solicitudes = inject(Solicitudes);
  private lista = new ListaEnlazada<ItemLista>();
  private carga: Promise<void>;

  // copia de la lista para que la pantalla se actualice (signal)
  items = signal<ItemLista[]>([]);

  cantidad = computed(() => {
    let total = 0;
    for (const item of this.items()) {
      total += item.cantidad;
    }
    return total;
  });

  total = computed(() => {
    let suma = 0;
    for (const item of this.items()) {
      suma += item.precio * item.cantidad;
    }
    return suma;
  });

  constructor() {
    this.carga = this.auth.listo.then(() => this.cargar());
  }

  async cargar() {
    const uid = this.auth.uid();
    if (!uid) return;

    const instantanea = await get(ref(db, `listas/${uid}/carrito`));
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

  async agregar(producto: Producto) {
    await this.carga;
    const id = producto.id!;
    const existente = this.lista.buscar((item) => item.productoId === id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.lista.agregar({
        productoId: id,
        titulo: producto.titulo,
        precio: producto.precio,
        imagenUrl: producto.imagenUrl,
        vendedorEmail: producto.vendedorEmail,
        cantidad: 1,
      });
    }
    await this.guardar();
    await this.solicitudes.registrar(id); // suma 1 al ranking del Heap
  }

  async cambiarCantidad(productoId: string, cambio: number) {
    const item = this.lista.buscar((x) => x.productoId === productoId);
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad < 1) {
      await this.quitar(productoId);
    } else {
      await this.guardar();
    }
  }

  async quitar(productoId: string) {
    this.lista.eliminar((item) => item.productoId === productoId);
    await this.guardar();
  }

  async vaciar() {
    this.lista.limpiar();
    await this.guardar();
  }

  private async guardar() {
    const arreglo = this.lista.aArreglo();
    this.items.set(arreglo);
    const uid = this.auth.uid();
    if (uid) {
      await set(ref(db, `listas/${uid}/carrito`), arreglo);
    }
  }
}
