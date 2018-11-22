import { ID } from '@datorama/akita';

export interface Location {
  id: ID;
  location: string;
  name: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  address: {
    link: string;
    display: string;
  };
  phone: string;
  email: string;
}

export function createLocation({
  id = null,
  location = '',
  name = '',
  website = '',
  instagram = '',
  facebook = '',
  twitter = '',
  address = {
    link: '',
    display: '',
  },
  phone = '',
  email = '',
}: Partial<Location>) {
  return {
    id,
    location,
    name,
    website,
    instagram,
    facebook,
    twitter,
    address,
    phone,
    email,
  } as Location;
}
