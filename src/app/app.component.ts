import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { EmailCardService } from './features/email/state/email-card';

@Component({
  selector: 'ed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmailDesigner';

  constructor(private emailService: EmailCardService) {}

  toggleNavDrawer() {
    this.emailService.updateNavDrawer(undefined);
    // this.store.dispatch(new SetNavDrawer());
  }
}
