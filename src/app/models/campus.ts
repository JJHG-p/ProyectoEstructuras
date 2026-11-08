export interface PuntoCampus {
  id: string;
  nombre: string;
  x: number; // posición en el plano (600 x 360)
  y: number;
}

export interface CaminoCampus {
  desde: string;
  hasta: string;
  minutos: number; // peso de la arista: lo que se demora caminando
}

export const PUNTOS: PuntoCampus[] = [
  { id: 'biblioteca', nombre: 'Biblioteca', x: 300, y: 50 },
  { id: 'bienestar', nombre: 'Bienestar', x: 80, y: 70 },
  { id: 'auditorio', nombre: 'Auditorio', x: 190, y: 140 },
  { id: 'aulas', nombre: 'Aulas', x: 330, y: 160 },
  { id: 'cafeteria', nombre: 'Cafetería', x: 480, y: 130 },
  { id: 'porteria', nombre: 'Portería', x: 520, y: 240 },
  { id: 'gimnasio', nombre: 'Gimnasio', x: 70, y: 200 },
  { id: 'cancha', nombre: 'Cancha', x: 170, y: 300 },
  { id: 'laboratorios', nombre: 'Laboratorios', x: 340, y: 300 },
  { id: 'parqueadero', nombre: 'Parqueadero', x: 500, y: 320 },
];

export const CAMINOS: CaminoCampus[] = [
  { desde: 'biblioteca', hasta: 'aulas', minutos: 2 },
  { desde: 'biblioteca', hasta: 'cafeteria', minutos: 6 },
  { desde: 'biblioteca', hasta: 'auditorio', minutos: 3 },
  { desde: 'auditorio', hasta: 'aulas', minutos: 2 },
  { desde: 'auditorio', hasta: 'bienestar', minutos: 3 },
  { desde: 'auditorio', hasta: 'gimnasio', minutos: 4 },
  { desde: 'aulas', hasta: 'cafeteria', minutos: 3 },
  { desde: 'aulas', hasta: 'laboratorios', minutos: 3 },
  { desde: 'gimnasio', hasta: 'cancha', minutos: 3 },
  { desde: 'cancha', hasta: 'laboratorios', minutos: 4 },
  { desde: 'cafeteria', hasta: 'porteria', minutos: 4 },
  { desde: 'porteria', hasta: 'parqueadero', minutos: 2 },
  { desde: 'laboratorios', hasta: 'parqueadero', minutos: 4 },
];