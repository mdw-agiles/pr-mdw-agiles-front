import {Room} from './room.model';
import {Hotel} from './hotel.model';

export interface Reservation {
  cost: number;
  dateTime: Date;
  duration: number;
  hotel: Hotel;
  room: Room ;
}
