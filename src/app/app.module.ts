import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';

import {CoreModule} from './core/core.module';
import {CashierService} from './home/shared/cashier.service';
import {ArticleService} from './home/shared/article.service';
import {CashierClosureService} from './home/cashier-opened/cashier/cashier-closure.service';
import {ShoppingCartService} from './home/cashier-opened/shopping-cart/shopping-cart.service';
import {AdminsService} from './home/admins/admins.service';
import {UserService} from './home/users/user.service';
import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    AppMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AppRoutingModule.COMPONENTS,
    AppRoutingModule.DIALOGS
  ],
  entryComponents: [AppRoutingModule.DIALOGS],
  providers: [
    AdminsService,
    ArticleService,
    CashierClosureService,
    CashierService,
    ShoppingCartService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
