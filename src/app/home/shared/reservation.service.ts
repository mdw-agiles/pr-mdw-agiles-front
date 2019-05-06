import {ApiEndpoint} from './models/api-endpoint.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {HotelChain} from '../reservations/models/hotel-chain.model';
import {Hotel} from '../reservations/models/hotel.model';
import {Room} from '../reservations/models/room.model';
import {Reservation} from '../reservations/models/reservation.model';

@Injectable()
export class ReservationService {

  constructor(private httpService: HttpService) {
  }

  getReservationByCode(reservationCode: string): Observable<any> {
    return this.httpService.param('code', reservationCode).get(ApiEndpoint.RESERVATION_SEARCH);
  }

  postReservation(reservation: Reservation): Observable<any> {
    return this.httpService
      .successful('Reserva creada correctamente')
      .post(ApiEndpoint.RESERVATION_RESERVATION, reservation, 'text');
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
}
