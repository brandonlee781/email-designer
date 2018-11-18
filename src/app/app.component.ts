import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetNavDrawer } from './features/ui/store';

@Component({
  selector: 'ed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EmailDesigner';

  constructor(private store: Store) {}

  toggleNavDrawer() {
    this.store.dispatch(new SetNavDrawer());
  }
}
