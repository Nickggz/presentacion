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

  public latitude = signal<number | null>(null);
  public longitude = signal<number | null>(null);
  public accuracy = signal<number | null>(null);

  public obtenerUbicacion(): void {
    navigator.geolocation.getCurrentPosition(
      (posicion: GeolocationPosition) => {
        this.latitude.set(posicion.coords.latitude);
        this.longitude.set(posicion.coords.longitude);
        this.accuracy.set(posicion.coords.accuracy);

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
