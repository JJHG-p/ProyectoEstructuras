import { Injectable, signal } from '@angular/core';
import { createUserWithEmailAndPassword, onAuthStateChanged,
  signInWithEmailAndPassword, signOut
 } from 'firebase/auth';

import { auth } from '../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  usuario = signal<string | null>(null);
  uid = signal<string | null>(null);

  listo: Promise<void>;

  constructor() {
    this.listo = new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        this.usuario.set(user ? user.email : null);
        this.uid.set(user ? user.uid : null);
        resolve();
      });
    });
  }

  estaLogueado() {
    return this.usuario() !== null;
  }

  async entrar(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async registrar(email: string, password: string): Promise<string> {
    const credencial = await createUserWithEmailAndPassword(auth, email, password);
    return credencial.user.uid;
  }

  async salir() {
    await signOut(auth);
    window.location.href = '/login';
  }
}
