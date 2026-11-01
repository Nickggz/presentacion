import { Component } from '@angular/core';

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
}

export default UbicacionPage;
