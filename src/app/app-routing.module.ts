import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UsersComponent} from './home/users/users.component';
import {DbSeedDialogComponent} from './home/admins/db-seed-dialog.component';
import {WelcomeComponent} from './welcome.component';
import {ReservationsComponent} from './home/reservations/reservations.component';
import {CheckReservationCodeDialogComponent} from './home/check-reservation-code/crc.component';
import {ConfirmReservationComponent} from './home/confirm-reservation/confirm-reservation.component';
import {ReservationConfirmationDialogComponent} from './home/reservation-confirmation-dialog/reservation-confirmation-dialog.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: UsersComponent.URL, component: UsersComponent},
      {path: ConfirmReservationComponent.URL, component: ConfirmReservationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static COMPONENTS = [
    HomeComponent,
    UsersComponent,
    WelcomeComponent,
    ConfirmReservationComponent,
    ReservationsComponent
  ];

  static DIALOGS = [
    DbSeedDialogComponent,
    CheckReservationCodeDialogComponent,
    ReservationConfirmationDialogComponent
  ];
}
