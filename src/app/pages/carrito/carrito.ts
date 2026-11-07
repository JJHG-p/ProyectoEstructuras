import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoLista } from '../../core/services/carrito-lista';
import { dinero } from '../../models/formato';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito {
  protected readonly carrito = inject(CarritoLista);
  private router = inject(Router);

  dinero = dinero;

  // No hay pagos en la app: se le consulta al vendedor por el chat y se paga CONTRA ENTREGA
  consultar(vendedorEmail: string) {
    this.router.navigate(['/chat'], { queryParams: { con: vendedorEmail } });
  }

  verPuntosDeEncuentro() {
    this.router.navigate(['/campus']);
  }
}
