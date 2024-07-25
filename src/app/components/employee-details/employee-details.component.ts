import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  // employees = [{ name: '', email: '', designation: '', age: '' }];

  // handleAddEmployee() {
  //   const lastEmployee = this.employees[this.employees.length - 1];
  //   const duplicate = this.employees.some(
  //     (employee, index) =>
  //       employee.email === lastEmployee.email &&
  //       index !== this.employees.length - 1
  //   );

  //   if (duplicate) {
  //     alert('An employee with this email already exists.');
  //     this.employees[this.employees.length - 1] = {
  //       name: '',
  //       email: '',
  //       designation: '',
  //       age: '',
  //     };
  //   } else {
  //     this.employees.push({ name: '', email: '', designation: '', age: '' });
  //   }
  // }

  // handleChange(index: number, event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   const name = target.name as keyof (typeof this.employees)[0];
  //   this.employees[index][name] = target.value;
  // }

  // handleSubmit() {
  //   console.log('Employee details submitted:', this.employees);
  // }

  employees: Employee[] = [];
  newEmployee: Employee = { name: '', email: '', designation: '', age: 0 };

  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
    this.globalDataService.employees$.subscribe((employees) => {
      this.employees = employees;
    });
  }

  handleAddEmployee() {
    const duplicate = this.employees.some(
      (emp) => emp.email === this.newEmployee.email
    );
    if (duplicate) {
      alert('An employee with this email already exists.');
      this.newEmployee = { name: '', email: '', designation: '', age: 0 }; // Clear form
    } else {
      this.globalDataService.addEmployee(this.newEmployee);
      this.newEmployee = { name: '', email: '', designation: '', age: 0 }; // Clear form
    }
  }

  handleSubmit() {
    this.globalDataService.setEmployees(this.employees);
    console.log('Employee details submitted', this.employees);
  }
}
