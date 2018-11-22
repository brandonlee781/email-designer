import { Component, OnInit, Input } from '@angular/core';
import { Email, EmailService } from '../../state/email';

@Component({
  selector: 'ed-email-list-item',
  templateUrl: './email-list-item.component.html',
  styleUrls: ['./email-list-item.component.scss']
})
export class EmailListItemComponent implements OnInit {
  @Input() email: Email;

  constructor(private emailService: EmailService) { }

  ngOnInit() {
  }

  onClickDelete() {
    if (confirm('Are you sure you want to delete this email?')) {
      this.emailService.deleteEmail(this.email.id);
    }
  }

  async onClickCopy() {
    this.emailService.copyEmail(this.email);
  }

}
