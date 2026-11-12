export type CategoriaProducto = 'Libros' | 'Calculadoras' | 'Apuntes';

export interface Producto {
    id?: string;
    titulo: string;
    precio: number;
    categoria: CategoriaProducto;
    ruta: string;
    descripcion: string;
    imagenUrl: string;
    disponible: boolean;
    vendedorUid: string;
    vendedorEmail: string;
    vendedorNombre: string;
    publicadoEn: number;
}