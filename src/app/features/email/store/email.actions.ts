import { StandardComponent, CustomComponent } from './email.types';

export class AddComponent {
  static readonly type = '[Email] Add Component';
  constructor(public component: CustomComponent) {}
}

export class ModifyComponent {
  static readonly type = '[Email] Modify Component';
  constructor(
    public id: string,
    public field: string,
    public value: any
  ) {}
}

export class DeleteComponent {
  static readonly type = '[Email] Delete Component';
  constructor(public id: string) {}
}

export class SelectComponent {
  static readonly type = '[Email] Select Component';
  constructor(public id?: string) {}
}
