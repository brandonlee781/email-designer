import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmailComponent } from './features/email/pages/create-email/create-email.component';

const routes: Routes = [
  {
    path: 'email',
    component: CreateEmailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
