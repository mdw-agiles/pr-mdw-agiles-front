import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../models/reservation.model';
import {ReservationService} from '../../shared/reservation.service';
import {MatDialog} from '@angular/material';
import {ReservationConfirmationDialogComponent} from '../../reservation-confirmation-dialog/reservation-confirmation-dialog.component';


@Component({
  selector: 'app-summary-reservation',
  styleUrls: ['./summary-reservation.component.css'],
  templateUrl: './summary-reservation.component.html'
})

export class SummaryReservationComponent implements OnInit {

  @Input() reservation: Reservation;
  reservationCode: string;

  constructor(private reservationService: ReservationService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.reservationCode = null;
  }

  cancel() {
    this.reservation = null;
    this.reservationCode = null;
  }

  // Call to dummy postReservation service
  reserve() {
    const codeObservable = this.reservationService.postReservation();
    codeObservable.subscribe((reservationCodePost: string) => {
      this.reservationCode = reservationCodePost;
      console.log(this.reservationCode);
      this.dialog.open(ReservationConfirmationDialogComponent, {
        data: {code: this.reservationCode},
      });
    });
  }

}


