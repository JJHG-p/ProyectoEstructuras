import { Injectable } from '@angular/core';
import { get, ref } from 'firebase/database';
import { db } from '../firebase.config';
import { Producto } from '../../models/productos';
import { RealtimeCollectionService } from './realtime-collection.service';

@Injectable({
  providedIn: 'root',
})
export class Productos {
  private coleccion = new RealtimeCollectionService<Producto>().init('productos');

  lista = this.coleccion.results;
  cargando = this.coleccion.isPending;
  error = this.coleccion.error;

  agregar(producto: Producto) {
    return this.coleccion.add(producto);
  }

  actualizar(id: string, cambios: Partial<Producto>) {
    return this.coleccion.update(id, cambios);
  }

  eliminar(id: string) {
    return this.coleccion.deleteItem(id);
  }

  porId(id: string): Producto | null {
    for (const producto of this.lista()) {
      if (producto.id === id) {
        return producto;
      }
    }
    return null;
  }

  async obtener(id: string): Promise<Producto | null> {
    const instantanea = await get(ref(db, `productos/${id}`));
    return instantanea.exists() ? ({ ...instantanea.val(), id } as Producto) : null;
  }
}
