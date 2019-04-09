import {Shopping} from './shopping.model';

export interface TicketCreation {
  userMobile?: number;
  cash: number;
  card: number;
  voucher: number;
  note: String;
  shoppingCart: Shopping[];
}
