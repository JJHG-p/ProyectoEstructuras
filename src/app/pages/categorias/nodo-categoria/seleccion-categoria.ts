import { Injectable, signal } from "@angular/core";

@Injectable()
export class SeleccionCategoria {
    ruta = signal<string>('');

    elegir(ruta: string) {
        this.ruta.set(ruta);
    }
}