import { ID } from '@datorama/akita';
import { EmailCard } from '../email-card';

export interface SavedCard extends EmailCard {
  name?: string;
}

export function createSavedCard({
  id = null,
  name = 'New Card',
  paddingTop = 20,
  paddingBottom = 0,
  text = [],
  marginBottom = true,
  options = ['image', 'text', 'button'],
  titleAlignment = 'center',
  textAlignment = 'center',
  titleCase = 'uppercase'
}): Partial<SavedCard> {
  return {
    id,
    name,
    paddingTop,
    paddingBottom,
    text,
    marginBottom,
    options,
    titleAlignment,
    textAlignment,
    titleCase,
  } as EmailCard;
}

