import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //import for headerCompoent, rest all components are wrapped inside the router-outlet
  imports: [HeaderComponent, RouterOutlet, NzProgressModule],
})
export class AppComponent {
  title: string = 'employees-app';
}
