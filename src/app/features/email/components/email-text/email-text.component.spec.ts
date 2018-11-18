import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTextComponent } from './email-text.component';

describe('EmailTextComponent', () => {
  let component: EmailTextComponent;
  let fixture: ComponentFixture<EmailTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
