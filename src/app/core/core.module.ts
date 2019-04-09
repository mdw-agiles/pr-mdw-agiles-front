import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

import {HttpService} from './http.service';
import {TokensService} from './tokens.service';

import {DateComponent} from './date.component';
import {LoginDialogComponent} from './login-dialog.component';
import {CancelYesDialogComponent} from './cancel-yes-dialog.component';
import {CrudComponent} from './crud.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
  ],
  declarations: [
    CancelYesDialogComponent,
    CrudComponent,
    DateComponent,
    LoginDialogComponent
  ],
  exports: [
    CancelYesDialogComponent,
    CrudComponent,
    DateComponent,
    LoginDialogComponent,

  ],
  entryComponents: [
    CancelYesDialogComponent,
    LoginDialogComponent
  ],
  providers: [
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
