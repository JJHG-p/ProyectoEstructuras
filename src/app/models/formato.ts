export function dinero(valor: number): string {
    return '$ ' + valor.toLocaleString('es-CO');
}

export function fecha(milisegundos: number): string {
    return new Date(milisegundos).toLocaleTimeString('es-CO');
}

export function hora(milisegundos: number): string {
    return new Date(milisegundos).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit'});
}

export function normalizar(texto: string): string {
    return texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()
}