import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { RealtimeCollectionService } from '../../core/services/realtime-collection.service';
import { hora } from '../../models/formato';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  providers: [RealtimeCollectionService],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat {
  protected readonly auth = inject(Auth);
  private route = inject(ActivatedRoute);
  private mensajes = inject<RealtimeCollectionService<Mensaje>>(RealtimeCollectionService)
    .init('mensajes');

  hora = hora;

  con = signal<string>(''); // correo de la persona con la que se está hablando
  texto = signal<string>('');

  constructor() {
    // Llega desde "Contactar al vendedor": /chat?con=correo@vendedor.com
    this.route.queryParamMap.subscribe((params) => {
      const con = params.get('con');
      if (con) {
        this.con.set(con);
      }
    });
  }

  // Una conversación por cada persona con la que hay mensajes (con su último mensaje)
  conversaciones = computed(() => {
    const yo = this.auth.usuario();
    const ultimos: { [otro: string]: Mensaje } = {};

    for (const m of this.mensajes.results()) {
      if (m.de !== yo && m.para !== yo) continue;
      const otro = m.de === yo ? m.para : m.de;
      if (!ultimos[otro] || m.enviadoEn > ultimos[otro].enviadoEn) {
        ultimos[otro] = m;
      }
    }

    const lista = Object.keys(ultimos).map(function (otro) {
      return { otro, ultimo: ultimos[otro] };
    });
    lista.sort(function (a, b) {
      return b.ultimo.enviadoEn - a.ultimo.enviadoEn;
    });
    return lista;
  });

  // Mensajes entre yo y la persona elegida, del más antiguo al más nuevo
  mensajesActivos = computed(() => {
    const yo = this.auth.usuario();
    const con = this.con();
    const lista: Mensaje[] = [];

    for (const m of this.mensajes.results()) {
      if ((m.de === yo && m.para === con) || (m.de === con && m.para === yo)) {
        lista.push(m);
      }
    }

    lista.sort(function (a, b) {
      return a.enviadoEn - b.enviadoEn;
    });
    return lista;
  });

  nombreDe(email: string) {
    return email.split('@')[0];
  }

  abrir(email: string) {
    this.con.set(email);
  }

  async enviar() {
    const yo = this.auth.usuario();
    const texto = this.texto().trim();
    if (!yo || !this.con() || !texto) return;

    try {
      await this.mensajes.add({
        de: yo,
        para: this.con(),
        texto,
        enviadoEn: Date.now(),
      });
      this.texto.set('');
    } catch {
      // el servicio ya guardó el mensaje de error
    }
  }
}