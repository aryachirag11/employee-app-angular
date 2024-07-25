import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loggedinUser } from '../../../assets/data/userCredentails';
import { GlobalDataService } from '../../global-data.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  // private globalDataService = inject(GlobalDataService);

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  formData: any;
  router = new Router();
  onSubmit() {
    // event.preventDefault();
    if (this.applyForm.valid) {
      this.formData = this.applyForm.value;
      if (
        this.formData.email === loggedinUser.email &&
        this.formData.password === loggedinUser.password
      ) {
        this.router.navigate(['/on-boarding']);
      } else alert('Please enter valid credentials');
    }
  }
}
