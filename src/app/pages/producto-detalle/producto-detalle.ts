import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { FavoritosLista } from '../../core/services/favoritos-lista';
import { Historial } from '../../core/services/historial';
import { Productos } from '../../core/services/productos';
import { Solicitudes } from '../../core/services/solicitudes';
import { dinero, fecha } from '../../models/formato';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-detalle',
  imports: [],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.scss',
})
export class ProductoDetalle {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private auth = inject(Auth);
  private productos = inject(Productos);
  private historial = inject(Historial);
  private favoritos = inject(FavoritosLista);
  private solicitudes = inject(Solicitudes);

  dinero = dinero;
  fecha = fecha;

  id = signal<string>('');
  producto = computed(() => this.productos.porId(this.id()));
  esFavorito = computed(() => this.favoritos.contiene(this.id()));

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      this.id.set(id);
      this.historial.visitar(id);
      this.solicitudes.registrar(id);
    });
  }

  esMio(p: Producto) {
    return p.vendedorUid === this.auth.uid();
  }

  materia(p: Producto) {
    return p.ruta.split('/').pop();
  }
  
  volver() {
    const anterior = this.historial.volver();
    if (anterior) {
      this.router.navigate(['/producto', anterior]);
    } else {
      this.router.navigate(['/catalogo']);
    }
  }

  alternarFavorito(p: Producto) {
    this.favoritos.alternar(p);
  }

  contactar(p: Producto) {
    this.router.navigate(['/chat'], { queryParams: { con: p.vendedorEmail } });
  }
}
