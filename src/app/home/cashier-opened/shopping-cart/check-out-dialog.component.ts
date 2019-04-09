import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

import {TicketCreation} from './ticket-creation.model';
import {ShoppingCartService} from './shopping-cart.service';

@Component({
  templateUrl: 'check-out-dialog.component.html',
  styleUrls: ['shopping-cart.component.css']
})
export class CheckOutDialogComponent {

  totalPurchase: number;
  requestedInvoice = false;
  ticketCreation: TicketCreation;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private shoppingCartService: ShoppingCartService) {
    this.totalPurchase = data.total;
    this.ticketCreation = data.ticketCreation;
  }

  static format(value: number): number {
    return value ? value : 0; // empty string,NaN,false,undefined,null,0 is: false
  }

  uncommitted() {
    return this.shoppingCartService.uncommitArticlesExist();
  }

  totalCommitted() {
    return this.shoppingCartService.getTotalCommitted();
  }

  warning(): boolean {
    return (!this.ticketCreation.userMobile) && this.shoppingCartService.uncommitArticlesExist();
  }

  returnedAmount(): number {
    return Math.round(
      (CheckOutDialogComponent.format(this.ticketCreation.cash)
        + CheckOutDialogComponent.format(this.ticketCreation.card)
        + CheckOutDialogComponent.format(this.ticketCreation.voucher)
        - this.totalPurchase) * 100
    ) / 100;
  }

  returnedCash(): number {
    if (this.ticketCreation.cash >= this.returnedAmount()) {
      return this.returnedAmount();
    } else {
      return this.ticketCreation.cash;
    }
  }

  fillCard() {
    if (this.returnedAmount() < 0) {
      this.ticketCreation.card = -this.returnedAmount();
    } else {
      this.ticketCreation.card = this.totalPurchase;
      this.ticketCreation.cash = 0;
    }
  }

  fillCash() {
    this.ticketCreation.cash = CheckOutDialogComponent.format(this.ticketCreation.cash);
    if (this.returnedAmount() < 0 && this.ticketCreation.cash === 0) {
      this.ticketCreation.cash = -this.returnedAmount();
    } else if (this.ticketCreation.cash < 20) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 5) + 1) * 5;
    } else if (this.ticketCreation.cash < 50) {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 10) + 1) * 10;
    } else {
      this.ticketCreation.cash = (Math.round(this.ticketCreation.cash / 50) + 1) * 50;
    }
  }

  consumeVoucher() {
    // TODO consumir un vale que se entrega como parte del pago
  }

  invalidCheckOut(): boolean {
    return (this.totalPurchase + this.returnedAmount() - this.shoppingCartService.getTotalCommitted() < -0.01); // rounding errors
  }

  checkOut() {
    const returned = this.returnedAmount();
    const cash = this.ticketCreation.cash;
    let voucher = 0;
    this.ticketCreation.cash = CheckOutDialogComponent.format(this.ticketCreation.cash);
    this.ticketCreation.card = CheckOutDialogComponent.format(this.ticketCreation.card);
    this.ticketCreation.voucher = CheckOutDialogComponent.format(this.ticketCreation.voucher);
    if (returned > 0) {
      this.ticketCreation.cash -= returned;
    }
    if (this.ticketCreation.cash < 0) {
      voucher = -this.ticketCreation.cash;
      this.ticketCreation.cash = 0;
    }

    this.ticketCreation.note = '';
    if (this.ticketCreation.card > 0) {
      this.ticketCreation.note += ' Pay with card: ' + Math.round(this.ticketCreation.card * 100) / 100 + '.';
    }
    if (this.ticketCreation.voucher > 0) {
      this.ticketCreation.note += ' Pay with voucher: ' + Math.round(this.ticketCreation.voucher * 100) / 100 + '.';
    }
    if (this.ticketCreation.cash > 0) {
      this.ticketCreation.note += ' Pay with cash: ' + Math.round(cash * 100) / 100 + '.';
    }
    if (returned > 0) {
      this.ticketCreation.note += ' Return: ' + Math.round(returned * 100) / 100 + '.';
    }
    this.shoppingCartService.checkOut(this.ticketCreation).subscribe(() => {
        if (voucher > 0) {
          // TODO crear un vale como parte del pago, luego crear la factura
          this.createInvoice();
        } else {
          this.createInvoice();
        }
      }
    );
  }

  createInvoice() {
    if (this.requestedInvoice) {
      // TODO crear una factura
    } else {
      this.dialog.closeAll();
    }
  }

  invalidInvoice(): boolean {
    // TODO pendiente de calcular. Hace falta tener al usuario totalmente completado
    return true;
  }

}
