import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Usuarios } from '../../core/services/usuarios';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  private auth = inject(Auth);
  private usuarios = inject(Usuarios);
  private router = inject(Router);

  nombre = signal<string>('');
  email = signal<string>('');
  clave = signal<string>('');
  msg = signal<string>('');

  async registrar() {
    if (!this.nombre().trim()) {
      this.msg.set('Escribe tu nombre completo');
      return;
    }

    try {
      const uid = await this.auth.registrar(this.email(), this.clave());
      await this.usuarios.guardar(uid, {
        nombre: this.nombre().trim(),
        email: this.email(),
        carrera: ''
      });
      this.router.navigate(['/']);
    } catch {
      this.msg.set('No se pudo registrar: revisa el correo (si ya existe) y que la contraseña tenga mínimo 6 caracteres');
    }
  }
}
