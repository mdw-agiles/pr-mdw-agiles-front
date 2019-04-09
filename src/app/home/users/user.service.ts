import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpService} from '../../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {User} from './user.model';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(ApiEndpoint.USERS);
  }

}
