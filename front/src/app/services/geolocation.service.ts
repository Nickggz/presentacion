import { Service } from '@angular/core';

@Service()
export class GeolocationService {
  public obtenerPosicion(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (posicion: GeolocationPosition) => {
          resolve(posicion);
        },
        (error: GeolocationPositionError) => {
          reject(error);
        },
      );
    });
  }

  public seguirPosicion(
    onPosicion: (posicion: GeolocationPosition) => void,
    onError: (error: GeolocationPositionError) => void,
  ): number {
    return navigator.geolocation.watchPosition(
      (posicion: GeolocationPosition) => {
        onPosicion(posicion);
      },
      (error: GeolocationPositionError) => {
        onError(error);
      },
    );
  }

  public detenerSeguimiento(id: number): void {
    navigator.geolocation.clearWatch(id);
  }
  

}
