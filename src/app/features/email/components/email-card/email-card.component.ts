import { Component, OnInit, Input } from '@angular/core';
import { EmailCard, EmailCardService, EmailCardQuery } from '../../state/email-card';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { SavedCardService } from '../../state/saved-card';

@Component({
  selector: 'ed-email-card',
  templateUrl: './email-card.component.html',
  styleUrls: ['./email-card.component.scss']
})
export class EmailCardComponent implements OnInit {
  @Input() component: EmailCard;
  activeId$: Observable<ID> = this.emailQuery.selectActiveId();

  constructor(
    private emailCardService: EmailCardService,
    private emailQuery: EmailCardQuery,
    private savedCardService: SavedCardService,
  ) {}

  ngOnInit() {}

  onCardClick(e) {
    if (e.target.className !== 'mat-icon mat-black material-icons') {
      this.emailCardService.selectCard(this.component.id);
    }
  }

  onClickDelete() {
    if (confirm('Are you sure you want to remove this card?')) {
      this.emailCardService.deleteCard(this.component.id);
    }
  }

  onClickSave() {
    this.savedCardService.saveCard(this.component);
  }

}
