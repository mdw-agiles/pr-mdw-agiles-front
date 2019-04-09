import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';

import {LoginDialogComponent} from './core/login-dialog.component';
import {HomeComponent} from './home/home.component';

@Component({
  templateUrl: 'welcome.component.html',
  styleUrls: ['welcome.component.css'],
})
export class WelcomeComponent {
  static URL = 'welcome';

  constructor(private dialog: MatDialog) {
  }

  login() {
    this.dialog.open(LoginDialogComponent,
      {
        data: {homeUrl: HomeComponent.URL}
      }
    );
  }
}
