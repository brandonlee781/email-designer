import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { EmailStore } from './email.store';
import { HttpClient } from '@angular/common/http';
import { createEmail, Email } from './email.model';
import { LocationQuery } from 'src/app/features/location/state';
import * as shortid from 'shortid';
import { EmailCardQuery, EmailCardService } from '../email-card';

@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor(
    private emailStore: EmailStore,
    private emailCardQuery: EmailCardQuery,
    private emailCardService: EmailCardService,
    private locationQuery: LocationQuery,
  ) {}

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.emailStore.set(entities);
    // });
  }

  addEmail(data: Partial<Email> = {}) {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.emailStore.add(entity);
    // });
    if (!data.location) {
      data.location = this.locationQuery.getEntity('sc');
    }
    const email = createEmail(data);
    this.emailStore.add(email);
    return email;
  }

  selectEmail(id) {
    this.emailStore.setActive(id);
  }

  modifyEmail(field, value) {
    this.emailStore.updateActive(e => ({ [field]: value }));
  }

  setLocation(locationId) {
    const location = this.locationQuery.getEntity(locationId);
    this.emailStore.updateActive(() => ({ location }));
  }

  async deleteEmail(emailId) {
    const cards = this.emailCardQuery.getAll()
      .filter(card => card.emailId === emailId);

    cards.forEach(card => {
      this.emailCardService.deleteCard(card.id);
    });

    this.emailStore.remove(emailId);
  }

  copyEmail(email) {
    const cards = this.emailCardQuery.getAll()
      .filter(card => card.emailId === email.id);

    const newEmail = Object.assign({}, email, {
      id: shortid.generate(),
      name: email.name + ' Copy',
    });

    cards.forEach(card => {
      this.emailCardService.addCard(card, newEmail);
    });

    this.emailStore.add(newEmail);

  }

}
