import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RightNavComponent } from './components/right-nav/right-nav.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    LayoutModule,
  ],
  declarations: [RightNavComponent],
  exports: [RightNavComponent],
})
export class UiModule { }
