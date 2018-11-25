import { Pipe, PipeTransform } from '@angular/core';
import { Email } from '../state/email';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(emails: Email[], term?: string): any {
    if (term === undefined) {
      return emails;
    }
    return emails.filter((email) => {
      return email.name.toLowerCase().includes(term.toLowerCase())
        || email.location.name.toLowerCase().includes(term.toLowerCase())
        || email.location.id === term.toLowerCase();
    });
  }

}
