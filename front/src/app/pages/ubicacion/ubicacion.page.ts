import { DatePipe } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NOTIFICATION_TYPES } from '../../model/notifications';

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

  public posicion = signal<GeolocationPosition | null>(null);

  public obtenerUbicacion(): void {
    navigator.geolocation.getCurrentPosition(
      (posicion: GeolocationPosition) => {
        this.posicion.set(posicion);

        console.log(posicion.coords.latitude);
        console.log(posicion.coords.longitude);
        console.log(posicion.coords.accuracy);
      },
      (error: GeolocationPositionError) => {
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
      },
    );
  }
}

export default UbicacionPage;
