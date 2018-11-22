import { Component, OnInit } from '@angular/core';
import { EmailQuery, EmailService } from '../../state/email';
import { Router } from '@angular/router';

@Component({
  selector: 'ed-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.scss']
})
export class ListEmailComponent implements OnInit {
  emails$ = this.emailQuery.selectAll();

  constructor(
    private emailQuery: EmailQuery,
    private emailService: EmailService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onCreateClick() {
    const email = this.emailService.addEmail();
    this.router.navigate(['/email', email.id]);
  }

}
