import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SavedCard } from './saved-card.model';

export interface SavedCardState extends EntityState<SavedCard> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'SavedCard' })
export class SavedCardStore extends EntityStore<SavedCardState, SavedCard> {

  constructor() {
    super();
  }

}

