import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { loggedinUser } from '../../../assets/data/userCredentails';
import { AuthService } from '../../auth.service';
import { GlobalDataService } from '../../global-data.service';

@Component({
  selector: 'app-on-boarding',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './on-boarding.component.html',
  styleUrl: './on-boarding.component.css',
})
export class OnBoardingComponent {
  // isLoggedin: boolean = false;
  private authService = inject(AuthService);
  private globalDataService = inject(GlobalDataService);

  // onBoardingForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   firstName: new FormControl('', [Validators.required]),
  //   lastName: new FormControl('', [Validators.required]),
  //   contactNumber: new FormControl('', [Validators.required]),
  //   address: new FormControl('', [Validators.required]),
  //   bio: new FormControl('', [Validators.required]),
  // });
  onBoardingForm: FormGroup;
  currentStep = 1;

  constructor(private fb: FormBuilder) {
    this.onBoardingForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  formData: any;
  router = new Router();

  login() {
    console.log('service login');

    this.authService.login();
  }
  completeOnBoarding() {
    console.log('Form Submission');
    // event.preventDefault();
    if (this.onBoardingForm.valid) {
      this.formData = this.onBoardingForm.value;
      console.log('onBoardingForm :', this.formData);
      this.globalDataService.setAdditionalInfo(this.formData);
      this.login();
      this.router.navigate(['/employee-details']);
    }
  }
}
