import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCardComponent } from './email-card.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { EmailTextComponent } from '../email-text/email-text.component';
import { EmailButtonComponent } from '../email-button/email-button.component';
import { DetectLinksPipe } from '../../pipes/detect-links.pipe';
import { createEmailCard, EmailCardStore, EmailCardService, EmailCard } from '../../state/email-card';
import { SavedCardService } from '../../state/saved-card';

describe('EmailCardComponent', () => {
  let component: EmailCardComponent;
  let fixture: ComponentFixture<EmailCardComponent>;
  let element: HTMLElement;
  let emailCardStore: EmailCardStore;
  let emailCardService: EmailCardService;
  let savedCardService: SavedCardService;
  let emailCard: EmailCard;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ EmailCardComponent, EmailTextComponent, EmailButtonComponent, EmailButtonComponent, DetectLinksPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCardComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    emailCardStore = TestBed.get(EmailCardStore);
    emailCardService = TestBed.get(EmailCardService);
    savedCardService = TestBed.get(SavedCardService);
    emailCard = createEmailCard({ id: '123', emailId: '456' });

    component.component = emailCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly show child elements based on options', () => {
    expect(element.querySelector('ed-email-button')).toBeTruthy();
    expect(element.querySelector('img')).toBeTruthy();
    expect(element.querySelector('ed-email-text')).toBeTruthy();

    component.component = Object.assign({}, component.component, {
      options: [],
    });
    fixture.detectChanges();

    expect(element.querySelector('ed-email-text')).toBeFalsy();
    expect(element.querySelector('img')).toBeFalsy();
    expect(element.querySelector('ed-email-button')).toBeFalsy();
  });

  it('should react to the change in active card', () => {
    expect(element.querySelector('.selected-icon')).toBeFalsy();
    emailCardService.selectCard('123');
    fixture.detectChanges();
    expect(element.querySelector('.selected-icon')).toBeTruthy();
  });

  it('#onCardClicked() should set it to active', () => {
    const event = { target: { className: 'card' }};
    expect(element.querySelector('.selected-icon')).toBeFalsy();
    component.onCardClick(event);
    fixture.detectChanges();
    expect(element.querySelector('.selected-icon')).toBeTruthy();
  });

  it('clicking the menu icon should not set it active', () => {
    const event = { target: { className: 'mat-icon mat-black material-icons' }};
    expect(element.querySelector('.selected-icon')).toBeFalsy();
    component.onCardClick(event);
    fixture.detectChanges();
    expect(element.querySelector('.selected-icon')).toBeFalsy();
  });

  it('#onClickDelete() should delete card', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(emailCardService, 'deleteCard');
    component.onClickDelete();

    expect(emailCardService.deleteCard).toHaveBeenCalledTimes(1);
    expect(emailCardService.deleteCard).toHaveBeenCalledWith('123');
  });

  it('#onClickSave() should save the card', () => {
    spyOn(savedCardService, 'saveCard');
    component.onClickSave();

    expect(savedCardService.saveCard).toHaveBeenCalledTimes(1);
    expect(savedCardService.saveCard).toHaveBeenCalledWith(emailCard);
  });
});
