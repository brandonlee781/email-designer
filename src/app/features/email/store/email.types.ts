export interface StandardComponent {
  icon?: string;
  text?: string;
  options?: string[];
}

type alignment = 'center' | 'right' | 'left';
type textCase = 'none' | 'uppercase' | 'capitalize';

export interface CustomComponent extends StandardComponent {
  id?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  image?: string;
  buttonText?: string;
  paddingTop?: number;
  paddingBottom?: number;
  marginBottom?: boolean;
  titleAlignment?: alignment;
  titleCase?: textCase;
  textAlignment?: alignment;
}

export interface EmailStateModel {
  standardComponents: StandardComponent[];
  currentComponents: CustomComponent[];
  selectedComponent: CustomComponent;
}
