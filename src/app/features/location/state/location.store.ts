import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Location } from './location.model';

export interface LocationState extends EntityState<Location> {}

const initialState = {
  entities: {
    'cc' : {
      id: 'cc',
      location: 'cc',
      name: 'Cape Coral',
      website: 'www.cityfirst.church/capecoral',
      instagram: 'https://www.instagram.com/cityfirstcapecoral',
      facebook: 'https://www.facebook.com/cityfirstcapecoral',
      twitter: 'https://www.twitter.com/cityfirstcc',
      address: {
        link: 'https://www.google.com/maps/place/121 Del Prado Blvd. S Cape Coral, FL 33990',
        display: '121 Del Prado Blvd. S Cape Coral, FL 33990',
      },
      phone: '239-458-0813',
      email: 'capecoral@cityfirst.church'
    },
    'sc': {
      id: 'sc',
      location: 'sc',
      name: 'Spring Creek',
      website: 'www.cityfirst.church/springcreek',
      instagram: 'https://www.instagram.com/cityfirstspringcreek',
      facebook: 'https://www.facebook.com/cityfirstspringcreek',
      twitter: 'https://www.twitter.com/cityfirstchurch',
      address: {
        link: 'https://www.google.com/maps/place/121 Del Prado Blvd. S Cape Coral, FL 33990',
        display: '5950 Spring Creek Rd., Rockford, IL 61114',
      },
      phone: '815-877-8000',
      email: 'springcreek@cityfirst.church'
    },
  },
  ids: ['sc', 'cc'],
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Location' })
export class LocationStore extends EntityStore<LocationState, Location> {

  constructor() {
    super(initialState);
  }

}

