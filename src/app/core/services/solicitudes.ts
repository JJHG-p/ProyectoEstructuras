import { Injectable, signal } from '@angular/core';
import { get, onValue, ref, set } from 'firebase/database';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class Solicitudes {
  conteo = signal<{ [productoId: string]: number }>({});

  constructor() {
    onValue(ref(db, 'solicitudes'), (instantanea) => {
      this.conteo.set(instantanea.exists() ? instantanea.val() : {});
    });
  }

  async registrar(productoId: string) {
    if (!productoId) return;

    const referencia = ref(db, `solicitudes/${productoId}`);
    const actual = await get(referencia);
    const valor = actual.exists() ? Number(actual.val()) : 0;
    await set(referencia, valor + 1);
  }
}
