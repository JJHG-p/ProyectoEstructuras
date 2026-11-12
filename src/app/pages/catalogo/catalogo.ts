import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Productos } from '../../core/services/productos';
import { Solicitudes } from '../../core/services/solicitudes';
import { normalizar } from '../../models/formato';
import { Producto } from '../../models/producto';
import { masSolicitados } from '../../models/ranking';
import { Buscador } from '../../shared/buscador/buscador';
import { TarjetaProducto } from '../../shared/tarjeta-producto/tarjeta-producto';
import { FavoritosLista } from '../../core/services/favoritos-lista';

@Component({
  selector: 'app-catalogo',
  imports: [FormsModule, Buscador, TarjetaProducto],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  private route = inject(ActivatedRoute);
  protected readonly productos = inject(Productos);
  private solicitudes = inject(Solicitudes);
  protected readonly favoritos= inject(FavoritosLista);

  readonly categorias = ['Todos', 'Libros', 'Calculadoras', 'Apuntes'];

  categoria = signal<string>('Todos');
  busqueda = signal<string>('');
  orden = signal<string>('recientes');

  constructor() {
    // Lee ?categoria=Libros&q=calculo de la URL (así llegan desde el Home)
    this.route.queryParamMap.subscribe((params) => {
      this.categoria.set(params.get('categoria') ?? 'Todos');
      this.busqueda.set(params.get('q') ?? '');
    });
  }

  // Filtra por categoría y texto, y luego ordena
  visibles = computed(() => {
    const texto = normalizar(this.busqueda());
    const resultado: Producto[] = [];

    for (const producto of this.productos.lista()) {
      if (this.categoria() !== 'Todos' && producto.categoria !== this.categoria()) {
        continue;
      }
      if (texto !== '' && normalizar(producto.titulo).indexOf(texto) === -1) {
        continue;
      }
      resultado.push(producto);
    }

    const orden = this.orden();
    if (orden === 'solicitados') {
      // HEAP: saca primero los más solicitados
      return masSolicitados(resultado, this.solicitudes.conteo(), resultado.length);
    }

    resultado.sort(function (a, b) {
      if (orden === 'menor') return a.precio - b.precio;
      if (orden === 'mayor') return b.precio - a.precio;
      return b.publicadoEn - a.publicadoEn;
    });
    return resultado;
  });
}
