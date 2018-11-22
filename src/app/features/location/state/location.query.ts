import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LocationStore, LocationState } from './location.store';
import { Location } from './location.model';

@Injectable({ providedIn: 'root' })
export class LocationQuery extends QueryEntity<LocationState, Location> {

  constructor(protected store: LocationStore) {
    super(store);
  }

}
