import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { EmailCardService } from './features/email/state/email-card';
import { Location } from '@angular/common';
import { AuthenticationService } from './core/auth/services/authentication.service';

@Component({
  selector: 'ed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmailDesigner';
  darkTheme = false;
  user$ = this.authService.user;

  constructor(
    private emailCardService: EmailCardService,
    private location: Location,
    private authService: AuthenticationService,
  ) {}

  toggleNavDrawer() {
    this.emailCardService.updateNavDrawer();
  }

  isEmailRouteActivated(): boolean {
    return this.location.path().indexOf('/email') > -1;
}
}
