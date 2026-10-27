# Marketplace UAO

Aplicación web para que estudiantes de la UAO compren, vendan e intercambien libros,
calculadoras y apuntes. Hecha con Angular 21 y Firebase.

## Integrantes
- Juan José Hinestroza Guasguita — 2240080 — (módulos: auth, perfil, publicar, detalle, favoritos, categorías)
- Miguel [apellido] — [código] — (módulos: catálogo, buscador, carrito, chat, campus)

## Enlaces
- Propuesta gráfica: [pegar enlace]
- Aplicación publicada (Netlify): [pegar enlace]

## Estructuras de datos
| Estructura | Archivo | Uso |
|---|---|---|
| Lista enlazada | `src/app/data-structures/lista-enlazada.ts` | Carrito y lista de deseos |
| Pila | `src/app/data-structures/pila.ts` | Historial de productos vistos |
| Árbol | `src/app/data-structures/arbol.ts` | Categorías → materias → productos |
| Heap | `src/app/data-structures/heap.ts` | Productos más solicitados |
| Grafo (Dijkstra) | `src/app/data-structures/grafo.ts` | Ruta más corta entre puntos del campus |

## Cómo ejecutarlo
    git clone https://github.com/JJHG-p/ProyectoEstructuras.git
    npm install
    ng serve

## Pruebas
    ng test --watch=false
