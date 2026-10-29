import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { FavoritosLista } from '../../core/services/favoritos-lista';
import { Historial } from '../../core/services/historial';
import { Productos } from '../../core/services/productos';
import { Usuarios } from '../../core/services/usuarios';
import { dinero } from '../../models/formato';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-perfil',
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit{
  protected readonly auth = inject(Auth);
  protected readonly favoritos = inject(FavoritosLista);
  private usuarios = inject(Usuarios);
  private productos = inject(Productos);
  private historial = inject(Historial);

  dinero = dinero;

  readonly pestanas = ['Mis productos', 'Favoritos', 'Historial'];
  pestana = signal<string>('Mis productos');

  nombre = signal<string>('');
  carrera = signal<string>('');
  editando = signal<boolean>(false);

  misProductos = computed(() => {
    const resultado: Producto[] = [];
    for (const producto of this.productos.lista()) {
      if (producto.vendedorUid === this.auth.uid()) {
        resultado.push(producto);
      }
    }
    return resultado;
  });

  vistos = computed(() => {
    const resultado: Producto[] = [];
    for (const id of this.historial.vistos()) {
      const producto = this.productos.porId(id);
      if (producto) {
        resultado.push(producto);
      }
    }
    return resultado;
  });

  async ngOnInit() {
    await this.auth.listo;
    const uid = this.auth.uid();
    if (!uid) return;

    const datos = await this.usuarios.obtener(uid);
    if (datos) {
      this.nombre.set(datos.nombre);
      this.carrera.set(datos.carrera);
    } else {
      this.nombre.set((this.auth.usuario() ?? '').split('@')[0]);
    }
  }

  inicial() {
    return this.nombre().charAt(0).toUpperCase();
  }

  async guardar() {
    const uid = this.auth.uid();
    if (!uid) return;

    await this.usuarios.guardar(uid, {
      nombre: this.nombre().trim(),
      email: this.auth.usuario() ?? '',
      carrera: this.carrera().trim()
    });
    this.editando.set(false);
  }

  async eliminar(producto: Producto) {
    
    if (!confirm('¿Eliminar "' + producto.titulo + '"?')) return;
    await this.productos.eliminar(producto.id!);
  }
}
