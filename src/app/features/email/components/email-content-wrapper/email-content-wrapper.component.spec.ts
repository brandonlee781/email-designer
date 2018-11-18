import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContentWrapperComponent } from './email-content-wrapper.component';

describe('EmailContentWrapperComponent', () => {
  let component: EmailContentWrapperComponent;
  let fixture: ComponentFixture<EmailContentWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailContentWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
