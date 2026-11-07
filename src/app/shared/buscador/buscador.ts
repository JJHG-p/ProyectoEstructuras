import { Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productos } from '../../core/services/productos';
import { normalizar } from '../../models/formato';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss',
})
export class Buscador implements OnInit {
  private productos = inject(Productos);

  @Input() valor = '';
  @Output() cambio = new EventEmitter<string>(); // cada vez que se escribe
  @Output() buscar = new EventEmitter<string>(); // al pulsar Enter, la lupa o una sugerencia

  texto = signal<string>('');
  abierto = signal<boolean>(false);

  // Sugerencias: hasta 5 títulos que contengan lo escrito (sin importar tildes ni mayúsculas)
  sugerencias = computed(() => {
    const texto = normalizar(this.texto());
    const lista: string[] = [];
    if (texto.length < 2) {
      return lista;
    }
    for (const producto of this.productos.lista()) {
      if (lista.length === 5) break;
      if (normalizar(producto.titulo).indexOf(texto) !== -1 && lista.indexOf(producto.titulo) === -1) {
        lista.push(producto.titulo);
      }
    }
    return lista;
  });

  ngOnInit() {
    this.texto.set(this.valor);
  }

  escribir(valor: string) {
    this.texto.set(valor);
    this.abierto.set(true);
    this.cambio.emit(valor);
  }

  elegir(sugerencia: string) {
    this.texto.set(sugerencia);
    this.abierto.set(false);
    this.cambio.emit(sugerencia);
    this.buscar.emit(sugerencia);
  }

  enviar() {
    this.abierto.set(false);
    this.buscar.emit(this.texto());
  }
}
