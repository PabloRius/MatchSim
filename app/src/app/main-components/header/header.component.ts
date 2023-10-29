import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { MyAuth0Service } from 'src/app/services/auth0Service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    private myAuth0: MyAuth0Service,
    public auth0: AuthService
  ) {
    this.myAuth0.handleAuthentication();
  }

  ngOnInit() {
    console.log(localStorage.getItem('profile'));
    this.loadUserData();
  }

  // User details
  username = '';
  name = '';
  picture = '';
  email = '';

  loadUserData() {
    this.auth0.isAuthenticated$.subscribe((loggedIn: boolean) => {
      if (
        loggedIn &&
        (localStorage.getItem('userId') == '' ||
          localStorage.getItem('profile') == '')
      ) {
        console.log('User logged');
        this.auth0.idTokenClaims$.subscribe((idToken: any) => {
          this.myAuth0.retrieveUserData(idToken.sub).subscribe((result) => {
            this.username = result.username;
            this.name = result.name;
            this.picture = result.picture;
            this.email = result.email;
          });
        });
      } else if (
        loggedIn &&
        localStorage.getItem('userId') != '' &&
        localStorage.getItem('profile') != ''
      ) {
        let profile = localStorage.getItem('profile');
        if (profile) {
          let parsed_profile = JSON.parse(profile);
          this.username = parsed_profile.username;
          this.name = parsed_profile.name;
          this.picture = parsed_profile.picture;
          this.email = parsed_profile.email;
        }
      }
    });
  }

  loginRedirect() {
    this.myAuth0.login();
  }
  logoutRedirect() {
    this.myAuth0.logout();
  }
}
