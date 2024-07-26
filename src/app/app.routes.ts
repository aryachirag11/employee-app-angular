import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OnBoardingComponent } from './components/on-boarding/on-boarding.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { onBoardingGuard } from './guards/on-boarding.guard';

//routes for the application
export const routes: Routes = [
  //Default route and login route are same
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  //Routes for on borading - page
  {
    path: 'on-boarding',
    component: OnBoardingComponent,
    canActivate: [authGuardGuard],
  },
  //Route for employee details page
  {
    path: 'employee-details',
    component: EmployeeDetailsComponent,
    canActivate: [authGuardGuard, onBoardingGuard],
  },
  { path: '**', redirectTo: '/login' },
];
