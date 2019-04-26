import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UsersComponent} from './home/users/users.component';
import {DbSeedDialogComponent} from './home/admins/db-seed-dialog.component';
import {WelcomeComponent} from './welcome.component';
import {CheckReservationCodeDialogComponent} from './home/check-reservation-code/crc.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {path: WelcomeComponent.URL, component: WelcomeComponent},
  {
    path: HomeComponent.URL, component: HomeComponent,
    children: [
      {path: UsersComponent.URL, component: UsersComponent}
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
  ];

  static DIALOGS = [
    DbSeedDialogComponent,
    CheckReservationCodeDialogComponent
  ];
}
