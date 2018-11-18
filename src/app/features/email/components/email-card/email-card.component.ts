import { Component, OnInit, Input } from '@angular/core';
import { CustomComponent } from '../../store/email.types';
import { Store } from '@ngxs/store';
import { SelectComponent, DeleteComponent } from '../../store';

@Component({
  selector: 'ed-email-card',
  templateUrl: './email-card.component.html',
  styleUrls: ['./email-card.component.scss']
})
export class EmailCardComponent implements OnInit {
  @Input() component: CustomComponent;
  @Input() selected: boolean;

  showImage = false;
  showButton = false;
  showText = false;

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.component.options.indexOf('button') >= 0) {
      this.showButton = true;
    }
    if (this.component.options.indexOf('text') >= 0) {
      this.showText = true;
    }
    if (this.component.options.indexOf('image') >= 0) {
      this.showImage = true;
    }
  }

  onCardClick() {
    this.store.dispatch(new SelectComponent(this.component.id));
  }

  onClickDelete() {
    if (confirm('Are you sure you want to remove this card?')) {
      this.store.dispatch(new DeleteComponent(this.component.id));
    }
  }

}
