import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { SavedCardStore } from './saved-card.store';
import { HttpClient } from '@angular/common/http';
import { SavedCard } from './saved-card.model';
import { SavedCardQuery } from './saved-card.query';

@Injectable({ providedIn: 'root' })
export class SavedCardService {

  constructor(private savedCardStore: SavedCardStore, private savedCardQuery: SavedCardQuery) {
  }

  get() {
    // this.http.get().subscribe((entities: ServerResponse) => {
      // this.savedCardStore.set(entities);
    // });
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.savedCardStore.add(entity);
    // });
  }

  saveCard(card: SavedCard) {
    const savedCard = this.savedCardQuery.getAll().find(saved => saved.id === card.id);

    if (savedCard) {
      this.savedCardStore.update(card.id, card);
    } else {
      this.savedCardStore.add(card);
    }

  }

  removeSavedCard(id: ID) {
    this.savedCardStore.remove(id);
  }

}
