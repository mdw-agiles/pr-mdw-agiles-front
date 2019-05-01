import {Hotel} from './hotel.model';

export interface Room {
  name: string;
  price: number;
  hotel: Hotel;
}
