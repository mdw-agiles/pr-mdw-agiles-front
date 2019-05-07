import {ApiEndpoint} from './models/api-endpoint.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {HotelChain} from '../reservations/models/hotel-chain.model';
import {Hotel} from '../reservations/models/hotel.model';
import {Room} from '../reservations/models/room.model';

@Injectable()
export class ReservationService {

  cadena = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  constructor(private httpService: HttpService) {
  }

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

  getAllHotelChains(): Observable<HotelChain[]> {
    return this.httpService.get(ApiEndpoint.HOTEL_CHAINS);
  }

  getAllHotelByHotelChain(hotelChain: string): Observable<Hotel[]> {
    return this.httpService.param('hotelChain', hotelChain).get(ApiEndpoint.HOTEL_SEARCH);
  }

  getAllRoomByHotel(hotelName: string): Observable<Room[]> {
    return this.httpService.param('hotelName', hotelName).get(ApiEndpoint.ROOM_SEARCH);
  }

  getBookedDateTimesByRoomAndDate(roomId: string, date: string): Observable<Date[]> {
    return this.httpService.get(`${ApiEndpoint.ROOM}/${roomId}/${ApiEndpoint.BOOKED_DATE}/${date}`);
  }
}
