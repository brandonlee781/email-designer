import { Component, OnInit } from '@angular/core';
import { EmailStore } from '../../state/email';

@Component({
  selector: 'ed-email-speed-dial',
  templateUrl: './email-speed-dial.component.html',
  styleUrls: ['./email-speed-dial.component.scss']
})
export class EmailSpeedDialComponent {
  fabButtons = [
    {
      icon: 'code',
      tooltip: 'Generate Email HTML',
      action: 'generateHtml'
    },
    {
      icon: 'text_fields',
      tooltip: 'Generate Email Text',
      action: 'generateText',
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor(private emailStore: EmailStore) { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  onItemClick(action) {
    this.emailStore.updateEmailDialog(true, action);
  }
}
