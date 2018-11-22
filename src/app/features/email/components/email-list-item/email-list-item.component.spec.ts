import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailListItemComponent } from './email-list-item.component';
import { Email, createEmail, EmailService } from 'src/app/features/email/state/email';
import { MaterialModule } from 'src/app/core/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Location, createLocation } from 'src/app/features/location/state';
import { parse, format } from 'date-fns';

fdescribe('EmailListItemComponent', () => {
  let component: EmailListItemComponent;
  let fixture: ComponentFixture<EmailListItemComponent>;
  let element: HTMLElement;
  let emailService: EmailService;
  let email: Email;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule],
      declarations: [ EmailListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailListItemComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    emailService = TestBed.get(EmailService);

    location = createLocation({ id: 'sc' });
    email = createEmail({ id: '234', location });
    component.email = email;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct inputs', () => {
    expect(component.email).toEqual(email);
  });

  it('should have the correct number of email-links', () => {
    const emailLinks = element.querySelectorAll('.email-link');
    expect(emailLinks.length).toEqual(1);
  });

  it('should have and use the correct data', () => {
    const formattedDate = format(parse(email.sendDate), 'YYYYMDD');
    const locationString = email.location.id.toString().toUpperCase();
    const linkString = `${formattedDate}-${locationString}`.trim();

    expect(component.email.sendDate).toEqual(email.sendDate);
    expect(component.email.location.id).toEqual(email.location.id);
    expect(element.querySelector('.email-link').innerHTML.trim()).toEqual(linkString);
  });

  it('#onClickDelete() should delete email', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(emailService, 'deleteEmail');
    component.onClickDelete();

    expect(emailService.deleteEmail).toHaveBeenCalledTimes(1);
    expect(emailService.deleteEmail).toHaveBeenCalledWith('234');
  });

  it('clicking the delete icon should trigger the delete method', async () => {
    spyOn(component, 'onClickDelete');
    const button = fixture.debugElement.nativeElement.querySelector('.delete-btn');
    button.click();

    await fixture.whenStable();
    expect(component.onClickDelete).toHaveBeenCalled();
  });

  it('#onClickCopy() should create a new email', () => {
    spyOn(emailService, 'copyEmail');
    component.onClickCopy();

    expect(emailService.copyEmail).toHaveBeenCalledTimes(1);
    expect(emailService.copyEmail).toHaveBeenCalledWith(email);
  });

  it('clicking the copy icon should trigger the copy method', async () => {
    spyOn(component, 'onClickCopy');
    const button = fixture.debugElement.nativeElement.querySelector('.copy-btn');
    button.click();

    await fixture.whenStable();
    expect(component.onClickCopy).toHaveBeenCalled();
  });
});
