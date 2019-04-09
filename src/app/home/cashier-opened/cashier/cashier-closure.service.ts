import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../../core/http.service';
import {ApiEndpoint} from '../../shared/api-endpoint.model';
import {CashierState} from './cashier-state.model';
import {CashierClosure} from './cashier-closure.model';

@Injectable()
export class CashierClosureService {
  static STATE = '/state';

  constructor(private httpService: HttpService) {
  }

  close(cashierClosure: CashierClosure): Observable<any> {
    return this.httpService.patch(ApiEndpoint.CASHIER_CLOSURES_LAST, cashierClosure);
  }

  readLastTotals(): Observable<CashierState> {
    return this.httpService.get(
      ApiEndpoint.CASHIER_CLOSURES_LAST + CashierClosureService.STATE);
  }

}
