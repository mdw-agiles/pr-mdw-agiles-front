import {Component, Inject} from '@angular/core';
import {Reservation} from '../models/reservation.model';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-summary-dialog-reservation',
  styleUrls: ['./summary-reservation.component.css'],
  templateUrl: './summary-reservation.component.html'
})

export class SummaryReservationDialogComponent {

  reservation: Reservation;
  hideElement = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.reservation = data['reservation'];
  }
}


