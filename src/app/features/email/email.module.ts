import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { UiModule } from '../ui/ui.module';

import { CreateEmailComponent } from './pages/create-email/create-email.component';

import { EmailCardComponent } from './components/email-card/email-card.component';
import { EmailButtonComponent } from './components/email-button/email-button.component';
import { EmailContentWrapperComponent } from './components/email-content-wrapper/email-content-wrapper.component';
import { EmailTextComponent } from './components/email-text/email-text.component';
import { FormsModule } from '@angular/forms';
import { EmailNavDrawerComponent } from './components/email-nav-drawer/email-nav-drawer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    UiModule,
  ],
  declarations: [
    CreateEmailComponent,
    EmailButtonComponent,
    EmailContentWrapperComponent,
    EmailCardComponent,
    EmailTextComponent,
    EmailNavDrawerComponent,
  ]
})
export class EmailModule { }
