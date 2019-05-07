import {Component} from '@angular/core';
import {HotelChain} from './models/hotel-chain.model';
import {GenericMatSelect} from '../shared/models/generic-mat-select.model';
import {ReservationService} from '../shared/reservation.service';
import {Hotel} from './models/hotel.model';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
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
  hotelSelected: Hotel;
  hasHotelsFound: boolean;
  dataSourceHotel: MatTableDataSource<Hotel>;
  displayedHotelColumns = ['id', 'name', 'rooms'];
  dataSourceRoom: MatTableDataSource<Room>;
  displayedRoomColumns = ['id', 'name', 'price', 'reserve'];
  hasRoomsFound: boolean;
  rooms: Room[];
  roomSelected: Room;
  isDatePickerShown: boolean;
  hasFreeHours: boolean;
  hourSelected = false;
  dateSelected: string;
  selectedReservation: Reservation;
  bookedDateTimes = [];
  hoursBooked = [];
  hoursFree = [];
  durationSelect = [2, 4, 6, 8];

  constructor(
    private reservationService: ReservationService,
    private snackBar: MatSnackBar
  ) {
    this.initComponent();
  }

  initComponent() {
    this.matSelectHotelChain = [];
    this.isHotelChainSelected = false;
    this.obtainAllHotelChains();
    this.hotelChain = {id: '', name: ''};
    this.hotels = [];
    this.hotelSelected = {
      id: '',
      name: '',
      hotelChain: this.hotelChain,
    };
    this.roomSelected = {
      id: '',
      name: '',
      price: 0,
      hotel: this.hotelSelected,
    };
    this.hasHotelsFound = false;
    this.hasRoomsFound = false;
    this.rooms = [];
    this.isDatePickerShown = false;
    this.hasFreeHours = false;
    this.selectedReservation = {
      cost: 0,
      dateTime: null,
      duration: 0,
      hotel: this.hotelSelected,
      room: this.roomSelected,
    };
    this.dateSelected = '';
    this.bookedDateTimes = [];
    this.hoursBooked = [];
    this.hoursFree = [];
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

  showRooms(hotel: Hotel) {
    this.hasHotelsFound = false;
    this.hotelSelected = hotel;
    this.searchRoomsByHotel();
  }

  searchRoomsByHotel() {
    this.reservationService.getAllRoomByHotel(this.hotelSelected.name).subscribe(rooms => {
      this.rooms = rooms;
      this.dataSourceRoom = new MatTableDataSource<Room>(this.rooms);
      this.hasRoomsFound = true;
    }, () => {
      this.hasHotelsFound = true;
      this.hasRoomsFound = false;
    });
  }

  showDatePicker(room: Room) {
    this.roomSelected = room;
    this.hasRoomsFound = false;
    this.isDatePickerShown = true;
  }

  showFreeHours(date: string) {
    this.hasFreeHours = true;
    this.manageDateSelected(date);
    this.obtainBookedDateTimes();
  }

  manageDateSelected(date: string) {
    const dateSelected =  date.split('/');
    const month = (dateSelected[0].length === 1)
      ? `0${dateSelected[0]}`
      : dateSelected[0];
    const day = (dateSelected[1].length === 1)
      ? `0${dateSelected[1]}`
      : dateSelected[1];
    const year = dateSelected[2];
    this.dateSelected = `${year}-${month}-${day}`;
  }

  obtainBookedDateTimes() {
    this.reservationService.getBookedDateTimesByRoomAndDate(this.roomSelected.id, this.dateSelected)
      .subscribe(
        dates => {
          this.hasFreeHours = true;
          this.bookedDateTimes = dates;
          const hours = Array.from(Array(24 - new Date('01/01/2000 00:00').getHours()), (x, i) => ('0' + (23 - i))
            .slice(-2) + ':00')
            .reverse();
          this.hoursFree = hours.filter((hourArray, index) => {
            function isReserved(hour: string) {
              let inside;
              dates.forEach(function(e, i) {
                let x, q;
                q = new Date(e);
                q = new Date(q.setHours(q.getHours() - 2));
                x = q.getHours() < 10 ? '0' + q.getHours() + ':00' : q.getHours() + ':00';
                if (!inside) {
                  inside = x === hour;
                }
              });
              return !inside;
            }
            return isReserved(hourArray);
          });
        },
        err => {
          this.snackBar.open('Error al obtener las horas libres', 'Error', {
            duration: 2000
          });
          this.hasFreeHours = false;
        }
      );
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

  hourChange() {
    this.hourSelected = true;
  }
}


