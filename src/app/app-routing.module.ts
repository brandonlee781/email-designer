import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmailComponent } from './features/email/pages/create-email/create-email.component';
import { ListEmailComponent } from './features/email/pages/list-email/list-email.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListEmailComponent,
  },
  {
    path: 'email/:id',
    canActivate: [AuthGuard],
    component: CreateEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
