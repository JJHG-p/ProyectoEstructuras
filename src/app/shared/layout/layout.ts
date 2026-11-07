import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  protected readonly auth = inject(Auth);

  readonly enlaces = [
    { ruta: '/catalogo', texto: 'Catálogo', icono: ' ' },
    { ruta: '/publicar', texto: 'Publicar', icono: ' ' },
    { ruta: '/carrito', texto: 'Carrito', icono: ' ' },
    { ruta: '/favoritos', texto: 'Favoritos', icono: '♡' },
    { ruta: '/chat', texto: 'Chat', icono: ' ' },
    { ruta: '/categorias', texto: 'Categorías', icono: ' ' },
    { ruta: '/campus', texto: 'Campus', icono: ' ' },
    { ruta: '/perfil', texto: 'Perfil', icono: ' ' },
  ];
}
