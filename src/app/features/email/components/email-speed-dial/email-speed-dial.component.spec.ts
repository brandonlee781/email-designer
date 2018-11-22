import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSpeedDialComponent } from './email-speed-dial.component';

describe('EmailSpeedDialComponent', () => {
  let component: EmailSpeedDialComponent;
  let fixture: ComponentFixture<EmailSpeedDialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSpeedDialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSpeedDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
