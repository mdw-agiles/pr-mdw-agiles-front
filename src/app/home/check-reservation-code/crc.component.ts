import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ReservationService} from '../shared/reservation.service';

@Component({
  templateUrl: 'crc-dialog.component.html',
  styleUrls: ['crc-dialog.component.css']
})

export class CheckReservationCodeDialogComponent {

  code: string = undefined;

  constructor(
    private snackBar: MatSnackBar,
    private reservationService: ReservationService
  ) {
  }

  invalid() {
    return (!this.code && !this.code);
  }

  check() {
    if (this.code) {
      this.reservationService.getReservationByCode(this.code).subscribe(
        response => {
            if (response.length > 0) {
              this.snackBar.open('Successful operation. Reservation found !!', '', {
                duration: 2000
              });
              // TODO: Show reservation
            } else {
              this.snackBar.open('Reservation code not found. Try again.', 'Error', {
                duration: 2000
              });
            }
        },
        err => {
          this.snackBar.open('Reservation code not found', 'Error', {
            duration: 2000
          });
        }
      );
    } else {
      this.snackBar.open('Input a correct code', 'Error', {
        duration: 2000
      });
    }
  }
}
