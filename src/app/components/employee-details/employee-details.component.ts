import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { GlobalDataService } from '../../global-data.service';

interface Employee {
  name: string;
  email: string;
  designation: string;
  age: number;
}

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  newEmployeeForm: FormGroup;
  constructor(
    private globalDataService: GlobalDataService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      employees: this.fb.array([]), // Initialize as FormArray
      newEmployee: this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        designation: ['', Validators.required],
        age: [
          '',
          [Validators.required, Validators.min(18), Validators.max(60)],
        ],
      }),
    });

    this.newEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailUniqueValidator.bind(this)],
      ],
      designation: ['', Validators.required],
      age: [
        null,
        [Validators.required, Validators.min(18), Validators.max(60)],
      ],
    });
  }
  get currentEmployees(): Employee[] {
    return this.employees;
  }
  get Employees(): FormArray {
    return this.employeeForm.get('employees') as FormArray;
  }

  get employeesLength(): number {
    return this.employees ? this.employees.length : 0;
  }
  @ViewChild('header') header!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  ngOnInit(): void {
    this.globalDataService.employees$.subscribe((employees) => {
      this.employees = employees;
      // Populate the employee form array
      const employeeFormArray = this.Employees;
      employeeFormArray.clear(); // Clear existing form controls
      this.employees.forEach((emp) => {
        employeeFormArray.push(
          this.fb.group({
            name: [emp.name, Validators.required],
            email: [emp.email, [Validators.required, Validators.email]],
            designation: [emp.designation, Validators.required],
            age: [
              emp.age,
              [Validators.required, Validators.min(18), Validators.max(60)],
            ],
          })
        );
      });
    });
    const header = this.header.nativeElement;
    const content = this.content.nativeElement;

    content.addEventListener('scroll', () => {
      header.scrollLeft = content.scrollTop;
    });
  }

  emailUniqueValidator(control: AbstractControl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailExists = this.employees.some(
          (emp) => emp.email === control.value
        );
        resolve(emailExists ? { uniqueEmail: true } : null);
      }, 500);
    });
  }

  handleAddEmployee() {
    if (this.newEmployeeForm.valid) {
      const newEmployee = this.newEmployeeForm.value;
      this.globalDataService.addEmployee(newEmployee);
      this.newEmployeeForm.reset(); // Clear form
    } else {
      this.newEmployeeForm.markAllAsTouched();
    }
  }

  handleSubmit() {
    if (this.employeeForm.valid) {
      this.globalDataService.setEmployees(this.employees);
      console.log('Employee details submitted', this.employees);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
}
