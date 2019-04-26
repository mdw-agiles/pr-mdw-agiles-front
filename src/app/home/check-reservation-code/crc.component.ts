import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {TokensService} from '../../core/tokens.service';
import {Reservation} from './crc.model';

@Component({
  templateUrl: 'crc-dialog.component.html',
  styleUrls: ['crc-dialog.component.css']
})

export class CheckReservationCodeDialogComponent {

  reservation: Reservation = {code: undefined};
  username: string;

  constructor(
    private snackBar: MatSnackBar,
    private tokensService: TokensService
  ) {
  }

  invalid() {
    return (!this.reservation.code && !this.reservation.code);
  }

  check() {
    this.snackBar.open('Reservation code not found', 'Error', {
      duration: 2000
    });
  }
}
