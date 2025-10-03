import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: 'form', component: UserFormComponent },
  { path: '**', redirectTo: '/form' }
];
