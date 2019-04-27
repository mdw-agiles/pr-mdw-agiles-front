import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';

import {TokensService} from '../core/tokens.service';
import {CancelYesDialogComponent} from '../core/cancel-yes-dialog.component';
import {AdminsService} from './admins/admins.service';
import {UserService} from './users/user.service';
import {DbSeedDialogComponent} from './admins/db-seed-dialog.component';
import {UsersComponent} from './users/users.component';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],

})
export class HomeComponent implements OnInit {
  static URL = 'home';

  username: string;

  constructor(private router: Router, private dialog: MatDialog,
              private tokensService: TokensService, private userService: UserService, private adminsService: AdminsService) {
  }

  ngOnInit(): void {
    this.username = this.tokensService.getName();
  }

  isAdmin(): boolean {
    return this.tokensService.isAdmin();
  }

  isManager(): boolean {
    return this.tokensService.isManager();
  }

  deleteDb() {
    this.dialog.open(CancelYesDialogComponent).afterClosed().subscribe(
      result => {
        if (result) {
          this.adminsService.deleteDb();
        }
      });
  }

  seedDb() {
    this.dialog.open(DbSeedDialogComponent);
  }

  logout() {
    this.tokensService.logout();
  }

  customers() {
    this.router.navigate([HomeComponent.URL, UsersComponent.URL]);
  }

}
