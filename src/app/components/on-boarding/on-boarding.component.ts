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
  //authServcie to use isLoggedin state
  private authService = inject(AuthService);
  // globalData service to stored additional data of the user
  private globalDataService = inject(GlobalDataService);

  onBoardingForm: FormGroup;
  currentStep = 1;
  //stepper form build
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
  //move to next step of the form
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
  //prev step
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  formData: any;
  router = new Router();
  //calling login function of the authService only after successful onBoarding complete
  login() {
    // console.log('service login');
    this.authService.login();
  }
  //to handle onBoarding
  completeOnBoarding() {
    console.log('Form Submission');
    // event.preventDefault();
    if (this.onBoardingForm.valid) {
      this.formData = this.onBoardingForm.value;
      console.log('onBoardingForm :', this.formData);
      //saving the form data to additional info in the service
      this.globalDataService.setAdditionalInfo(this.formData);
      //login after onboarding completion
      this.login();
      // navigate to employee details page
      this.router.navigate(['/employee-details']);
    }
  }
}
