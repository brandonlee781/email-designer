import { ID } from '@datorama/akita';
import { EmailCard } from '../email-card';
import { Location } from 'src/app/features/location/state';
import * as shortid from 'shortid';
import { parse, format } from 'date-fns';

export interface Email {
  id: ID;
  name: string;
  cards: EmailCard[];
  location: Location;
  sendDate: string;
  createdAt: string;
  updatedAt: string;
}

export function createEmail({
  id = shortid.generate() as ID,
  name = null,
  cards = [],
  location = null,
  sendDate = (new Date()).toDateString(),
  createdAt = (new Date()).toDateString(),
  updatedAt = (new Date()).toDateString(),
}: Partial<Email>): Email {
  return {
    id,
    name: name ? name : `${format(parse(sendDate), 'YYYYMDD')}-${location ? location.id.toString().toUpperCase() : ''}`,
    cards,
    location,
    sendDate,
    createdAt,
    updatedAt,
  } as Email;
}
