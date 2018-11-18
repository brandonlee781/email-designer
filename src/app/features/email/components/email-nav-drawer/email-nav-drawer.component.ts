import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EmailState, StandardComponent, CustomComponent, AddComponent } from '../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ed-email-nav-drawer',
  templateUrl: './email-nav-drawer.component.html',
  styleUrls: ['./email-nav-drawer.component.scss']
})
export class EmailNavDrawerComponent implements OnInit {
  @Select(EmailState.getStandardComponents) standardComponents$: Observable<StandardComponent>;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onStandardTileClick(options) {
    const customComponent: CustomComponent = {
      paddingTop: 20,
      paddingBottom: 0,
      text: null,
      marginBottom: true,
      titleAlignment: 'center',
      textAlignment: 'center',
      titleCase: 'uppercase',
      options,
    };
    this.store.dispatch(new AddComponent(customComponent))
  }

}
