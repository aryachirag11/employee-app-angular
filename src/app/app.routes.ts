import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { OnBoardingComponent } from './components/on-boarding/on-boarding.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

//routes for the application
export const routes: Routes = [
  //Default route and login route are same
  { path: '', component: LoginFormComponent },
  { path: 'login', component: LoginFormComponent },
  //Routes for on borading - page
  { path: 'on-boarding', component: OnBoardingComponent },
  //Route for employee details page
  { path: 'employee-details', component: EmployeeDetailsComponent },
];
