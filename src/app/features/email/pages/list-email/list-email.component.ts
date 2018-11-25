import { Component, OnInit } from '@angular/core';
import { EmailQuery, EmailService } from '../../state/email';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ed-list-email',
  templateUrl: './list-email.component.html',
  styleUrls: ['./list-email.component.scss']
})
export class ListEmailComponent implements OnInit {
  search = '';
  emails$ = this.emailQuery.selectAll().pipe(
    map(emails => emails.filter(email => {
      return email.name.toLowerCase().includes(this.search.toLowerCase());
    })),
  );

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
