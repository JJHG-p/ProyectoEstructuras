import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { dinero } from '../../models/formato';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-tarjeta-producto',
  imports: [RouterLink],
  templateUrl: './tarjeta-producto.html',
  styleUrl: './tarjeta-producto.scss',
})
export class TarjetaProducto {
  @Input() producto!: Producto;
  @Input() favorito = false;
  @Output() alternarFavorito = new EventEmitter<Producto>();

  dinero = dinero;

  // 'Libros' -> 'Libro'
  etiqueta() {
    return this.producto.categoria.slice(0, -1);
  }
}
