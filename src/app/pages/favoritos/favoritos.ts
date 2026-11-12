import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosLista } from '../../core/services/favoritos-lista';
import { dinero } from '../../models/formato';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.scss',
})
export class Favoritos {
  protected readonly favoritos = inject(FavoritosLista);
  dinero = dinero;
}
