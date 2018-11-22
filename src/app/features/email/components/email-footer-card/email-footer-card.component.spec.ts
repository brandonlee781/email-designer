import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFooterCardComponent } from './email-footer-card.component';

describe('EmailFooterCardComponent', () => {
  let component: EmailFooterCardComponent;
  let fixture: ComponentFixture<EmailFooterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFooterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFooterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
