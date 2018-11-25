import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EmailCardService } from '../../state/email-card';
import { SavedCardQuery, SavedCardService } from '../../state/saved-card';
import { LocationQuery, LocationService } from 'src/app/features/location/state';
import { Email, EmailService } from '../../state/email';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ed-email-nav-drawer',
  templateUrl: './email-nav-drawer.component.html',
  styleUrls: ['./email-nav-drawer.component.scss']
})
export class EmailNavDrawerComponent implements OnInit, OnDestroy {
  defaultCards = [
    {
      id: 1,
      icon: 'input',
      text: 'Image, Text, Button',
      options: [
        'image',
        'text',
        'button',
      ]
    },
    {
      id: 2,
      icon: 'text_fields',
      text: 'Image and Text',
      options: [
        'image',
        'text',
      ]
    },
    {
      id: 3,
      icon: 'insert_photo',
      text: 'Image Only',
      options: [
        'image',
      ]
    },
    {
      id: 4,
      icon: 'text_fields',
      text: 'Text Only',
      options: [
        'text',
      ]
    }
  ];
  @Input() email: Email;
  locations$ = this.locationQuery.selectAll();
  selectedLocationId$ = this.locationQuery.selectActiveId();
  savedCards$ = this.savedCardQuery.selectAll();

  public updateName = new Subject<string>();

  constructor(
    private emailService: EmailService,
    private emailCardService: EmailCardService,
    private savedCardQuery: SavedCardQuery,
    private savedCardService: SavedCardService,
    private locationQuery: LocationQuery,
    private locationService: LocationService,
  ) {
    this.updateName.pipe(
      debounceTime(1000),
    )
    .subscribe(name => {
      this.onNameChange(name);
    });
  }

  get sendDate() {
    return new Date(this.email.sendDate);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.updateName.unsubscribe();
  }

  onStandardTileClick(options) {
    this.emailCardService.addCard(options, this.email);
  }

  onSavedTileClick(card, e) {
    if (e.target.className !== 'mat-icon material-icons') {
      this.emailCardService.addCard(card, this.email);
    }
  }

  deleteSavedCard(id) {
    if (confirm('Are you sure you want to delete this saved card?')) {
      this.savedCardService.removeSavedCard(id);
    }
  }

  selectLocation(e) {
    this.locationService.selectLocation(e.value);
    this.emailService.setLocation(e.value);
  }

  onNameChange(value: String) {
    this.emailService.modifyEmail('name', value);
  }

  onDateChange({ value }: { value: Date }) {
    this.emailService.modifyEmail('sendDate', value.toDateString());
  }

}
