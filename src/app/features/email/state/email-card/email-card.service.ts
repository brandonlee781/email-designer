import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EmailCardStore } from './email-card.store';
import { HttpClient } from '@angular/common/http';
import { createEmailCard, EmailCard } from './email-card.model';
import { EmailCardQuery } from './email-card.query';
import * as shortid from 'shortid';
import { Email } from '../email/email.model';

@Injectable({ providedIn: 'root' })
export class EmailCardService {

  constructor(private emailCardStore: EmailCardStore, private emailCardQuery: EmailCardQuery) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.emailCardStore.set(entities);
    // });
  }

  addCard(card, email: Email) {
    if (card.id) {
      const newCard = Object.assign({}, card, {
        id: shortid.generate(),
        emailId: email.id,
      });
      this.emailCardStore.add(newCard);

    } else {
      card.emailId = email.id;
      this.emailCardStore.add(createEmailCard(card));
    }
  }

  modifyCard(field, value) {
    this.emailCardStore.updateActive(e => ({ [field]: value }));
  }

  moveCard({ id, previousIndex, nextIndex }) {
    //
  }

  selectCard(id: ID) {
    const activeId = this.emailCardQuery.getActiveId();

    if (id === activeId) {
      this.emailCardStore.setActive(null);
    } else {
      this.emailCardStore.setActive(id);
    }
  }

  deleteCard(id: ID) {
    this.emailCardStore.remove(id);
  }

  updateNavDrawer(state) {
    if (state !== undefined) {
      this.emailCardStore.updateNavDrawer(state);
    } else {
      this.emailCardQuery.selectOnce(storeState => storeState.ui.navDrawerOpen)
        .subscribe(currentState => {
          this.emailCardStore.updateNavDrawer(!currentState);
        });
    }
  }

}
