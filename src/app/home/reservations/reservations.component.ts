import {Component} from '@angular/core';
import {HotelChain} from './models/hotel-chain.model';
import {GenericMatSelect} from '../shared/models/generic-mat-select.model';
import {ReservationService} from '../shared/reservation.service';
import {Hotel} from './models/hotel.model';
import {MatTableDataSource} from '@angular/material';
import {Room} from './models/room.model';
import {Reservation} from './models/reservation.model';

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
  selectedReservation: Reservation;

  constructor(private reservationService: ReservationService) {
    this.initComponent();
  }

  initComponent() {
    this.matSelectHotelChain = [];
    this.isHotelChainSelected = false;
    this.obtainAllHotelChains();
    this.hotelChain = {id: '', name: ''};
    this.hotels = [];
    this.hasHotelsFound = false;
    this.hasRoomsFound = false;
    this.rooms = [];
    this.roomNameSelected = '';
    this.selectedReservation = null;
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

  resetFilter() {
    this.initComponent();
    this.selectedReservation = null;
  }

  showSummaryReservation() {
    /*
      TODO: Servicio REST /reservation/reservation espera este DTOs
         {
          "id": "string",
          "code": "string",
          "cost": 0,
          "dateTime": "2019-05-04T19:44:42.346Z",
          "duration": 0,
          "hotel": {
            "id": "string",
            "name": "string",
            "hotelChain": {
              "id": "string",
              "name": "string"
            }
          },
          "room": {
            "id": "string",
            "name": "string",
            "price": 0,
            "hotel": {
              "id": "string",
              "name": "string",
              "hotelChain": {
                "id": "string",
                "name": "string"
              }
            }
          }
        }
     */


    const hotelChain: HotelChain = {
      id: '5cbc210bc2e17403fb397c27',
      name: 'NH Hoteles'
    };
    const hotel: Hotel = {
      id: '5cbc2a3fc2e17403fb397c5b',
      name: 'NH Madrid Centro',
      hotelChain: hotelChain
    };
    const room: Room = {
      id: '5cbc2adec2e17403fb397c6b',
      name: 'Normal 2 personas',
      price: 10,
      hotel: hotel
    };

    this.selectedReservation = {
      cost: room.price * 2,
      dateTime: new Date(),
      duration: 2,
      hotel: hotel,
      room: room
    };
  }

}


