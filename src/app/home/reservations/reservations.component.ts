import { Component } from '@angular/core';
import {HotelChain} from './models/hotel-chain.model';
import {GenericMatSelect} from '../shared/models/generic-mat-select.model';
import {ReservationService} from '../shared/reservation.service';
import {Hotel} from './models/hotel.model';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-reservations',
  styleUrls: ['./reservations.component.css'],
  templateUrl: './reservations.component.html'
})

export class ReservationsComponent {
  hotelChain: HotelChain;
  isHotelChainSelected: boolean;
  matSelectHotelChain: GenericMatSelect[];
  hotels: Hotel[];
  hasHotelsFound: boolean;
  dataSource: MatTableDataSource<Hotel>;
  displayedColumns = ['id', 'hotelChainName', 'name'];

  constructor(private reservationService: ReservationService) {
    this.matSelectHotelChain = [];
    this.isHotelChainSelected = false;
    this.obtainAllHotelChains();
    this.hotelChain = { name: ''};
    this.hotels = [];
    this.hasHotelsFound = false;
  }

  obtainAllHotelChains() {
    this.reservationService.getAllHotelChains().subscribe( hotelChains => {
      this.fillMatSelectHotelChain(hotelChains);
    },
      () => {
      this.isHotelChainSelected = false;
      });
  }

  fillMatSelectHotelChain(hotelChains: HotelChain[]) {
    hotelChains.forEach(hotelChain => {
      this.matSelectHotelChain.push( {value: hotelChain.name, viewValue: hotelChain.name});
    });
  }

  manageHotelChainSelected(chainSelected) {
    this.isHotelChainSelected = true;
    this.hotelChain.name = chainSelected.value;
  }

  searchTicketByHotelChain() {
    this.reservationService.getAllHotelByHotelChain(this.hotelChain.name).subscribe(hotels => {
      this.hotels = hotels;
      this.dataSource = new MatTableDataSource<Hotel>(this.hotels);
      this.hasHotelsFound = true;
    }, () => this.hasHotelsFound = false );
  }
}


