import {Hotel} from './hotel.model';

export interface Room {
  id: string;
  name: string;
  price: number;
  hotel: Hotel;
}
