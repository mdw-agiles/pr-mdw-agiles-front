import {Injectable} from '@angular/core';

import {HttpService} from '../../core/http.service';

@Injectable()
export class AdminsService {
  static END_POINT = '/admins';
  static DB = '/db';

  constructor(private httpService: HttpService) {
  }

  deleteDb(): void {
    this.httpService.successful().delete(AdminsService.END_POINT + AdminsService.DB).subscribe(() => {
    });
  }

  seedDb(file: File): void {
    let formData: FormData = null;
    if (file) {
      formData = new FormData();
      formData.append('file', file, file.name);
    }
    this.httpService.successful().post(AdminsService.END_POINT + AdminsService.DB, formData).subscribe(() => {
    });
  }

}
