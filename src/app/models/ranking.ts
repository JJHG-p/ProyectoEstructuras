import { Heap } from '../data-structures/heap';
import { Producto } from './producto';

// Usa un HEAP MÁXIMO para sacar los productos más solicitados.
// Prioridad = solicitudes; si empatan, gana el más reciente.
// (publicadoEn vale ~1.7e12, por eso las solicitudes se multiplican por 1e13)
export function masSolicitados(
  productos: Producto[],
  conteo: { [productoId: string]: number },
  cantidad: number
): Producto[] {
  const heap = new Heap<Producto>();
  for (const producto of productos) {
    const solicitudes = conteo[producto.id!] ?? 0;
    heap.insertar(producto, solicitudes * 1e13 + producto.publicadoEn);
  }

  const resultado: Producto[] = [];
  while (resultado.length < cantidad && !heap.estaVacio()) {
    resultado.push(heap.extraerMax()!);
  }
  return resultado;
}
