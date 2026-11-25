import { Routes } from '@angular/router';
import { SignUp } from './sign-up/sign-up';
import { ConfirmEmail } from './confirm-email/confirm-email';

export const AUTH_ROUTES: Routes = [
  { path: 'sign-up', component: SignUp },
  { path: 'confirm-email', component: ConfirmEmail },
];
