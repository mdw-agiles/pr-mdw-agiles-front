import {Component} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ReservationService} from '../shared/reservation.service';
import {SummaryReservationDialogComponent} from '../reservations/summary-reservation/summary-reservation-dialog.component';

@Component({
  templateUrl: 'crc-dialog.component.html',
  styleUrls: ['crc-dialog.component.css']
})

export class CheckReservationCodeDialogComponent {

  code: string = undefined;

  constructor(
    private snackBar: MatSnackBar,
    private reservationService: ReservationService,
    private dialog: MatDialog
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
              this.reservationService.getReservationByCode(this.code).subscribe(
                res => {
                  this.dialog.open(SummaryReservationDialogComponent, {
                    data: {
                      reservation: res[0]
                    },
                  });
                },
                err => {
                  this.snackBar.open('Reservation code not found. Introduce a correct code.', 'Error', {
                    duration: 2000
                  });
                }
              );
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
