import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = signal<string>('');
  clave = signal<string>('');
  msg = signal<string>('');

  async entrar() {
    try {
      await this.auth.entrar(this.email(), this.clave());
      this.router.navigate(['/']);
    } catch {
      this.msg.set('Correo o contraseña incorrectos');
    }
  }
}
