import { ID } from '@datorama/akita';
import * as shortid from 'shortid';

type alignment = 'center' | 'right' | 'left';
type textCase = 'none' | 'uppercase' | 'capitalize';

const defaultText = [
  /* tslint:disable */
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta ullamcorper quam, ut interdum libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae',
  'Sed rutrum tempus dui, non interdum ligula ultricies id. Vestibulum fringilla varius nisi vitae vehicula. Mauris lobortis imperdiet tempus. Aliquam ut tellus nulla. Praesent nec varius arcu.',
  'Aliquam rutrum consectetur velit ut placerat. Sed blandit aliquet magna ac malesuada. Etiam eu enim vitae nunc fringilla tristique. Proin id accumsan nulla, mollis semper dui. In luctus eu odio vel imperdiet.'
  /* tslint:enable */
];

export interface EmailCard {
  id?: ID;
  emailId?: ID;
  link?: string;

  title?: string;
  subtitle?: string;
  titleAlignment?: alignment;
  titleCase?: textCase;

  text?: string[];
  textAlignment?: alignment;

  image?: string;

  buttonText?: string;
  paddingTop?: number;
  paddingBottom?: number;
  marginBottom?: boolean;

  options?: string[];
}

export function createEmailCard({
  id,
  emailId,
  paddingTop = 20,
  paddingBottom = 0,
  text = defaultText,
  title = 'Lorem Ipsum',
  buttonText = 'Find Out More',
  marginBottom = true,
  options = ['image', 'text', 'button'],
  titleAlignment = 'center',
  textAlignment = 'center',
  titleCase = 'uppercase'
}): Partial<EmailCard> {
  return {
    id,
    emailId,
    paddingTop,
    paddingBottom,
    text,
    title,
    buttonText,
    marginBottom,
    options,
    titleAlignment,
    textAlignment,
    titleCase,
  } as EmailCard;
}
