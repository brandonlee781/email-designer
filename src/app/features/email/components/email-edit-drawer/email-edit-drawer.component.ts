import { Component, OnInit, Input } from '@angular/core';
import { EmailCard, EmailCardQuery, EmailCardService } from 'src/app/features/email/state/email-card';
import { Observable, Subject } from 'rxjs';
import { SavedCardService } from '../../state/saved-card';

interface ModifyFieldArgs {
  field: string;
  value: any;
}

@Component({
  selector: 'ed-email-edit-drawer',
  templateUrl: './email-edit-drawer.component.html',
  styleUrls: ['./email-edit-drawer.component.scss']
})
export class EmailEditDrawerComponent implements OnInit {
  @Input() selectedCard: EmailCard;

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

  constructor(
    private emailCardService: EmailCardService,
    private savedCardService: SavedCardService,
  ) {
    this.updateField
      .subscribe(({field, value}: ModifyFieldArgs) => {
        if (field === 'text') {
          value = value.split('\n\n');
        }
        emailCardService.modifyCard(field, value);
      });
  }
  ngOnInit() {
  }

  closeRightNav() {
    this.emailCardService.selectCard(null);
    // this.store.dispatch(new SelectComponent());
  }

  saveCard() {
    const newCard = Object.assign({}, this.selectedCard, {
      name: this.selectedCard.title,
    });
    this.savedCardService.saveCard(newCard);
  }

  deleteComponent() {
    if (confirm('Are you sure you want to remove this card?')) {
      this.emailCardService.deleteCard(this.selectedCard.id);
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

      this.emailCardService.modifyCard('options', options);
    }
  }
}
