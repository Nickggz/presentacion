import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-ubicacion',
  styleUrl: './ubicacion.page.css',
  templateUrl: './ubicacion.page.html',
})
export class UbicacionPage {
  // ¿El navegador tiene la Geolocation API?
  public readonly soportada = 'geolocation' in navigator;

  // La API solo funciona en contexto seguro: HTTPS o localhost
  public readonly contextoSeguro = window.isSecureContext;

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
        console.error('Error obteniendo ubicación:', error.message);
      },
    );
  }
}

export default UbicacionPage;
