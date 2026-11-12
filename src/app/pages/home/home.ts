import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { Productos } from '../../core/services/productos';
import { Solicitudes } from '../../core/services/solicitudes';
import { masSolicitados } from '../../models/ranking';
import { Buscador } from '../../shared/buscador/buscador';
import { TarjetaProducto } from '../../shared/tarjeta-producto/tarjeta-producto';
import { FavoritosLista } from '../../core/services/favoritos-lista';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Buscador, TarjetaProducto],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly auth = inject(Auth);
  private router = inject(Router);
  private productos = inject(Productos);
  private solicitudes = inject(Solicitudes);
  protected readonly favoritos = inject(FavoritosLista);

  // HEAP: los 4 productos más solicitados
  destacados = computed(() => {
    return masSolicitados(this.productos.lista(), this.solicitudes.conteo(), 4);
  });

  inicial() {
    return (this.auth.usuario() ?? '?').charAt(0).toUpperCase();
  }

  buscar(texto: string) {
    this.router.navigate(['/catalogo'], { queryParams: { q: texto } });
  }
}
