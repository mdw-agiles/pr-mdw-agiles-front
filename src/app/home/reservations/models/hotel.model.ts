import {HotelChain} from './hotel-chain.model';

export interface Hotel {
  id: string;
  name: string;
  hotelChain: HotelChain;
}

