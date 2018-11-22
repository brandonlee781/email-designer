import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditDrawerComponent } from './email-edit-drawer.component';
import { MaterialModule } from 'src/app/core/material/material.module';

describe('EmailEditDrawerComponent', () => {
  let component: EmailEditDrawerComponent;
  let fixture: ComponentFixture<EmailEditDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ EmailEditDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
