import { Injectable } from '@angular/core';
import { get, ref, set } from 'firebase/database';
import { db } from '../firebase.config';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class Usuarios {
  async obtener(uid: string): Promise<Usuario | null> {
    const instantanea = await get(ref(db, `usuarios/${uid}`));
    return instantanea.exists() ? (instantanea.val() as Usuario) : null;
  }

  async guardar(uid: string, datos: Usuario) {
    await set(ref(db, `usuarios/${uid}`), datos);
  }
}
