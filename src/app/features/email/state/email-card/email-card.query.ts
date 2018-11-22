import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EmailCardStore, EmailCardState } from './email-card.store';
import { EmailCard } from './email-card.model';
import { Observable } from 'rxjs';
import { filter, map} from 'rxjs/operators';
import { EmailQuery } from '../email/email.query';

@Injectable({ providedIn: 'root' })
export class EmailCardQuery extends QueryEntity<EmailCardState, EmailCard> {
  isNavDrawerOpen$ = this.select(state => state.ui.navDrawerOpen);

  constructor(
    protected store: EmailCardStore,
    private emailQuery: EmailQuery,
  ) {
    super(store);
  }

  selectEmailsCards(emailId): Observable<EmailCard[]> {
    return this.selectAll().pipe(
      map((cards: EmailCard[]) => cards.filter(card => card.emailId === emailId)),
    );
  }

}
