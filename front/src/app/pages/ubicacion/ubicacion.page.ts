import { DatePipe } from '@angular/common';
import { Component, signal, inject, DestroyRef } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NOTIFICATION_TYPES } from '../../model/notifications';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  imports: [DatePipe],
  selector: 'app-ubicacion',
  styleUrl: './ubicacion.page.css',
  templateUrl: './ubicacion.page.html',
})
export class UbicacionPage {
  // ¿El navegador tiene la Geolocation API?
  public readonly soportada = 'geolocation' in navigator;

  // La API solo funciona en contexto seguro: HTTPS o localhost
  public readonly contextoSeguro = window.isSecureContext;

  readonly #notificationService = inject(NotificationService);
  readonly #geolocationService = inject(GeolocationService);

  public posicion = signal<GeolocationPosition | null>(null);
  public seguimientoId = signal<number | null>(null);
  public historial = signal<GeolocationPosition[]>([]);

  constructor(){
    inject(DestroyRef).onDestroy(()=> {
      this.detenerSeguimiento();
    });
  }

  public async obtenerUbicacion(): Promise<void> {
    try {
      const posicion = await this.#geolocationService.obtenerPosicion();
      this.posicion.set(posicion);
      console.log(posicion.coords.latitude);
      console.log(posicion.coords.longitude);
      console.log(posicion.coords.accuracy);
    } catch (e) {
      const error = e as GeolocationPositionError;
      this.#mostrarError(error);
    }
  }

  public iniciarSeguimiento(): void {
    if (this.seguimientoId() !== null) {
      return;
    }
    const id = this.#geolocationService.seguirPosicion(
      (posicion) => {
        this.historial.update((h) => [...h, posicion]);
      },
      (error) => {
        this.#mostrarError(error);
        if (error.code === error.PERMISSION_DENIED) {
          this.detenerSeguimiento()
        }

      },
    );
    this.seguimientoId.set(id);
  }

  public detenerSeguimiento(): void {
    const id = this.seguimientoId();
    if (id !== null) {
      this.#geolocationService.detenerSeguimiento(id);
    }
    this.seguimientoId.set(null);
  }



  #mostrarError(error: GeolocationPositionError): void {
    let mesaje: string;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        mesaje = 'El usuario ha denegado el acceso a la ubicación';
        break;
      case error.POSITION_UNAVAILABLE:
        mesaje = 'La información de ubicación no está disponible';
        break;
      case error.TIMEOUT:
        mesaje = 'La solicitud para obtener la ubicación ha caducado';
        break;
      default:
        mesaje = 'Error desconocido al obtener la ubicación';
    }
    console.error('Error obteniendo ubicación:', error.message);
    this.#notificationService.addNotification(NOTIFICATION_TYPES.ERROR, mesaje);
  }
}

export default UbicacionPage;
