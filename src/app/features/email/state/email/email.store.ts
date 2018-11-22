import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Email } from './email.model';

export type DialogType = 'generateHtml' | 'generateText';

export interface EmailUiData {
  dialogOpen: Boolean;
  dialogType: DialogType;
}

export interface EmailState extends EntityState<Email> {
  emails: Email[];
  ui: EmailUiData;
}

const initialState = {
  emails: [],
  ui: {
    dialogOpen: false,
    dialogType: '',
  },
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Email' })
export class EmailStore extends EntityStore<EmailState, Email> {

  constructor() {
    super(initialState);
  }

  updateEmailDialog(open, type) {
    this.updateRoot({ ui: { dialogOpen: open, dialogType: type } });
  }

}

