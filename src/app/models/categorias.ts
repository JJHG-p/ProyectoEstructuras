export interface CategoriaDato {
    nombre: string;
    hijos?: CategoriaDato[];
}

export const CATEGORIAS: CategoriaDato[] = [
    {
        nombre: 'Libros',
        hijos: [
            {
                nombre: 'Ingeniería',
                hijos: [{ nombre: 'Informática' }, { nombre: 'Sistemas' }, { nombre: 'Matemáticas' }]
            },
            {
                nombre: 'Ciencias Sociales',
                hijos: [{ nombre: 'Derecho' }, { nombre: 'Economía' }]
            }
        ]
    },
    { nombre: 'Calculadoras' },
    {
        nombre: 'Apuntes',
        hijos: [
            {
                nombre: 'Ingeniería',
                hijos: [{ nombre: 'Informática' }, { nombre: 'Matemáticas' }]
            }
        ]
    }
];