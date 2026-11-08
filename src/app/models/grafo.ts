
interface Arista {
  destino: string;
  peso: number; // minutos caminando
}

export interface Ruta {
  camino: string[]; // ids de los puntos, de origen a destino
  total: number; // minutos
}

export class Grafo {
  nodes: string[] = [];
  adjList: { [nodo: string]: Arista[] } = {};

  // Agrega un nodo si todavía no existe
  addNode(node: string) {
    if (!this.searchNode(node)) {
      this.nodes.push(node);
      this.adjList[node] = [];
    }
  }

  // Une dos nodos en los dos sentidos (grafo no dirigido)
  addEdge(node1: string, node2: string, peso: number) {
    this.addNode(node1);
    this.addNode(node2);
    this.adjList[node1].push({ destino: node2, peso });
    this.adjList[node2].push({ destino: node1, peso });
  }

  // Devuelve el nodo si existe, o null
  searchNode(node: string): string | null {
    for (const nodo of this.nodes) {
      if (nodo === node) {
        return nodo;
      }
    }
    return null;
  }

  // Quita el nodo y todos los caminos que llegaban a él
  removeNode(node: string) {
    if (!this.searchNode(node)) return;
    this.nodes = this.nodes.filter((n) => n !== node);
    delete this.adjList[node];
    for (const otro of this.nodes) {
      this.adjList[otro] = this.adjList[otro].filter((arista) => arista.destino !== node);
    }
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  printAdjacency(node: string) {
    if (this.searchNode(node)) {
      console.log(this.adjList[node]);
    }
  }

  printGraph() {
    console.log(this.adjList);
  }

  pesoEntre(a: string, b: string): number {
    for (const arista of this.adjList[a] ?? []) {
      if (arista.destino === b) {
        return arista.peso;
      }
    }
    return 0;
  }

  // Dijkstra: como los caminos tienen pesos distintos, BFS no sirve (BFS solo cuenta saltos).
  // Con arreglos simples cuesta O(V^2); con 10 puntos es instantáneo.
  rutaMasCorta(origen: string, destino: string): Ruta | null {
    if (!this.searchNode(origen) || !this.searchNode(destino)) {
      return null;
    }

    const distancia: { [id: string]: number } = {};
    const previo: { [id: string]: string | null } = {};
    const visitado: { [id: string]: boolean } = {};
    for (const id of this.nodes) {
      distancia[id] = Infinity;
      previo[id] = null;
      visitado[id] = false;
    }
    distancia[origen] = 0;

    for (let i = 0; i < this.nodes.length; i++) {
      // 1. elegir el punto no visitado con menor distancia
      let actual: string | null = null;
      for (const id of this.nodes) {
        if (!visitado[id] && (actual === null || distancia[id] < distancia[actual])) {
          actual = id;
        }
      }
      if (actual === null || distancia[actual] === Infinity) {
        break;
      }
      visitado[actual] = true;
      if (actual === destino) {
        break;
      }

      // 2. relajar sus vecinos: ¿pasar por "actual" los deja más cerca?
      for (const arista of this.adjList[actual]) {
        const nueva = distancia[actual] + arista.peso;
        if (nueva < distancia[arista.destino]) {
          distancia[arista.destino] = nueva;
          previo[arista.destino] = actual;
        }
      }
    }

    if (distancia[destino] === Infinity) {
      return null;
    }

    // reconstruir el camino yendo hacia atrás desde el destino
    const camino: string[] = [];
    let paso: string | null = destino;
    while (paso !== null) {
      camino.unshift(paso);
      paso = previo[paso];
    }
    return { camino, total: distancia[destino] };
  }
}