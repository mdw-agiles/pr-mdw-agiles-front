import {Component} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  version: string;
  apiEndPoint: string;
  profile: string;

  constructor() {
    this.version = environment.VERSION;
    this.apiEndPoint = environment.API;
    this.profile = environment.production ? 'Production' : 'Develop';
  }
}
