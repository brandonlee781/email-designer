import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { EmailCard } from './email-card.model';

export interface EmailCardState extends EntityState<EmailCard> {
  cards: EmailCard[];
  ui: {
    navDrawerOpen: Boolean,
  };
}

const initialState = {
  card: [],
  ui: { navDrawerOpen: true },
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'EmailCard' })
export class EmailCardStore extends EntityStore<EmailCardState, EmailCard> {

  constructor() {
    super(initialState);
  }

  updateNavDrawer(state) {
    this.updateRoot({ ui: { navDrawerOpen: state } });
  }

}

