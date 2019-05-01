import {Component} from '@angular/core';
import {HotelChain} from './models/hotel-chain.model';
import {GenericMatSelect} from '../shared/models/generic-mat-select.model';
import {ReservationService} from '../shared/reservation.service';
import {Hotel} from './models/hotel.model';
import {MatTableDataSource} from '@angular/material';
import {Room} from './models/room.model';

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
  dataSourceHotel: MatTableDataSource<Hotel>;
  displayedHotelColumns = ['id', 'name', 'rooms'];
  dataSourceRoom: MatTableDataSource<Room>;
  displayedRoomColumns = ['id', 'name', 'price', 'reserve'];
  hasRoomsFound: boolean;
  rooms: Room[];
  roomNameSelected: string;

  constructor(private reservationService: ReservationService) {
    this.matSelectHotelChain = [];
    this.isHotelChainSelected = false;
    this.obtainAllHotelChains();
    this.hotelChain = {name: ''};
    this.hotels = [];
    this.hasHotelsFound = false;
    this.hasRoomsFound = false;
    this.rooms = [];
    this.roomNameSelected = '';
  }

  obtainAllHotelChains() {
    this.reservationService.getAllHotelChains().subscribe(hotelChains => {
        this.fillMatSelectHotelChain(hotelChains);
      },
      () => {
        this.isHotelChainSelected = false;
      });
  }

  fillMatSelectHotelChain(hotelChains: HotelChain[]) {
    hotelChains.forEach(hotelChain => {
      this.matSelectHotelChain.push({value: hotelChain.name, viewValue: hotelChain.name});
    });
  }

  manageHotelChainSelected(chainSelected) {
    this.isHotelChainSelected = true;
    this.hasRoomsFound = false;
    this.hasHotelsFound = false;
    this.hotelChain.name = chainSelected.value;
  }

  searchTicketByHotelChain() {
    this.reservationService.getAllHotelByHotelChain(this.hotelChain.name).subscribe(hotels => {
      this.hotels = hotels;
      this.dataSourceHotel = new MatTableDataSource<Hotel>(this.hotels);
      this.hasHotelsFound = true;
      this.hasRoomsFound = false;
    }, () => this.hasHotelsFound = false);
  }

  showRooms(room: string) {
    this.hasHotelsFound = false;
    this.roomNameSelected = room;
    this.searchRoomsByHotel();
  }

  searchRoomsByHotel() {
    this.reservationService.getAllRoomByHotel(this.roomNameSelected).subscribe(rooms => {
      this.rooms = rooms;
      this.dataSourceRoom = new MatTableDataSource<Room>(this.rooms);
      this.hasRoomsFound = true;
    }, () => {
      this.hasHotelsFound = true;
      this.hasRoomsFound = false;
    });
  }

  reserve(room: string) {

  }
}


