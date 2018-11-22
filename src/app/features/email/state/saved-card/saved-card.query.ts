import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SavedCardStore, SavedCardState } from './saved-card.store';
import { SavedCard } from './saved-card.model';

@Injectable({ providedIn: 'root' })
export class SavedCardQuery extends QueryEntity<SavedCardState, SavedCard> {

  constructor(protected store: SavedCardStore) {
    super(store);
  }

}
