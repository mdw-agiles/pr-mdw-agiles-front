import {ApiEndpoint} from './api-endpoint.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ReservationService {

  cadena = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private httpService: HttpService) {}

  getReservationByCode(reservationCode: string): Observable<any> {
    return this.httpService.param('code', reservationCode).get(ApiEndpoint.RESERVATION_SEARCH);
  }

  public postReservation(): any {
    const codeObservable = new Observable(observer => {
      let result = '';
      for (let i = 40; i > 0; --i) {
        result += this.cadena[Math.floor(Math.random() * this.cadena.length)];
      }
      observer.next(result);
    });

    return codeObservable;
  }
}
