import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNavDrawerComponent } from './email-nav-drawer.component';

describe('EmailNavDrawerComponent', () => {
  let component: EmailNavDrawerComponent;
  let fixture: ComponentFixture<EmailNavDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailNavDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNavDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
