import { Component } from '@angular/core';

import { MyAuth0Service } from './services/auth0Service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'IE Simulator';

  constructor(public auth: MyAuth0Service) {}
}
