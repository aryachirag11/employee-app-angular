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
  employees: Employee[] = [];
  newEmployee: Employee = { name: '', email: '', designation: '', age: 0 };

  constructor(private globalDataService: GlobalDataService) {}
  //storing the employees$ stream in local variable
  ngOnInit(): void {
    this.globalDataService.employees$.subscribe((employees) => {
      this.employees = employees;
    });
  }
  //handler for adding a new employee
  handleAddEmployee() {
    //check for multiple employees with same email
    const duplicate = this.employees.some(
      (emp) => emp.email === this.newEmployee.email
    );
    if (duplicate) {
      alert('An employee with this email already exists.');
      this.newEmployee = { name: '', email: '', designation: '', age: 0 }; // Clear form
    } else {
      //save add employee if email is new
      this.globalDataService.addEmployee(this.newEmployee);
      this.newEmployee = { name: '', email: '', designation: '', age: 0 }; // Clear form
    }
  }

  handleSubmit() {
    //setting employees data in global data service
    this.globalDataService.setEmployees(this.employees);
    console.log('Employee details submitted', this.employees);
  }
}
