import {ApiEndpoint} from './models/api-endpoint.model';
import {Injectable} from '@angular/core';
import {HttpService} from '../../core/http.service';
import {Observable} from 'rxjs';
import {HotelChain} from '../reservations/models/hotel-chain.model';
import {Hotel} from '../reservations/models/hotel.model';

@Injectable()
export class ReservationService {

  constructor(private httpService: HttpService) {}

  getReservationByCode(reservationCode: string): Observable<any> {
    return this.httpService.param('code', reservationCode).get(ApiEndpoint.RESERVATION_SEARCH);
  }

  getAllHotelChains(): Observable<HotelChain[]> {
    return this.httpService.get(ApiEndpoint.HOTEL_CHAINS);
  }

  getAllHotelByHotelChain(hotenChain: string): Observable<Hotel[]> {
    return this.httpService.param('hotelChain', hotenChain).get(ApiEndpoint.HOTEL_SEARCH);
  }
}
