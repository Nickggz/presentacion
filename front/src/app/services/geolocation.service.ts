import { Service } from '@angular/core';

@Service()
export class GeolocationService {
  public obtenerPosicion(opciones?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (posicion: GeolocationPosition) => {
          resolve(posicion);
        },
        (error: GeolocationPositionError) => {
          reject(error);
        },
        opciones,
      );
    });
  }

  public seguirPosicion(
    onPosicion: (posicion: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void,
    opciones?: PositionOptions,
  ): number {
    return navigator.geolocation.watchPosition(
      (posicion: GeolocationPosition) => {
        onPosicion(posicion);
      },
      (error: GeolocationPositionError) => {
        onError(error);
      },
      opciones,
    );
  }

  public detenerSeguimiento(id: number): void {
    navigator.geolocation.clearWatch(id);
  }
}
