import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Arbol } from '../../data-structures/arbol';
import { CATEGORIAS } from '../../models/categorias';
import { CategoriaProducto } from '../../models/producto';
import { Auth } from '../../core/services/auth';
import { Productos } from '../../core/services/productos';
import { Usuarios } from '../../core/services/usuarios';

@Component({
  selector: 'app-publicar',
  imports: [FormsModule, RouterLink],
  templateUrl: './publicar.html',
  styleUrl: './publicar.scss',
})
export class Publicar implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productos = inject(Productos);
  private usuarios = inject(Usuarios);

  readonly destinos = Arbol.crear(CATEGORIAS, []).rutasDestino();

  id = signal<string>('');
  titulo = signal<string>('');
  precio = signal<string>('');
  ruta = signal<string>(this.destinos[0]);
  descripcion = signal<string>('');
  imagenUrl = signal<string>('');
  disponible = signal<boolean>(true);
  guardando = signal<boolean>(false);
  msg = signal<string>('');

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    await this.auth.listo;
    const producto = await this.productos.obtener(id);

    if (!producto || producto.vendedorUid !== this.auth.uid()) {
      this.router.navigate(['/perfil']);
      return;
    }

    this.id.set(id);
    this.titulo.set(producto.titulo);
    this.precio.set(String(producto.precio));
    this.ruta.set(producto.ruta);
    this.descripcion.set(producto.descripcion);
    this.imagenUrl.set(producto.imagenUrl);
    this.disponible.set(producto.disponible);
  }

  async guardar() {
    const uid = this.auth.uid();
    const email = this.auth.usuario();
    if (!uid || !email) return;

    const precio = Number(this.precio());
    if (!this.titulo().trim() || !precio || precio <= 0) {
      this.msg.set('Escribe un título y un precio mayor a 0');
      return;
    }

    this.guardando.set(true);
    this.msg.set('');

    try {
      const ruta = this.ruta();
      const datos = {
        titulo: this.titulo().trim(),
        precio,
        categoria: ruta.split('/')[0] as CategoriaProducto,
        ruta,
        descripcion: this.descripcion().trim(),
        imagenUrl: this.imagenUrl().trim(),
        disponible: this.disponible()
      };

      if (this.id()) {
        await this.productos.actualizar(this.id(), datos);
      } else {
        const perfil = await this.usuarios.obtener(uid);
        await this.productos.agregar({
          ...datos,
          vendedorUid: uid,
          vendedorEmail: email,
          vendedorNombre: perfil ? perfil.nombre : email.split('@')[0],
          publicadoEn: Date.now()
        });
      }

      this.router.navigate(['/perfil']);
    } catch (err: any) {
      this.msg.set('No se pudo guardar: ' + err.message);
    }

    this.guardando.set(false);
  }
}
