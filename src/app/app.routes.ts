import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OnBoardingComponent } from './components/on-boarding/on-boarding.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'on-boarding', component: OnBoardingComponent },
  { path: 'employee-details', component: EmployeeDetailsComponent },
];
