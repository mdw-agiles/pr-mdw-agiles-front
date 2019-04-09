import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from './api-endpoint.model';
import {CashierLast} from './cashier-last.model';


@Injectable()
export class CashierService {

  constructor(private httpService: HttpService) {
  }

  readLast(): Observable<CashierLast> {
    return this.httpService.get(ApiEndpoint.CASHIER_CLOSURES_LAST);
  }

  isClosedCashier(): Observable<boolean> {
    return this.readLast().pipe(
      map(cashierLast => cashierLast.closed)
    );
  }

  open(): Observable<any> {
    return this.httpService.post(ApiEndpoint.CASHIER_CLOSURES);
  }

}
