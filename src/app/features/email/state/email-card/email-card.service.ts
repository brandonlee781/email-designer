import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EmailCardStore } from './email-card.store';
import { HttpClient } from '@angular/common/http';
import { createEmailCard, EmailCard } from './email-card.model';
import { EmailCardQuery } from './email-card.query';
import * as shortid from 'shortid';
import { Email } from '../email/email.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class EmailCardService {
  cardCollection: AngularFirestoreCollection<EmailCard>;

  constructor(
    private emailCardStore: EmailCardStore,
    private emailCardQuery: EmailCardQuery,
    private afs: AngularFirestore,
  ) {
    this.cardCollection = afs.collection<EmailCard>('email-cards');
    this.get();
  }

  get() {
    this.cardCollection
      .valueChanges()
      .subscribe((cards: EmailCard[]) => {
        this.emailCardStore.set(cards);
      });
  }

  addCard(card, email: Email) {
    const id = this.afs.createId();
    const newCard = createEmailCard({
      ...card,
      id,
      emailId: email.id,
    });

    this.cardCollection.doc(id).set(newCard)
      .then(res => {
        this.emailCardStore.add(newCard);
      })
      .catch(err => console.error(err));
  }

  modifyCard(field, value) {
    const cardId = this.emailCardQuery.getActiveId();

    this.cardCollection.doc(cardId.toString())
      .update({ [field]: value })
      .then(res => {
        this.emailCardStore.updateActive(e => ({ [field]: value }));
      })
      .catch(err => console.error(err));
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
    this.cardCollection.doc(id.toString()).delete()
      .then(res => {
        this.emailCardStore.remove(id);
      })
      .catch(err => console.error(err));
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
