import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Grafo } from '../../models/grafo';
import { CAMINOS, PUNTOS, PuntoCampus } from '../../models/campus';

@Component({
  selector: 'app-campus',
  imports: [FormsModule],
  templateUrl: './campus.html',
  styleUrl: './campus.scss',
})
export class Campus {
  readonly puntos = PUNTOS;
  readonly caminos = CAMINOS;

  // GRAFO: los puntos son nodos y los caminos son aristas con peso (minutos)
  private grafo = new Grafo();

  origen = signal<string>('biblioteca');
  destino = signal<string>('cafeteria');
  verRuta = signal<boolean>(false);

  constructor() {
    for (const punto of PUNTOS) {
      this.grafo.addNode(punto.id);
    }
    for (const camino of CAMINOS) {
      this.grafo.addEdge(camino.desde, camino.hasta, camino.minutos);
    }
  }

  // Dijkstra se vuelve a ejecutar solo cuando cambia el origen o el destino
  ruta = computed(() => this.grafo.rutaMasCorta(this.origen(), this.destino()));

  // Lista de pasos: Biblioteca -> Aulas (2 min)
  pasos = computed(() => {
    const ruta = this.ruta();
    const lista: { desde: string; hasta: string; minutos: number }[] = [];
    if (!ruta) return lista;

    for (let i = 0; i < ruta.camino.length - 1; i++) {
      const a = ruta.camino[i];
      const b = ruta.camino[i + 1];
      lista.push({
        desde: this.nombre(a),
        hasta: this.nombre(b),
        minutos: this.grafo.pesoEntre(a, b),
      });
    }
    return lista;
  });

  cambiarOrigen(id: string) {
    this.origen.set(id);
    this.verRuta.set(false);
  }

  cambiarDestino(id: string) {
    this.destino.set(id);
    this.verRuta.set(false);
  }

  punto(id: string): PuntoCampus {
    return PUNTOS.find((p) => p.id === id)!;
  }

  nombre(id: string) {
    return this.punto(id).nombre;
  }

  // ¿este punto está en la ruta que se está mostrando?
  puntoEnRuta(id: string) {
    const ruta = this.ruta();
    return this.verRuta() && ruta !== null && ruta.camino.indexOf(id) !== -1;
  }

  // ¿este camino está en la ruta que se está mostrando?
  caminoEnRuta(a: string, b: string) {
    const ruta = this.ruta();
    if (!this.verRuta() || !ruta) return false;

    for (let i = 0; i < ruta.camino.length - 1; i++) {
      const x = ruta.camino[i];
      const y = ruta.camino[i + 1];
      if ((x === a && y === b) || (x === b && y === a)) {
        return true;
      }
    }
    return false;
  }
}