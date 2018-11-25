import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EmailStore } from './email.store';
import { HttpClient } from '@angular/common/http';
import { createEmail, Email } from './email.model';
import { LocationQuery } from 'src/app/features/location/state';
import * as shortid from 'shortid';
import { EmailCardQuery, EmailCardService } from '../email-card';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EmailQuery } from './email.query';

@Injectable({ providedIn: 'root' })
export class EmailService {
  private emailCollection: AngularFirestoreCollection<Email>;

  constructor(
    private emailStore: EmailStore,
    private emailQuery: EmailQuery,
    private emailCardQuery: EmailCardQuery,
    private emailCardService: EmailCardService,
    private locationQuery: LocationQuery,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.emailCollection = this.afs.collection<Email>('emails');
    this.get();
  }

  get() {
    this.emailCollection
      .valueChanges()
      .subscribe((emails: Email[]) => {
        this.emailStore.set(emails);
      });
  }

  addEmail(data: Partial<Email> = {}) {
    if (!data.location) {
      data.location = this.locationQuery.getEntity('sc');
    }
    const id = this.afs.createId();
    const email = createEmail({id, ...data});

    this.emailCollection.doc(id).set(email)
      .then(res => {
        this.emailStore.add(email);
        this.router.navigate(['/email', email.id]);
      });
  }

  selectEmail(id) {
    this.emailStore.setActive(id);
  }

  modifyEmail(field, value) {
    const emailId = this.emailQuery.getActiveId();
    this.emailCollection.doc(emailId.toString())
      .update({ [field]: value })
      .then(res => {
        this.emailStore.updateActive(e => ({ [field]: value }));
      })
      .catch(err => console.error(err));
  }

  setLocation(locationId) {
    const location = this.locationQuery.getEntity(locationId);
    const email = this.emailQuery.getActive();

    this.emailCollection.doc(email.id.toString())
      .update({ location })
      .then(res => {
        this.emailStore.updateActive(() => ({ location }));
      })
      .catch(err => console.error(err));
  }

  deleteEmail(emailId) {
    const cards = this.emailCardQuery.getAll()
      .filter(card => card.emailId === emailId);

    cards.forEach(card => {
      this.emailCardService.deleteCard(card.id);
    });

    this.emailCollection.doc(emailId).delete()
      .then(res => {
        this.emailStore.remove(emailId);
      })
      .catch(err => console.error(err));
  }

  copyEmail(email) {
    const id = this.afs.createId();
    const cards = this.emailCardQuery.getAll()
      .filter(card => card.emailId === email.id);

    const newEmail = {
      ...email,
      id,
      name: email.name + ' Copy',
    };

    cards.forEach(card => {
      this.emailCardService.addCard(card, newEmail);
    });

    this.emailCollection.doc(id).set(newEmail)
      .then(res => {
        this.emailStore.add(newEmail);
        // this.router.navigate(['/email', email.id]);
      });


  }

}
