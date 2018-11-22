import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { MaterialModule } from 'src/app/core/material/material.module';

import { EmailButtonComponent } from './components/email-button/email-button.component';
import { EmailCardComponent } from './components/email-card/email-card.component';
import { EmailContentWrapperComponent } from './components/email-content-wrapper/email-content-wrapper.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { EmailEditDrawerComponent } from './components/email-edit-drawer/email-edit-drawer.component';
import { EmailFooterCardComponent } from './components/email-footer-card/email-footer-card.component';
import { EmailListItemComponent } from './components/email-list-item/email-list-item.component';
import { EmailNavDrawerComponent } from './components/email-nav-drawer/email-nav-drawer.component';
import { EmailSpeedDialComponent } from './components/email-speed-dial/email-speed-dial.component';
import { EmailTextComponent } from './components/email-text/email-text.component';
import { CreateEmailComponent } from './pages/create-email/create-email.component';
import { ListEmailComponent } from './pages/list-email/list-email.component';
import { DetectLinksPipe } from './pipes/detect-links.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    ClipboardModule,
  ],
  declarations: [
    CreateEmailComponent,
    EmailButtonComponent,
    EmailContentWrapperComponent,
    EmailCardComponent,
    EmailTextComponent,
    EmailNavDrawerComponent,
    EmailEditDrawerComponent,
    EmailFooterCardComponent,
    DetectLinksPipe,
    ListEmailComponent,
    EmailListItemComponent,
    EmailSpeedDialComponent,
    EmailDialogComponent,
  ],
  entryComponents: [ EmailDialogComponent ]
})
export class EmailModule { }
