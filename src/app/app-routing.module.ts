import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmailComponent } from './features/email/pages/create-email/create-email.component';
import { ListEmailComponent } from './features/email/pages/list-email/list-email.component';

const routes: Routes = [
  {
    path: '',
    component: ListEmailComponent,
  },
  {
    path: 'email/:id',
    component: CreateEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
