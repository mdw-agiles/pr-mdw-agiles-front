import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../shared/reservation.service';
import {ReservationConfirmationDialogComponent} from '../reservation-confirmation-dialog/reservation-confirmation-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.css']
})
export class ConfirmReservationComponent implements OnInit {
  static URL = 'confirm';
  reservationCode: string;

  constructor(private reservationService: ReservationService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  confirm() {
    const codeObservable = this.reservationService.postReservation();
    codeObservable.subscribe((reservationCodePost: string) => {
      this.reservationCode = reservationCodePost;
      console.log(this.reservationCode);
      this.dialog.open(ReservationConfirmationDialogComponent, {
        data: { code: this.reservationCode },
      });
    });
  }

}
