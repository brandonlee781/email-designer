import { Component, OnInit, Input } from '@angular/core';
import { CustomComponent } from 'src/app/features/email/store/email.types';
import { Subject } from 'rxjs';
import { ModifyComponent, DeleteComponent, SelectComponent } from 'src/app/features/email/store/email.actions';
import { Store } from '@ngxs/store';

interface ModifyFieldArgs {
  field: string;
  value: string;
}

@Component({
  selector: 'ed-right-nav',
  templateUrl: './right-nav.component.html',
  styleUrls: ['./right-nav.component.scss']
})
export class RightNavComponent implements OnInit {
  @Input() selectedCard: CustomComponent;

  textAlignment = [
    { key: 'center', text: 'Center' },
    { key: 'right', text: 'Right' },
    { key: 'left', text: 'Left' }
  ];

  textStyle = [
    { key: 'none', text: 'Normal' },
    { key: 'uppercase', text: 'All Caps'},
    { key: 'capitalize', text: 'Title Case' },
  ];

  public updateField = new Subject<ModifyFieldArgs>();

  constructor(private store: Store) {
    this.updateField
      .subscribe((data: ModifyFieldArgs) => {
        store.dispatch(new ModifyComponent(
          this.selectedCard.id,
          data.field,
          data.value
        ));
      });
  }
  ngOnInit() {}

  closeRightNav() {
    this.store.dispatch(new SelectComponent());
  }

  deleteComponent() {
    if (confirm('Are you sure you want to remove this card?')) {
      this.store.dispatch(new DeleteComponent(this.selectedCard.id));
    }
  }

  toggleCardOption(option) {
    let options;

    if (this.selectedCard.options) {
      if (this.selectedCard.options.includes(option)) {
        options = this.selectedCard.options.filter(o => o !== option);
      } else {
        options = [...this.selectedCard.options, option];
      }

      this.store.dispatch(new ModifyComponent(
        this.selectedCard.id,
        'options',
        options,
      ));
    }
  }

}
