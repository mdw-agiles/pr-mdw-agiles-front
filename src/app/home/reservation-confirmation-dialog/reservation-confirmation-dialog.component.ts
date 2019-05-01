import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-reservation-confirmation-dialog',
  templateUrl: './reservation-confirmation-dialog.component.html',
  styleUrls: ['./reservation-confirmation-dialog.component.css']
})
export class ReservationConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
