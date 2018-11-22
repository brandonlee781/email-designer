import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { LocationStore } from './location.store';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LocationService {

  constructor(private locationStore: LocationStore) {
  }

  get() {
    //
  }

  add() {
    // this.http.post().subscribe((entity: ServerResponse) => {
      // this.locationStore.add(entity);
    // });
  }

  selectLocation(id) {
    this.locationStore.setActive(id);
  }

}
