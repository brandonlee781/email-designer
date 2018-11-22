import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EmailStore, EmailState } from './email.store';
import { Email } from './email.model';

@Injectable({ providedIn: 'root' })
export class EmailQuery extends QueryEntity<EmailState, Email> {

  constructor(protected store: EmailStore) {
    super(store);
  }

}
